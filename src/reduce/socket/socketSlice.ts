import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface ISocket {
  socket: Socket | null;
}

const initialState: ISocket = {
    socket: null,
};

const socketSlice = createSlice({
  name: "media Modal",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket>) => {
        state.socket = action.payload as any;
    },  
  },
});

export const { setSocket } =
socketSlice.actions;

const socketReducer = socketSlice.reducer;
export default socketReducer;
