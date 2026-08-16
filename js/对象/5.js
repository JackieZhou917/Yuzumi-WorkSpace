// const str = 'hello'     //字符串字面量  new String('hello')

// str.name = 'qiqi'       // str.name = 'qiqi'
//                         // delete str.name
//                         // str.[[PrimitiveValue]]
// console.log(str.name);  // undefined


// var num = 123       // new Number(123)
// num.len = 3         // num.len = 3; delete num.len
// console.log(num);   // console.log(num.[[PrimitiveValue]])

var str = 'abc'        // new String('abc')
str.length = 4         // 
console.log(str.length);
