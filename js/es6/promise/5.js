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
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('结婚了')
            resolve()
        }, 1000)
    })
}

function baby() {
    console.log('baby出生')
}

// match()
// .then((res) => {
//     console.log(res)
//     marry().then(() => {
//         baby()
//     })
// })
// .catch((err) => {
//     console.log(err, '可惜')
// })

match()
.then(() => {
    return marry()
})
.then(() => {
    baby()
})
