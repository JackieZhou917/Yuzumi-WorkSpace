import './index.css'
import { Link, Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div className='home'>
      <div className="header">header</div>
      <div className="main">
        <div className="aside">
          <ul>
            <li><Link to='/home/yuwen'>语文</Link></li>
            <li><Link to='/home/shuxue'>数学</Link></li>
            <li><Link>英语</Link></li>
          </ul>
        </div>
        <div className="content">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}
