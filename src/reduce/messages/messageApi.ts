import { ICreateMessage, IMessagesRespone } from "../../type/messages";
import { apiSlice } from "../apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query<IMessagesRespone, string>({
      query: (chatRoomId) =>
        `message/${chatRoomId}`,
    }),
    createMessage: build.mutation<{message: string}, ICreateMessage>({
        query({chatRoomId,text }) {
          return {
            url: "message/",
            method: "POST",
            body: {
                chatRoomId,
                text
            },
          };
        },
      }),
  }),
  overrideExisting: true,
});
export const {
  useGetMessagesQuery,
  useCreateMessageMutation

} = messageApi;
