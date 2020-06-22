const {getThrotedRequest} = require('./throttled-request')

const req = getThrotedRequest(2, 5001)
const options = {
    method: 'GET',
    url: 'https://www.baidu.com'
}

req(options).then(console.log)
req(options).then(console.log)
req(options).then(console.log)
req(options).then(console.log)
