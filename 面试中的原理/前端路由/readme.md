# 路由
描述服务器上的资源的路径

# 前端路由
  - 单页应用
  - 构建浏览器url地址 和 组件之间的映射关系

  - 组件切换，页面不刷新

# 怎么实现更新url地址，页面不刷新
  - hash
    在浏览器眼里，url 后面接 #xxxxxxx 这串值会被认为是一串hash值，而又因为浏览器的url中hash值的变更不会带来页面刷新
    1. 监听 hashchange 事件
    2. 当 url 变更，hashchange 时间会触发，通过 location.hash 获取当前的hash值
    3. 去对应的映射表查找对应的组件并渲染

  - history
     浏览器提供了一个 histoy 对象，用来管理浏览器的历史记录，内部提供了一下方法：
      1. pushState() 向浏览器的历史记录站中添加一条记录
      2. popState() 从浏览器的历史记录站中弹出一条记录
      3. replaceState() 替换浏览器的历史记录站中的栈顶记录

     - pushState 可以修改url且不带来页面刷新
     - 监听popstate、pushstate来关联浏览器的前进后退时间
    