let path = require('path')
let fs = require('fs')
let _ = require('lodash')
let Dropbox = require('dropbox')
let argv = require('yargs').boolean('dropbox').argv
let isDropbox = argv.dropbox

require('songbird')

const DROPBOX_KEY = 'knggw99gkxo7smp'
const DROPBOX_SECRET = 'u8156v4300r62oc'
const DROPBOX_TOKEN = 'UGnpXODDqyYAAAAAAAANgZsfk11K1MCANyhw1WAzVZciq0oWHzx551HvoR1uOHtx'

let dropboxClient = new Dropbox.Client({
  key: DROPBOX_KEY,
  secret: DROPBOX_SECRET,
  token: DROPBOX_TOKEN
})

async function recursiveReaddir(dir) {
  await dropboxClient.promise.authenticate()

  let files = await readdir(dir)
  let promises = []
  for (let file of files) {
    promises.push(processFile(dir, file))
  }
  return _.flatten(await Promise.all(promises), true)
}

async function processFile(dir, fileName) {
  let ret = []
  if (fileName === '.' || fileName === '..') {
    return ret
  }
  let absolutePath = path.join(dir, fileName)
  if (await isDirectory(absolutePath)) {
    ret.push(await recursiveReaddir(absolutePath))
  } else {
    ret.push(absolutePath)
  }
  return ret
}

async function readdir(dir) {
  if (!isDropbox) {
    return await fs.promise.readdir(dir)
  }
  let [files] = await dropboxClient.promise.readdir(dir)
  return files
}

async function isDirectory(absolutePath) {
  if (!isDropbox) {
    let stat = await fs.promise.stat(absolutePath)
    return stat.isDirectory()
  }
  let [{isFolder}] = await dropboxClient.promise.stat(absolutePath)
  return isFolder
}

recursiveReaddir(argv._[0])
  .then(console.log)
  .catch(e=>console.log(e.stack || e))
