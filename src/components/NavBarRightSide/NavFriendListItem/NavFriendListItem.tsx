import { Avatar } from "../../Avatar";
import { useAppDispatch } from "../../../store";
import { isOpenChat } from "../../../reduce/home/homeSlice";
import { Media } from "../../../type/profile";

interface INavFriendListItem {
  isOnline: boolean;
  name: string;
  user_avartar: Media;
}

export const NavFriendListItem = ({
  isOnline,
  name,
  user_avartar,
}: INavFriendListItem) => {
  const dispatch = useAppDispatch();
  const handleCloseChatBox = () => {
    dispatch(isOpenChat(true));
  };
  return (
    <li
      onClick={handleCloseChatBox}
      className="flex items-center hover:bg-second-background px-2 py-2 rounded-lg cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <Avatar media={user_avartar} isOnline={isOnline} height="h-8" />
        <p className="font-medium line-clamp-1">{name}</p>
      </div>
    </li>
  );
};
