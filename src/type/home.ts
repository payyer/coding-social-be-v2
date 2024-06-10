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
      user_avatar: {
        public_id: string;
        url: string;
      };
      isFriend: boolean;
      isRequest: boolean;
    }
  ];
}
