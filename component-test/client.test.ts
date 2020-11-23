import { CommandRequest, CommandResponse } from '../src/command'
import { JSONClient } from '../src/jsonClient'

const SOCKET_PATH: string = '/home/davidmaceachern/github/nodesozu/tmp/sock';

describe('Nodesozu client can process:', () => {
  let socketPath: string = SOCKET_PATH
  afterAll(async () => {
    // TODO: Clear open handles so that jest can exist gracefully
    let client: JSONClient | null = null
    client = new JSONClient(socketPath)
    let shutdown: CommandRequest = {
      "version": 0,
      "type": "PROXY",
      "data": {
        "type": "SOFT_STOP",
      }
    } 
    await client.request(shutdown)
  });
  it('a single command such as to check the proxy status', async () => {
    let status: CommandRequest = {
      type: "PROXY",
      version: 0,
      data: {
        type: "STATUS"
      }
    }

    let statusResponse: CommandResponse = {
      "id": "1",
      "version": 0,
      "status": "OK",
      "message": "",
      "data": null
    }

    let client: JSONClient | null = null

    try {
      client = new JSONClient(socketPath)
      console.log(client)
      const res = await client.request(status)
      expect(res).toEqual(statusResponse);
    } finally {
      await client?.close()
    }
  });

  it('consecutive commands such as to check the proxy status and then dump state', async () => {
    let status: CommandRequest = {
      type: "PROXY",
      version: 0,
      data: {
        type: "STATUS"
      }
    }

    let expectedStatus: CommandResponse = {
      "id": "1",
      "version": 0,
      "status": "OK",
      "message": "",
      "data": null
    }

    let dumpState: CommandRequest = {
      version: 0,
      type: "SAVE_STATE",
      data: {
        path: "./config_dump.json"
      }
    }

    let expectedDumpState: CommandResponse = {
      id: "2",
      version: 0,
      status: 'OK',
      message: 'saved 11 config messages to ./config_dump.json',
      data: null
    }

    let client: JSONClient | null = null

    try {
      client = new JSONClient(socketPath)
      const statusResponse = await client.request(status)
      expect(expectedStatus).toEqual(statusResponse)
      const dumpStateResponse = await client.request(dumpState)
      console.log('DUMPSTATE RESPONSE')
      console.log(dumpStateResponse)
      expect(expectedDumpState).toEqual(dumpStateResponse)
    } finally {
      await client?.close()
    }
  });

  //  it('a batch of multiple commands ', async () => {
  //    let client: Client
  //    let multipleCommands: Array<Command> = [
  //      { type: "STATUS" }, 
  //      { type: "DUMP_STATE" }
  //    ]
  //
  //    let statusResponse: CommandResponse = {
  //      "id": "ID_TEST",
  //      "version": 0,
  //      "status": "OK",
  //      "message": "",
  //      "data": null
  //    }
  //
  //    try {
  //      client = new Client(socketPath)
  //      const res = await client.request(multipleCommands)
  //      expect(res).toEqual(statusResponse);
  //    } finally {
  //      console.log('close the client')
  //    }
  //  });
});
