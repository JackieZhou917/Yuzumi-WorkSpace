import Item from './jsx/Item.jsx'
import Item2 from './jsx/Item2.jsx'
import Item3 from './jsx/Item3.jsx'
import Item4 from './jsx/Item4.jsx'
import Parent from './components/demo1/Parent.jsx'
import State from './hooks/State.jsx'
import Effect from './hooks/Effect.jsx'
import Ref from './hooks/Ref.jsx'
import Context from './hooks/Context.jsx'
import { useState } from 'react'



export default function App() {
  const [flag, setFlag] = useState(false)
  
  return (
    <div>
      {/* <Item /> */}
      {/* <Item2 /> */}
      {/* <Item3 /> */}
      {/* <Item4 /> */}
      {/* <Parent /> */}
      {/* <State /> */}
      {/* <Effect /> */}
      {/* <button onClick={() => setFlag(!flag)}>切换</button>
      {
        flag? <State /> : <Effect />
      } */}
      {/* <Ref /> */}
      <Context />
    </div>
  )
}
