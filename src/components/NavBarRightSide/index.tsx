import { SearchBar } from "../SearchBar";
import { NavFriendListItem } from "./NavFriendListItem/NavFriendListItem";

export const NavBarRightSide = () => {
  return (
    <div className="hidden lg:block absolute right-4 top-nav-height h-screen w-60 border-border border-l ">
      <div className="mt-4 mx-4 ">
        <SearchBar placeholder="Tìm bạn bè" />
      </div>
      <ul className="mt-4 mx-4 ">
        <NavFriendListItem isOnline />
      </ul>
    </div>
  );
};
