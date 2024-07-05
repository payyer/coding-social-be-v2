import { SearchBar } from "../SearchBar";
import { useGetFriendListQuery } from "../../reduce/home/homeService";
import { NavFriendListItem } from "./NavFriendListItem/NavFriendListItem";
import { NavBarFriendListSkeleton } from "./NavBarFriendListSkeleton/NavBarFriendListSkeleton";
import { RootState, useAppSelector } from "../../store";

export const NavBarRightSide = () => {
  const query = useAppSelector(
    (state: RootState) => state.searchInput.searchFriendInput
  );
  const { data, isFetching } = useGetFriendListQuery(query);
  console.log({ data });
  return (
    <div className="hidden lg:block absolute right-4 top-nav-height h-screen w-60 border-border border-l ">
      <div className="mt-4 mx-4 ">
        <SearchBar searchMode={2} placeholder="Tìm bạn bè" />
      </div>
      <ul className="mt-4 mx-4 ">
        {!isFetching &&
          data?.metadata.map((friend) => {
            return (
              <NavFriendListItem
                key={friend._id}
                isOnline
                name={friend.user_name}
                user_avartar={friend.user_avatar}
              />
            );
          })}

        {!isFetching && data && data?.metadata.length <= 0 && (
          <div className="">Bạn chưa có bạn bè</div>
        )}

        {isFetching && <NavBarFriendListSkeleton />}
      </ul>
    </div>
  );
};
