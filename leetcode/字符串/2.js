const str = 'yessey'

// function isPalindrome(s) {
//     let newStr = s.split('').reverse().join('')
//     return s === newStr
// }

// function isPalindrome(s) {
//     // 栈的思路
//     const isOddNumber = s.length % 2 == 1 ? true : false
//     if(isOddNumber) {
//         const middleIndex = Math.floor(s.length / 2)
//         s =  s.slice(0, middleIndex) + s.slice(middleIndex + 1)
//     }

//     const stack = []
//     for(let i = 0; i < s.length; i++){
//         if(i < s.length / 2){  // 入栈
//             stack.push(s[i])
//         } else {  // 取栈顶的元素出来对比
//             if(stack.pop() !== s[i]) {
//                 return false
//             }
//         }
//     }
//     return true
// }

function isPalindrome(s) {
    // 双指针思路
    let i = 0, j = s.length - 1
    while(i < j){
        if(s[i] !== s[j])
            return false
        i++
        j--
    }
    return true
}

console.log(isPalindrome(str))