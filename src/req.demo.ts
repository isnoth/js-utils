import {req} from './req'
const axios = require('axios')

async function basic() {
    // basic 
    req({
        url: 'https://www.baidu.com'
    })
    .then(d => d.data)
    .then(console.log)

}

const getProxyIp = async () => {
    return await axios.get(`http://localhost:6000/random`)
        .then((d:any) => d.data)
    .then(s => {
        const [ip, port] = s.split(':')
        return {ip, port}
    })
}

async function withProxy() {
    req({
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        getProxy: getProxyIp,
        logger: console
    })
    .then(d => d.data)
    .then(console.log)

}

async function withDataCheckerFail() {
    // will fail
    req({
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        // getProxy: getProxyIp,
        logger: console,
        checkData: (data) => data.id === 2
    })
    .then(d => d.data)
    .then(console.log)
    .catch(e => console.log(e))

}

async  function withDataCheckerSuccess (){
    // will success
    req({
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        // getProxy: getProxyIp,
        logger: console,
        checkData: (data) => data.id === 1
    })
    .then(d => d.data)
    .then(console.log)
    .catch(e => console.log(e))
}

withDataCheckerSuccess()
