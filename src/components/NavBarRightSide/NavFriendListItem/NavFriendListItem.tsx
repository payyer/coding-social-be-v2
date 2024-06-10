import { Avatar } from "../../Avatar";
import { useAppDispatch } from "../../../store";
import { isOpenChat } from "../../../reduce/home/homeSlice";

interface INavFriendListItem {
  isOnline: boolean;
  name: string;
}

export const NavFriendListItem = ({ isOnline, name }: INavFriendListItem) => {
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
        <Avatar isOnline={isOnline} height="h-8" />
        <p className="font-medium line-clamp-1">{name}</p>
      </div>
    </li>
  );
};
