function Promise(func) {
    this.state = 'pending'   // 准备状态
    this.arr = [foo]         // 用来存then里的那个箭头函数

    const resolve = () => {
        this.state = 'resolved'   //成功状态
        // foo() 触发then里的箭头函数
    }
    const reject = () => {
        this.state = 'rejected'   //失败状态
    }

    func(resolve, reject)
}

new Promise((resolve, reject) => {
    // 自己要运行的函数()
    resolve()
})