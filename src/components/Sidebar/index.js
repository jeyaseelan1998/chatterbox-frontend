import React, { useContext } from 'react'
import { FaUserLarge } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { Link, useParams } from 'react-router-dom';

import CreateRoom from '../CreateRoom';
import ChatRoomItem from '../ChatRoomItem';

import RoomMessagesContaxt from '../../context/roomMessagesContext';

import './index.css'

const Sidebar = () => {
  const activeRoom = useParams().roomId

  const { rooms } = useContext(RoomMessagesContaxt)

  const { username } = JSON.parse(Cookies.get("jwt_token"))

  const renderChatRoomItemsList = () => {
    return (
      <ul className='chat-room-items-list'>
        {Object.keys(rooms).map(each => <ChatRoomItem key={each} roomName={each} activeRoom={activeRoom} />)}
      </ul>
    )
  }

  return (
    <div className='sidebar-container'>
      <div className='sidebar-header'>
        <Link className='avatar-link' to="/">
          <FaUserLarge className='self-avatar' />
        </Link>
        <div className='sidebar-header-info'>
          <h2>{username}</h2>
          <p>online</p>
        </div>
      </div>

      <CreateRoom />

      {renderChatRoomItemsList()}
    </div>
  )
}

export default Sidebar