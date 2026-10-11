import './index.css'
import { useRef } from 'react'
import { useNavigate} from 'react-router-dom'

export default function login() {
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()

  const login = () =>{
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    if(!username || !password){
      return
    }

    // 跳转到首页
    navigate(`/home?user=${username}`)
  }

  return (
    <div className='login'>
      <div className="container">
        <input type="text" className='username' ref={usernameRef}/>
        <input type="text" className='password' ref={passwordRef}/>
        <button onClick={login}>登录</button>
      </div>
    </div>
  )
}
