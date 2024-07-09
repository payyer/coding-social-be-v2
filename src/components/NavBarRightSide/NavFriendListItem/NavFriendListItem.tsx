import { Avatar } from "../../Avatar";
import { useAppDispatch } from "../../../store";
import { isOpenChat } from "../../../reduce/home/homeSlice";
import { Media } from "../../../type/profile";
import { useCreateChatRoomMutation } from "../../../reduce/chatRoom/chatRoomApi";

interface INavFriendListItem {
  isOnline: boolean;
  name: string;
  user_avartar: Media;
  userId: string;
}

export const NavFriendListItem = ({
  isOnline,
  name,
  user_avartar,
  userId,
}: INavFriendListItem) => {
  const [createChatRoom] = useCreateChatRoomMutation();

  const dispatch = useAppDispatch();
  const handleCloseChatBox = () => {
    // Create chatRoom
    createChatRoom(userId)
      .then((res) => {
        dispatch(
          isOpenChat({
            openChatBox: true,
            userChatId: userId,
            chatRoomId: res.data?.metadata._id,
            user_name: name,
            user_avartar: user_avartar,
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
