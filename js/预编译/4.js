// GO = {
//     // a: undefined, function a () {},
//     // b: undefined, 2,
// }

var a;
var b = 2;
function a () {
    console.log(a); // undefined
    var c = 3;
    var a = b;
    function c() {}
    console.log(c); // 3
}

// AO = {
//     c: undefined, function c() {}, 3,
//     a: undefined, 2,
// }

a();
console.log(a); // [Function: a]

