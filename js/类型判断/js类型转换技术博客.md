# JavaScript 类型判断与转换

JavaScript 的值分为两类：原始类型和引用类型。原始类型包括 `number`、`string`、`boolean`、`null`、`undefined`、`symbol`、`bigint`；引用类型包括 `object`、`array`、`function`、`Date`。

## typeof：先把值归类

`typeof` 既可以作为关键字使用，也可以写成函数形式：

```js
typeof value
typeof(value)
```

它能准确判断除 `null` 外的原始类型；引用类型统一返回 `object`，只有 `function` 能被准确识别为 `function`。

```js
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
```

`typeof(null)` 返回 `object`，原因是 `typeof` 会先把值转为二进制：引用类型的二进制前三位都是 `000`，而 `null` 会被转成一整串 `0`。

[[ToBoolean.png]]

[[ToNumber.png]]

[[ToString.png]]

## instanceof：沿原型链判断

语法是：

```js
value instanceof Constructor
```

它通过隐式原型链查找 `value` 是否隶属于构造函数 `Constructor` 对应的类型，只能判断引用类型，不能判断原始类型。

## Object.prototype.toString：读取内部类型名

直接调用 `Object.prototype.toString(x)` 时，`this` 指向 `Object.prototype`，内部会先执行 `ToObject(this)`，因此最终得到的是 `Object` 对象的类型名。

使用 `Object.prototype.toString.call(x)`，`this` 才会指向 `x`：

```js
function Person() {}
let p = new Date()

console.log(Object.prototype.toString.call(p).slice(8, -1)) // Object
```

当 `x` 为 `undefined` 或 `null` 时，结果分别是 `[object Undefined]` 和 `[object Null]`；其他值会先经过 `ToObject`，再返回 `[object 类型名]`。

[[ToPrimitive.png]]

[[ToPrimitive8.12.8.png]]

[[ToPrimitive8.12.8翻译.png]]

## Array.isArray

判断数组使用 `Array.isArray(x)`：

```js
Array.isArray(x)
```

它专门用于确认一个值是否为数组。

[[+.png]]
