const str = 'yessey'

function isPalindrome(s) {
    // 双指针思路
    s = s.toLowerCase()
    // 过滤非字母字符
    s = s.replace(/[^A-Za-z0-9]/g, '')
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