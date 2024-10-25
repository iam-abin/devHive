import { createSlice } from "@reduxjs/toolkit";
import { IChatRoom } from "../../types/chat";

interface ICurrentChatRoom {
    roomData: IChatRoom | null;
    rooms: IChatRoom[] | [];
}

const initialState: ICurrentChatRoom = {
    roomData: null,
    rooms: []
};

const CurrentChatRoomSlice = createSlice({
    name: "chat-data",
    initialState,
    reducers: {
        setSelectedChatRoom: (state, action) => {
            state.roomData = action.payload;
        },

        clearSelectedChatRoom: (state) => {
            state.roomData = null;
        },

        setChatRooms: (state, action) => {
            state.rooms = action.payload;
        },

        clearChatRooms: (state) => {
            state.rooms = [];
        },
    },
});

export const { setSelectedChatRoom, clearSelectedChatRoom, setChatRooms, clearChatRooms } =
    CurrentChatRoomSlice.actions; //we can use it in job page
export default CurrentChatRoomSlice.reducer;
