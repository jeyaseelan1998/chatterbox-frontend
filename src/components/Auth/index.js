import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Auth = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const token = Cookies.get('jwt_token')

  if (token !== undefined) {
    return <Navigate replace to="/" />
  }

  const onLogin = (e) => {
    e.preventDefault()

    if(!username || !password) return;

    const userDetails = {
      password, username
    }

    Cookies.set("jwt_token", JSON.stringify(userDetails), { expires: 1 })
    navigate("/")
  }

  const onChangeUsername = e => setUsername(e.target.value)
  const onChangePassword = e => setPassword(e.target.value)

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={onLogin}>
      <h2>Login</h2>
      <input onChange={onChangeUsername} value={username} placeholder='john'/>
      <input type="password" onChange={onChangePassword} value={password} placeholder='password'/>
      <button type='submit'>Login</button>
      </form>

    </div>
  )
}

export default Auth