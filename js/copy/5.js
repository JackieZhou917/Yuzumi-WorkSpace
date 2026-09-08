let obj = {
    a: 1,
    b: undefined,
    c: [123, 2],
    d: NaN,
    e: function() {},
    f: 123n,
    age: 18,
    name: '张三',
    like: {
        n: '打瓦',
        m: '三角洲',
        y: {
            a: '原神'
        }
    }
}

let str = JSON.parse(JSON.stringify(obj))
obj.like.n = '洗脚'

console.log(str)
