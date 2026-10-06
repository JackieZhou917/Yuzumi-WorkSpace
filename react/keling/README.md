# main.jsx
项目的入口文件

# 获取用户输入的内容
1. 在输入框上添加onChange事件，当用户输入内容时，触发事件，调用 handleChange 函数，通过 e.target.value 获取用户输入的内容

2. useRef()   获取dom结构

# 跨域
任何一个 URL 地址都是由: https: .168.168.3.1: 3000  /home
                      协议           域名    端口   路径
协议、域名、端口 都相同才能进行通信，否则就跨域
