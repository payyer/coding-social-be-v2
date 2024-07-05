export enum StateView {
  Post = 1,
  Image = 2,
  Video = 3,
  Friend = 4,
  Info = 5,
}

export interface IUserInfo {
  user_name: string;
  user_avatar: { public_id: string; url: string };
  user_email: string;
  user_password: string;
  user_bio: string;
  user_cv: { public_id: string; url: string } | FileList;
  user_birthday: string;
  user_country: string;
  user_list_friend: string[];
  user_display_settings: {
    user_email: boolean;
    user_bio: boolean;
    user_cv: boolean;
    user_birthday: boolean;
    user_country: boolean;
    user_list_friend: boolean;
  };
}

export interface Media {
  public_id: string | undefined;
  url: string | undefined;
  resource_type: string;
  _id?: string | "";
  secure_url?: string;
}

export interface IGetUserInfoRespone {
  metadata: {
    _id: string;
    user_name: string;
    user_avatar: Media;
    user_cover_image: Media;
    user_email: string;
    user_bio: string | undefined;
    user_cv: Media;
    user_birthday: string | undefined;
    user_country: string;
    user_list_friend: string[];
    user_display_settings: {
      user_email: boolean;
      user_bio: boolean;
      user_cv: boolean;
      user_birthday: boolean;
      user_country: boolean;
      user_list_friend: boolean;
    };
  };
}

export interface ICreatePostInput {
  content: string;
  postType: string;
  files: FileList;
}

export interface ICreatePostRespone {
  message: string;
  meatadata: {
    _id: string;
    user_id: string;
    post_media: Media[];
    post_content: string;
    post_emoji: string;
    post_shared: string;
    post_type: string;
  };
}
