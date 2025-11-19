import React, {useState, useEffect} from 'react'
import API from '../api'

export default function TaskBoard(){
  const [tasks,setTasks]=useState([])
  const [title,setTitle]=useState('')

  const load = async ()=>{
    try{
      const res = await API.get('/tasks')
      setTasks(res.data)
    }catch(err){ console.error(err) }
  }
  useEffect(()=>{ load() },[])

  const add = async (e)=>{
    e.preventDefault()
    try{
      const res = await API.post('/tasks',{ title })
      setTasks(prev=>[res.data, ...prev])
      setTitle('')
    }catch(err){ alert('Error') }
  }

  const toggle = async (t)=>{
    try{
      const res = await API.put(`/tasks/${t._id}`, { isCompleted: !t.isCompleted })
      setTasks(prev=>prev.map(p=>p._id===t._id?res.data:p))
    }catch(err){ console.error(err) }
  }
  const remove = async (id)=>{
    try{
      await API.delete(`/tasks/${id}`)
      setTasks(prev=>prev.filter(p=>p._id!==id))
    }catch(err){ console.error(err) }
  }

  return (
    <div>
      <form onSubmit={add} className="mb-4 flex gap-2">
        <input value={title} onChange={e=>setTitle(e.target.value)} className="flex-1 p-2 border" placeholder="New task" />
        <button className="p-2 bg-blue-600 text-white rounded">Add</button>
      </form>
      <ul>
        {tasks.map(t=> (
          <li key={t._id} className="flex items-center justify-between p-2 border-b">
            <div>
              <input type="checkbox" checked={t.isCompleted} onChange={()=>toggle(t)} />
              <span className={`ml-2 ${t.isCompleted? 'line-through text-gray-400':''}`}>{t.title}</span>
            </div>
            <div>
              <button onClick={()=>remove(t._id)} className="text-red-500">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
