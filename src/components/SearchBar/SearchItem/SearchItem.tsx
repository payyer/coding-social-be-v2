import { Avatar } from "../../Avatar";

interface ISearchItem {
  name: string;
}
export const SearchItem = ({ name }: ISearchItem) => {
  return (
    <div className="flex px-2 py-2 gap-2 hover:bg-primary hover:text-black bg-background cursor-pointer rounded-lg">
      <Avatar height="h-12" />
      <div className="flex  items-center">
        <p className="line-clamp-1 font-medium">{name}</p>
      </div>
    </div>
  );
};
