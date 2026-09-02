# 类型
1. 原始类型：number, string, boolean, null, undefined, symbol, bigint
2. 引用类型：object, array, function, Date

# typeof
1. 用法：当关键字使用，typeof 变量名 或者当函数使用 typeof(变量名)
2. 可以准确判断除了 null 之外的所有原始类型
3. 所有引用类型在 typeof 眼里都是 object,除了function，function 能准确判断

- typeof 是通过将值转为二进制，来判断类型的，二进制前三位是 000 的统一被认为是引用类型。在计算机中，所有引用类型被转为二进制的前三位都是 0 (除了函数 function)，而 null 会被转为一整串 0，所以 typeof(null) 是 object。

# instanceof
1. 用法：变量名 instanceof 大写构造函数
2. 只能判断引用类型，无法判断原始类型

- 它是通过隐式原型链来查找 x 是否隶属于 X 这个类型

# Object.prototype.toString(x)
网址：https://es5.github.io/#x15.2.4.2

1. If the this value is undefined, return "[object Undefined]".
   - 如果 this值是 undefined，返回 "[object Undefined]"。
2. If the this value is null, return "[object Null]".
   - 如果 this值是 null，返回 "[object Null]"。
3. Let O be the result of calling ToObject passing the this value as the argument.
   - 让 O 为 ToObject(this值) 的结果。 const O = ToObject(this)
   - this 指向 Object.prototype
   - O 永远都是 Object对象
4. Let class be the value of the [[Class]] internal property of O.
   - 让 class 为 O 的 [[Class]] 内部属性的值。
   - const class = O.[[Class]]
5. Return the String value that is the result of concatenating the three Strings "[object ", class, and "]".
   - 返回 "[object " + class + "]"。   

# Object.prototype.toString.call(x)
// Object.prototype.toString = function() {
//    const O = ToObject(this)      // this === new Number(123)
//    const class = O.[[class]]     // { [[class]]: Number }
//    return "[object " + class + "]"  // "[object Number]"
// }

1. 如果 this值是 undefined，返回 "[object Undefined]"。
2. 如果 this值是 null，返回 "[object Null]"。
3. 让 O 为 ToObject(this值) 的结果。 const O = ToObject(this)
    - this 指向 x
    - O 可能是 String对象 || Number对象 || Boolean对象 || Object对象
4. 让 class 为 O 的 [[Class]] 内部属性的值。
5. 返回 "[object " + class + "]"。

# Array.isArray(x)
Array.isArray() = function() {}
