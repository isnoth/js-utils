const pThrottle = require('p-throttle');
const axios = require('axios')

export function getThrotedRequest(numbers, milisecond) {
    const requestfunction = (options) => {
        return axios(options)
        .then(d=>d.data)
    }
    const throttled = pThrottle(requestfunction, numbers, milisecond)
    return throttled
}
