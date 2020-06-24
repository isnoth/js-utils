"use strict";
exports.__esModule = true;
var throttled_request_1 = require("../src/throttled-request");
var startFn = function (options) {
    console.log('start', options);
};
var req = throttled_request_1.getThrotedRequest(2, 4000, startFn);
var options = {
    url: 'https://www.baidu.com',
    proxy: {
        host: '10.144.1.10',
        port: 8080
    }
};
var req2 = throttled_request_1.getThrotedRequest(1, 5000);
req2(options).then(console.log);
req2(options).then(console.log);
req2(options).then(console.log);
req2(options).then(console.log);
//req(options).then(console.log)
//req(options).then(console.log)
//req(options).then(console.log)
//req(options).then(console.log)
