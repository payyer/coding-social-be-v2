import { BtnCreatePost } from "../../components/BtnCreatePost";
import { Post } from "../../components/Post";
import { PostSkeleton } from "../../components/PostSkeleton/PostSkeleton";
import { useGetAllPostQuery } from "../../reduce/post/postService";
import io from "socket.io-client";
const socket = io("http://localhost:8000/");
socket.on("connect", () => {
  console.log(socket.id);
});
export const Home = () => {
  const { data: AllPost, isFetching } = useGetAllPostQuery();
  return (
    <div className="h-screen bg-background ">
      <div className="pt-nav-height pb-2">
        <div className="mx-4 my-4">
          {/* <AllSearchuser /> */}
          <div className="my-4">
            <BtnCreatePost />
          </div>
          {AllPost?.metadata.map((post) => {
            return (
              <div className="mb-4">
                <Post key={post._id} postItem={post} />
              </div>
            );
          })}
          {/* {isFetching && <PostSkeleton />} */}
        </div>
      </div>
    </div>
  );
};
