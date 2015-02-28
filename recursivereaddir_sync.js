let path = require('path')
let fs = require('fs')
let _ = require('lodash')
require('songbird')

function recursiveReaddirSync(dir) {
  let files = fs.readdirSync(dir)
  let fileNameLists = files.map(function(file) {
    let absolutePath = path.join(dir, file)
    // console.log(absolutePath)
    let stat = fs.statSync(absolutePath)
    if (stat.isDirectory()) {
      return recursiveReaddirSync(absolutePath)
    }
    return absolutePath
  })
  return _.flatten(fileNameLists)
}

console.log(recursiveReaddirSync(__dirname))

