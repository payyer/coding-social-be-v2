import { FaSearch } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { SearchUser } from "./SearchUser/SearchUser";
import { SearchFriend } from "./SearchFriend/SearchFriend";

enum SearchBarMode {
  SearchUser = 1,
  SearchFriend = 2,
}

interface ISearchBar {
  placeholder?: string;
  searchMode: SearchBarMode.SearchFriend | SearchBarMode.SearchUser;
}

export const SearchBar = ({ placeholder, searchMode }: ISearchBar) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [showSearchList, setShowSearchList] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchContainerRef} className={`relative w-full`}>
      <input
        onFocus={() => setShowSearchList(true)}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        type="text"
        className="w-full bg-input-background py-2 rounded-lg pl-12 pr-4"
        placeholder={placeholder || "Thanh tìm kiếm"}
      />
      <FaSearch
        className={`absolute text-text top-[7px] left-[6px] mt-1 text-xl mx-2 cursor-pointer hover:opacity-75`}
      />
      <div className={`${showSearchList && searchMode == 1 ? "" : "hidden"}`}>
        {searchMode === SearchBarMode.SearchUser && (
          <SearchUser searchValue={searchValue} />
        )}

        {searchMode === SearchBarMode.SearchFriend && (
          <SearchFriend searchValue={searchValue} />
        )}
      </div>
    </div>
  );
};
