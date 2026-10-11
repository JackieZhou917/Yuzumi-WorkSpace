import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import Yuwen from './pages/yuwen/Index.jsx'
import Shuxue from './pages/shuxue/Index.jsx'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}>
            {/* 二级路由 */}
            <Route path='/home/yuwen' element={<Yuwen/>}></Route>
            <Route path='shuxue' element={<Shuxue/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
