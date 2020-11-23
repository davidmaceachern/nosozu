import net from 'net'
import fs from 'fs'
import { decode, JSONMessage } from '../../src/protocol'
import { isFileNotFoundError } from '../../src/errors'

export class JSONServer {
  private server: net.Server
  private onClosePromise: Promise<void>
  private onListeningPromise: Promise<void>
  private lastConnectionId = 0
  private connections: { [id: number]: net.Socket } = {}

  constructor(socketPath: string, callback: (sock: net.Socket, request: JSONMessage) => void) {
    try {
      fs.unlinkSync(socketPath)
    } catch (e) {
      if (!isFileNotFoundError) {
        throw e
      }
    }
    this.server = net.createServer(client => {
      let buffer = Buffer.alloc(0)
      client.on('data', chunk => {
        console.log('inside the server')
        buffer = Buffer.concat([buffer, chunk])
        console.log('Buffer is ')
        console.log(buffer)
        //const offset = buffer.indexOf('\n') // TODO: Change to fit new message type 
        const offset = buffer.indexOf('\u{0}')
        console.log('offset')
        console.log(offset)
        // TODO: Sozu says 'Missing field version' so we should ensure our request contains required fields
        const removeZeroByte = buffer.slice(0, buffer.length-1)
        const response = removeZeroByte.toString()
        console.log(response)
        // const statusResponse = JSON.parse(response)
        // console.log(statusResponse)
       // if (offset > -1) {
       //   const message = buffer.slice(0, offset)
       //   buffer = buffer.slice(offset + 1)
       //   const response = decode(message.toString()) as JSONMessage
       //   callback(client, response)
       // }
      })
    })

    // Maintain a map of connections
    this.server.on('connection', socket => {
      const connectionId = this.lastConnectionId++
      this.connections[connectionId] = socket
      socket.on('close', () => {
        /* remove socket when it is closed */
        delete this.connections[connectionId]
      })
    })

    this.server.on('error', err => {
      console.log(err)
    })

    this.onClosePromise = new Promise(resolve => {
      this.server.on('close', () => {
        // Seems the close event is fired before Jest things the handle is closed
        setImmediate(resolve)
      })
    })

    this.onListeningPromise = new Promise(resolve => {
      this.server.on('listening', () => {
        resolve()
      })
    })

    this.server.listen(socketPath)
  }

  close(force = false): Promise<void> {
    this.server.close()
    if (force) {
      // Force close all connection
      for (const connection of Object.values(this.connections)) {
        connection.destroy()
      }
    }
    return this.onClosePromise
  }

  onListening(): Promise<void> {
    return this.onListeningPromise
  }

  onClose(): Promise<void> {
    return this.onClosePromise
  }
}
