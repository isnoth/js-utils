const fs =require('fs')
const util = require('util')
const accessAsync = util.promisify(fs.access)

export const readFile = (filename, encoding='utf-8')=>{
  return new Promise((resolve, reject)=>{
      console.info('readFile:', filename)
      fs.readFile(filename, encoding, (err, data)=>{
          if(err) {
              console.error(err)
              reject(err)
          } else{
              resolve(data)
          }
      })
  })
}

export const writeFile = (path, data, encoding='utf-8')=>{
  return new Promise((resolve, reject)=>{
    fs.writeFile(path, data, encoding, (err, result)=>{
      if(err)
        reject(err)
      else{
          resolve(data)
      }
    })
  })
}

export const fileRemove = (name) => {
    return new Promise((res, rej)=>{
        fs.unlink(name, (err) => {
            err? rej(err) : res()
        });
    })
}

export const fileExists = function (name) {
    return accessAsync(name)
    .then(() => true)
    .catch(() => false)
}

export const listDir = (path) => {
    return new Promise((res, rej) => {
        fs.readdir(path, (error, result) => {
            console.log(path, result)
            error? rej(error) : res(result)
        })
    })
}

export const rename = (oldPath, newPath, renameFileIfExist=false)  => {
    return new Promise((res, rej) => {
        fileExists(newPath)
        .then((exist) => {
            console.log('#rename fileExists:', exist)
            if (!exist){
                console.log('rename', exist, !exist)
                fs.rename(oldPath, newPath, error => {
                    console.log('#rename error:', error)
                    error? rej(error): res()
                })
            } else {
                if (renameFileIfExist) {
                    console.log('rename if exist')
                    fs.rename(oldPath, `${newPath}_${new Date().getTime()}`, error => {
                        console.log('#rename error:', error)
                        error? rej(error): res()
                    })

                } else {
                    rej(new Error(`#rename dest fileExists:${newPath}`))
                }
            }
        })
    })
}

export const mkDir = (path) => {
    return new Promise((res, rej) => {
        fileExists(path)
        .then((exist) => {
            if (exist){
                const error = new Error(`mkdir ${path} already exist`)
                rej(error)
            } else {
                fs.mkdir(path, { recursive: true }, (error) => {
                    if (error) {
                        console.error('mkdir error:', path, error)
                        rej(error)
                    } else {
                        res()
                    }
                });
            }
        })
        .catch(err => rej(err))
    })
}
