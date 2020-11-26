import { Nosozu } from '../src/index'
import crypto from 'crypto'

describe('Nosozu', () => {
    let socketPath: string
    
    beforeAll(async () => {
        socketPath = `./tmp-${crypto.randomBytes(12).toString('hex')}.sock`
    })
    
   test('can send the status command', async () => {
       let nosozu = new Nosozu(socketPath)
       let command = { type: "status" }
       let expected = { successfulCommands: [], errors: [] } 
       
        try {
            nosozu = new Nosozu(socketPath)
            const response = await nosozu.run(command)
            expect(response).toEqual(expected)
        } finally {
            await nosozu?.close() 
        }
       const response = await nosozu.run(command)

       expect(response).toEqual(expected)
   })
    
    test('can handle multiple commands', async () => {
        let nosozu: Nosozu | null = null
        let commands = [ { type: "status" }, { type: "list_workers" } ]
        let expected = { successfulCommands: [], errors: [] } 
        try {
            nosozu = new Nosozu(socketPath)
            const response = await nosozu.run(commands)
            expect(response).toEqual(expected)
        } finally {
            await nosozu?.close() 
        }
    }) 
})