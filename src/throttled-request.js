const pThrottle = require('p-throttle');
const axios = require('axios')

export function getThrotedRequest(numbers, milisecond, startFn= _=>{ }) {
    const requestfunction = (options) => {
        startFn(options)
        return axios(options)
        .then(d=>d.data)
    }
    const throttled = pThrottle(requestfunction, numbers, milisecond)
    return throttled
}
