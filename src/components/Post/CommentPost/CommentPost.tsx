import { SubmitHandler, useForm } from "react-hook-form";
import { Avatar } from "../../Avatar";
import { ICommentInput, ICommentItem } from "../../../type/comment";
import { useGetUserInfoQuery } from "../../../reduce/profile/profileService";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetAllCommentOfPostQuery,
} from "../../../reduce/comment/commentApi";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";

interface ICommentPostProps {
  postId: string;
}
export const CommentPost = ({ postId }: ICommentPostProps) => {
  console.log({ postId });
  const userId = localStorage.getItem("userId");
  const [createComment] = useCreateCommentMutation();
  const { data: commentsOfPost } = useGetAllCommentOfPostQuery(postId);
  const [commentParent, setCommentParent] = useState<string | undefined>(
    undefined
  );
  const [deleteCommnet] = useDeleteCommentMutation();
  const { data } = useGetUserInfoQuery(userId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICommentInput>();
  const onSubmit: SubmitHandler<ICommentInput> = (data) => {
    createComment({
      post_id: postId,
      message: data.message,
      commentParent: commentParent,
    })
      .then(() => {
        setCommentParent(undefined);
        setItemReply(undefined);
        reset();
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  const [itemReply, setItemReply] = useState<ICommentItem | undefined>(
    undefined
  );
  const replyComment = (comment: ICommentItem) => {
    setCommentParent(comment._id);
    setItemReply(comment);
  };
  const unReplyCommen = () => {
    reset();
    setCommentParent(undefined);
    setItemReply(undefined);
  };

  return (
    <div className="w-full flex flex-col justify-center gap-4 mt-4">
      {/* List Comment */}
      {commentsOfPost?.metadata &&
        commentsOfPost.metadata.map((item) => {
          return (
            <>
              {item.parent_id ? null : (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 ">
                    <Avatar
                      media={item.user_id_create.user_avatar}
                      height="h-10 mt-1"
                    />
                    <div className="w-full bg-background p-2 pb-8 rounded-lg outline-none relative">
                      <p className="font-bold hover:underline cursor-pointer text-lg">
                        {item.user_id_create.user_name}
                      </p>
                      {item.message}
                      <div className="absolute flex gap-2 bottom-2 right-2 ">
                        <span
                          onClick={() => replyComment(item)}
                          className="text-primary hover:underline cursor-pointer"
                        >
                          Phản hồi
                        </span>
                        <span className="text-primary hover:underline cursor-pointer">
                          Xem thêm
                        </span>
                        {item.user_id_create._id == userId ? (
                          <span
                            onClick={() => {
                              deleteCommnet({ commentId: item._id });
                            }}
                            className="text-primary hover:underline hover:text-red-400 cursor-pointer"
                          >
                            Xóa bình luận
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  {/* Child Comment */}
                  {item.children.length > 0 ? (
                    <>
                      {item.children.map((item) => {
                        return (
                          <div className="flex gap-2 ml-12">
                            <Avatar
                              media={item.user_id_create.user_avatar}
                              height="h-10 mt-1"
                            />
                            <div className="max-w-full bg-background p-2 rounded-lg outline-none w-full">
                              <p className="font-bold hover:underline cursor-pointer text-lg">
                                {item.user_id_create.user_name}
                              </p>
                              {item.message}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              )}
            </>
          );
        })}

      {/* Create comment */}
      <div className="flex gap-4">
        <Avatar media={data?.metadata.user_avatar} height="h-12" />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-2">
          <input
            className="w-full bg-background p-2 rounded-lg outline-none"
            {...register("message", { required: true })}
            autoComplete="off"
          />
          <input type="submit" />
        </form>
      </div>
      {itemReply ? (
        <div>
          <div className="flex gap-2 items-center ml-12">
            <p
              onClick={unReplyCommen}
              className="flex-shrink-0 text-text hover:underline cursor-pointer"
            >
              <ImCancelCircle className="text-xl hover:text-red-400" />
            </p>
            <Avatar
              media={itemReply.user_id_create.user_avatar}
              height="h-10 mt-1"
            />
            <div className="max-w-full bg-background p-2 rounded-lg outline-none w-full">
              <p className="font-bold hover:underline cursor-pointer text-lg">
                {itemReply.user_id_create.user_name}
              </p>
              {itemReply.message}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
