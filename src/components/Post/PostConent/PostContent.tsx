import { IPostItem } from "../../../type/post";

interface IPostContent {
  postItem: IPostItem | undefined;
}
export const PostContent = ({ postItem }: IPostContent) => {
  return (
    <article className="my-2 text-pretty">{postItem?.post_content}</article>
  );
};
