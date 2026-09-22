# NodeJS
1. 是一个js运行环境
2. 它内部使用 c/c++ 封装了很多模块，这些模块可以跟操作系统交互

3. process (进程模块),
   __dirname (目录的绝对路径),
   __filename (文件的绝对路径)

4. 模块化语法
  - 将某一个 js 中的函数引入到另一个 js 文件中

  1. commonJS 规范
    - module.exports  +  require('./lib.js')

  2. ESModule 规范
    - export default  +  import xx from './lib.js'