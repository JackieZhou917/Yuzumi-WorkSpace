# JavaScript 事件循环：写在前面的代码，为什么反而后执行？

> 学习 JavaScript 异步执行时，常会碰到这几个问题：
>
> **“setTimeout 的延迟设为 0，为什么还不能马上执行？”**
>
> **“Promise.then 和定时器，谁先执行？”**
>
> **“await 等待结果时，会不会把整个脚本卡住？”**

这些问题都与事件循环（Event Loop）有关。代码的执行顺序，不只取决于写在哪里，还取决于它在什么时候、以什么任务进入队列。

## 一、单线程与任务队列

JavaScript 在主线程上依次执行代码。它能够操作 DOM，如果多个线程同时修改页面，就可能产生冲突；引入锁又会增加协调成本。

执行脚本时，同步代码直接运行。定时器到时、异步操作完成后，相应回调再等待调度。这里主要涉及两类任务：

- **宏任务**：整段 script、定时器回调等。
- **微任务**：Promise.then 的回调、await 之后恢复执行的代码等。

定时器的等待不会占住主线程，但它的回调也不会在计时结束时立刻打断当前代码。

## 二、事件循环的执行顺序

1. 执行当前宏任务，包括其中的同步代码。
2. 清空微任务队列，执行期间新增的微任务也要继续处理。
3. 浏览器根据需要进行页面渲染。
4. 执行下一个宏任务，重复上述过程。

**每个宏任务结束后，都要先清空微任务队列，再执行下一个宏任务。**

主线程上的 JavaScript 执行和页面渲染不能同时进行。因此，当前代码执行时间过长，页面渲染也会被推迟。

## 三、Promise 与定时器

```js
console.log(1);

new Promise((resolve) => {
  console.log(2);
  resolve()
}).then(() => {
  console.log(3);
  setTimeout(() => {
    console.log(4);
  }, 0)
})

setTimeout(() => {
  console.log(5);
}, 1000)

console.log(6);
```

输出顺序：

```text
1
2
6
3
4
5
```

执行过程：

1. 同步执行整段脚本，输出 1、2、6。Promise 构造器中的回调也是同步执行的。
2. 当前脚本结束，执行 then 微任务，输出 3，并注册一个 0ms 定时器。
3. 在这个例子中，0ms 定时器先满足执行条件，输出 4；1000ms 定时器随后输出 5。

两个定时器分别计时，并不是先写的就一定先执行。延迟为 0 也不表示立即执行：回调仍要等当前任务和微任务处理完，才有机会运行。

## 四、嵌套任务的执行顺序

定时器回调内部，也可能产生新的微任务和宏任务：

```js
console.log(1);

setTimeout(() => {
    console.log(2);

    new Promise((resolve) => {
        console.log(3);
        resolve()
    }).then(() => {
        console.log(4);
        setTimeout(() => {
            console.log(6);
        }, 0)
    })

    setTimeout(() => {
        console.log(5);
    }, 0)
}, 1000)

console.log(6);
```

输出顺序：

```text
1
6
2
3
4
5
6
```

1. 整段脚本先输出 1、6。这里的第一个 6 来自末尾的同步代码。
2. 外层定时器执行，输出 2、3，安排 then 微任务，并注册输出 5 的定时器。
3. 外层定时器回调结束，先执行微任务，输出 4，再注册输出 6 的定时器。
4. 两个内部定时器的延迟都是 0，输出 5 的先注册，因此先输出 5，再输出 6。

微任务检查并不只发生在最初的 script 结束时，定时器回调结束后也一样。

## 五、async / await

### 5.1 async 的返回值

函数加上 async 后，调用结果总是一个 Promise，即使函数没有显式 return 也是如此。

async 可以单独使用，不一定要写 await；在函数体内使用 await 时，该函数需要声明为 async。加上 async 也不意味着函数里的代码全都异步执行：调用函数后，遇到 await 之前的代码仍然同步执行。

### 5.2 await 的执行过程

对于 await 后面的函数调用，可以分两步看：

1. **先执行调用**：函数中的同步代码立即执行，不会因为前面有 await 就被推迟。
2. **再等待结果**：暂停当前 async 函数的后续执行。如果返回的是 Promise，就等待它完成，再通过微任务继续执行 await 之后的代码。

由于上述机制，await 后面紧跟的表达式（即 await xxx 中的 xxx）可以按同步代码理解：先执行、先求值；await 语句之后的代码，则在结果就绪后通过微任务恢复执行。

这与 then 回调有相似之处：等待结果就绪后，后续逻辑通过微任务执行。等待期间，函数外部的同步代码会继续运行。

### 5.3 await 与函数返回值

函数内部有定时器，并不代表 await 就会等到定时器结束：

```js
function A() {
  setTimeout(() => {
    console.log('a');
  }, 1000)
}
function B() {
  console.log('b');
}

async function fn() {
  await A()
  await B()
}
fn()
```

输出顺序：

```text
b
a
```

A() 注册定时器后就执行结束，返回值是 undefined。await 可以等待这个普通值，后续代码仍会通过微任务恢复，于是 B() 先输出 b；约一秒后，定时器回调才输出 a。

**要等待某个异步操作完成，函数需要返回一个能表示该操作完成的 Promise。** await 等待的是函数的返回结果，不会自动等待函数内部另外启动的定时器。

### 5.4 完整执行顺序

```js
console.log('script start');
async function async1() {
  await async2()
  console.log('async1 end');
}
async function async2() {
  console.log('async2 end');
}
async1()
setTimeout(() => {
  console.log('setTimeout');
}, 0)
new Promise((resolve, reject) => {
  console.log('promise');
  resolve()
})
  .then(() => {
    console.log('then1');
  })
  .then(() => {
    console.log('then2');
  });
console.log('script end');
```

输出顺序：

```text
script start
async2 end
promise
script end
async1 end
then1
then2
setTimeout
```

1. 输出 script start，调用 async1。执行到 await async2() 时，先调用 async2，同步输出 async2 end。
2. async2 没有写 return，但它是 async 函数，因此返回一个已完成的 Promise。async1 暂停，async1 end 等待微任务阶段再输出。
3. 外部脚本继续执行：注册定时器，执行 Promise 构造器中的回调，输出 promise，最后输出 script end。
4. 同步代码结束，开始清空微任务队列。先恢复 async1，输出 async1 end，再输出 then1。随后 then2 回调进入微任务队列，也在这一阶段执行。
5. 微任务队列清空后，定时器回调执行，输出 setTimeout。
