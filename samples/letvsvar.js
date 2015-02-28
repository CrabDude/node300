// Comparing semantics of let vs var

// true, false, false
var foo  = true
if (true) {
  console.log(foo)
  var foo  = false
  console.log(foo)
}
  console.log(foo)

// undefined, false, true
var bar  = true
if (true) {
  console.log(bar)
  var bar  = false
  console.log(bar)
}
  console.log(bar)
