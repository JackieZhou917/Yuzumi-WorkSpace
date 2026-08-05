# 面试官问：这些 console.log 输出什么？一次搞懂 JavaScript 预编译

假如面试官把下面这段代码放到你面前，问你 `console.log(a)` 会输出什么，你能答上来吗？

```js
var a = 1;
function fn() {
    var a = 2;
    function a() {

    }
    console.log(a);
}
fn();
```

是外面的 `1`，里面的 `2`，还是 `function a() {}`？

最终答案是：

```text
2
```

想要真正弄清楚这个结果，不能只盯着代码的书写顺序，还要知道 JavaScript 在代码执行之前做了什么。

## 一、V8 引擎是怎么工作的

V8 引擎执行 JavaScript 代码，大致会经历三个阶段：

1. 分词：把代码拆分成关键字、变量名、运算符等一个个词法单元。
2. 语法分析：根据语法规则分析这些词法单元，生成 AST，也就是抽象语法树。
3. 代码生成：根据 AST 生成可以执行的代码。

在代码正式执行之前，JavaScript 还会进行预编译，提前处理变量声明、形参和函数声明。

预编译分为两种情况：

- 函数执行之前，进行函数体内的预编译。
- 全局代码执行之前，进行全局的预编译。

## 二、函数体内的预编译流程

函数体内的预编译流程如下：

1. 创建一个执行上下文 AO: {}
2. 找形参和变量声明，将形参和变量名作为属性名，添加到 AO 中，值为 undefined
3. 将形参和实参统一，将实参值赋给形参
4. 在函数体内找函数声明，将函数名作为 AO 中的属性名，函数体作为属性值

下面结合代码分析这四个步骤：

```js
function fn(a) {
    console.log(a);
    var a = 123;
    console.log(a);
    function a() {}
    var b = function b() {}
    console.log(b);
    function c() {}
    var c = a;
    console.log(c);
}

fn(1);
```

调用 `fn(1)` 时，不会立即执行函数体，而是先按照上面的流程进行预编译。

第一步，创建执行上下文：

```text
AO = {}
```

第二步，找到形参 `a` 和变量声明 `a`、`b`、`c`，将它们添加到 AO 中。同名属性只添加一次：

```text
AO = {
    a: undefined,
    b: undefined,
    c: undefined
}
```

第三步，将形参 `a` 和实参 `1` 统一：

```text
AO = {
    a: 1,
    b: undefined,
    c: undefined
}
```

第四步，在函数体内找到函数声明 `a` 和 `c`，将函数体作为对应的属性值：

```text
AO = {
    a: function a() {},
    b: undefined,
    c: function c() {}
}
```

预编译结束后，函数体才开始从上到下执行：

| 执行的代码 | 结果 |
| --- | --- |
| `console.log(a)` | `a` 已被同名函数覆盖，输出 `[Function: a]` |
| `var a = 123` | 将 `123` 赋给 `a` |
| `console.log(a)` | 输出 `123` |
| `var b = function b() {}` | 将函数赋给变量 `b` |
| `console.log(b)` | 输出 `[Function: b]` |
| `var c = a` | 将 `a` 当前的值 `123` 赋给 `c` |
| `console.log(c)` | 输出 `123` |

因此，完整输出为：

```text
[Function: a]
123
[Function: b]
123
```

关键点在于：`var a = 123` 在预编译阶段只处理变量声明，`a = 123` 要等到代码执行时才会发生；函数声明则会在预编译阶段直接覆盖 AO 中的同名属性。

## 三、全局的预编译流程

全局的预编译流程如下：

1. 创建一个全局上下文 GO: {}
2. 找全局变量声明，将全局变量名作为属性名，添加到 GO 中，值为 undefined
3. 找全局函数声明，将全局函数名作为 GO 的属性名，函数体作为属性值

下面结合一个同时包含全局变量和局部变量的例子分析这三个步骤：

```js
var a;
var b = 2;
function a() {
    console.log(a);
    var c = 3;
    var a = b;
    function c() {}
    console.log(c);
}

a();
console.log(a);
```

全局代码执行前，会先按照上面的流程进行全局预编译。

第一步，创建全局上下文：

```text
GO = {}
```

第二步，找到全局变量声明 `a` 和 `b`，将它们添加到 GO 中：

```text
GO = {
    a: undefined,
    b: undefined
}
```

第三步，找到全局函数声明 `a`，将函数体作为属性值：

```text
GO = {
    a: function a() {},
    b: undefined
}
```

全局预编译结束后，执行 `var b = 2`，GO 中的 `b` 变为 `2`。接着调用 `a()`，函数内部再次进行预编译：

```text
AO = {
    a: undefined,
    c: function c() {}
}
```

随后逐行执行函数体：

| 执行的代码 | 结果 |
| --- | --- |
| `console.log(a)` | AO 中的局部变量 `a` 为 `undefined`，输出 `undefined` |
| `var c = 3` | 将局部变量 `c` 修改为 `3` |
| `var a = b` | 从 GO 中取得 `b = 2`，赋给局部变量 `a` |
| `console.log(c)` | 输出 `3` |

函数执行完毕后，GO 中的全局变量 `a` 仍然是函数，所以最后的 `console.log(a)` 输出 `[Function: a]`。

完整输出为：

```text
undefined
3
[Function: a]
```

分析这类代码时，可以先画出全局的 GO；遇到函数调用，再画出函数的 AO；最后按照代码顺序更新其中的值。这样无论变量声明和函数声明以什么顺序出现，都能准确判断 `console.log` 的结果。
