const fs =require('fs')
const readFile = (filename, encoding='utf-8')=>{
  return new Promise((resolve, reject)=>{
    fs.readFile(filename, encoding, (err, data)=>{
      if(err)
        reject(err)
      else
        resolve(data)
    })
  })
}

module.exports = {
  readFile
}
