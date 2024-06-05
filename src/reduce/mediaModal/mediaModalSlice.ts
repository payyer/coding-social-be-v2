import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IMediaModalState {
  openMediaModal: boolean;
  currentImage: number;
  imageList: Array<string>;
}

const initialState: IMediaModalState = {
  openMediaModal: false,
  currentImage: 0,
  imageList: [],
};

const mediaModalSlice = createSlice({
  name: "media Modal",
  initialState,
  reducers: {
    isOpenModal: (
      state,
      action: PayloadAction<{
        openMediaModal: boolean;
        currentImage: number;
        imageList: Array<string>;
      }>
    ) => {
      state.imageList = action.payload.imageList;
      state.openMediaModal = action.payload.openMediaModal;
      state.currentImage = action.payload.currentImage;
    },

    closeMediaModal: (state, action: PayloadAction<boolean>) => {
      state.imageList = [];
      state.currentImage = 0;
      state.openMediaModal = action.payload;
    },

    increasesCurrentImage: (state) => {
      if (state.currentImage === state.imageList.length - 1) {
        state.currentImage = 0;
      } else {
        state.currentImage = state.currentImage + 1;
      }
    },

    decreasesCurrentImage: (state) => {
      if (state.currentImage === 0) {
        state.imageList.length = state.imageList.length - 1;
      } else {
        state.currentImage = state.currentImage - 1;
      }
    },
  },
});

export const {
  isOpenModal,
  closeMediaModal,
  increasesCurrentImage,
  decreasesCurrentImage,
} = mediaModalSlice.actions;

const mediaModalReducer = mediaModalSlice.reducer;
export default mediaModalReducer;
