const str = 'juejin'

// function reverse(s) {
//     let newStr = ''
//     for(let i = s.length - 1; i >= 0; i--) {
//         // newStr = newStr + s[i]
//         newStr = `${newStr}${s[i]}`
//     }
//     return newStr
// }

// console.log(reverse(str))

const arr = str.split('').reverse()
const newStr = arr.join('')
console.log(newStr)
