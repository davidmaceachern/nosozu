<div align="center">
  🎋🐼 
</div>

<h1 align="center">
   Nosozu 
</h1>

<p align="center">
    <a href="https://nodejs.org/en/">Node.js</a> Client library for interacting with the <a href="https://github.com/sozu-proxy/sozu">Sōzu</a> HTTP reverse proxy server.
</p>

<div align="center">
  <a alt="GitHub Workflow Status" href="https://github.com/davidmaceachern/nosozu/actions">
    <img  src="https://img.shields.io/github/workflow/status/davidmaceachern/nosozu/CI">
  </a>
  <a alt="NPM Package Version" href="https://www.npmjs.com/package/nosozu">
    <img alt="npm" src="https://img.shields.io/npm/v/nosozu">
  </a>
  <a alt="Code Coverage" href="https://codecov.io/gh/davidmaceachern/nosozu#">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/davidmaceachern/nosozu">
  </a>
</div>
<br />

This library is still under development, and as such there are no guarantees that it will work under load, if at all,

Contributions are welcome, see [here](https://github.com/davidmaceachern/nosozu#contributing) for an explanation, or jump straight to [getting started](https://github.com/davidmaceachern/nosozu/blob/main/doc/how-to-get-started-developing.md) if you want to explore the codebase.

##  Goal

To provide a resilient API for developers to interact with the Sozu command server using Typescript.

Take a look at the Elixir version [here](https://github.com/evuez/exsozu).

## 💾 Install

### 📦 NPM

`npm install --save nodesozu`

## 🏓 Examples

A minimal example that demonstrates how to send a proxy status command to the Sozu server.

```javascript
import { Nosozu } from nosozu

async function main() {
    const socketPath = "/tmp/sozu.sock"
    let client = new Nosozu(socketPath)
    const command = { type: "status" }
    const result = await client.run(command)
    return result
}

await main()
```

Find more examples [here](https://github.com/davidmaceachern/nosozu/blob/main/examples)

## 🏗️ Continuous Integration

### GitHub Actions

One action currently running, `CI`: 
- Runs code coverage reports upon pushing to the main branch, uploads to Codecov.

## Contributing

Guidelines on how to contribute can be found [here](https://github.com/davidmaceachern/nosozu/blob/main/.github/CONTRIBUTING.md)

There are some living documents [here](https://github.com/davidmaceachern/nosozu/blob/main/doc) which covers some topics on development.

## License

Licensed under MIT license (LICENSE-MIT or http://opensource.org/licenses/MIT)

### Standing on the shoulders of giants

The client code that handles commands is based on work done by [Connected Cars](https://connectedcars.dk/), Sozu uses a zero byte separated message to communicate, whereas the [original client](https://github.com/tlbdk/node-json-protocol) uses a line-based protocol.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, shall be licensed as per above, without any additional terms or conditions.
