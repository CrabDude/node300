let path = require('path')
let fs = require('fs')
let _ = require('lodash')
require('songbird')

async function recursiveReaddir(dir) {
  let files = await fs.promise.readdir(dir)
  let promises = []
  for (let file in files) {
    promises.push(processFile(dir, files[file]))
  }
  return _.flatten(await Promise.all(promises), true)
}

async function processFile(dir, fileName) {
  let ret = []
  let absolutePath = path.join(dir, fileName)
  let stat = await fs.promise.stat(absolutePath)
  if (stat.isDirectory()) {
    ret.push(await recursiveReaddir(absolutePath))
  }
  ret.push(absolutePath)
  return ret
}

recursiveReaddir(__dirname)
  .then(console.log)

