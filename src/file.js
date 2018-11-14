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

module.exports = {
  readFile,
  writeFile
}
