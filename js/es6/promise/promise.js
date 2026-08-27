function Promise(func) {
    this.state = 'pending'   //准备状态
    this.arr = [foo]

    const resolve = () => {
        this.state = 'resolved'   //成功状态
        // foo()
    }
    const reject = () => {
        this.state = 'rejected'   //失败状态
    }

    func(resolve, reject)
}

new Promise((resolve, reject) => {
    resolve()
})