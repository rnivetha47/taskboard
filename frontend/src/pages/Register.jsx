import React, {useState} from 'react'
import API from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const nav = useNavigate()
  const submit = async (e)=>{
    e.preventDefault()
    try{
      const res = await API.post('/auth/register',{name,email,password})
      localStorage.setItem('token', res.data.token)
      nav('/')
    }catch(err){ alert(err.response?.data?.msg || 'Error') }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="p-8 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-2xl mb-4">Register</h2>
        <input className="w-full p-2 mb-2 border" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full p-2 mb-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 mb-4 border" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full p-2 bg-blue-600 text-white rounded">Register</button>
      </form>
    </div>
  )
}
