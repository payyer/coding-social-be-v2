import { FaBell } from "react-icons/fa6";
import { BellItemPostLike } from "./BellItem/BellItemPostLike";
import { BellItemPostShared } from "./BellItem/BellItemPostShared";
import { BellItemLikeComment } from "./BellItem/BellItemLikeComment";
import { BellItemPostComment } from "./BellItem/BellItemPostComment";
import { BellItemApplications } from "./BellItem/BellItemApplications";
import { BellItemReplyComment } from "./BellItem/BellItemReplyComment";
import { BellItemFriendRequest } from "./BellItem/BellItemFriendRequest";

export const BellIconDropdown = () => {
  return (
    <div className="dropdown dropdown-end z-[11]">
      <div tabIndex={0} role="button">
        <div className="relative bg-second-background rounded-full p-[12px]">
          <FaBell className="text-xl" />
          <div className="absolute top-0 right-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content block p-0 mt-2 z-[1] rounded-tl-2xl rounded-bl-2xl rounded-r-non  menu shadow-sm shadow-primary bg-base-100  w-80 h-80 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary"
      >
        <BellItemFriendRequest />
        <BellItemPostComment />
        <BellItemReplyComment />
        <BellItemPostLike />
        <BellItemLikeComment />
        <BellItemPostShared />
        <BellItemApplications />
      </ul>
    </div>
  );
};
