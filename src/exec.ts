var exec = require('child-process-promise').exec;

export const wrappedExec = (cmd)=>{
  return exec(cmd)
  .then(result=>{
    return result.stdout
  })
  .catch(err=>{
    console.error(err.stderr)
    throw err
  })
}
