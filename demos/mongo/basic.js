const { newLogger, DbHandler, timeoutAsync } = require('../../dist/index.cjs.js')

console.log(DbHandler)

async function main2() {
    const DB_NAME = 'test'
    const url = `mongodb://localhost:27017/${DB_NAME}`;
    const db = new DbHandler(url)
    db.init()

    await timeoutAsync(2000)
    // await db.add('test', {name: '1', path: ['a', 'b']});
    // const data = await db.find('test', {})


    setInterval(async () => {
        console.log(await db.find('test', {}))
        console.log(await db.find('ml_br', {'cat.cat_1': {$exists: true}, 'cat.cat_2': {$exists: false}}))
        const data = await db.find('test', {'path.0': 'a', 'path.2': {'$exists': false}})
        console.log(data)
    }, 2000)


}

main2()
