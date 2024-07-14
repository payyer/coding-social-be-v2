import { ICommentInput, ICreateCommentResponse, IGetAllCommentRespone } from "../../type/comment";
import { apiSlice } from "../apiSlice";

export const commentAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCommentOfPost: build.query<IGetAllCommentRespone, string>({
      query: (postId) =>
        `comment/${postId}`,
      providesTags(result) {
        if (result) {
          return [
            ...result.metadata.map(({ _id }) => ({
              type: "resetComment" as const,
              id: _id,
            })),
            { type: "resetComment", id: "Comment" },
          ];
        }
        return [{ type: "resetComment", id: "Comment" }];
      },
    }),
    createComment: build.mutation<ICreateCommentResponse, ICommentInput>({
      query(body) {
        return {
          url: "comment/",
          method: "POST",
          body
        };
      },
      invalidatesTags: (result, error, body) => [
        { type: "resetComment", id: "Comment" },
      ],
    }),
    deleteComment: build.mutation<void, {commentId: string}>({
        query(body) {
          return {
            url: "comment/",
            method: "DELETE",
            body: {
                commentId: body.commentId
            }
          };
        },
        invalidatesTags: (result, error, body) => [
          { type: "resetComment", id: "Comment" },
        ],
      }),
  }),
  overrideExisting: true,
});
export const {
    useGetAllCommentOfPostQuery,
    useCreateCommentMutation,
    useDeleteCommentMutation
} = commentAPI;
