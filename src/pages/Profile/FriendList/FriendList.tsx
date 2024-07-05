import { useEffect } from "react";
import {
  ViewFriendList,
  setViewFriendList,
} from "../../../reduce/profile/profileSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../store";
import { FriendItem } from "../FriendItem/FriendItem";
import { useGetFriendRqListQuery } from "../../../reduce/friendRequest/friendRequest";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { useGetFriendListOfUserQuery } from "../../../reduce/profile/profileService";
import { IFriendItem, IGetFriendRespone } from "../../../type/friendReqeust";
import { MdGroups } from "react-icons/md";

export const FriendList = () => {
  // ------ Redux ------
  const dispatch = useAppDispatch();
  const viewFriendList = useAppSelector(
    (state: RootState) => state.profile.viewFriendList
  );
  // ------ RTK Query ------
  const { data: getListFriendRq } = useGetFriendRqListQuery();
  const { data: friendList } = useGetFriendListOfUserQuery("all");

  // ------ Function Handler ------
  const handnleSetViewFriendList = (view: ViewFriendList) => {
    dispatch(setViewFriendList(view));
  };

  useEffect(() => {}, [dispatch]);
  console.log({ friendList });
  return (
    <>
      <div className="px-4 flex lg:w-[900px] lg:px-0  mx-auto mb-4 gap-2 ">
        <button
          onClick={() => handnleSetViewFriendList(ViewFriendList.List)}
          className="bg-second-background px-4 py-2 rounded-lg hover:bg-primary font-medium hover:text-black"
        >
          Danh sách
        </button>
        <button
          onClick={() => handnleSetViewFriendList(ViewFriendList.FriendRequest)}
          className="bg-second-background px-4 py-2 rounded-lg hover:bg-primary font-medium hover:text-black"
        >
          Lời mời kết bạn
        </button>
      </div>

      {/* Dánh sách bạn bè */}
      {viewFriendList == ViewFriendList.List && (
        <div className="px-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:w-[900px] lg:px-0 mx-auto">
          {friendList &&
            friendList.metadata &&
            friendList.metadata.length > 0 &&
            friendList.metadata
              .filter(
                (friendItem): friendItem is IGetFriendRespone =>
                  (friendItem as IGetFriendRespone).user_name !== undefined
              )
              .map((friendItem: IGetFriendRespone) => {
                return (
                  <FriendItem key={friendItem._id} myFriendData={friendItem} />
                );
              })}
        </div>
      )}
      {viewFriendList == ViewFriendList.List &&
        friendList &&
        friendList.metadata &&
        friendList.metadata.length < 1 && (
          <div className="h-[300px] flex flex-col items-center justify-center gap-1">
            <MdGroups className="text-[120px]" />
            <p className="text-2xl font-medium">Bạn chưa có bạn bè</p>
          </div>
        )}

      {/* Khi có lời mới kết bạn */}
      {/* TODO: Đang xử lý lời mời kết bạn, cần chỉnh sửa lại respone từ back-end để hợp lý hơn khi gõi FriendList */}
      {/* TODO: Cần xem xết chỉnh sửa lại type */}
      {viewFriendList == ViewFriendList.FriendRequest && (
        <div className="px-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:w-[900px] lg:px-0  mx-auto">
          {getListFriendRq &&
            getListFriendRq.metadata &&
            getListFriendRq.metadata.length > 0 &&
            getListFriendRq.metadata
              .filter(
                (friendItem): friendItem is IFriendItem =>
                  (friendItem as IFriendItem).sender_id !== undefined
              )
              .map((friendItem: IFriendItem) => {
                return (
                  <FriendItem
                    key={friendItem._id}
                    friendData={friendItem}
                    friendRequest
                  />
                );
              })}
        </div>
      )}
      {/* Khi không có lời mời kết bạn nào */}
      {viewFriendList == ViewFriendList.FriendRequest &&
        getListFriendRq &&
        getListFriendRq.metadata &&
        getListFriendRq.metadata.length < 1 && (
          <div className="h-[300px] flex flex-col items-center justify-center gap-4">
            <FaRegFaceSmileWink className="text-[120px]" />
            <p className="text-2xl font-medium">
              Bạn chưa có lời mới kết bạn nào
            </p>
          </div>
        )}
    </>
  );
};
