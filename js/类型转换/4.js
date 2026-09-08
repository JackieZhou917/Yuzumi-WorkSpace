console.log(+[])  // 0

console.log([] + {}) // "[object Object]"

console.log([] == ![])  // true
// ! 的优先级高，先将 ! 后面的转为Boolean类型，再取反
// 1. [] == ![]
// 2. [] == !true
// 3. [] == false
// 4. [] == 0
// 5. '' == 0
// 6. 0 == 0
// 7. true
