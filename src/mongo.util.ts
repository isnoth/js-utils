/* v1.3
 * add db handler
 * mongo db js driver move to 3
 *
 */

const { MongoClient } = require("mongodb");


async function connectToMongo(url){
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
        return client // if dbName is null return default db

    } catch(e){
        console.error("Connected to server failed", e)
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

function add(db, collection, data){
  return new Promise((resolve, reject)=>{
    const c= db.collection(collection)
    c.insert(data, (err, result)=>{
      if (err){
        reject(err)
      }else{
        resolve(result.ops[0])
      }
    })
  })
}

function find(db, collection, query){
  return new Promise<any[]>((resolve, reject)=>{
    const c= db.collection(collection)
    c.find(query).toArray((err, result)=>{
      if (err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}
function findOne(db, collection, query){
    const c= db.collection(collection)
    return c.findOne(query)
}

function findOneAndUpdate(db, collection, query, data){
    const c= db.collection(collection)
    return c.updateOne(query, {$set: data}, {upsert: true})
}

function deleteOne(db, collection, params){
  const c= db.collection(collection)
  return c.deleteOne(params)
}


export class Db {
    db: any;

    constructor(client, dbName) {
        this.db = client.db(dbName)
    }

    add(collection, data){
        return add(this.db, collection, data)
    }

    find(collection, query={}){
        return find(this.db, collection, query)
    }

    findOne(collection, query={}){
        return findOne(this.db, collection, query)
    }

    update(collection, query, update ){
        return findOneAndUpdate(this.db, collection, query, update )
    }

    deleteOne(collection, query){
        return  deleteOne(this.db, collection, query)
    }

    exist( collection, query){
        return find(this.db, collection, query)
        .then(result=>{
            if(!!result.length){
                return Promise.resolve(true)
            }else{
                return Promise.resolve(false)
            }
        })
    }
}

export class DbHandler {
    url: any;
    client: any;
    dbs: any;

  constructor(url){
    this.url = url
    this.client = null
    this.dbs = {}
    //this.init()
    //setTimeout(this.init.bind(this), 5000)
  }

  init(dbName){
    return connectToMongo(this.url)
    .then((client)=>{
      this.client = client
      // this.db = db
      console.log('connection innit')
      return Promise.resolve()
    })
  }

  getDb(dbName) {
      if (!this.dbs[dbName]) {
          this.dbs[dbName] = new Db(this.client, dbName)
      }
      return this.dbs[dbName]
  }
}
