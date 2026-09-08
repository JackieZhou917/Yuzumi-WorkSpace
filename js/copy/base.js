Object.prototype.sports = '网球'

let obj = {
    age: 18,
    name: '张三',
    like: ['打瓦', '三角洲']
}

for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
        console.log(key, obj[key])
    }
}