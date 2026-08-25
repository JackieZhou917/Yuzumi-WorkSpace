// function foo() {  // 函数声明
//     console.log(this);
// }
// foo();

// var bar = function() {  // 函数表达式
// }
// bar()

// var baz = (x, y) => {  // 箭头函数
//     return x + y
// }
// baz(1, 3)

// var fn = () => {
//     console.log(this.a)
// }
// var obj = {
//     a: 1,
//     fn: fn
// }
// obj.fn()


function foo() {
    var fn = () => {
        this.a = 2
    }
    fn()
}

var obj = {
    a: 1,
    bar: foo
}
obj.bar()
console.log(obj)
