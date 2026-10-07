import Child1 from './ContextChild1.jsx'
import Child2 from './ContextChild2.jsx'
import { createContext, useState } from 'react'

export const countContext = createContext()

export default function Context() {
  const [num, setNum] = useState(100)
  return (
    <div>
      <countContext.Provider value={[num, setNum]}>
        <Child1 />
        <Child2 />
      </countContext.Provider>
    </div>
  )
}
