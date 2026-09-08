console.log(String()) // ''

console.log(String(undefined)) // 'undefined'
console.log(String(null)) // 'null'

console.log(String(true)) // 'true'
console.log(String(false)) // 'false'   

console.log(String(0)) // '0'
console.log(String(NaN)) // 'NaN'
console.log(String(Infinity)) // 'Infinity'

// =======================================
console.log(Number()) // 0

console.log(Number(undefined)) // NaN
console.log(Number(null)) // 0

console.log(Number(true)) // 1
console.log(Number(false)) // 0

console.log(Number('123')) // 123
console.log(Number('-123')) // -123
console.log(Number('123.456')) // 123.456
console.log(Number('000123')) // 123
console.log(Number('000123a')) // NaN
console.log(Number(Infinity)) // Infinity

// =======================================
console.log(Boolean()) // false

console.log(Boolean(undefined)) // false
console.log(Boolean(null)) // false
console.log(Boolean(0)) // false

console.log(Boolean('')) // false
console.log(Boolean('0')) // true
console.log(Boolean('false')) // true
console.log(Boolean('true')) // true
console.log(Boolean(123)) // true
console.log(Boolean(NaN)) // false
console.log(Boolean(Infinity)) // true







