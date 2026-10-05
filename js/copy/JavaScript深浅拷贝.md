# JavaScript 深浅拷贝：复制了一份，怎么还会一起变？

> 学习 JavaScript 的对象拷贝时，很容易遇到这些疑问：
>
> **“明明复制了一个对象，为什么改了副本，原对象也跟着变？”**
>
> **“为什么修改数字属性时互不影响，修改对象里的数组时却会一起变化？”**
>
> **“浅拷贝和深拷贝，究竟差在哪里？”**

区别在于内部的对象和数组是否也被复制。浅拷贝只复制外层，深拷贝则会逐层复制嵌套数据。

## 一、浅拷贝

### 1.1 Object.assign

```js
let obj = {
    age: 18,
    name: '张三',
    like: ['打瓦', '三角洲']
}

let oo = Object.assign({}, obj)
obj.age = 20
obj.like.push('原神')
console.log(oo)
```

输出结果：

```text
{ age: 18, name: '张三', like: [ '打瓦', '三角洲', '原神' ] }
```

- age 是原始值。修改原对象的 age，副本仍保留 18。
- like 是数组。浅拷贝复制的是它的引用，两个对象指向同一个数组，所以新增的“原神”也会出现在副本中。

**外层对象已经分开，内部数组仍然共享。** 数组的 slice(0) 同样是浅拷贝：得到新数组，但内部的对象或数组仍共享引用。

### 1.2 手写浅拷贝

```js
function shallowCopy(obj) {
    let newObj = Array.isArray(obj) ? [] : {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}
```

这段代码做了三件事：

1. 根据输入创建空数组或空对象。
2. 用 hasOwnProperty 筛选对象自身的属性。
3. 把属性值直接赋给新对象，不继续复制内部数据。

用 shallowCopy(obj) 替换前面的 Object.assign({}, obj)，再执行相同的修改，结果一致。

## 二、递归实现深拷贝

深拷贝会逐层复制子对象，让副本中的嵌套对象也拥有新的引用。

```js
let obj = {
    age: 18,
    name: '张三',
    like: {
        n: '打瓦',
        m: '三角洲',
        y: {
            a: '原神'
        }
    }
}

function deepCopy(obj) {
    let newObj = {}
    for(let key in obj){
        if(obj.hasOwnProperty(key)) {
            if(Object.prototype.toString.call(obj[key]).slice(8, -1) === 'Object')
                newObj[key] = deepCopy(obj[key])
            else
                newObj[key] = obj[key]
        }
    }
    return newObj
}

let oo = deepCopy(obj)
obj.age = 20
obj.like.n = '原神'
console.log(obj)
console.log(oo)
```

依次输出原对象和副本：

```text
{
  age: 20,
  name: '张三',
  like: { n: '原神', m: '三角洲', y: { a: '原神' } }
}
{
  age: 18,
  name: '张三',
  like: { n: '打瓦', m: '三角洲', y: { a: '原神' } }
}
```

副本的 age 和 like.n 都保留了原值。递归过程中，like 和它内部的 y 都会被重新创建。

理解递归，可以抓住两点：

1. **找公式**：属性值的类型标签为 Object 时，继续调用 deepCopy。
2. **找出口**：不满足这个条件时，直接赋值，不再向下递归。

> 这份实现只处理示例中的普通对象嵌套。数组不会进入递归分支，仍然会共享引用，因此它不是适用于所有数据的深拷贝函数。

## 三、其他深拷贝方式

### 3.1 JSON 序列化

JSON.stringify 将对象转换为 JSON 字符串，JSON.parse 再把字符串解析为新对象。这种方式可用于能被 JSON 正确表示的普通对象数据。

但对象中的 undefined、函数和 BigInt 不能按原样复制：

```js
let obj = {
    b: undefined,
    e: function() {},
    f: 123n
}

let str = JSON.parse(JSON.stringify(obj))
```

运行结果：

```text
TypeError: Do not know how to serialize a BigInt
```

这里会在 JSON.stringify 阶段因 BigInt 报错。即使去掉 f，对象中的 b 和 e 也会被省略，无法保留在副本中。

### 3.2 structuredClone

structuredClone(obj) 也是深拷贝方式，但不支持函数。选择拷贝方法前，需要确认对象中包含哪些类型的数据。
