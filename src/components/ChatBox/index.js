import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MdGroups3, MdSend } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import SocketContext from '../../context/socketio';
import Message from '../Message';
import './index.css'
import Cookies from 'js-cookie';
import RoomMessagesContaxt from '../../context/roomMessagesContext';

const ChatBox = () => {
  const { roomId } = useParams()
  const { socket } = useContext(SocketContext)

  const [messageInput, setMessageInput] = useState("")

  const {rooms, addMessage} =  useContext(RoomMessagesContaxt)

  // const [messageList, setMessageList] = useState([])

  const onSendMessage = (e) => {
    e.preventDefault()

    const {username} = JSON.parse(Cookies.get("jwt_token"))

    if (!messageInput) return;

    const messageData = {
      roomId, 
      message: messageInput, 
      sentUser: username
    }

    socket.emit("send_message", messageData)

    setMessageInput("")
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // setMessageList(prev => [...prev, data])
      addMessage(data)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])


  const smoothScroller = e => {
    const elem = document.getElementById("chatbox")
    elem.scrollTo({
      top: elem.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }

  useEffect(()=>{
    smoothScroller()
  }, [rooms])

  const onChageMessage = e => setMessageInput(e.target.value)

  const renderMessages = () => (
    <ul className='chatbox-body' id="chatbox">
      {
        rooms[roomId]?.map(each => <Message key={each.timeStamp} data={each} />)
      }
    </ul>
  )

  return (
    <div className='chatbox-container'>
      <div className='chatbox-header'>
        <MdGroups3 className='group-icon' />
        <div className='chatbox-header-info'>
          <h3>{roomId}</h3>
        </div>

        <button type='button'>
          <BsThreeDotsVertical className='vertical-dot' />
        </button>
      </div>

      {renderMessages()}

      <form className='chatbox-footer' onSubmit={onSendMessage}>
        <input onChange={onChageMessage} value={messageInput} />
        <button type='submit'>
          <MdSend className='send-icon' />
        </button>
      </form>
    </div>
  )
}

export default ChatBox