let fs = require('fs')
require('songbird')
// let bluebird = require('bluebird')

console.log(__filename, __dirname)
async function main() {
  console.log(1)
  try {
    // let data = await bluebird.any([
    let data = await Promise.all([
      fs.promise.readFile(__filename),
      fs.promise.readFile(__filename),
      fs.promise.readFile(__filename),
      fs.promise.readFile(__filename)
    ])
    console.log(3)
  } catch (e) {
    console.log(e.stack)
  }
}

// function mainCb() {
//   fs.readFile(__filename, (err, data) => {
//     console.log(3)
//   })
//   console.log(1)
// }

console.log(0)
main()
console.log(2)


