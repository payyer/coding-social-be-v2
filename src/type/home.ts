import { Media } from "./profile";

export interface ISearchUserInput {
  userName: string | "";
  page: number;
  limit: number;
}

export interface ISearchRespone {
  message: string;
  metadata: [
    {
      _id: string;
      user_name: string;
      user_avatar: Media;
      isFriend: boolean;
      isRequest: boolean;
    }
  ];
}
