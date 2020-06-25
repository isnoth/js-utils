"use strict";
exports.__esModule = true;
var index_es_1 = require("../dist/index.es");
var startFn = function (options) {
    console.log('start', options);
};
var req = index_es_1.getThrotedRequest(2, 4000, startFn);
var options = {
    url: 'https://www.baidu.com',
    proxy: {
        host: '10.144.1.10',
        port: 8080
    }
};
var option2 = {
    url: 'https://www.163.com',
    timeout: 2000,
    proxy: {
        host: '10.144.1.10',
        port: 8080
    }
};
var req2 = index_es_1.getThrotedRequest(1, 5000);
var req3 = index_es_1.getThrotedRequest('xxx', 'xf');
req2(option2)
    .then(console.log);
//req2(options).then(console.log)
//req2(options).then(console.log)
//req2(options).then(console.log)
//req2(options).then(console.log)
//req(options).then(console.log)
//req(options).then(console.log)
//req(options).then(console.log)
//req(options).then(console.log)
