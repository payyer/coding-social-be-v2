import { Avatar } from "../../Avatar";
import { useAppDispatch } from "../../../store";
import { isOpenChat } from "../../../reduce/home/homeSlice";
import { IChatRoom } from "../../../type/charRoom";

interface INavChatBoxItemProps {
  chatItem?: IChatRoom;
}
export const NavChatBoxItem = ({ chatItem }: INavChatBoxItemProps) => {
  const dispatch = useAppDispatch();
  const handleCloseChatBox = () => {
    dispatch(isOpenChat({ openChatBox: false }));
  };
  return (
    <li
      className="hover:bg-second-background cursor-pointer rounded-md"
      onClick={handleCloseChatBox}
    >
      <div className="flex flex-col">
        <div className="flex items-start gap-2">
          <Avatar height="h-12" />
          <p className="text-pretty text-base line-clamp-2">
            <span className="font-bold hover:underline">Jennei</span>{" "}
            <span className="line-clamp-1">Say hi with your friend</span>
          </p>
        </div>
      </div>
    </li>
  );
};
