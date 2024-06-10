import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISerarch {
  searchUserInput: string;
  searchFriendInput: string;
}

const initialState: ISerarch = {
  searchUserInput: "",
  searchFriendInput: "",
};

const searchInputSlice = createSlice({
  name: "media Modal",
  initialState,
  reducers: {
    setSearchUserInput: (state, action: PayloadAction<string>) => {
      state.searchUserInput = action.payload;
    },
    setSearchFriendInput: (state, action: PayloadAction<string>) => {
      state.searchFriendInput = action.payload;
    },
  },
});

export const { setSearchUserInput, setSearchFriendInput } =
  searchInputSlice.actions;

const searchInputReducer = searchInputSlice.reducer;
export default searchInputReducer;
