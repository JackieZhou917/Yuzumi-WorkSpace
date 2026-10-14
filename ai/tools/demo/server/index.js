import axios from 'axios'  // 用来发请求 类似于 fetch
import express from 'express'
import { exec } from 'child_process'

const app = express()

app.use(express.json())  // 让express可以解析post传递的参数

app.post('/chat', async (req, res) => {
  // 获取前端传递的问题
  const { message } = req.body
  const model = 'qwen3.5:0.8b'
  const base_url = 'http://localhost:11434'
  const messages = [
    {
      role: 'system',
      content: '你是一个AI助手，如果有需要，你可以调用DirFiles工具查找当前目录下的文件和文件夹'
    },
    {
      role: 'user',
      content: message
    }
  ]
  // 向ollama发请求
  const response = await axios.post(`${base_url}/api/chat`, {
    model,
    messages,
    tools: [
      {
        type: 'function',
        function: {
          name: 'DirFiles',
          parameters: {},
          description: '列出当前目录下的文件和文件夹'
        }
      }
    ],
    stream: false
  })

  // console.log(response.data.message.tool_calls)
  const reply = response.data.message.thinking   // LLM返回的内容

  // 检查LLM是否说需要调用tool
  if (response.data.message.tool_calls &&
    response.data.message.tool_calls.length > 0 &&
    response.data.message.tool_calls[0].function?.name === 'DirFiles'
  ) {
    // DirFiles()  // 执行 dir 指令
    exec('dir /a', async (error, stdout, stderr) => {
      if (error) {
        res.json({ reply: `${reply}\n\n执行命令行出错: ${error}` })
        return
      }
      if (stderr) {
        console.error(`命令stderr: ${stderr}`)
      }
      // res.json({ reply: `<think>${reply}</think>\n\n当前文件目录列表为: \n\n\n${stdout}`})

      // 往messages数组中增加一条 tool 数据，再次跟 LLM 通信
      messages.push({
        role: 'tool',
        content: `当前目录文件列表: \n\`\`\n${stdout}\`\`\`\n`
      })

      const response = await axios.post(`${base_url}/api/chat`, {
        model,
        messages,
        stream: false
      })

      console.log(response.data.message.content)
      res.json({reply: `<think>${response.data.message.thinking }</think>\n\n${response.data.message.content}`})
    })
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
