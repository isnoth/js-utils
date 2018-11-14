const logger = require('./log')('LOG SUBSCRIBER')

describe ('logger', ()=>{
    it ('logger', ()=>{
        logger.info('hello')
        logger.warn('hello')
        logger.error('hello')
    })
})
