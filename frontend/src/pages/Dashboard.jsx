import React, {useState, useEffect} from 'react'
import API from '../api'
import TaskBoard from '../components/TaskBoard'
import Chat from '../components/Chat'

export default function Dashboard(){
  const [tab,setTab]=useState('tasks')
  const [user,setUser]=useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if (!token) return
    try{
      // minimal: decode token to get userId is optional; we'll fetch profile by token if endpoint exists.
      setUser({ name: 'You' })
    }catch(e){}
  },[])

  const logout = ()=>{ localStorage.removeItem('token'); window.location.reload() }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">TaskBoard</h1>
          <div>
            <button onClick={()=>setTab('tasks')} className="mr-2">Tasks</button>
            <button onClick={()=>setTab('chat')} className="mr-2">Chat</button>
            <button onClick={()=>setTab('profile')} className="mr-2">Profile</button>
            <button onClick={logout} className="text-red-500">Logout</button>
          </div>
        </div>

        <div>
          {tab === 'tasks' && <TaskBoard />}
          {tab === 'chat' && <Chat user={{ name: user?.name || 'You' }} />}
          {tab === 'profile' && (
            <div>
              <h2 className="text-lg">Profile</h2>
              <p>{user?.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
