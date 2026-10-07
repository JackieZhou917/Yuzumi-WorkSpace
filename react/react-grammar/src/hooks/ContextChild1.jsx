import { useContext } from 'react'
import { countContext } from './Context.jsx'


export default function ContextChild1() {
  const [count, setCount] = useContext(countContext)  //将父组件中的上下文对象用起来
  console.log(count)
  return (
    <div onClick={() => setCount(count + 1)}>ContextChild1 -- {count}</div>
  )
}
