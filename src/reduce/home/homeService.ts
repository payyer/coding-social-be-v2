import { ISearchRespone, ISearchUserInput } from "../../type/home";
import { apiSlice } from "../apiSlice";

export const homeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    searchUser: build.query<ISearchRespone, ISearchUserInput>({
      query: (body) =>
        `user/search?userName=${body.userName}&page=${body.page}&limit=${body.limit}`,
    }),
    getFriendList: build.query<ISearchRespone, string>({
      query: (userName) =>
        `user/getFriendList?userName=${userName ? userName : "all"}`,
      providesTags(result) {
        if (result) {
          const final = [
            ...result.metadata.map(({ _id }) => ({
              type: "getFriendList" as const,
              _id,
            })), // type = "" là do khai báo tagType: [""], VD: Nếu tagType = ['POST'] thì ở đây typ cũng = 'POST
            { type: "getFriendList" as const, _id: "LIST" },
          ];
          return final;
        }

        const final = [{ type: "getFriendList" as const, _id: "LIST" }];
        return final;
      },
    }),
    createFriendRequest: build.mutation<{ message: string }, string>({
      query(receiverId) {
        return {
          url: "friendRequest/sendFriendRequest",
          method: "POST",
          body: {
            receiverId,
          },
        };
      },
    }),
  }),
  overrideExisting: true,
});
export const {
  useSearchUserQuery,
  useGetFriendListQuery,
  useCreateFriendRequestMutation,
} = homeApi;
