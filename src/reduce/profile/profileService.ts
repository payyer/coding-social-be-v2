import { IFriendRespone } from "../../type/friendReqeust";
import { IPostRespone } from "../../type/post";
import { ICreatePostRespone, IGetImage, IGetUserInfoRespone } from "../../type/profile";
import { apiSlice } from "../apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUserInfo: build.query<IGetUserInfoRespone, string | null>({
      query: (body) => `user/userInfo/${body}`,
    }),
    getImage: build.query<IGetImage, void>({
      query: () => `user/image`,
    }),
    getVideo: build.query<IGetImage, void>({
      query: () => `user/video`,
    }),

    getPostOfUser: build.query<IPostRespone, string | null>({
      query: (body) => `post/userPost/${body}`,
      providesTags(result) {
        if (result) {
          return [
            ...result.metadata.map(({ _id }) => ({
              type: "postOfUser" as const,
              id: _id,
            })),
            { type: "postOfUser", id: "POST" },
          ];
        }
        return [{ type: "postOfUser", id: "POST" }];
      },
    }),

    getFriendListOfUser: build.query<IFriendRespone, string>({
      query: (body) => `user/getFriendList?userName=${body}`,
      providesTags(result) {
        if (result && result.metadata) {
          return [
            ...result.metadata.map(({ _id }) => ({
              type: "friendListOfUser" as const,
              id: _id,
            })),
            { type: "friendListOfUser", id: "FRIEND_LIST" },
          ];
        }
        return [{ type: "friendListOfUser", id: "FRIEND_LIST" }];
      },
    }),

    updateUserInfo: build.mutation<ICreatePostRespone, FormData>({
      query(body) {
        return {
          url: "user/updateuserInfo",
          method: "PUT",
          body,
        };
      },
    }),

    updateUserAvatar: build.mutation<{ message: string }, FormData>({
      query(body) {
        return {
          url: "user/updateUserAvatar",
          method: "PUT",
          body,
        };
      },
    }),

    createpost: build.mutation<ICreatePostRespone, FormData>({
      query(body) {
        return {
          url: "post",
          method: "POST",
          body,
        };
      },
      invalidatesTags: (result, error, body) => [
        { type: "postOfUser", id: "POST" },
        { type: "allPost", id: "ALL_POST" },
      ],
    }),

    rejectFriendRequest: build.mutation<void, string>({
      query(senderId) {
        return {
          url: "user/rejectFriendRequest",
          method: "DELETE",
          body: {
            senderId,
          },
        };
      },
      invalidatesTags: (result, error, body) => [
        { type: "getFriendReq", id: "FriendRequset" },
        { type: "friendListOfUser", id: "FRIEND_LIST" },
      ],
    }),

    unFriend: build.mutation<void, string>({
      query(unFriendUserId) {
        return {
          url: "user/unFriend",
          method: "DELETE",
          body: {
            unFriendUserId,
          },
        };
      },
      invalidatesTags: (result, error, body) => [
        { type: "friendListOfUser", id: "FRIEND_LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});
export const {
  useGetUserInfoQuery,
  useCreatepostMutation,
  useUpdateUserInfoMutation,
  useGetPostOfUserQuery,
  useUpdateUserAvatarMutation,
  useRejectFriendRequestMutation,
  useGetFriendListOfUserQuery,
  useUnFriendMutation,
  useGetImageQuery,
  useGetVideoQuery
} = profileApi;
