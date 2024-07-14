import { Avatar } from "../../Avatar";
import { useAppDispatch } from "../../../store";
import { isOpenChat } from "../../../reduce/home/homeSlice";
import { IChatRoom } from "../../../type/charRoom";
import { useCreateChatRoomMutation } from "../../../reduce/chatRoom/chatRoomApi";

interface INavChatBoxItemProps {
  chatItem: IChatRoom;
}
export const NavChatBoxItem = ({ chatItem }: INavChatBoxItemProps) => {
  const dispatch = useAppDispatch();
  const currentUser = localStorage.getItem("userId");
  const chatWith =
    chatItem.members[0]._id === currentUser
      ? chatItem.members[1]
      : chatItem.members[0];
  const [createChatRoom] = useCreateChatRoomMutation();

  const handleCloseChatBox = () => {
    // Create chatRoom
    createChatRoom(chatWith._id)
      .then((res) => {
        dispatch(
          isOpenChat({
            openChatBox: true,
            userChatId: chatWith._id,
            chatRoomId: res.data?.metadata._id,
            user_name: chatWith.user_name,
            user_avartar: chatWith.user_avatar,
          })
        );
        console.log({ res });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <li
      className="hover:bg-second-background cursor-pointer rounded-md"
      onClick={handleCloseChatBox}
    >
      <div className="flex flex-col">
        <div className="flex items-start gap-2">
          <Avatar media={chatWith.user_avatar} height="h-12" />
          <p className="text-pretty text-base line-clamp-2">
            <span className="font-bold hover:underline">
              {chatWith.user_name}
            </span>{" "}
            <span className="line-clamp-1">Say hi with your friend</span>
          </p>
        </div>
      </div>
    </li>
  );
};
