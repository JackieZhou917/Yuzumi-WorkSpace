import React from 'react'
import { useState } from 'react'

export default function Item4() {
  const [flag, setFlag] = useState(null)
  const pink = {
    color: 'pink'
  }
  const blue = {
    color: 'blue'
  }
  const change = () => {
    setFlag(!flag)
  }
  return (
    <div>
      {
        flag ? <h3 style={blue}>蕾姆</h3> : <h3 style={pink}>拉姆</h3>
      }
      <button onClick={change}>切换</button>
    </div>
  )
}
