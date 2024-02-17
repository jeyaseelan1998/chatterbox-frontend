import React from 'react'
import { BsEmojiSmile } from "react-icons/bs";

import './index.css'

const EmptyChatBox = () => {
  return (
    <div className='empty-chatbox-container'>
    <BsEmojiSmile className='smile-emoji' />
      <h2><i>Welcome to ChatterBox app!!!</i></h2>
    </div>
  )
}

export default EmptyChatBox