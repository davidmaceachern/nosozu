import net from 'net'
import { decode, encode, JSONMessage, isJSONParseErrorMessage, JSONMessageRequest } from './protocol'
import { TimeoutError, ServerParserError, ConnectionClosedError, ConnectionError, ClientParserError } from './errors'

interface JSONClientOptions {
  reconnectDelay: number
  writeDelayOnReconnect: boolean
}

export class JSONClient {
  private options: JSONClientOptions = {
    reconnectDelay: 500,
    writeDelayOnReconnect: true
  }
  private id = 1
  private outstandingRequests: {
    [id: string]: {
      resolve: (obj: JSONMessage) => void
      reject: (err: Error) => void
      timeoutRef: NodeJS.Timeout
      message: string
    }
  } = {}
  private delayedRequests: Array<string> = []
  private buffer = Buffer.alloc(0)
  private socketPath: string
  private socket: net.Socket
  private onClosePromise: Promise<void>
  private onCloseResolve: () => void = () => {
    // Typescript can't see this is set in the constructor
  }
  private errorListener: Array<(error: Error) => void> = []
  private reconnect = true
  private reconnectTimeout: NodeJS.Timeout | null = null
  private reconnecting = false

  constructor(socketPath: string, options?: Partial<JSONClientOptions>) {
    this.socketPath = socketPath
    this.options = { ...this.options, ...options }
    if (this.options.reconnectDelay < 0) {
      this.reconnect = false
    }
    this.onClosePromise = new Promise(resolve => {
      this.onCloseResolve = resolve
    })
    this.socket = this.connectSocket()
  }

  private connectSocket(): net.Socket {
    this.buffer = Buffer.alloc(0) // Clear buffer from last connection
    const socket = net.connect({ path: this.socketPath })
    socket.on('connect', () => {
      this.handleConnect()
    })
    socket.on('close', () => this.handleClose())
    socket.on('error', e => this.handleError(e))
    socket.on('data', chunk => this.handleData(chunk))
    return socket
  }

  private handleConnect(): void {
    for (const id of this.delayedRequests) {
      const request = this.outstandingRequests[id]
      if (request) {
        this.socket.write(request.message + '\n') //TODO: Change to fit new message type
      }
    }
    this.delayedRequests = []
  }

  private handleClose(): void {
    // Reject all outstanding requests
    for (const id of Object.keys(this.outstandingRequests)) {
      const request = this.outstandingRequests[id]
      request.reject(new ConnectionClosedError(`request '${id}' connection was closed`))
      clearTimeout(request.timeoutRef)
    }
    this.outstandingRequests = {}

    // Reconnect if the connection closes
    if (this.reconnect) {
      this.reconnecting = true
      setTimeout(() => {
        this.reconnecting = false
        if (this.reconnect) {
          this.socket.removeAllListeners()
          this.socket = this.connectSocket()
        } else {
          this.onCloseResolve()
        }
      }, this.options.reconnectDelay)
    } else {
      this.onCloseResolve()
    }
  }

  private handleError(err: Error): void {
    // Send reject to all outstandingRequests
    for (const id of Object.keys(this.outstandingRequests)) {
      const request = this.outstandingRequests[id]
      request.reject(new ConnectionError(`request '${id}' failed: ${err.message}`))
      clearTimeout(request.timeoutRef)
    }
    this.outstandingRequests = {}
  }

  private handleData(chunk: Buffer): void {
    // TODO: Do more efficient buffering and check a max size
    this.buffer = Buffer.concat([this.buffer, chunk])
    // Do message chunking and basic decoding
    const offset = this.buffer.indexOf('\n') //TODO: Change to fit new message type
    if (offset > -1) {
      const message = this.buffer.slice(0, offset)
      this.buffer = this.buffer.slice(offset + 1)
      try {
        // TODO: Validate this is a JSONMessage
        const response = decode(message.toString()) as JSONMessage
        const request = this.outstandingRequests[response.id]
        // TODO: Validate that request is not undefined
        delete this.outstandingRequests[response.id]
        clearTimeout(request.timeoutRef)
        if (!request) {
          throw new Error(`Unknown response id ${response.id}`)
          // Skip if we did not ask for this message
        } else if (isJSONParseErrorMessage(response)) {
          request.reject(new ServerParserError(response.message))
        } else {
          request.resolve(response)
        }
      } catch (e) {
        // We failed to parse the message skip this line and try the next
        for (const errorListener of this.errorListener) {
          errorListener(new ClientParserError(e.message))
        }
      }
    }
  }

  async request(obj: JSONMessageRequest, timeout = 1000): Promise<JSONMessage> {
    if (!!obj.type) { 
      // console.log('not valid request') // TODO: Validate that it's a JSONMessageRequest
    }
    const request = { id: `${this.id++}`, ...obj } as JSONMessage
    const message = encode(request)

    // Done to handle clearing timeout and remove request when it's done
    const requestPromise = new Promise<JSONMessage>((resolve, reject) => {
      const timeoutRef = setTimeout(() => {
        delete this.outstandingRequests[request.id]
        reject(new TimeoutError())
      }, timeout)
      this.outstandingRequests[request.id] = { resolve, reject, timeoutRef, message }
    })

    // Write after we have registered the request as outstandingRequests
    // as this can trigger socket socket events in same tick
    if (this.options.writeDelayOnReconnect && this.reconnecting) {
      this.delayedRequests.push(request.id)
    } else {
      console.log('before sending the message')
      const stringifiedCommandBuffer = Buffer.from(message)
      const zeroByteBuffer = new Uint8Array([0])
      const totalLength = stringifiedCommandBuffer.length + zeroByteBuffer.length
      const encodedMessage = Buffer.concat([stringifiedCommandBuffer, zeroByteBuffer], totalLength)
      this.socket.write(encodedMessage) 
      //this.socket.write(message + '\n') //TODO: Change to fit new message type
    }

    return requestPromise
  }

  async close(): Promise<void> {
    this.reconnect = false
    if (this.reconnectTimeout != null) {
      clearTimeout(this.reconnectTimeout)
    }
    if (this.reconnecting) {
      this.onCloseResolve()
    }
    // console.log('THIS IS BEING CALLED') // component test is calling this.
    this.socket.end()
    return this.onClosePromise
  }

  public on(eventType: 'error', callback: (error: Error) => void): void {
    switch (eventType) {
      case 'error': {
        this.errorListener.push(callback)
        break
      }
      default: {
        throw new Error(`Unknown event type: ${eventType}`)
      }
    }
  }
}
