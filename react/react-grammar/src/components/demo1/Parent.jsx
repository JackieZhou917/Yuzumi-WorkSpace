import Child from './Child.jsx'
import { useState } from 'react'

export default function Parent() {
  // const msg = '父组件的数据'
  // const count = 1
  const [age, setAge] = useState(0)
  const getData = (age) => {
    console.log('父组件获取子组件数据', age)
    setAge(age)
  }
  return (
    // <div>
    //   <h2>父组件</h2>
    //   <Child data={msg} num={count} />
    // </div>
    <div>
      <h2>父组件 -- {age}</h2>
      <Child getData={getData} />
    </div>
  )
}
