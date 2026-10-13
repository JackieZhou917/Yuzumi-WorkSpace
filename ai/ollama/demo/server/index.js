import express from 'express'  // node的框架
const app = express()

// 创建了一个由get方式才能请求的接口
app.get('/stream', async (req, res) => {
  // 解析前端传过来的参数
  const { question } = req.query  // const question = req.query.question
  if (!question) return res.end('请输入问题')

  // 设置响应头
  res.setHeader('Content-Type', 'text/event-stream')  // 为了告诉前端接下来给你的资源是event-stream格式
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')  // 跟客户端建立持久链接
  res.flushHeaders()  // 发送初始响应头

  // 向ollama发请求
  const OLLAMA_API_URL = 'http://localhost:11434'
  const MODEL_NAME = 'qwen3.5:0.8b'
  const endPoint = `${OLLAMA_API_URL}/api/generate`
  const response = await fetch(endPoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL_NAME,
      prompt: question,
      stream: true
    })
  })
  if (!response.ok) {
    res.end('请求失败')
  }

  // 解析流式资源
  const reader = response.body.getReader()
  const decoder = new TextDecoder() // 解码器
  let finish = false


  while (!finish) {  // 循环解析一个又一个的水滴
    const { value, done } = await reader.read()
    // console.log(value, done);
    finish = done
    const chunkValue = decoder.decode(value, { stream: true }) + ''
    const chunkValueObj = JSON.parse(chunkValue)
    if (chunkValueObj.thinking) {  // 向前端返回内容
      res.write(`data: ${chunkValueObj.thinking}\n\n`)
    } else {
      res.write(`data: ${chunkValueObj.response}`)
    }
  }

  res.write('event: end\n')  // 发送结束事件
  res.write('data: [DONE]\n\n')  // 通知客户端数据流结束
  res.end();  // 结束链接

})

app.listen(3000, () => {
  console.log('服务已启动在3000端口');
})





// const http = require('http')
// const server = http.createServer((req, res) => {
//   res.end('hello')
// })
// server.listen(3000, () => {
//   console.log('服务已启动在3000端口');
// })