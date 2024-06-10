import { FaUserFriends } from "react-icons/fa";
import { Avatar } from "../Avatar";
import { FcBriefcase } from "react-icons/fc";

export const NavBarLeftSide = () => {
  const userName = localStorage.getItem("userName");
  return (
    <div className="hidden lg:block absolute top-nav-height h-screen w-60 border-border border-r">
      <ul className="mr-4 mt-4">
        <li className="flex items-center hover:bg-second-background px-2 py-1 rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <Avatar height="h-8" />
            <p className="font-bold">{userName}</p>
          </div>
        </li>
        <li className="hover:bg-second-background px-2 py-2 rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <FaUserFriends className="text-xl text-primary" />
            <p className="font-bold">Bạn bè</p>
          </div>
        </li>
        <li className="hover:bg-second-background px-2 py-2 rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <FcBriefcase className="text-xl text-primary" />
            <p className="font-bold">Công việc 🔥</p>
          </div>
        </li>
      </ul>
    </div>
  );
};
