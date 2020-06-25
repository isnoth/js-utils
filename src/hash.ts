const crypto = require('crypto')

export function createHash(str) {
    const md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
    md5.update(str);
    const d = md5.digest('hex');  //加密后的值d
    console.info(`create HASH ${d}`)
    return d;
}

