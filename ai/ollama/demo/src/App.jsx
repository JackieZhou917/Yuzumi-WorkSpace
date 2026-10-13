import React, { useState } from 'react'

export default function App() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')

  const handle = () => {
    if (!query) return
    setResult('思考中...')

    // 向后端发请求
    const endpoint = '/api/stream'
    // const response = fetch(endpoint, {
    //   method: 'GET',
    //   body: xxxxx
    // })

    const eventSource = new EventSource(`${endpoint}?question=${query}`) // 跟后端建立连接
    eventSource.addEventListener('message', (e) => {
      console.log(e.data);
      setResult((pre) => pre + e.data)
    })

  }


  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <button onClick={handle}>发送</button>
      </div>

      <div className="output" style={{ width: '400px', minHeight: '200px', border: '1px solid #000' }}>
        {result}
      </div>
    </div>
  )
}