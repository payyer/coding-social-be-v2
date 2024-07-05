import { useNavigate } from "react-router-dom";
import { Media } from "../../../type/profile";
import { Avatar } from "../../Avatar";

interface ISearchItem {
  userId: string;
  name: string;
  media: Media;
}
export const SearchItem = ({ media, name, userId }: ISearchItem) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/profile/${userId}`)}
      className="flex px-2 py-2 gap-2 hover:bg-primary hover:text-black bg-background cursor-pointer rounded-lg"
    >
      <Avatar media={media} height="h-12" />
      <div className="flex  items-center">
        <p className="line-clamp-1 font-medium">{name}</p>
      </div>
    </div>
  );
};
