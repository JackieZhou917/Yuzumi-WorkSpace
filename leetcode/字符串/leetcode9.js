var isPalindrome = function(x) {
    // 双指针思路
    const str = x.toString()
    let i = 0, j = str.length - 1
    while(i < j){
        if(str[i] !== str[j])
            return false
        i++
        j--
    }
    return true
};