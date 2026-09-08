我们知道，JS中的数据可以分为原始类型和引用类型，而在 JS 中想要判断一个变量的类型又有很多种方法，下面让我带你整理常见的四种判断类型的方法。

# 一、 typeof：常用来判断原始类型

**用法：** `typeof x` 或 `typeof(x)`，返回类型名称字符串。

```js
const a = 'hello'

console.log(typeof a)  // 'string'
console.log(typeof(a))  // 'string'
```
**注意**：对于原始类型，除 `null` 外，`typeof null` 会返回 `'object'`原始类型都能准确判断；对于引用类型，函数能够准确判断会返回 `'function'`，其而对于其他所有引用类型全部返回 `'object'`。

这是因为早期实现中，typeof 是通过将值转为二进制，来判断类型的，二进制前三位是 000 的统一被认为是引用类型。在计算机中，所有引用类型被转为二进制的前三位都是 0 (除了函数 function)，而 null 会被转为一整串 0，所以 typeof(null) 是 object。上述也是typeof通常只用来判断原始类型的主要原因。


## 2. instanceof：判断引用类型

**用法：** `x instanceof X`，`X` 为构造函数。

```js
let arr = []
let s = 'hello'

console.log(arr instanceof Array) // true
console.log(s instanceof String)  // false

function myInstanceof(l, r) {
    if((typeof l !== 'object' && typeof l !== 'function') || l == null)
        return false

    while(l !== null) {
        if(l.__proto__ === r.prototype)
            return true
        l = l.__proto__

    }
    return false
}
```
instanceof的原理如上面的 `myInstanceof` 所示，是根据 `x` 的原型链查找 `X.prototype`，找到返回  `true` ，若顺着原型链一直找直到 `null` 都没有找到 `X.prototype` ，则返回`false`。

也是由于这一特性，**instanceof不能用来判断原始类型**。

## 3. Object.prototype.toString.call(x)：获取类型标签

**用法：** `Object.prototype.toString.call(x)`，返回 `'[object 类型名]'`。

[ES5.1 规范](https://262.ecma-international.org/5.1/#sec-15.2.4.2)中的处理步骤如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/6409f390188c4e74a804505c572da8a5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5p-aeXV6dW1p:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzY2MDcxMjEyMzU3NjMzMSJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1788684236&x-orig-sign=cqIU15eCAf%2BwBZfajn2aWsFm0qI%3D)

**翻译：**

1. 如果 `this` 值是 `undefined`，返回 `'[object Undefined]'`。
2. 如果 `this` 值是 `null`，返回 `'[object Null]'`。
3. 让 `O` 为 `ToObject(this值)` 的结果。
4. 让 `class` 为 `O` 的 `[[Class]]` 内部属性的值。
5. 返回 `'[object ' + class + ']'`。

其中，`ToObject` 将原始值转换为对应的包装对象，已有对象保持不变；`[[Class]]` 是规范中的内部属性，不能在代码里直接读取。

**为什么要用 `call`？**

关键在第 3 步：`ToObject` 处理的是 `this`，而不是传入的参数。

```js
console.log(Object.prototype.toString(123))      // '[object Object]'
console.log(Object.prototype.toString.call(123)) // '[object Number]'
```

直接调用时，`this` 是 `Object.prototype`，因此得到 `'[object Object]'`。使用 `call(123)` 后，`this` 才是 `123`，第 3～5 步可以用下面的伪代码表示：

```text
const O = ToObject(this)     // this 是 123，O 是 Number 包装对象
const tag = O.[[Class]]      // "Number"
return "[object " + tag + "]" // "[object Number]"
```

**只取类型名称：** 用 `slice(8, -1)` 截掉固定的前后缀。

```js
function Person() {}
let p = new Person()

console.log(Object.prototype.toString.call(p).slice(8, -1)) // Object
```

**注意：** 自定义实例得到的是 `Object`，不会返回构造函数名。判断是否属于 `Person`，用 `p instanceof Person`。

## 4. Array.isArray(x)：专门判断数组

**用法：** `Array.isArray(x)`，数组返回 `true`，其他值返回 `false`。

```js
console.log(Array.isArray([])) // true
```
