import { useContext } from 'react'
import { countContext } from './Context.jsx'


export default function ContextChild2() {
  const [count] = useContext(countContext)  //将父组件中的上下文对象用起来

  return (
    <div>ContextChild2 -- {count}</div>
  )
}