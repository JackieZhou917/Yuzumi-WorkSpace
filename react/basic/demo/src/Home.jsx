import './home.css'
import { useState } from 'react'

export default function Home() {
    const title = 'HOME PAGE'
    let [ flag, setFlag ] = useState(false)
    const shuai = () => {
        setFlag(!flag)
    }
    return (
        <div>
            <h2 onClick={() => { console.log('首页被点击了') }}>{title}</h2>
            <ul>
                <li>react</li>
                <li>jsx</li>
            </ul>
            <h3 onClick={shuai} className={flag ? 'green' : 'red'}>我是帅哥</h3>

        </div>
    )
}
