const str = 'hello'

// console.log(str[1])
// console.log(str.charAt(1))
// console.log(str.slice(1, 3))
// console.log(str.startsWith('he'))
// console.log(str.endsWith('o'))

// const user = ' admin '
// const newUser = user.trimStart()
// const newUser = user.trimEnd()
// const newUser = user.trim()
// console.log(newUser)

const arr = str.split('')
const rArr = arr.toReversed()
const newStr = rArr.join('')
console.log(newStr)