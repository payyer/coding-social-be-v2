import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Media } from "../../type/profile";

interface IPostSlice {
  openPrevewMediaBox: boolean;
  currentImageMediaBox: number;
  mediaList: Media[] | undefined;
}

const initialState: IPostSlice = {
  openPrevewMediaBox: false,
  currentImageMediaBox: 0,
  mediaList: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    isOpenPrevewMediaBox: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
        mediaList?: Media[] | undefined;
        currentImage: number | 0;
      }>
    ) => {
      state.openPrevewMediaBox = action.payload.isOpen;
      state.mediaList = action.payload.mediaList;
      state.currentImageMediaBox = action.payload.currentImage;
    },
    // TODO:  Sử lý tăng hình ảnh
    increasesCurrentImageMediaBox: (state) => {
      if (
        state.currentImageMediaBox >= 0 &&
        state.mediaList &&
        state.currentImageMediaBox < state.mediaList?.length - 1
      ) {
        state.currentImageMediaBox += 1;
      } else {
        state.currentImageMediaBox = 0;
      }
    },
    decreasesCurrentImageMediaBox: (state) => {
      if (state.mediaList && state.currentImageMediaBox == 0) {
        state.currentImageMediaBox = state.mediaList.length - 1;
      } else {
        state.currentImageMediaBox -= 1;
      }
    },
  },
});

export const {
  isOpenPrevewMediaBox,
  increasesCurrentImageMediaBox,
  decreasesCurrentImageMediaBox,
} = postSlice.actions;

const postReducer = postSlice.reducer;
export default postReducer;
