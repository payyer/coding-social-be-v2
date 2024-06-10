import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../../../store";
import { setSearchFriendInput } from "../../../reduce/search/searchSlice";

interface ISearchFriend {
  searchValue: string;
}

export const SearchFriend = ({ searchValue }: ISearchFriend) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchFriendInput(searchValue));
  }, [searchValue]);
  // const { data, isFetching } = useGetFriendListQuery(searchValue);

  // const filteredItem = data?.metadata.filter((item) =>
  //   item.user_name.toLowerCase().includes(searchValue.toLowerCase())
  // );

  return (
    <>
      {/* {isFetching && <SearchSkeleton />}

      {!isFetching && searchValue && (
        <div className="absolute w-full mt-4 rounded-lg shadow bg-background shadow-primary z-[11]">
          {filteredItem &&
            filteredItem.map((item) => {
              return <SearchItem name={item.user_name} key={item._id} />;
            })}
        </div>
      )} */}
    </>
  );
};
