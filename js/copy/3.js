// let obj = {
//     age: 18,
//     name: '张三',
//     like: ['打瓦', '三角洲']
// }

// let oo = Object.assign({}, obj)
// obj.age = 20
// obj.like.push('原神')
// console.log(oo)

let obj = {
    age: 18,
    name: '张三',
    like: ['打瓦', '三角洲']
}

function shallowCopy(obj) {
    let newObj = Array.isArray(obj) ? [] : {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}

let oo = shallowCopy(obj)
obj.age = 20
obj.like.push('原神')
console.log(oo)