import { CommandBuilder, Command } from './command-builder'
import { JSONClient } from './json-client'
/* 
Class that will be exposed to the libraries end user
- Creates a CommandRequest which Sozu needs to execute the command 
- Passes these requests to the JSONClient Class which handles message encoding/decoding, sending messages, and event lifecycle 
- Finally passes the results back to the user the commands that were run and any issues
*/
export class Nosozu {
    private JSONClient: JSONClient | null = null
    private commands = []
    private client: JSONClient
    
    private commandBuilder: CommandBuilder
    private result: Object

    constructor(socketPath: string) {
        this.client = new JSONClient(socketPath) // TODO: check that JSONclient is singleton
        this.commandBuilder = new CommandBuilder()
        this.result = {}
    }
    // TODO: handle one or multiple commands ...commands: Array<Command>
    async run(command: Command): Promise<any> {
        const commandRequest = this.commandBuilder.buildCommandRequest(command)
        // const CommandRequests = commands.map((command) => this.commandBuilder.buildCommand(command)) // TODO: build the command
        // Promise.all(CommandRequests)
        // console.log() // TODO: make the request
        this.result = { "summary": { "successful": 1, "errors": 3, "processing": 2} }
        return this.result
    }
}