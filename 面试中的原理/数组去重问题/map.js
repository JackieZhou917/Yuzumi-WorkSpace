// const arr = [1, 3, 4, 2, 3, 4]

// const arr2 = arr.map((item) => item * 2)
// console.log(arr2)

// const aa = {}
// const obj = {
//   'a': 1,
//   5: 2,
//   [aa]: 3,
// }
// console.log(obj)


const obj = {a: 1}
const m = new Map()
m.set(1, 1)
m.set('1', 2)
m.set(obj, 3)
const values = m.values()
const keys = m.keys()
// console.log([...keys], [...values])
console.log()
