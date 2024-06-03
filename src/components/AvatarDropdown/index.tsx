import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../reduce/account/accountService";

interface IAvatarProp {
  height?: string;
}
export const AvatarDropdown = ({ height }: IAvatarProp) => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      navigate("/login");
    });
  };

  return (
    <div className="my-auto flex">
      <div className="dropdown dropdown-end ">
        <div tabIndex={0} role="button" className="flex">
          <div className="avatar">
            <div className={`${height ? height : "h-12"} rounded-full`}>
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu z-[1] mt-2 dropdown-content shadow-sm shadow-primary p-2  bg-base-100 rounded-box w-36 font-medium"
        >
          <li>
            <a>Trang cá nhân</a>
          </li>
          <li>
            <a>Công việc</a>
          </li>
          <li>
            <a>Tin nhắn</a>
          </li>
          <li>
            <a>Bạn bè</a>
          </li>
          <li onClick={handleLogout}>
            <a>Đăng xuất</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
