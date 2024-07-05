import { Media } from "./profile";

export interface IFriendRespone {
  message: string;
  metadata?: IFriendItem[] | IGetFriendRespone[];
}

export interface IFriendItem {
  _id: string;
  sender_id: {
    _id: string;
    user_name: string;
    user_avatar: Media;
  };
}

export interface IGetFriendRespone {
  _id: string;
  user_name: string;
  user_avatar: Media;
}
