import { SearchBar } from "../SearchBar";
import { AvatarDropdown } from "../AvatarDropdown";
import { NavBarLeftSide } from "../NavBarLeftSide";
import { NavBarRightSide } from "../NavBarRightSide";
import { LogoCodingSocial } from "../LogoCodingSocial";
import { BellIconDropdown } from "../BellIconDropdown";
import { NavChatBox } from "../NavChatBox/intex";

export const MyNavBar = () => {
  return (
    <>
      <div className="fixed flex items-center justify-between w-full h-nav-height border-border border-b px-4 z-[1]">
        {/* <Burger /> */}
        <LogoCodingSocial />
        <div className=" flex mx-4  flex-1 sm:flex-none sm:w-[320px] md:w-[400px] lg:w-[500px]">
          <SearchBar />
        </div>
        <div className="flex items-center gap-3">
          <NavChatBox />
          <BellIconDropdown />
          <AvatarDropdown height="h-11" />
        </div>

        {/* 2 side off navbar */}
        <NavBarLeftSide />
        <NavBarRightSide />
      </div>
    </>
  );
};
