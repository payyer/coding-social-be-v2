import { Media } from "./profile";

export interface IPostRespone {
  message: string;
  metadata: IPostItem[];
}

export interface IPostItem {
  _id: string;
  user_id: {
    _id: string;
    user_name: string;
    user_avatar: Media;
  };
  post_media: Media[];
  post_content: string;
  post_emoji: string;
  post_shared: string;
  post_comment: string;
  post_type: string;
  isLike: boolean;
  createdAt: Date;
}
