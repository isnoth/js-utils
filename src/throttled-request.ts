import pThrottle from 'p-throttle';
import axios from 'axios';
import * as https from 'https'
const tunnel = require('tunnel')
import got from 'got'

interface iOptions {
    url: string,
    proxy?: {
        host: string,
        port: number
    }
}

const getProxyOptions = (options: iOptions ) => ({
    agent: {
        https: tunnel.httpOverHttp({
            proxy: options.proxy
        })
    }
})

export function getThrotedRequest(numbers, milisecond, startFn= _=>{ }) {
    const requestfunction = (options: iOptions) => {
        const newOptions = options.proxy &&  getProxyOptions(options) || {}
        startFn(newOptions)

        return got(options.url, newOptions)
        .then(d=>d.body)
    }
    const throttled = pThrottle(requestfunction, numbers, milisecond)
    return throttled
}
