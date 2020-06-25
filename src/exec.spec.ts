import {wrappedExec} from './exec'

it('exec a cmd', ()=>{
    return wrappedExec('ls -al')
    .then(console.log)
})
