import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import Sidebar from '../Sidebar'

import './index.css'
import Cookies from 'js-cookie'

const ChatterBoxLayout = () => {
  const token = Cookies.get('jwt_token')
  
  if (token === undefined) {
    return <Navigate replace to="/auth" />
  }

  return (
    <div className='chatterbox-container'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default (ChatterBoxLayout)