import {Crawler } from './crawler'
const axios = require('axios')

const c = new Crawler({
    rateLimit: null,
    maxQueueSize: 100,
})

const getConfig = (id, getProxy=null) => ({
    url: `https://jsonplaceholder.typicode.com/todos/${id}`,
    logger: console,
    getProxy,
    retry: 100,
    agentTimeout: 20000,
    timeout: 20000,
    checkData: (data) => !!data.id
})

const getProxyIp = async () => {
    return await axios.get(`http://localhost:6000/random`)
        .then((d:any) => d.data)
    .then(s => {
        const [ip, port] = s.split(':')
        return {ip, port}
    })
}


async function simple() {
    c.onDone(() => {
        console.log('done!')
    })

    c.queue(getConfig(1))
    .then((res) => {
        console.log(res.data)
    })
}


async function multiple()  {
    c.onDone(() => {
        console.log('done!')
    })

    const promises = Array(3)
    .fill(0)
    .map(i => {
        return c.queue(getConfig(1)).then(res => console.log(res.data))
    })
    await Promise.all(promises)
}

async function nested() {
    const queueJob = (id=0) => {
        console.log('queueJob', id)
        c.queue(getConfig(id))
        .then(res => {
            console.log(res.data)
            if (id < 10) {
                queueJob(id+1)
            }
        })
    }

    c.onDone(() => {
        console.log('done!')
    })
    queueJob(1)
}

async function withProxy() {

    const t0 = Date.now()
    c.onDone(() => {
        console.log(`done! in ${Math.floor((Date.now() - t0)/1000/60)} minutes`)
    })

    const ar = Array(100)


    const promises = Array(100)
    .fill(0)
    .map((i, index) => {
        return c.queue(getConfig(index+1, getProxyIp))
        .then(res => {
            console.log(res.data)
            ar[index] = true
        })
        .catch(e => {
            console.log('job failed!', index+1)
            ar[index] = false
        })
    })
    Promise.all(promises)
    .then(console.log)
    .catch(e => console.log(e))

    setInterval(() => {
        console.log(ar)
    }, 1000)

}

// nested()
withProxy()
