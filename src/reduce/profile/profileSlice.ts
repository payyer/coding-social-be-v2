import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateView } from "../../type/profile";

export enum ViewFriendList {
  List = 1,
  FriendRequest = 2,
}

interface IProfileState {
  view: StateView;
  ImageModal: { isOpen: boolean; indexClickImage: number };
  createPostModal: boolean;
  viewFriendList: ViewFriendList;
  userId: string;
}

const initialState: IProfileState = {
  view: StateView.Post,
  ImageModal: { isOpen: false, indexClickImage: 0 },
  createPostModal: false,
  viewFriendList: ViewFriendList.List,
  userId: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<StateView>) => {
      state.view = action.payload;
    },
    setImageModal: (
      state,
      action: PayloadAction<{ isOpen: boolean; indexClickImage: number }>
    ) => {
      state.ImageModal = action.payload;
    },
    setCreatePostModal: (state, action: PayloadAction<boolean>) => {
      state.createPostModal = action.payload;
    },
    setViewFriendList: (state, action: PayloadAction<ViewFriendList>) => {
      state.viewFriendList = action.payload;
    },
  },
});

export const { setView, setImageModal, setViewFriendList, setCreatePostModal } =
  profileSlice.actions;

const profileReducer = profileSlice.reducer;
export default profileReducer;
