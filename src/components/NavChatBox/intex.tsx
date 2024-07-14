import { IoChatbox } from "react-icons/io5";
import { NavChatBoxItem } from "./NavChatBoxItem/NavChatBoxItem";
import { useGetChatRoomsQuery } from "../../reduce/chatRoom/chatRoomApi";
import { useNavigate } from "react-router-dom";

export const NavChatBox = () => {
  const { data } = useGetChatRoomsQuery();
  const navigate = useNavigate();
  const navToMessagePage = () => {
    navigate("/messages/0");
  };

  return (
    <div className="hidden md:block dropdown dropdown-end z-[11]">
      <div tabIndex={0} role="button">
        <div className="relative bg-second-background rounded-full p-[12px]">
          <IoChatbox className="text-xl" />
          <div className="absolute top-0 right-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content block p-0 mt-2 z-[1] rounded-tl-2xl rounded-bl-2xl rounded-r-non  menu shadow-sm shadow-primary bg-base-100  w-80 max-w-80  overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary"
      >
        <li className="px-4 py-4 text-center bg-background text-xl font-medium  border-b border-primary">
          Tin nhắn
        </li>
        {data?.metadata && (
          <>
            {data.metadata.map((item) => {
              return <NavChatBoxItem chatItem={item} key={item._id} />;
            })}
            <li
              onClick={navToMessagePage}
              className="px-4 py-2 text-center bg-background font-medium  border-b border-primary hover:text-primary cursor-pointer"
            >
              Xem thêm
            </li>
          </>
        )}
        {data?.metadata && data.metadata.length < 1 && (
          <li className="px-4 py-2 flex justify-center items-center text-md bg-background font-medium h-32 border-b border-primary ">
            Bạn chưa có tin nhắn nào T_T
          </li>
        )}
      </ul>
    </div>
  );
};
