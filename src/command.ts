
// What we receive from the user
export interface Command {
    type: string
    data?: object
}

// What we send to sozu
export interface CommandRequest {
//    id: string 
    version: number
    type: string
    data: {
        type?: string
        path?: string
    }
//    worker_id: number
}

// type status: "OK" | "PROCESSING" | "ERROR"

// What we receive from Sozu
export interface CommandResponse {
    id: string
    version: number
    status: string
    message: string
    data: null
}