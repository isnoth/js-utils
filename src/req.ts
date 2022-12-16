import { HttpsProxyAgent } from 'hpagent'
const axios = require('axios')

const defaultProxyAgentConfig = {
    keepAlive: true,
    keepAliveMsecs: 1000,
    maxSockets: 256,
    maxFreeSockets: 256,
    timeout: 10000
}

const getHttpAgent = async (getProxy: any, agentTimeout: number, logger?: any) => {
    const proxy = await getProxy()
    const {ip, port} = proxy
    logger && logger.info(`#getHttpAgent with proxy, ip: ${ip} port: ${port}`)
    const proxyURI = (`http://${ip}:${port}`)
        return new HttpsProxyAgent({
        ...defaultProxyAgentConfig,
        timeout: agentTimeout,
        proxy: proxyURI
    });
}

export const req = async ({
    logger,
    url, 
    headers,
    retry = 3,
    getProxy,
    timeout=10000,
    agentTimeout=10000,
    proxyAgentConfig,
    checkData // if exist and failes, will retry
}: any) => {

    logger && logger.info(`#reqNew: url:${url} header:${JSON.stringify(headers)} retry:${retry} agentTimeout:${agentTimeout} timeout:${timeout}`)

    let errors = []

    for (let i of Array(retry).fill(0).map((i,index) => index)) {
        logger && logger.info(`reqNew try index: #${i+1}`)
        const instance = axios.create({
            baseURL: url,
            timeout: timeout,
            httpsAgent: getProxy? await getHttpAgent(getProxy, agentTimeout, logger): null,
            validateStatus: () => true // Accepts all status codes
        });

        try {
            // @ts-ignore
            const data = await instance.get()
            if (checkData) {
                if (checkData(data.data)) {
                    logger && logger.info(`reqNew checkData success, return `)
                    return data
                } else {
                    const message = `reqNew checkData failed: data: ${JSON.stringify(data.data)}, continue`
                    logger && logger.info(message)
                    errors.push(message)
                    continue
                }
            }
            return data
        } catch(e) {
            const message = `reqNew failed: ${e.message}`
            logger && logger.info(message)
            errors.push(message)
        }

    }

    logger && logger.info(`all request fails, ${JSON.stringify(errors)}` )
    throw new Error(`all request fails` )
}
