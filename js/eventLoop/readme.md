# js 线程
1. 默认只启用一个线程执行

2. 代码中一定会有耗时任务 (定时器，http 请求)和不耗时任务

3. 为什么不设计成多线程？:
    - 因为 js 能操作 DOM 结构，多线程运行可能会造成不安全的渲染
    - 多线程就需要锁，增加了难度，增加了设备性能开销

# 任务
1. 耗时任务 (异步任务) 被 存放到队列中，先执行不耗时 (同步任务)

 - 异步任务：
   1. 宏任务: <script></script>, setTimeout(), setInterVal(), ajax, I/O, UI-rendering(页面渲染)
   2. 微任务: promise.then(), process.nextTick(), MutationObserver()

# setTimeout()
所有的 setTimeout 共用同一份时间，先进宏任务队列的不一定先执行，而是根据 计时时间长短来决定是否先执行，计时时间短的会先执行

# js引擎线程 和 渲染线程
1. 这两个线程是互斥的，无法同时运行

# 事件循环机制
1. 先执行同步任务(属于宏任务，script属于宏任务)，这个过程中，遇到异步就存入对应的队列中
2. 去微任务队列中查找微任务，并将微任务取出来执行
3. 有需要的情况下，就渲染页面
4. 去宏任务队列中查找宏任务，并将宏任务取出来执行  (也是下一次循环的开始)

# async/await
- 函数前面加 async 等同于函数内部 return 了一个 promise 对象
- await: await 后面的代码内部要会返回一个 Promise 对象才有用
    1. await xxx xxx 看成同步来执行
    2. await 会将它后续的代码挤入微任务队列
- async可以单独出现，await 必须搭配 aysync使用