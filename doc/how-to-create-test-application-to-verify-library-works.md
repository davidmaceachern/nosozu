# How to create a test application to verify library works

The common way to do this is to use `npm link`, there's a great article [here](https://medium.com/dailyjs/how-to-use-npm-link-7375b6219557) that explains the nuances of making it work.

Given there are no working examples of this library being used yet that we can test it with we must make our test application.

In a new folder titled `testnodesozu` add a `package.json`.

```json
{
    "name": "testnodesozu",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
  }
```

Then create the index.ts and place the code in that we will run.

``` javascript
import { Client } from 'nodesozu'

const socketPath = "/tmp/sozu.sock"

client = new Client(socketPath)
client.request()
```

We can run this by compiling the Typescript into Javascript:

``` bash
tsc index.ts
```

Then we can run our Javascript application.

``` bash
node index.js
```

## Alternatively

If npm sync isn't working, it's possible to instead create a bash function which builds the lib, copies the files over to our applications node_modules folder and then invokes what test/run process we want to use to check the functionality.

``` bash
# copy-and-test-library.sh
cd ../nodesozu && npm run build
cd ../test-nodesozu && rm -rf 
cp -r ../nodesozu/dist/. ./node_modules/nodesozu
```
