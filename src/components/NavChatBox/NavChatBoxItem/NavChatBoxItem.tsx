import { Avatar } from "../../Avatar";
import { useAppDispatch } from "../../../store";
import { isOpenChat } from "../../../reduce/home/homeSlice";

export const NavChatBoxItem = () => {
  const dispatch = useAppDispatch();
  const handleCloseChatBox = () => {
    dispatch(isOpenChat(true));
  };
  return (
    <li onClick={handleCloseChatBox}>
      <div className="flex flex-col">
        <div className="flex items-start gap-2">
          <Avatar height="h-12" />
          <p className="text-pretty text-base line-clamp-2">
            <span className="font-bold hover:underline">Lê Thị Xuân Rin:</span>{" "}
            <span className="line-clamp-1">Xin chào các bạn mọi người !</span>
          </p>
        </div>
      </div>
    </li>
  );
};
