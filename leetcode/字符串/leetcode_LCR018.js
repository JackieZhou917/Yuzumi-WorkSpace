

const str = 'A man, a plan, a canal: Panama'

var isPalindrome = function(s) {
    // 匹配所有非字母数字，替换为空
    const reg = /[^A-Za-z0-9]/g
    s = s.replace(reg, '')
    s = s.toLowerCase()
    let i = 0, j = s.length - 1
    while(i < j){
        if(s[i] !== s[j])
            return false
        i++
        j--
    }
    return true
};
console.log(isPalindrome(str))