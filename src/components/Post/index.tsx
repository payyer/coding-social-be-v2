import { IPostItem } from "../../type/post";
import { PostContent } from "./PostConent/PostContent";
import { PostHeader } from "./PostHeader/PostHeader";
import { PostImage } from "./PostImage/PostImage";
import { PostInteractions } from "./PostInteractions/PostInteractions";

interface IPostInterface {
  postItem: IPostItem | undefined;
  // userData: IGetUserInfoRespone | undefined;
}

export const Post = ({ postItem }: IPostInterface) => {
  return (
    <div className="bg-second-background rounded-xl p-4 w-[460px] md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto">
      <PostHeader postItem={postItem} />
      <PostContent postItem={postItem} />
      {/* TODO: Ti nữa xử lý truyền hình ảnh vào bài post */}
      <PostImage ImageListProps={postItem?.post_media} />
      <PostInteractions postItem={postItem} />
    </div>
  );
};
