import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "./components/Auth";
import ChatterBoxLayout from "./components/ChatterBoxLayout";
import EmptyChatBox from "./components/EmptyChatBox";

import ChatBox from "./components/ChatBox";

import SocketContext from "./context/socketio";
import RoomMessagesContaxt from "./context/roomMessagesContext";
import './App.css';

function App({socket}) {

  const [rooms, setRooms] = useState({
    "sample Room": []
  })

  const addMessage = message => {
    const roomId = message.roomId

    setRooms(prev => ({
      ...prev,
      [roomId]: [...prev[roomId], message]
    }))
  }

  const updateRooms = roomId => {
    socket.emit("create_room", roomId)
  }

  useEffect(() => {
    socket.on("update_room", (roomId) => {
      setRooms(prev => ({
        ...prev,
        [roomId]: []
      }))
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  return (
    <SocketContext.Provider value={{ socket }}>
      <RoomMessagesContaxt.Provider value={{rooms, updateRooms, addMessage}}>
        <Routes>
          <Route exact path="/auth" element={<Auth />} />

          <Route exact path="/" element={<ChatterBoxLayout />} >
            <Route index element={<EmptyChatBox />} />
            <Route path="/rooms/:roomId" element={<ChatBox />} />
          </Route>
        </Routes>
      </RoomMessagesContaxt.Provider>
    </SocketContext.Provider>
  );
}

export default App;
