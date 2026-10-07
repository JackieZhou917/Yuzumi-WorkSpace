import React from 'react'

export default function Item2() {
  const flag = false

  return (
    <div>
      {
        flag ? <h2>杰哥真帅</h2> : <h2>俊杰真帅</h2>
      }
      <h2>{flag ? '杰哥真帅' : '俊杰真帅'}</h2>
    </div>
  )
}
