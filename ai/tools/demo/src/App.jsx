import { useState } from 'react'
import './app.css'
import { marked } from 'marked'

function thinkContent(str) {
  if (str.startsWith('<think>')) {
    const match = str.match(/^<think>([\s\S]*?)<\/think>/im)
    return match ? match[1] : str.replace(/^<think>/, '')
  }
  return ''
}

function replyContent(str) {
  let content = ''
  if (str.startsWith('<think>')) {
    content = str.split('</think>')[1] || ''
  } else {
    content = str
  }
  return marked(content)
}


export default function App() {
  const [ message, setMessage] = useState('请帮我列出当前文件夹下的所有文件和文件夹')
  const [ result, setResult ] = useState('')
  const [ think, setThink ] = useState('')

  const handleSubmit = async () => {
    if(!message) return
    setResult('思考中...')

    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message,
      }),
    })
    const data = await response.json()
    // 拆分think和result
    setThink(thinkContent(data.reply))
    setResult(replyContent(data.reply))
  }



  return (
    <div className='container'>
      <div>
        <input type="text" className='input' defaultValue={message} onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={handleSubmit}>提交</button>
      </div>
      <div className="output">
        <div className="think">{think}</div>
        <div dangerouslySetInnerHTML={{ __html: result }}></div>
      </div>
    </div>
  )
}
