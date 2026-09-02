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

console.log(obj instanceof Object)
console.log(arr instanceof Array)
console.log(fn instanceof Function)
console.log(s instanceof String)
console.log(num instanceof Number)
console.log(f instanceof Boolean)
console.log(u instanceof Undefined)   // 报错：Null 和 Undefined 没有构造函数
console.log(n instanceof Null)
console.log(sy instanceof Symbol)
console.log(big instanceof BigInt)

