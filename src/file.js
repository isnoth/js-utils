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

const writeFile = (path, data, encoding='utf-8')=>{
  return new Promise((resolve, reject)=>{
    fs.writeFile(path, data, encoding, (err, data)=>{
      if(err)
        reject(err)
      else
        resolve(data)
    })
  })
}

const fileRemove = (name) => {
    return new Promise((res, rej)=>{
        fs.unlink(name, (err) => {
            err? rej(err) : res()
        });
    })
}

const fileExists = (name) => {
    return new Promise((res, rej) => {
        fs.exists(name, (exists)=>{
            exists? res() : rej()
        })
    })
}

module.exports = {
  readFile,
  writeFile,
  fileRemove,
  fileExists
}
