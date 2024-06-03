import { Avatar } from "../Avatar";
import { SearchBar } from "../SearchBar";

export const NavBarRightSide = () => {
  return (
    <div className="absolute right-0 top-nav-height h-screen w-60 border-border border-l">
      <div className="mt-4 mx-4 ">
        <SearchBar placeholder="Tìm bạn bè" />
      </div>
      <ul className="mt-4 mx-4 ">
        <li className="flex items-center hover:bg-second-background px-2 py-2 rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <Avatar isOnline height="h-8" />
            <p className="font-medium line-clamp-1">Lê Thị Xuân Rin</p>
          </div>
        </li>
        <li className="flex items-center hover:bg-second-background px-2 py-2 rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <Avatar isOnline={false} height="h-8" />
            <p className="font-medium">Jennie </p>
          </div>
        </li>
      </ul>
    </div>
  );
};
