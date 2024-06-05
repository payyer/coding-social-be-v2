import { FaXmark } from "react-icons/fa6";
import { Avatar } from "../Avatar";
import { IoSend } from "react-icons/io5";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { isOpenChat } from "../../reduce/home/homeSlice";
export const ChatBox = () => {
  const dispatch = useAppDispatch();
  const openChatBox = useAppSelector(
    (state: RootState) => state.home.openChatBox
  );

  const handleCloseChatBox = () => {
    dispatch(isOpenChat(false));
  };

  return (
    <>
      {openChatBox && (
        <div className="fixed hidden md:block h-[430px] w-[328px] bg-second-background bottom-0 right-20 z-[2] shadow shadow-primary rounded-tl-lg rounded-tr-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-2 h-14 border-b border-border">
            <div className="flex items-center gap-2">
              <Avatar isOnline height="h-10 cursor-pointer" />
              <div className="flex flex-col justify-center">
                <p className="font-medium hover:underline cursor-pointer">
                  Jennie
                </p>
                <span className="text-sm">Đang hoạt động</span>
              </div>
            </div>
            <div onClick={handleCloseChatBox}>
              <FaXmark className="text-2xl cursor-pointer hover:opacity-75" />
            </div>
          </div>
          {/* Chat box */}
          <div className="w-full h-80  overflow-y-scroll border-b border-border py-1 px-2">
            <div className="chat chat-start">
              <div className="chat-bubble bg-back">
                It's over Anakin, <br />I have the high ground.
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble">You underestimate my power!</div>
            </div>
          </div>

          {/* Chat input */}
          <div className="h-[53px] p-2 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 px-2 rounded-lg bg-input-background py-1 text-text"
            />
            <div className=" hover:opacity-75 cursor-pointer p-1">
              <IoSend className="text-primary text-xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
