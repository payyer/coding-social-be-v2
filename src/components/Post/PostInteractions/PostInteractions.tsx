import { useState } from "react";
import { FaCommentDots, FaShare } from "react-icons/fa";

export const PostInteractions = () => {
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p>🔥100</p>
        </div>
        <div className="flex gap-2">
          <p>10 bình luận</p>
          <p>2 chia sẻ</p>
        </div>
      </div>
      <div className="border-t border-b border-border grid grid-cols-3 mt-4">
        <button className="py-1 hover:bg-secondary font-medium hover:rounded-lg">
          <p className="hover:scale-125 ">🔥 Thích</p>
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
      {isOpenComment && <div className="">Bình luận</div>}
    </div>
  );
};
