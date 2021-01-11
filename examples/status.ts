import { Nosozu } from nosozu

async function main() {
    const socketPath = "/tmp/sozu.sock"
    let client = new Nosozu(socketPath)
    const command = { type: "status" }
    const result = await client.run(command)
    return result
}

await main()
