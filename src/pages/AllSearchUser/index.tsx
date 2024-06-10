import { useState } from "react";
import { Avatar } from "../../components/Avatar";
import {
  useCreateFriendRequestMutation,
  useSearchUserQuery,
} from "../../reduce/home/homeService";
import { RootState, useAppSelector } from "../../store";

export const AllSearchUser = () => {
  const searchValue = useAppSelector(
    (state: RootState) => state.searchInput.searchUserInput
  );
  const [limit, setLimit] = useState<number>(10);
  const [createFriendRequest] = useCreateFriendRequestMutation();

  const { data, isFetching, refetch } = useSearchUserQuery(
    {
      userName: searchValue,
      limit: limit,
      page: 1,
    },
    {
      skip: !searchValue, // Chỉ thực hiện query khi có giá trị searchValue
    }
  );

  const sendFriendRequest = (receiverId: string) => {
    createFriendRequest(receiverId).then((res) => {
      refetch();
      console.log(res);
    });
  };

  return (
    <div className="h-screen bg-background ">
      <div className="pt-nav-height pb-2">
        <div className="mx-4 my-4">
          <div className="bg-second-background rounded-xl p-4 w-[460px] md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto ">
            {data?.metadata.map((user) => {
              return (
                <div className="flex py-2 gap-2 border-b border-border last:border-none">
                  <Avatar height="h-12" />
                  <div className="flex flex-1 items-center justify-between ">
                    <p className="line-clamp-1 font-medium hover:underline cursor-pointer">
                      {user.user_name}
                    </p>
                    {user.isFriend && (
                      <button
                        disabled
                        className="px-2 bg-secondary bg-opacity-60 font-medium py-1 rounded-lg "
                      >
                        Đã là bạn bè
                      </button>
                    )}
                    {!user.isFriend && !user.isRequest && (
                      <button
                        onClick={() => sendFriendRequest(user._id)}
                        className="px-2 bg-secondary font-medium py-1 rounded-lg hover:bg-primary hover:text-black"
                      >
                        Thêm bạn
                      </button>
                    )}

                    {!user.isFriend && user.isRequest && (
                      <button className="px-2 bg-secondary font-medium py-1 rounded-lg hover:bg-primary hover:text-black">
                        Đã gửi lời mời kết bạn
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-second-background mt-4  rounded-xl w-[460px] md:w-[500px] lg:w-[520px] xl:w-[600px] mx-auto ">
            <button
              onClick={() => setLimit(limit + 10)}
              className="w-full py-2 rounded-lg bg-second-background font-medium hover:text-primary"
            >
              Tải thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
