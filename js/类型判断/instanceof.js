function myInstanceof(l, r) {
    if((typeof l !== 'object' && typeof l !== 'function') || l == null)
        return false

    while(l !== null) {
        if(l.__proto__ === r.prototype)
            return true
        l = l.__proto__

    }
    return false
}

console.log(myInstanceof('hello', String))