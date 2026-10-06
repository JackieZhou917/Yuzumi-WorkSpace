import { useRef } from 'react'
import './home.css'

export default function() {
  const textRef = useRef(null)
  const [img, setImg] = useState('')

  const generateImg = async () => {
    const endpoint = '/klingai/v1/images/generations' // keling通讯地址
    const prompt = textRef.current.value
    const negativeWords = 'Blurry, Bad, Bad anatomy, Bad proportions, Deformed, Disconnected limbs, Disfigured, Extra arms, Extra limbs, Extra hands, Fused fingers, Gross proportions, Long neck, Malformed limbs, Mutated, Mutated hands, Mutated limbs, Missing arms, Missing fingers, Poorly drawn hands, Poorly drawn face.'
    const apikey = import.meta.env.VITE_KELING_API_KEY
    const headers = {
      'Authorization': `Bearer ${apikey}`,
      'Content-Type': 'application/json',
    }
    const payload = {
      'model_name': 'kling-v3',
      'prompt': prompt,
      'negative_prompt': negativeWords,
      'aspect_ratio': '1:1',
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    const taskId = data.data.id
    

    const imgEndpoint =  `/klingai/v1/images/generations/${taskId}`
    do {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const imgRes = await fetch(imgEndpoint, {
        method: 'GET',
        headers,
      })
      const imgData = await imgRes.json()
      if (!imgData.data.task_result?.images) {
        continue
      }
      const img = imgData.data.task_result.images[0].url
      setImg(img)
      break
    } while (1)
    
  }

  return (
    <div className="home">
      <div className="input">
        <textarea placeholder="请输入" className="input-textarea" ref={textRef}></textarea>
        <button onClick={generateImg}>生成</button>
      </div>
      
      <div className="output">
        <img src={img} alt="" />
      </div>
    </div>
  )
}
