
function promisesReduce(promises){
    const final  = []

    return promises.reduce((pre, cur)=>{
        return pre.then(()=>{
            return cur().then(result=>final.push(result))
        })
    }, Promise.resolve())
    .then(()=>final)
}

module.exports = {
    promisesReduce
}
