import { CommandBuilder, Commands } from './command-builder'
import { JSONClient } from './json-client'
import { RunCommandError } from './errors'
/* 
Class that will be exposed to the libraries end user
- Creates a CommandRequest which Sozu needs to execute the command 
- Passes these requests to the JSONClient Class which handles message encoding/decoding, sending messages, and event lifecycle 
- Finally passes the results back to the user the commands that were run and any issues
*/
export class Nosozu {
    private JSONClient: JSONClient | null = null
    private client: JSONClient
    private commandBuilder: CommandBuilder
    private runCommandResult: object = {}

    constructor(socketPath: string) { // TODO: do we enable the user to pass in more configuration?
        this.client = new JSONClient(socketPath) // TODO: check that JSONclient is singleton, should it be?
        this.commandBuilder = new CommandBuilder()
    } // TODO: need to clean up the variables in this class after the run method has been invoked?
    
    async run(...commands: Commands): Promise<any> {
        const successfulCommands: any = []
        const errors: any = []
        const commandRequests = commands.map((command) => this.commandBuilder.buildCommandRequest(command)) // TODO: validate command inputs
        // TODO: Consider batching commands, and adding backoff here if Sozu has a request limit.
        await Promise.all([commandRequests.map(async (commandRequest) => await this.client.request(commandRequest))]) // TODO: typescript 3.9 might fix null promise.all issue
            .then(
                results => successfulCommands.push(results),
            ).catch(
                error => { 
                    errors.push(error),
                    new RunCommandError(`Command failed with: ${error.message}`)
            })
        this.runCommandResult = { successfulCommands: successfulCommands, errors: errors }
        return this.runCommandResult 
    }

    async close() {
        this.client.close()
    }
}