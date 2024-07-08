import { IChatRoomRespone } from "../../type/charRoom";
import { apiSlice } from "../apiSlice";

export const chatRoomApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getChatRooms: build.query<IChatRoomRespone, void>({
      query: () =>
        `chat/getAllChatRoomOfUser`,
    }),
   
  }),
  overrideExisting: true,
});
export const {
  useGetChatRoomsQuery,

} = chatRoomApi;
