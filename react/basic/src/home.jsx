export default function home() {
  return (
    <div>
        <h2 onClick={() => { console.log('首页被点击了') }}>首页</h2>
        <ul>
            <li>react</li>
            <li>jsx</li>
        </ul>
    </div>
  )
}
