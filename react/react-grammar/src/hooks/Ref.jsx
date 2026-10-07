import { useRef, useEffect, useState } from 'react'


export default function Ref() {
  const inputRef = useRef(null)
  const numRef = useRef(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    inputRef.current.focus()
  }, [])
  
  return (
    <div>
      <input type="text" ref={inputRef} />
      <div onClick={() => {
        numRef.current++
        forceRender((prev) => prev + 1)
      }}>{numRef.current}</div>
    </div>
  )
}
