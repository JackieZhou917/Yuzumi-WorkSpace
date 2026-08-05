// let str = 'hello world';  // string 类型

// let str2 = str + ' js';
// let str2 = `${str} js`


// console.log(str2[0]);
// console.log(str2.at(0));
// console.log(str2.slice(0, 7)); // slice 左闭右开

// =======================================
// let num = 123; // number 类型, 不分浮点型，都是number 类型
// let num2 = num + 0.1;

// console.log(num2.toString());
// console.log(num2 + 'wo');

// let n = 1;
// let m = 'm';
// console.log(Number(m)); // NaN也是Number类型，它是一个值，为NaN

// console.log(9007199254740992 + 1)
// ===================================
// if (true) { // boolean 布尔类型
//     console.log('zjj');
// }

// if (NaN) { // 数字里面只有 0 和 NaN 会被转为false，其他数字都为 true
//     console.log('zjj');
// }

// ============================================
// let u = undefined + '';
// console.log(u);

// ==============================================
// let n = null;
// console.log(n);

// ===========================================
// let b = 9007199254740992n;
// let c = 1231231123n;
// console.log(b + c);

// ================================================
// let a = 1;
// let b = '1';

// console.log(a == b); // 双等号会把两边都转为 number 类型来进行数学判断
// console.log(a === b);

// ==========================================
let s = Symbol('hello')
let p = Symbol('hello')

console.log(s == p);










