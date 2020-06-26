const  pThrottle = require ('p-throttle')
import * as https from 'https'
const tunnel = require('tunnel')
const got = require('got')
import { timeoutAsync } from './common'

interface iOptions {
    url: string,
    timeout?: number,
    proxy?: {
        host: string,
        port: number,
    }
}

const getProxyOptions = (options: iOptions ) => ({
    agent: {
        https: tunnel.httpOverHttp({
            proxy: options.proxy
        })
    }
})

export function getThrotedRequest(numbers: number, milisecond: number, startFn: Function = _=>{ }) {
    const requestfunction = (options: iOptions) => {
        const newOptions = options.proxy && getProxyOptions(options) || {}
        startFn(options, newOptions)

        return new Promise((res, rej) => {
            timeoutAsync(options.timeout)
            .then(()=> (rej(new Error(`requestTimeout ${options.timeout}`) )))

            got(options.url, newOptions)
            .then(d=>res(d.body))
            .catch(e=> rej(e))
        })
    }
    const throttled = pThrottle(requestfunction, numbers, milisecond)
    return throttled
}
