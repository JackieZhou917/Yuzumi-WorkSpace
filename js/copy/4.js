let obj = {
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

function deepCopy(obj) {
    let newObj = {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)) {
            if(Object.prototype.toString.call(obj[key]).slice(8, -1) === 'Object')
                newObj[key] = deepCopy(obj[key])
            else // 原始值
                newObj[key] = obj[key]
        }
    }
    return newObj
}

let oo = deepCopy(obj)
obj.age = 20
obj.like.n = '原神'
console.log(obj)
console.log(oo)