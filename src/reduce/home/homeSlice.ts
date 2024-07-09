import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Media } from "../../type/profile";

interface IHomeState {
  openChatBox: boolean;
  userChatId?: string 
  chatRoomId?: string
  user_name?: string
  user_avartar?: Media | null
}

const initialState: IHomeState = {
  openChatBox: false,
  userChatId : "",
  chatRoomId: "",
  user_name:"",
  user_avartar: null
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    isOpenChat: (state, action: PayloadAction<{openChatBox: boolean, userChatId?: string, chatRoomId? :string, user_name?: string, user_avartar?: Media }>) => {
      state.openChatBox = action.payload.openChatBox;
      state.userChatId = action.payload.userChatId;
      state.chatRoomId = action.payload.chatRoomId;
      state.user_name = action.payload.user_name;
      state.user_avartar = action.payload.user_avartar;
    },
  },
});

export const { isOpenChat } = homeSlice.actions;

const homeReducer = homeSlice.reducer;
export default homeReducer;
