import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export const Burger = () => {
  const [isOpenBurger, setIsOpenBurger] = useState<boolean>(true);
  const managerBurger = () => {
    setIsOpenBurger(!isOpenBurger);
  };
  return (
    <>
      <div onClick={managerBurger} className="relative cursor-pointer">
        <GiHamburgerMenu className="text-4xl" />
      </div>
      <ul
        className={`${
          isOpenBurger ? "hidden" : ""
        } absolute bg-background w-full top-nav-height`}
      >
        <li className="py-4 border-border border-b  cursor-pointer">
          <p className="text-center text-lg font-medium  hover:opacity-70">
            Thông tin cá nhân
          </p>
        </li>
        <li className="py-4 border-border border-b  cursor-pointer">
          <p className="text-center text-lg font-medium  hover:opacity-70">
            Tin nhắn
          </p>
        </li>
        <li className="py-4 border-border border-b  cursor-pointer">
          <p className="text-center text-lg font-medium  hover:opacity-70">
            Bạn bè
          </p>
        </li>
        <li className="py-4 border-border border-b  cursor-pointer">
          <p className="text-center text-lg font-medium  hover:opacity-70">
            Đăng xuất
          </p>
        </li>
      </ul>
    </>
  );
};
