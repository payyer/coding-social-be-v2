import { useState } from "react";
import { FaCommentDots, FaShare } from "react-icons/fa";
import { IPostItem } from "../../../type/post";
import {
  useLikePostMutation,
  useUnLikePostMutation,
} from "../../../reduce/post/postService";
import { CommentPost } from "../CommentPost/CommentPost";

interface PostInteractions {
  postItem: IPostItem | undefined;
}
export const PostInteractions = ({ postItem }: PostInteractions) => {
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const [likePost] = useLikePostMutation();
  const [unLikePost] = useUnLikePostMutation();

  const handleLikePost = () => {
    if (postItem && !postItem?.isLike) {
      likePost(postItem?._id)
        .then((res) => console.log({ res }))
        .catch((error) => console.log(error));
    }

    if (postItem && postItem?.isLike) {
      unLikePost(postItem?._id)
        .then((res) => console.log({ res }))
        .catch((error) => console.log(error));
    }
  };
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p>
            🔥
            {postItem?.post_emoji ? postItem.post_emoji : "0"}
          </p>
        </div>
        <div className="flex gap-2">
          <p>{postItem?.post_comment} bình luận</p>
          <p>{postItem?.post_shared ? postItem?.post_shared : "0"} chia sẻ</p>
        </div>
      </div>
      <div className="border-t border-b border-border grid grid-cols-3 mt-4">
        <button
          onClick={handleLikePost}
          className="py-1 hover:bg-secondary font-medium hover:rounded-lg"
        >
          <p className="hover:scale-125 ">
            🔥{" "}
            {postItem?.isLike ? (
              <span className="text-[#ff6723]">Đã thích</span>
            ) : (
              "Thích"
            )}
          </p>
        </button>
        <button className="py-1 hover:bg-secondary font-medium hover:rounded-lg">
          <p
            onClick={() => setIsOpenComment(!isOpenComment)}
            className="hover:scale-125 "
          >
            <span>
              <FaCommentDots className="inline-block mb-1 text-green-500" />
            </span>{" "}
            Bình luận
          </p>
        </button>
        <button className="py-1 hover:bg-secondary font-medium hover:rounded-lg">
          <p className="hover:scale-125 ">
            <span>
              <FaShare className="inline-block mb-1 " />
            </span>{" "}
            Chia sẻ
          </p>
        </button>
      </div>
      {isOpenComment && postItem && (
        <div className="">
          <CommentPost postId={postItem?._id} />
        </div>
      )}
    </div>
  );
};
