/* v1.2
 * add db handler
 *
 */
var MongoClient = require('mongodb').MongoClient

function connectToMongo(url){
  return new Promise((resolve, reject)=>{
    MongoClient.connect(url, {reconnectInterval: 1000}, (err,db)=>{
      if (err){
        reject(err)
      }else{
        resolve(db)
      }
    });
  })
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
  return new Promise((resolve, reject)=>{
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




class DbHandler{
  constructor(url){
    this.url = url
    this.db = null;
    //this.init()
    setTimeout(this.init.bind(this), 5000)
  }

  init(){
    return connectToMongo(this.url)
    .then((db)=>{
      this.db = db
      console.log('db init')
      return Promise.resolve()
    })
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

module.exports = {
  DbHandler
}
