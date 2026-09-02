let myname = 'zjj'

function greeting(name) {
    if(typeof(name) == 'string') {
        return `hello, I am ${name}`
    }
    return '请输入字符串类型'
    
}

console.log(greeting({}))

let o = {}
if((typeof(o) == 'object' || typeof(o) == 'function') && o !== null) {
    console.log('o 是一个对象')
}
