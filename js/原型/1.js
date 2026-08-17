Array.prototype.abc = function () {
    console.log('abc')
}

const arr = []
arr.unshift(1)
arr.abc()

// const num = 123
// num.unshift(0)