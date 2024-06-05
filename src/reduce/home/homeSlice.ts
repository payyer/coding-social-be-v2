import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IHomeState {
  openChatBox: boolean;
}

const initialState: IHomeState = {
  openChatBox: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    isOpenChat: (state, action: PayloadAction<boolean>) => {
      state.openChatBox = action.payload;
    },
  },
});

export const { isOpenChat } = homeSlice.actions;

const homeReducer = homeSlice.reducer;
export default homeReducer;
