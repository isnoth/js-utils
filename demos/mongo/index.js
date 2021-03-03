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

    console.log(await db.find('test', {}))
    console.log(await db.find('ml_br', {'cat.cat_1': {$exists: true}, 'cat.cat_2': {$exists: false}}))
    const data = await db.find('test', {'path.0': 'a', 'path.2': {'$exists': false}})
    console.log(data)

}

async function getDb() {
    const DB_NAME = 'ml_br'
    const url = `mongodb://localhost:27017/${DB_NAME}`;
    const db = new DbHandler(url)
    await db.init()
    return db
}

class Db {
    constructor() {
        this.db = false
        const DB_NAME = 'ml_br'
        const url = `mongodb://localhost:27017/${DB_NAME}`;
        this.db = new DbHandler(url)
    }

    async getDb() {
        if (!this.init) {
           await this.db.init()
           this.init = true;
        } 
        return this.db
    }
    
    async main() {
       const db = await this.getDb()
       console.log(await db.find('cat', {'cat.cat_1': {$exists: true}, 'cat.cat_2': {$exists: false}}))
    }

    async function getChildNodeLength(level, catName) {
       const db = await this.getDb()
       console.log(await db.find('cat', {
	       `cat.cat_${level}`: catName,
	       `cat.cat_${level+2}`: {$exists: false}
       }))
    }
}

const a = new Db()
a.main()
a.getChildNodeLength()

