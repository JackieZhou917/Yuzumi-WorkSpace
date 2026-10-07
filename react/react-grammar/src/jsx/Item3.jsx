import React from 'react'

export default function Item3() {
  const styleObj = {
    color: 'red'
  }

  return (
    <div>
      {/* <h2 style={{color: 'red'}}>你好</h2> */}
      <h2 style={styleObj}>你好</h2>
    </div>
  )
}
