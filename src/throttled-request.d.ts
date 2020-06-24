interface iOptions {
    url: string;
    proxy?: {
        host: string;
        port: number;
    };
}
export declare function getThrotedRequest(numbers: any, milisecond: any, startFn?: (_: any) => void): import("p-throttle").ThrottledFunction<[iOptions], string>;
export {};
