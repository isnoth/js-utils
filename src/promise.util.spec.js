const {promisesReduce} = require('./promise.util')


function createPromise(key, timeout){
    return new Promise((res, rej)=>{
        setTimeout(()=> {
            console.log('done,', key)
            res(key)}, timeout)
    })
}

describe('promise.util', ()=>{
    var p1, p2;

    before(()=>{
        p1 = createPromise('p1', 200)
        p2 = createPromise('p2', 100)
    })

    it('promisesReduce', (done)=>{
        promisesReduce([()=>p1, ()=>p2])
        .then(console.log)
        .then(done)
    })
})
