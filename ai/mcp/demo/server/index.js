import express from 'express'
import { LLM } from '../lib/llm.js'

const app = express()

const llm = new LLM('qwen3.5:0.8b', 'http://localhost:11434')

app.use(express.json())  // express 可以解析post传递的参数

app.post('/chat', async (req, res) => {
  const { message } = req.body

  const messages = [
    {
      role: 'system',
      content: '你是一个AI助手，如果有需要你可以借助tools函数来完成任务'
    },
    {
      role: 'user',
      content: message
    }
  ]

  const reply = await llm.chat(messages)
  res.json({reply})
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})