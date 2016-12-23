output-host
=========================

A simple and convenient tool to output host for website developing.


## Motivation

When testing your website on mobile or other devices from LAN, you usually need to get your external server host (eg: http://192.168.1.123:3000), and then copy and paste it to your browser address bar, and share to other devices.

This tool makes these easily.


## Quick Start

##### outputHost([options])

```js
import outputHost from 'output-host';
import http from 'http';

const port = 3000;
const app = http.createServer();

app.listen(port, () => outputHost({

    // Here's all options.

    port, // Defaults to `3000`
    name: 'Server', // Prefix name. Defaults to 'Server'
    protocol: 'http', // Defaults to `http`
    useLocal: true, // Enable to log localhost. Defaults to `true`
    useExternal: true, // Enable to log external host. Defaults to `true`
    useCopy: true, // Enable to copy external host. So you could easy to paste to browser address bar. Defaults to `true`
    useColor: true, // Enable color. Defaults to `true`
    logger: console.log.bind(console), // Custom logger function. Defaults to `console.log.bind(console)`

}));

// output:
//
//    Server Local URL http://localhost:3000
//    Server External URL http://192.168.1.123:3000

// `http://192.168.1.123:3000` would be added to clipboard automatically.

```

##### outputHost.curry([options, callback])

```js

app.listen(2333, outputHost.curry());

// output:
//
//    Server Local URL http://localhost:2333
//    Server External URL http://192.168.1.123:2333

```

##### cli

```bash
 $ output-host -p 2333

# output:
#
#    Server Local URL http://localhost:2333
#    Server External URL http://192.168.1.123:2333
```

## Installation

Using [npm](https://www.npmjs.com/):

```bash
 $ npm install output-host --save-dev
```

## License

MIT
