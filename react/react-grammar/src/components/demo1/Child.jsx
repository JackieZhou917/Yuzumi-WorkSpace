import React from 'react'

export default function Child(props) {
  console.log(props)
  const age = 18

  const sendData = () => {
    props.getData(age)
  }
  return (
    <div>
      <h3>子组件</h3>
      <button onClick={sendData}>发送</button>
    </div>
  )
}
