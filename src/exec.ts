var exec = require('child-process-promise').exec;

export const wrappedExec = (cmd)=>{
  return exec(cmd)
  .then(result=>{
    console.log(result.stdout)
  })
  .catch(err=>{
    console.error(err.stderr)
  })
}
