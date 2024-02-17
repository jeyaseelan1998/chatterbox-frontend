import React, { useContext, useState } from 'react'
import { MdOutlineAddCircle } from "react-icons/md";

import RoomMessagesContaxt from '../../context/roomMessagesContext';
import './index.css'

const CreateRoom = () => {

  const { updateRooms } = useContext(RoomMessagesContaxt)

  const [roomName, setRoomName] = useState("")

  const onChageRoomName = e => setRoomName(e.target.value)

  const onCreateRoom = e => {
    e.preventDefault()

    if (!roomName) return;

    updateRooms(roomName)

    setRoomName("")
  }

  return (
    <form className='create-room-container' onSubmit={onCreateRoom}>
      <input value={roomName} onChange={onChageRoomName} placeholder='Create room...' />
      <button type='submit' title='create room'>
        <MdOutlineAddCircle className='add-icon' />
      </button>
    </form>
  )
}

export default CreateRoom