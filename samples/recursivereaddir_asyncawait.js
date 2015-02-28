let path = require('path')
let fs = require('fs')
let _ = require('lodash')
require('songbird')

async function recursiveReaddir(dir) {
  let files = await fs.promise.readdir(dir)
  let promises = files.map(async function(file) {
    let absolutePath = path.join(dir, file)
    // console.log(absolutePath)
    let stat = await fs.promise.stat(absolutePath)
    if (stat.isDirectory()) {
      return await recursiveReaddir(absolutePath)
    }
    return absolutePath
  })
  return _.flatten(await Promise.all(promises))
}

recursiveReaddir(__dirname)
  .then(console.log)

