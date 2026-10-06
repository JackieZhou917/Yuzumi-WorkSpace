import './App.css'
import { useState } from 'react'

export default function App() {
  let query = ''
  const [content, setContent] = useState('')

  const submit = async () => {
    // 调用 llm 接口
    if (!query) return
    setContent('思考中...')
    
    const endpoint = 'https://api.deepseek.com/chat/completions'
    const headers = {
      'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json'
    }
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'deepseek-flash',
        messages: [
          {
            role: 'user',
            content: query
          }
        ],
        stream: true
      })
    })
    // const data = await response.json()
    // console.log(data)

    const reader = response.body.getReader()
    const decoder = new TextDecoder() // 解码器
    // 流式返回，是一点一点返回的，一次返回一个字符，会返回很多次
    let done = false
    setContent('')

    let buffer = ''
    while(!done) {
      const { done: doneFlag, value } = await reader.read()  // 读取数据
      done = doneFlag
      const chunkValue = buffer + decoder.decode(value)  //得到一滴一滴的水

      const lines = chunkValue.split('\n').filter(line => line.startsWith('data: '))

      for(const line of lines) {
        const incoming = line.slice(6)
        if (incoming === '[DONE]') {
          done = true
          break
        }
        const data = JSON.parse(incoming)  // 每一个水滴都被解析成了json对象
        const delta = data.choices[0].delta.content || ''
        if (delta) {
          setContent(prev => prev + delta)
        }
      }
    }
  }

  const queryChange = (e) => {
    query = e.target.value
  }

  return (
    <div>
      <div className="input">
        <input type="text" placeholder="请输入" onChange={queryChange} />
        <button onClick={submit}>提交</button>
      </div>
      <div className="output">
        <div className="content">{content}</div>
      </div>
    </div>
  )
}
