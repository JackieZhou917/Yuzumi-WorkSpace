var validPalindrome = function(s) {
    let i = 0, j = s.length - 1
    while(i < j && s[i] === s[j]){
        i++
        j--
    }
    let sleft = s.slice(i+1, j+1)
    let sright = s.slice(i, j)

    // 要么左指针多跳一下
    if(isPalindrome(sleft)){
        return true
    }
    // 要么右指针多跳一下
    if(isPalindrome(sright)){
        return true
    }
    return false
    
}
        
    


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