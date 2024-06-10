import { IoChatbox } from "react-icons/io5";
import { NavChatBoxItem } from "./NavChatBoxItem/NavChatBoxItem";

export const NavChatBox = () => {
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
        className="dropdown-content block p-0 mt-2 z-[1] rounded-tl-2xl rounded-bl-2xl rounded-r-non  menu shadow-sm shadow-primary bg-base-100  w-80 h-80 overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary"
      >
        <li className="px-4 py-4 text-center bg-background text-xl font-medium  border-b border-primary">
          Tin nhắn
        </li>
        <NavChatBoxItem />
        <NavChatBoxItem />
        <NavChatBoxItem />
        <NavChatBoxItem />
        <NavChatBoxItem />
        <li className="px-4 py-2 text-center bg-background font-medium  border-b border-primary hover:text-primary cursor-pointer">
          Xem thêm
        </li>
      </ul>
    </div>
  );
};
