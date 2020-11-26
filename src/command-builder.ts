// What we receive from the user
export interface Command {
    type: string
    data?: object 
}
export type Commands = Array<Command>
// What we send to sozu
export interface CommandRequest {
    version: number
    type: string
    data: {
        type?: string
        path?: string
    }
    worker_id?: number
}

// What we receive from Sozu
export interface CommandResponse {
    id: string
    version: number
    status: string // type status: "OK" | "PROCESSING" | "ERROR"
    message: string
    data: null
}

/*
Class that turns the library users command input into a Sozu compatible request
- Common values can be configured here.
- Command types that Sozu supports can be added here
*/
export class CommandBuilder {
    commandRequest: any
    commandProtocolVersion: number = 0
    // TODO: make a common base object to start with
    // private baseCommandOptions: Object = {
    //     commandProtocolVersion
    // }

    buildCommandRequest(command: Command) {
        // TODO: change this to object literal/ternary operators 
        // TODO: validate the fields provided when data is required
        switch (command.type.toUpperCase()) {
            case 'STATUS': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: {
                        type: 'STATUS' 
                    } 
                }
                break
            }

            case 'ADD_BACKEND': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: { type: 'ADD_BACKEND', data: { ...command.data } }
                }
                break
            }


            case 'ADD_CERTIFICATE': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: { type: 'ADD_CERTIFICATE', data: { ...command.data } }
                }
                break
            }

            case 'ADD_HTTP_FRONT': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: { type: 'ADD_HTTP_FRONT', data: { ...command.data } }
                }
                break
            }

            case 'ADD_HTTPS_FRONT': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: { type: 'ADD_HTTPS_FRONT', data: { ...command.data } }
                }
                break
            }

            case 'DUMP_STATE': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'DUMP_STATE'
                }
                break
            }

            case 'HARD_STOP': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: { type: 'HARD_STOP' }
                }
                break
            }

            case 'LIST_WORKERS': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'LIST_WORKERS'
                }
                break
            }

            case 'LOAD_STATE': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'LOAD_STATE',
                    data: { ...command.data  }
                }
                break
            }

            case 'REMOVE_BACKEND': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: { type: 'REMOVE_BACKEND', data: { ...command.data } }
                }
                break
            }

            case 'REMOVE_CERTIFICATE': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: { type: "REMOVE_CERTIFICATE", ...command.data }
                }
                break
            }

            case 'REMOVE_HTTP_FRONT': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: { type: 'REMOVE_HTTP_FRONT', data: { ...command.data } }
                }
                break
            }

            case 'REMOVE_HTTPS_FRONT': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: { type: 'REMOVE_HTTPS_FRONT', data: { ...command.data } }
                }
                break
            }

            case 'SAVE_STATE': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'SAVE_STATE',
                    data: { ...command.data } 
                }
                break
            }

            case 'SOFT_STOP': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'PROXY',
                    data: { type: 'SOFT_STOP' }
                }
                break
            }

            case 'UPGRADE_MASTER': {
                this.commandRequest = {
                    version: this.commandProtocolVersion,
                    type: 'UPGRADE_MASTER',
                }
                break
            }

            default: {
                throw Error(`Unknown command type`)
            }
          }
          return this.commandRequest
        }
    }