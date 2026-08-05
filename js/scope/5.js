

// console.log(a);

// let a = 1;

// if (true) {
//     let b = 2;
//     var c = 3;
// }

// console.log(c);

// for (var i = 0; i < 1; i++){
//     let a = 10;
// }

// console.log(i);

var a = 100;
if (true){ // 暂时性死区
    console.log(a);
    let a = 10;
}
console.log(a);

let a = 10;