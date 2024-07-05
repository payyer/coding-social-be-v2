import { IPostItem } from "../../../type/post";
import { Avatar } from "../../Avatar";
import { FaEarthAmericas } from "react-icons/fa6";
import dayjs from "dayjs";
import { HiDotsHorizontal } from "react-icons/hi";
import { useDeletePostMutation } from "../../../reduce/post/postService";
import { useNavigate } from "react-router-dom";

interface IPostHeaderProps {
  postItem: IPostItem | undefined;
}

export const PostHeader = ({ postItem }: IPostHeaderProps) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [deletePost] = useDeletePostMutation();
  const datePublished = dayjs(postItem?.createdAt).format("DD/MM/YYYY");

  const goToProfile = () => {
    navigate(`/profile/${postItem?.user_id._id}`);
  };
  return (
    <div className="flex justify-between">
      <div className="flex gap-x-2.5">
        <div onClick={goToProfile} className="flex">
          <Avatar postData={postItem} height="h-14" />
        </div>
        <div className="flex flex-col justify-center">
          <h3
            onClick={goToProfile}
            className="font-bold cursor-pointer hover:underline"
          >
            {postItem?.user_id.user_name}
          </h3>
          <p className="text-sm">
            <span>{datePublished}</span>
            <FaEarthAmericas className="inline-block mb-1 ml-2 text-sm" />
          </p>
        </div>
      </div>

      {postItem && userId == postItem.user_id._id && (
        <div className="flex justify-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="rounded-full p-1 hover:bg-primary hover:text-black"
            >
              <HiDotsHorizontal className="text-xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content mt-1 menu bg-base-100 rounded-box z-[1] w-[90px] shadow "
            >
              <li
                onClick={() => deletePost(postItem._id)}
                className="hover:bg-primary flex justify-center rounded-lg hover:text-red-600 "
              >
                <a className="font-bold text-center">Delete</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
