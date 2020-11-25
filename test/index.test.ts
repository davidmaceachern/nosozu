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
        let expected = { "summary": { "successful": 1, "errors": 3, "processing": 2} }
        
        const response = await nosozu.run(command)

        expect(response).toEqual(expected)
    })
})