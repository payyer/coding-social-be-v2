import { PostContent } from "./PostConent/PostContent";
import { PostHeader } from "./PostHeader/PostHeader";
import { PostImage } from "./PostImage/PostImage";
import { PostInteractions } from "./PostInteractions/PostInteractions";

export const Post = () => {
  return (
    <div className="bg-second-background rounded-xl p-4 w-[460px] md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto">
      <PostHeader />
      <PostContent />
      <PostImage />
      <PostInteractions />
    </div>
  );
};
