import { useAcceptFriendRequestMutation } from "../../../reduce/friendRequest/friendRequest";
import {
  useRejectFriendRequestMutation,
  useUnFriendMutation,
} from "../../../reduce/profile/profileService";
import { IFriendItem, IGetFriendRespone } from "../../../type/friendReqeust";

interface IFriendItemProps {
  friendRequest?: boolean;
  friendData?: IFriendItem;
  myFriendData?: IGetFriendRespone;
}

export const FriendItem = ({
  friendRequest,
  friendData,
  myFriendData,
}: IFriendItemProps) => {
  // ---- RTK Query ----
  const [acceptFriendRequestRTK] = useAcceptFriendRequestMutation();
  const [rejectFriendReqRTK] = useRejectFriendRequestMutation();
  const [unFriendRTK] = useUnFriendMutation();

  // ---- Function handler -----
  const acceptFriendRequest = () => {
    if (friendData) acceptFriendRequestRTK(friendData?.sender_id._id);
  };
  const rejectFriendRequest = () => {
    if (friendData) rejectFriendReqRTK(friendData?.sender_id._id);
  };
  const unFriend = () => {
    if (myFriendData) unFriendRTK(myFriendData._id);
  };

  return (
    <div className="flex h-full items-center justify-center rounded-lg ">
      <div className="rounded-lg w-full bg-second-background h-[300px]">
        <div className="h-[200px] ">
          <img
            src={
              friendData
                ? friendData?.sender_id.user_avatar.url
                : myFriendData?.user_avatar.url
            }
            alt=""
            className="object-cover h-full w-full rounded-tr-lg rounded-tl-lg cursor-pointer"
          />
        </div>
        <h3 className="text-2xl font-bold text-center mt-2 text-white">
          <span className="cursor-pointer hover:underline line-clamp-1">
            {friendData && friendData?.sender_id.user_name}
            {myFriendData && myFriendData.user_name}
          </span>
        </h3>

        <div
          className={`mt-2 grid ${
            friendRequest ? "grid-cols-2" : "grid-cols-1"
          } gap-2 justify-center items-center px-2`}
        >
          {friendRequest && (
            <>
              <button
                onClick={acceptFriendRequest}
                className="px-4 py-2 bg-secondary rounded-lg font-medium hover:bg-primary hover:text-black"
              >
                Đồng ý
              </button>
              <button
                onClick={rejectFriendRequest}
                className="px-4 py-2 bg-secondary rounded-lg font-medium hover:bg-red-500 hover:text-black"
              >
                Từ chối
              </button>
            </>
          )}
          {!friendRequest && (
            <button
              onClick={unFriend}
              className="px-4 py-2 bg-secondary rounded-lg font-medium hover:bg-red-500 hover:text-black"
            >
              Hủy kết bạn
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
