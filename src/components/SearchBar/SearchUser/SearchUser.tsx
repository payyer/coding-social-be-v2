import { useEffect } from "react";
import { useSearchUserQuery } from "../../../reduce/home/homeService";
import { SearchSkeleton } from "../SearchSkeleton/SearchSkeleton";
import { SearchItem } from "../SearchItem/SearchItem";
import { useAppDispatch } from "../../../store";
import { setSearchUserInput } from "../../../reduce/search/searchSlice";
import { useNavigate } from "react-router-dom";
interface ISearchUser {
  searchValue: string;
}
export const SearchUser = ({ searchValue }: ISearchUser) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isFetching, refetch } = useSearchUserQuery(
    {
      userName: searchValue,
      limit: 5,
      page: 1,
    },
    {
      skip: !searchValue, // Chỉ thực hiện query khi có giá trị searchValue
    }
  );

  useEffect(() => {
    if (searchValue) {
      refetch(); // Gọi lại API khi searchValue thay đổi
    }
  }, [searchValue, refetch]);

  const showAllUserSearch = () => {
    dispatch(setSearchUserInput(searchValue));
    navigate("/allSearchUser");
  };
  return (
    <>
      {isFetching && <SearchSkeleton />}

      {!isFetching && searchValue && (
        <div className="absolute w-full mt-4 rounded-lg shadow bg-background shadow-primary z-[11]">
          {data?.metadata?.map((item) => {
            return (
              <SearchItem
                userId={item._id}
                media={item.user_avatar}
                name={item.user_name}
                key={item._id}
              />
            );
          })}
          {/* {data && data?.metadata.length > 5 && (

          )} */}
          <div
            onClick={showAllUserSearch}
            className=" p-2 text-primary text-right "
          >
            <span className="hover:underline cursor-pointer">Xem tất cả</span>
          </div>
        </div>
      )}
    </>
  );
};
