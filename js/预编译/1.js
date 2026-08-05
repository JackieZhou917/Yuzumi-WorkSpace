// console.log(a);
// var a = 1;


// 声明提升:将变量声明提升到当前作用域顶部
// var a;
// console.log(a);
// a = 1;

// ======================================
var a = 1;
function fn() {
    var a = 2;
    function a() {

    }
    console.log(a);
}
fn();