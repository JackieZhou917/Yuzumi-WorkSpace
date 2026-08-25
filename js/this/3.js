// function foo() {
//     console.log(this);
    
// }
// var obj = {
//     a: 1,
//     foo: foo  // 引用地址
// }

// obj.foo()

function foo() {
    console.log(this.a);
    
}
var obj = {
    a: 1,
    foo: foo
}

var oo = {
    a : 2, 
    foo: obj
}
oo.foo.foo()
// 就近原则
