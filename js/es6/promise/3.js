function match() {
    // Promise 内部拥有一个状态, 值初始为pending state = pending
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('相亲成功')
            resolve('yes')
        }, 2000)
    })
    
}

function marry() {
    setTimeout(() => {
        console.log('结婚了')
    }, 1000)
}

match().then((res) => {
    console.log(res)
    marry()
})

// 1. new Promise()  得到了一个状态为 pending 的对象
// 2. then(foo)  then 会将 foo 存起来
// 3. 时间到达，resolve被触发
// 4. 将 Promise对象内部的状态更改为 resolved 成功,将当初 then 存起来的 foo 函数也触发