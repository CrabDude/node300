let fs = require('fs')
require('songbird')
// let bluebird = require('bluebird')

async function main() {
  let promise = fs.promise.readFile('asdf')
    .catch(e => fs.promise.readFile(__filename))

  let data = await promise
  console.log(String(data))
}

main()


