function match() {
    // Promise 内部拥有一个状态, 值初始为pending state = pending
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('相亲失败')
            reject('no')
        }, 2000)
    })
    
}

function marry() {
    setTimeout(() => {
        console.log('结婚了')
    }, 1000)
}

match()
.then(() => {
    marry()
})
.catch((err) => {
    console.log(err, '可惜')
})
