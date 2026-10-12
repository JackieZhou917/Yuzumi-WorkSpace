import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Weather from './pages/Weather'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 路由重定向 */}
        <Route path="/" element={<Navigate to="/weather" />}></Route>
        <Route path="/weather" element={<Weather />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
