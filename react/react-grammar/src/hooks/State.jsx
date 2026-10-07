import { useState } from 'react'

async function getCount() {
  const res = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
  return res
}

export default function State() {
  const [count, setCount] = useState(() => {
    // let a = await getCount()
    let a  =1  
    let b = 2
    return a + b
  })   // 缓存数据

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </div>
  )
}
