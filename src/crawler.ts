import Bottleneck from "bottleneck";
import {req} from './req'

interface IConfig {
    url?: string;

    timeout?: number
    agentTimeout?: number
    retry?: number
    maxQueueSize?: number
    rateLimit?: number
}

const DEFAULT_CONFIG = {
    maxQueueSize: null,
    rateLimit: null //  if set 'maxConnections' will forced to 1
}

export class Crawler {
    limiter: any
    config: any
    onDoneFn: any

    constructor( config?: IConfig) {
        this.config = config

        const newConfig = {...DEFAULT_CONFIG, ...config}
        this.limiter = new Bottleneck({
            maxConcurrent: newConfig.maxQueueSize,
            minTime: newConfig.rateLimit
        });

        this.limiter.on("idle", () => {
            // This will be called when `limiter.empty()` is `true` and `limiter.running()` is `0`.
            this.onDoneFn && this.onDoneFn()
        });
    }

    queue = async (config) => {
        return this.limiter.schedule(req, config)
    }

    onDone = (fn) => {
        this.onDoneFn = fn
    }

}
