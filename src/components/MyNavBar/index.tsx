import { SearchBar } from "../SearchBar";
import { AvatarDropdown } from "../AvatarDropdown";
import { NavBarLeftSide } from "../NavBarLeftSide";
import { NavBarRightSide } from "../NavBarRightSide";
import { LogoCodingSocial } from "../LogoCodingSocial";
import { BellIconDropdown } from "../BellIconDropdown";
import { NavChatBox } from "../NavChatBox/intex";
import { useLocation } from "react-router-dom";
import { useGetUserInfoQuery } from "../../reduce/profile/profileService";

export const MyNavBar = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isPageProfile = pathName[1] || null;
  const userId = localStorage.getItem("userId");

  const { data } = useGetUserInfoQuery(userId);
  return (
    <>
      <div className="fixed flex bg-background shadow-sm items-center justify-between w-full h-nav-height border-border border-b px-4 z-[50]">
        {/* <Burger /> */}
        <LogoCodingSocial />
        <div className=" flex mx-4  flex-1 sm:flex-none sm:w-[320px] md:w-[390px] lg:w-[500px]">
          <SearchBar searchMode={1} />
        </div>
        <div className="flex items-center gap-3">
          <NavChatBox />
          <BellIconDropdown />
          <AvatarDropdown data={data} height="h-11" />
        </div>

        {/* 2 side off navbar */}
        {!isPageProfile ? (
          <>
            <NavBarLeftSide data={data} />
            <NavBarRightSide />
          </>
        ) : null}
      </div>
    </>
  );
};
