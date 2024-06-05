import { FaPlusCircle } from "react-icons/fa";

export const BtnCreatePost = () => {
  return (
    <button className="flex items-center justify-center gap-2 bg-second-background group rounded-xl py-4 w-[460px] md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto hover:bg-primary hover:text-black font-bold">
      Thêm bài viết{" "}
      <FaPlusCircle className="text-primary group-hover:text-black" />
    </button>
  );
};
