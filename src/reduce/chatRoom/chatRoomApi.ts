import { IChatRoomRespone, ICreateChatRoomRespone } from "../../type/charRoom";
import { apiSlice } from "../apiSlice";

export const chatRoomApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getChatRooms: build.query<IChatRoomRespone, void>({
      query: () =>
        `chat/getAllChatRoomOfUser`,
    }),
    createChatRoom: build.mutation<ICreateChatRoomRespone, string>({
      query(secondUserId) {
        return {
          url: "chat/",
          method: "POST",
          body: {
            secondUserId
          },
        };
      },
    }),
   
  }),
  overrideExisting: true,
});
export const {
  useGetChatRoomsQuery,
  useCreateChatRoomMutation

} = chatRoomApi;
