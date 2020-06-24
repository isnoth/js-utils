import { getThrotedRequest } from '../dist/index.cjs'

const startFn = (options) => {
    console.log('start', options)
}

const req = getThrotedRequest(2, 4000, startFn)
const options = {
    url: 'https://www.baidu.com',
    proxy: {
        host: '10.144.1.10',
        port: 8080
    }
}

const option2 = {
    url: 'https://www.163.com',
    timeout: 2000,
    proxy: {
        host: '10.144.1.10',
        port: 8080
    }
}

const req2 = getThrotedRequest(1, 5000)

req2(option2)
.then(console.log)

//req2(options).then(console.log)
//req2(options).then(console.log)
//req2(options).then(console.log)
//req2(options).then(console.log)


//req(options).then(console.log)
//req(options).then(console.log)
//req(options).then(console.log)
//req(options).then(console.log)
