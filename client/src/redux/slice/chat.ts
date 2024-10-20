import { createSlice } from "@reduxjs/toolkit";

interface ICurrentChatRoom {
    roomData: any;
}

const initialState: ICurrentChatRoom = {
    roomData: null,
};

const CurrentChatRoomSlice = createSlice({
    name: "chat-data",
    initialState,
    reducers: {
        setCurrentlySelectedChatRoom: (state, action) => {
            state.roomData = action.payload;
        },

        clearCurrentlySelectedChatRoom: (state) => {
            state.roomData = null;
        },
    },
});

export const { setCurrentlySelectedChatRoom, clearCurrentlySelectedChatRoom } =
    CurrentChatRoomSlice.actions; //we can use it in job page
export default CurrentChatRoomSlice.reducer;
