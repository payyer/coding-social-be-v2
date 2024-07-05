import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IChatBox {
  //   openChatBox: boolean;
}

const initialState: IChatBox = {
  //   openChatBox: false,
};

const chatBoxSlice = createSlice({
  name: "chatBox",
  initialState,
  reducers: {
    // isOpenChat: (state, action: PayloadAction<boolean>) => {
    //   state.openChatBox = action.payload;
    // },
  },
});

export const {} = chatBoxSlice.actions;

const homeReducer = chatBoxSlice.reducer;
export default homeReducer;
