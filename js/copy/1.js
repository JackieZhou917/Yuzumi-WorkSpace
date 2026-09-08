// 循环公式
// function mul(n) {
//     let res = 1
//     for (let i = n; i > 0; i--) {
//         res = res * i
//     }
//     return res
// }
// console.log(mul(5))

// 递归公式
// function mul(n) {
//     if (n == 1) {
//         return 1
//     }
//     return n * mul(n - 1)
// }
// console.log(mul(5))

function fb(n) {
    if (n == 1) {
        return 1
    }
    if (n == 2) {
        return 1
    }
    return fb(n - 1) + fb(n - 2)
}
console.log(fb(10))