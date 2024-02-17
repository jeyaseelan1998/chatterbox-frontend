import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { MdGroups3 } from "react-icons/md";

import SocketContext from '../../context/socketio';
import './index.css'

const ChatRoomItem = ({ roomName, activeRoom }) => {

    const {socket} = useContext(SocketContext)

    const onJoinRoomChat = () => {
        socket.emit("join_room", {roomId:roomName})
    }

    return (
        <li className={`chat-room-item-container ${roomName === activeRoom ? "active-room" : ""}`} onClick={onJoinRoomChat}>
            <Link to={`/rooms/${roomName}`} className="chat-room-link">
                <MdGroups3 className='group-icon' />
                <div className='chat-room-item-info'>
                    <h3>{roomName}</h3>
                </div>
                <button>Join</button>
            </Link>
        </li>
    )
}

export default ChatRoomItem