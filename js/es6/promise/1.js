let a = 1   // 同步任务

setTimeout(() => {   // 异步任务, 先挂起, 执行后面的代码
    a = 2
}, 1000)

console.log(a);
