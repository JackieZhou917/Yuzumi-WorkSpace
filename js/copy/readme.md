# 递归
1. 找公式
2. 找出口

# 拷贝
克隆一份原对象，得到一份新对象

## 浅拷贝：
1. Object.assign({}, obj)
2. [].slice(0)
3. function shallowCopy(obj) {
    let newObj = Array.isArray(obj) ? [] : {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}

## 深拷贝
将原对象中的所有子对象，层层拷贝，引用地址都是全新的
1. JSON.parse(JSON.stringify(obj))  // 可以拷贝普通对象，不能拷贝 function、undefined、BigInt
2. structuredClone(obj)  // 不能拷贝 function
3. function deepCopy(obj) {
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