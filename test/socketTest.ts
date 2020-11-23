import net from 'net'
import crypto from 'crypto'
import os from 'os'

function reconnectSocket(oldClient: net.Socket, socketPath: string): void {
  const client = net.createConnection({ path: socketPath })
  // Copy over old listeners
  for (const event of ['connect', 'close', 'error', 'data']) {
    const ls = oldClient.listeners(event)
    for (const listener of oldClient.listeners(event)) {
      client.on(event, args => {
        listener(args)
      })
    }
  }
}

function createConnection(socketPath: string): void {
  console.log(new Date().toISOString())
  const client = net.createConnection({ path: socketPath })
  client.on('connect', () => {
    console.log('client connect')
  })
  client.on('close', () => {
    console.log('client close')
    setTimeout(() => {
      //console.log(new Date().toISOString())
      client.connect({ path: socketPath })
      //createConnection(socketPath)
      //reconnectSocket(client, socketPath)
    }, 1)
  })
}

async function main(): Promise<void> {
  const socketPath = `${os.tmpdir()}-${crypto.randomBytes(12).toString('hex')}.sock`
  const server = net.createServer(client => {
    console.log('server connected')
    client.on('close', () => {
      console.log('server closed')
    })
    setTimeout(() => {
      client.destroy()
    }, 2000)
  })

  await new Promise(resolve => {
    server.listen(socketPath, resolve)
  })

  createConnection(socketPath)
}

main().catch(e => {
  console.error(e)
})
