let argv = require('yargs').argv;
let util = require('util')
function foo(options) {
  options = Object.create(options)
  options.value = options.value || true
  console.log(options.value, options.a)
}

console.log(argv.value, argv.a)
foo(argv)
console.log(argv.value, argv.a)

console.log('do something else')
