import { newLogger } from './log';
const l = newLogger('LOG SUBSCRIBER')

describe ('logger', ()=>{
    it ('logger', ()=>{
        l.info('hello')
        l.warn('hello')
        l.error('hello')
    })
})
