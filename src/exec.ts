
var exec = require('child-process-promise').exec;

var wrappedExec = (cmd)=>{
  return exec(cmd)
  .then(result=>{
    console.log(result.stdout)
  })
  .catch(err=>{
    console.error(err.stderr)
  })
}

module.exports = {
    wrappedExec
}
