# node-fip

This package provides an easy IP based access control. It is a simple middleware to either blacklist or whitelist IPs.

## Version
1.0.1

## Requirements
- [Node](http://github.com/ry/node)

## Installation

Recommended installation is with npm. To add node-fip to your project, do:

    npm install node-fip

## Usage with Express

Blacklist certain IP addresses, while allowing all other IPs:

```javascript
// Init dependencies
var express = require('express')
    , nodeFip = require('node-fip')
    , app = express.createServer()
    ;

// Blacklist the following IPs
app.use(nodeFip({
    mode: 'blacklist',
    proxy: false,
    ips: ['127.0.0.1']
}))
app.listen(3000);
```

Whitelist certain IP addresses, while denying all other IPs:

```javascript
// Init dependencies
var express = require('express')
    , nodeFip = require('node-fip')
    , app = express.createServer()
    ;

// Whitelist the following IPs
app.use(nodeFip({
    mode: 'whitelist',
    proxy: false,
    ips: ['127.0.0.1']
}))
app.listen(3000);
```

## Options

| Option | Description | Default |
| :--- | :--- | :--- |
| mode | To allow or deny ips. Valid values : `whitelist` or `blacklist` | `whitelist` |
| proxy | Set this to true if your node app is behind Ngnix or Apache or likes | `false` |
| ips | An array of allowed or denied IPs | `[]` |
| message | Message sent as response | `Unauthorized Access` |


(The MIT License)

Copyright (c) 2012 Dwolla &lt;michael@dwolla.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.