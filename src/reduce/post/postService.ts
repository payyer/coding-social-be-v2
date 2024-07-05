import { IPostRespone } from "../../type/post";
import { apiSlice } from "../apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // Viết Get tất cả các bài psot
    getAllPost: build.query<IPostRespone, void>({
      query: (body) => `post`,
      providesTags(result) {
        if (result) {
          return [
            ...result.metadata.map(({ _id }) => ({
              type: "allPost" as const,
              id: _id,
            })),
            { type: "allPost", id: "ALL_POST" },
          ];
        }
        return [{ type: "allPost", id: "ALL_POST" }];
      },
    }),
    likePost: build.mutation<{ message: string }, string>({
      query(postId) {
        return {
          url: "post/LikePost",
          method: "PUT",
          body: {
            postId,
          },
        };
      },
      invalidatesTags: (result, error, body) => [
        { type: "postOfUser", id: "POST" },
        { type: "allPost", id: "ALL_POST" },
      ],
    }),
    unLikePost: build.mutation<{ message: string }, string>({
      query(postId) {
        return {
          url: "post/unLikePost",
          method: "PUT",
          body: {
            postId,
          },
        };
      },
      invalidatesTags: (result, error, body) => [
        { type: "postOfUser", id: "POST" },
        { type: "allPost", id: "ALL_POST" },
      ],
    }),
    deletePost: build.mutation<{ message: string }, string>({
      query(postId) {
        return {
          url: "post/deletePost",
          method: "DELETE",
          body: {
            postId,
          },
        };
      },
      invalidatesTags: (result, error, body) => [
        { type: "postOfUser", id: "POST" },
        { type: "allPost", id: "ALL_POST" },
      ],
    }),
  }),
  overrideExisting: true,
});
export const {
  useLikePostMutation,
  useUnLikePostMutation,
  useDeletePostMutation,
  useGetAllPostQuery,
} = postApi;
