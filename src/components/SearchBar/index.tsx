import { FaSearch } from "react-icons/fa";
interface ISearchBar {
  placeholder?: string;
}
export const SearchBar = ({ placeholder }: ISearchBar) => {
  return (
    <div className={`relative w-full `}>
      <input
        type="text"
        className="w-full bg-input-background py-2 rounded-lg pl-12 pr-4"
        placeholder={`${placeholder ? placeholder : "Thanh tìm kiếm"} `}
      />
      <FaSearch
        className={`absolute text-text top-[7px] left-[6px] mt-1 text-xl mx-2 cursor-pointer hover:opacity-75`}
      />
    </div>
  );
};
