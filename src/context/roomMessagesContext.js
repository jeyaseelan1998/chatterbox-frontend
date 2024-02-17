import { createContext } from "react";

const RoomMessagesContaxt = createContext({
    rooms: {},
    updateRooms: () => {},
    addMessage: () => {}
})

export default RoomMessagesContaxt