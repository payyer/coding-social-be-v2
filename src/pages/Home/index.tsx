import { BtnCreatePost } from "../../components/BtnCreatePost";
import { MyNavBar } from "../../components/MyNavBar";
import { Post } from "../../components/Post";

export const Home = () => {
  return (
    <>
      <MyNavBar />
      {/* overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary */}
      <div className="h-screen bg-background ">
        <div className="pt-nav-height pb-2">
          <div className="mx-4 my-4">
            <div className="my-4">
              <BtnCreatePost />
            </div>
            <Post />
          </div>
        </div>
      </div>
    </>
  );
};
