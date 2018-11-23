const { createHash } = require('./hash')

it('md5', ()=>{
    createHash('www.baidu.com')
})
