const { getThrotedRequest } = require( '../dist/index.cjs')

const startFn = (options) => {
    console.log('start', options)
}

const req = getThrotedRequest(2, 5001, startFn)
const options = {
    url: 'https://www.baidu.com',
    proxy: {
        host: '10.144.1.10',
        port: 8080
    }
}

req(options).then(console.log)
req(options).then(console.log)
req(options).then(console.log)
req(options).then(console.log)
