import { Command, CommandResponse } from '../src/command'
import { JSONClient } from '../src/jsonClient'

const SOCKET_PATH: string = '/home/davidmaceachern/github/nodesozu/tmp/sock';

describe('Nodesozu client can process:', () => {
  let socketPath: string = SOCKET_PATH
  
  it('a single command such as to check the proxy status', async () => {
    let status: Command = {
      type: "STATUS"
    }

    let statusResponse: CommandResponse = {
      "id": "ID_TEST",
      "version": 0,
      "status": "OK",
      "message": "",
      "data": null
    }

    let client: JSONClient | null = null

    try {
      client = new JSONClient(socketPath)
      const res = await client.request(status)
      expect(res).toEqual(statusResponse);
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
