import React, {useState, useEffect, useRef} from 'react'
import API from '../api'

export default function Chat({ user }){
  const [msgs,setMsgs]=useState([])
  const [text,setText]=useState('')
  const ref = useRef(null)

  const load = async ()=>{
    try{ const res = await API.get('/messages'); setMsgs(res.data) }catch(e){ console.error(e) }
  }
  useEffect(()=>{ load(); const iv = setInterval(load,3000); return ()=>clearInterval(iv) },[])

  const send = async (e)=>{
    e.preventDefault()
    try{
      const res = await API.post('/messages',{ message: text, userName: user.name })
      setMsgs(prev=>[...prev, res.data])
      setText('')
      setTimeout(()=> ref.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }catch(e){ console.error(e) }
  }

  return (
    <div className="flex flex-col h-96">
      <div className="flex-1 overflow-auto p-2 border rounded">
        {msgs.map(m=> (
          <div key={m._id} className="mb-2">
            <div className="text-sm font-semibold">{m.userName}</div>
            <div>{m.message}</div>
            <div className="text-xs text-gray-400">{new Date(m.timestamp).toLocaleString()}</div>
          </div>
        ))}
        <div ref={ref}></div>
      </div>
      <form onSubmit={send} className="mt-2 flex">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 border" placeholder="Say something..." />
        <button className="p-2 bg-green-600 text-white">Send</button>
      </form>
    </div>
  )
}
