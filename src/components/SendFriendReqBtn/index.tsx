import { useState } from "react";
import {
  useDeleteFriendReqMutation,
  useSendFriendRequsetMutation,
} from "../../reduce/friendRequest/friendRequest";

interface SendFriendReqBtn {
  isRequestinit: boolean;
  receiverId: string;
}

export const SendFriendReqBtn = ({
  isRequestinit,
  receiverId,
}: SendFriendReqBtn) => {
  // ------ State -------
  const [isRequest, setIsRequest] = useState(isRequestinit);

  // ------ RTK Query ------
  const [sendFriendReqRTK] = useSendFriendRequsetMutation();
  const [deleteFriendReqRTK] = useDeleteFriendReqMutation();

  // ------ Function Handler ------
  const sendFriendReq = () => {
    sendFriendReqRTK(receiverId);
    setIsRequest(true);
  };
  const unAddFriend = () => {
    deleteFriendReqRTK(receiverId);
    setIsRequest(false);
  };

  return (
    <div>
      {!isRequest && (
        <button
          onClick={sendFriendReq}
          className="px-2 bg-secondary font-medium py-1 rounded-lg hover:bg-primary hover:text-black"
        >
          Thêm bạn
        </button>
      )}
      {isRequest && (
        <button
          onClick={unAddFriend}
          className="px-2 bg-secondary font-medium py-1 rounded-lg hover:bg-primary hover:text-black"
        >
          Hủy yêu cầu kết bạn
        </button>
      )}
    </div>
  );
};
