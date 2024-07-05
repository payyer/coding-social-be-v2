import { IFriendRespone } from "../../type/friendReqeust";
import { apiSlice } from "../apiSlice";

export const friendRequestApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getFriendRqList: build.query<IFriendRespone, void>({
      query: () => `friendRequest`,
      providesTags(result) {
        if (result && result.metadata) {
          return [
            ...result.metadata.map(({ _id }) => ({
              type: "getFriendReq" as const,
              id: _id,
            })),
            { type: "getFriendReq", id: "FriendRequset" },
          ];
        }
        return [{ type: "getFriendReq", id: "FriendRequset" }];
      },
    }),
    sendFriendRequset: build.mutation<void, string>({
      query(receiverId) {
        return {
          url: "friendRequest/sendFriendRequest",
          method: "POST",
          body: { receiverId },
        };
      },
    }),
    acceptFriendRequest: build.mutation<void, string>({
      query(senderId) {
        return {
          url: "user/acceptFriendRequest",
          method: "POST",
          body: { senderId },
        };
      },
      invalidatesTags: (result, error, body) => [
        { type: "getFriendReq", id: "FriendRequset" },
        { type: "friendListOfUser", id: "FRIEND_LIST" },
        { type: "getFriendList", _id: "LIST" },
      ],
    }),
    deleteFriendReq: build.mutation<void, string>({
      query(receiverId) {
        return {
          url: "friendRequest",
          method: "DELETE",
          body: { receiverId },
        };
      },
    }),
  }),
  overrideExisting: true,
});
export const {
  useSendFriendRequsetMutation,
  useDeleteFriendReqMutation,
  useGetFriendRqListQuery,
  useAcceptFriendRequestMutation,
} = friendRequestApi;
