let s = 'hello'
let num = 123
let f = true
let u = undefined
let n = null
let sy = Symbol(1)
let big = 12343242n

let arr = []
let obj = {}
let fn = function() {}

function Person() {}
let p = new Person()


console.log(Object.prototype.toString.call(p).slice(8, -1))
