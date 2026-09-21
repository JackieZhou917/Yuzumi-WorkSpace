// const arr = [1, 4, 7, 2, 5, 3, 'a']
// arr.sort((a, b) => {
//     return b - a
// })
// console.log(arr)

const arr = [1, 'a', {age: 18}]
// const [x, y, z] = arr
const [x, ...y] = arr
console.log(x, y ,z)