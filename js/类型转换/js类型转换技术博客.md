## 前言

> 学习 JavaScript 类型转换时，有些表达式的结果很容易让人疑惑：<br>
> **为什么 [] == ![] 的结果是 true？**<br>
> **为什么 [] + {} 得到的却是字符串？**

下面我将从显式转换讲起，再用这些规则详细拆解整个转换过程。

## 一、 == VS ===

== 在判断是否相等的过程中可能发生隐式类型转换，而 === 不会。用两组相同的操作数对照来看：

```js
console.log(1 == '1') // true
console.log(0 == false) // true
```

使用 == 时，字符串 '1' 和布尔值 false 分别转换为数字 1 和 0，因此两次比较都得到 true。

```js
console.log(1 === '1') // false
console.log(0 === false) // false
```

换成 === 后，数字与字符串、数字与布尔值的类型不同，两次比较都直接得到 false。

## 二、显式类型转换

显式转换，就是主动调用 String()、Number()、Boolean()。它们对应的规范规则如下：

| 调用方式 | 对应规则 | 转换目标 |
| --- | --- | --- |
| String(x) | ToString(x) | 字符串 |
| Number(x) | ToNumber(x) | 数字 |
| Boolean(x) | ToBoolean(x) | 布尔值 |

### 2.1 ToPrimitive：将引用类型转为一个原始值

对象转字符串、转数字，都需要先经过 ToPrimitive。它是规范中描述转换过程的抽象操作，作用是取得一个原始值，供后续转换使用。

ToPrimitive(O, hint) 中，O 是待转换的值，hint 是转换时的类型提示。如果输入已经是原始值，就直接返回；如果是对象，则需要尝试获取它的原始值。

![ToPrimitive.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2441b86155164a8ebb3315d2ea29d92e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5p-aeXV6dW1p:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzY2MDcxMjEyMzU3NjMzMSJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1789484357&x-orig-sign=rD9hPd7qRyoGuR%2Fv1EK%2FqgZi3bE%3D)

**hint 决定方法的尝试顺序，不决定最终返回值的类型。** 按照下图的规则，两种提示对应的顺序如下：

| 类型提示 | 先尝试 | 再尝试 |
| --- | --- | --- |
| String | toString() | valueOf() |
| Number | valueOf() | toString() |

每一步都先检查方法是否可调用。可以调用就检查返回值：得到原始值，立即结束；仍是对象，就继续尝试下一个方法。两种方法都无法提供原始值，才抛出 TypeError。

这里有两个方法需要分清：

**toString()** 的返回结果取决于调用它的值：

```scss
1. {}.toString()   // 返回 [object Object]
2. [].toString()   // 返回数组内部的元素以逗号拼接得到的字符串
3. 其他xx.toString()   // 返回xx的字符串表示: 'xx'(直接用引号引起来)
```

**valueOf()**：数字、字符串、布尔值的包装对象可以通过它取出原始值；普通对象和数组默认返回自身，因此还需要继续尝试 toString()。

例如，对普通对象使用 Number 提示，先调用 valueOf() 得到的仍是对象，再调用 toString() 得到字符串 "[object Object]"。这个字符串已经是原始值，ToPrimitive 的工作便结束了；是否继续转成数字，要看后续的 ToNumber。

没有提供 hint 时，通常按 Number 处理；Date 对象按 String 处理。下面是对应规则的中文说明：

![ToPrimitive8.12.8翻译.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/353ee704fe2547049a16ad517b336398~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5p-aeXV6dW1p:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzY2MDcxMjEyMzU3NjMzMSJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1789484415&x-orig-sign=eD4jyvSq2Ct%2FjNaHPVP8k1Q37sc%3D)

### 2.2 转字符串：对象需要先得到一个原始值

先看几个直接的转换：

```js
console.log(String()) // ''
console.log(String(undefined)) // 'undefined'
console.log(String(null)) // 'null'
console.log(String(true)) // 'true'
console.log(String(false)) // 'false'   
console.log(String(0)) // '0'
console.log(String(NaN)) // 'NaN'
console.log(String(Infinity)) // 'Infinity'
```

String() 不传参数会得到空字符串；上面的其他原始值则转换为对应的字符串表示。

引用类型转字符串时，先执行带有 String 提示的 ToPrimitive，再把得到的原始值交给 ToString。


![ToString.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/01dd29c84818404b8208507c82ff86a0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5p-aeXV6dW1p:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzY2MDcxMjEyMzU3NjMzMSJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1789483290&x-orig-sign=P2D3jDQF9jOfUDq%2By1%2B4zTP%2F37g%3D)

以普通对象 {a: 1} 为例：

1. String() 按 ToString 规则处理对象，先执行带有 String 提示的 ToPrimitive。
2. 优先调用 toString()，得到原始值 "[object Object]"，不再尝试 valueOf()。
3. 将这个原始值交给 ToString；它已经是字符串，直接返回。

### 2.3 转数字：先取得原始值，再执行 ToNumber

```js
console.log(Number(undefined)) // NaN
console.log(Number(null)) // 0
console.log(Number(true)) // 1
console.log(Number('000123')) // 123
console.log(Number('000123a')) // NaN
```

这里有两处值得留意：null 转数字得到 0，undefined 得到 NaN；字符串也必须整体符合数字格式，不能只看开头是不是数字。


![ToNumber.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3555022b569d44b98c66d613e9c015d7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5p-aeXV6dW1p:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzY2MDcxMjEyMzU3NjMzMSJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1789484285&x-orig-sign=iHOA9SNMlRb8nQkVI0R8usOk%2BSQ%3D)

引用类型转数字时，先执行带有 Number 提示的 ToPrimitive，再对结果执行 ToNumber。仍以普通对象 {a: 1} 为例：

1. 优先调用 valueOf()，返回对象自身，继续尝试。
2. 调用 toString()，得到原始值 "[object Object]"。
3. ToNumber 将这个字符串转成数字；它不符合数字格式，结果为 NaN。

因此，对象转字符串和转数字时，不仅尝试方法的顺序不同，拿到原始值之后要执行的转换也不同。

### 2.4 转布尔值：空数组也是 true

对象转布尔值不经过 ToPrimitive，引用类型都转为 true。 空数组、空对象也一样。

在图中列出的类型里，undefined、null、false、+0、-0、NaN 和空字符串会得到 false。


![ToBoolean.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a1e19c370db34e7b94e9e20fd50b9b37~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5p-aeXV6dW1p:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzY2MDcxMjEyMzU3NjMzMSJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1789484455&x-orig-sign=NV%2BNgD9AFG2DEPuYy7TL3yfGIvI%3D)

```js
console.log(Boolean('')) // false
console.log(Boolean('0')) // true
console.log(Boolean('false')) // true
```

字符串判断的是是否为空。'0' 和 'false' 都有内容，所以结果都是 true。

## 三、隐式类型转换

隐式转换发生在运算或判断过程中，具体转换目标由当前操作决定：

- if、while 的条件按布尔值判断；! 先转布尔值，再取反。
- -、*、/、% 涉及数字运算；+ 还可能进行字符串拼接。
- ==、!= 及大小比较可能涉及转换，但不能一概理解为“两边都转数字”。
- switch 匹配 case 使用严格相等，不进行隐式类型转换。

### 3.1 一元 +：转成数字

```js
console.log(+[])  // 0
```

一元 + 要求数字，因此空数组先按 Number 提示转换为原始值：

1. valueOf() 返回数组自身，仍然是对象。
2. 继续调用 toString()，得到空字符串 ""。
3. 空字符串再转成数字 0。

### 3.2 二元 +：先得到原始值，再决定拼接还是相加

对于 x + y，规则分为两步：

1. 两边分别执行不带 hint 的 ToPrimitive。
2. 只要有一边是字符串，就都转成字符串后拼接；否则转数字后相加。

[[+.png]]

```js
console.log([] + {}) // "[object Object]"
```

数组和普通对象的 valueOf() 都返回自身，接着尝试 toString()：左边得到 ""，右边得到 "[object Object]"。此时进行字符串拼接，结果自然就是 "[object Object]"。

### 3.3 回到 [] == ![]：逐步看清转换

```js
console.log([] == ![])  // true
```

在这个表达式中，! 比 == 优先执行。右边的空数组先转成 true，取反后得到 false。

后续转换如下：

| 当前表达式 | 下一步 |
| --- | --- |
| [] == false | 布尔值 false 转成数字 0 |
| [] == 0 | 数组转成原始值，得到空字符串 |
| '' == 0 | 空字符串转成数字 0 |
| 0 == 0 | 比较结果为 true |

左右两边虽然都是空数组，参与的操作却不同：右边先做布尔转换并取反，左边在相等比较中先转成原始值。沿着执行顺序看，每一步都有对应的转换规则。

