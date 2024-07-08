import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../components/Avatar";
import { IChatRoom } from "../../../type/charRoom";
interface IListChatProps {
  chatItem: IChatRoom;
}
export const ListChat = ({ chatItem }: IListChatProps) => {
  const currentUser = localStorage.getItem("userId");
  const navigate = useNavigate();
  if (
    !chatItem ||
    !chatItem.members ||
    chatItem.members.length < 2 ||
    !currentUser
  ) {
    return null; // or some fallback UI
  }

  const chatWith =
    chatItem.members[0]._id === currentUser
      ? chatItem.members[1]
      : chatItem.members[0];
  //   const chatRoomId = chatItem._id;

  return (
    <div
      onClick={() => navigate(`/messages/${chatItem._id}`)}
      className="p-4 hover:bg-second-background rounded-md cursor-pointer"
    >
      <div className="flex flex-col">
        <div className="flex items-start gap-2">
          <Avatar media={chatWith.user_avatar} height="h-12" />
          <p className="text-pretty text-base line-clamp-2">
            <span className="font-bold hover:underline">
              {chatWith.user_name}
            </span>
            <span className="line-clamp-1">Say hi with your friend</span>
          </p>
        </div>
      </div>
    </div>
  );
};
