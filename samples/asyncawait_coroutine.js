let fs = require('fs')
require('songbird')
// let bluebird = require('bluebird')

async function main() {
  let data
  try {
    data = await fs.promise.readFile('asdf')
  } catch(e) {
    data = await fs.promise.readFile(__filename)
  }

  console.log(String(data))
}

main()
console.log("1")

