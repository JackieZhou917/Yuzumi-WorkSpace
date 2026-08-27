let a = null

function A() {
    // 向后端请求数据，耗时 1s
    setTimeout(() => {
        a = 100
        B()  // 回调
    }, 1000)
}

function B() {
    // 将得到的数据渲染在页面上
    console.log(a)
}

A()
