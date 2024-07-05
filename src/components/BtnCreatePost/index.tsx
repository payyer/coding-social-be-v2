import { FaPlusCircle } from "react-icons/fa";
import { useAppDispatch } from "../../store";
import { setCreatePostModal } from "../../reduce/profile/profileSlice";

export const BtnCreatePost = () => {
  const dispatch = useAppDispatch();
  const handleOpenCreatePostModal = () => {
    dispatch(setCreatePostModal(true));
  };
  return (
    <button
      onClick={handleOpenCreatePostModal}
      className="flex items-center justify-center gap-2 bg-second-background group rounded-xl py-4 w-[460px] md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto hover:bg-primary hover:text-black font-bold"
    >
      Thêm bài viết{" "}
      <FaPlusCircle className="text-primary group-hover:text-black" />
    </button>
  );
};
