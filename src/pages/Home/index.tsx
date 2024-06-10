import { BtnCreatePost } from "../../components/BtnCreatePost";
import { Post } from "../../components/Post";

export const Home = () => {
  return (
    <div className="h-screen bg-background ">
      <div className="pt-nav-height pb-2">
        <div className="mx-4 my-4">
          {/* <AllSearchuser /> */}
          <div className="my-4">
            <BtnCreatePost />
          </div>
          <Post />
        </div>
      </div>
    </div>
  );
};
