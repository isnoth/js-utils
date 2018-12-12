const {wrappedExec} = require('./exec')

it('exec a cmd', ()=>{
    wrappedExec('ls -al')
    .then(console.log)
})
