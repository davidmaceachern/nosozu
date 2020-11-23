import crypto from 'crypto'
import os from 'os'
import { JSONClient } from '../src/jsonClient'
import { TimeoutError, ConnectionClosedError, ConnectionError } from '../src/errors'
import { JSONServer } from './test-utilities/jsonServer'

describe('JSONClient', () => {
  let jsonServer: JSONServer
  let socketPath: string

  beforeAll(async () => {
    socketPath = `./tmp-${crypto.randomBytes(12).toString('hex')}.sock`
    jsonServer = new JSONServer(socketPath, (socket, request) => {
      switch (request.type) {
        case 'TestRequest': {
          socket.write(JSON.stringify({ id: request.id, type: 'TestRequest', value: 'test' }) + '\n')
          break
        }
        case 'TestBadRequestId': {
          socket.write(JSON.stringify({ id: 'not-valid', type: 'TestRequest', value: 'test' }) + '\n')
          break
        }
        case 'TestTimeout': {
          break
        }
        case 'TestCloseConnection': {
          socket.destroy()
          break
        }
        default: {
          throw Error(`Unknown request type`)
        }
      }
    })
    await jsonServer.onListening()
  })

  afterAll(async () => {
    await jsonServer.close(true)
    console.log('Hello')
  })

  test('Simple request', async () => {
    let jsonClient: JSONClient | null = null
    try {
      jsonClient = new JSONClient(socketPath)
      const response = await jsonClient.request({ type: 'TestRequest' })
      expect(response).toEqual({ id: expect.stringMatching('.+'), type: 'TestRequest', value: 'test' })
    } finally {
      await jsonClient?.close()
    }
  })

  test('Bad request id', async () => {
    let jsonClient: JSONClient | null = null
    try {
      jsonClient = new JSONClient(socketPath)
      const response = jsonClient.request({ type: 'TestBadRequestId' }, 1)
      await expect(response).rejects.toThrow(TimeoutError)
    } finally {
      await jsonClient?.close()
    }
  })

  test('Timeout', async () => {
    let jsonClient: JSONClient | null = null
    try {
      jsonClient = new JSONClient(socketPath)
      const response = jsonClient.request({ type: 'TestTimeout' }, 1)
      await expect(response).rejects.toThrow(TimeoutError)
    } catch (e) {
      console.log(e)
    } finally {
      await jsonClient?.close()
    }
  })

  test('Connection closed', async () => {
    let jsonClient: JSONClient | null = null
    try {
      jsonClient = new JSONClient(socketPath, { reconnectDelay: 0 })
      await expect(jsonClient.request({ type: 'TestCloseConnection' }, 1000000)).rejects.toThrow(ConnectionClosedError)
      const response = jsonClient.request({ type: 'TestRequest' }, 1000000)
      await expect(response).resolves.toEqual({ id: expect.stringMatching('.+'), type: 'TestRequest', value: 'test' })
    } finally {
      await jsonClient?.close()
    }
  })

  test('Request error', async () => {
    let jsonClient: JSONClient | null = null
    try {
      jsonClient = new JSONClient(socketPath, { reconnectDelay: 2000, writeDelayOnReconnect: false })
      await expect(jsonClient.request({ type: 'TestCloseConnection' }, 1000000)).rejects.toThrow(ConnectionClosedError)
      await expect(jsonClient.request({ type: 'TestRequest' }, 1000000)).rejects.toThrow(ConnectionError)
    } finally {
      await jsonClient?.close()
    }
  })
})
