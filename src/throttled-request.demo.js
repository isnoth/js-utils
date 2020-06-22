const {getThrotedRequest} = require('./throttled-request')

const startFn = (options) => {
    console.log('start', options)
}

const req = getThrotedRequest(2, 5001, startFn)
const options = {
    method: 'GET',
    url: 'https://www.baidu.com'
}

req(options).then(console.log)
req(options).then(console.log)
req(options).then(console.log)
req(options).then(console.log)
