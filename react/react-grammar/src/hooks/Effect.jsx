import React from 'react'
import { useEffect, useState } from 'react'  

async function getData() {
  const res = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(666)
    }, 2000)
  })
  return res
}

export default function Effect() {
  const [data, setData] = useState(0)
  const [age, setAge] = useState(18)

  useEffect(() => {
    getData().then((res) => {
      console.log(res)
      setData(res)
    })

    return () => {
      console.log('组件卸载了')
    }
  }, [age])

  return (
    <div>
      <h3>{data}</h3>

      <button onClick={() => setAge(age + 1)}>{age}</button>
    </div>
  )
}
