import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../reduce/account/accountService";

export const Home = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const handleLogout = () => {
    logout().then((res) => {
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("role");
      navigate("/login");
    });
  };
  return (
    <div>
      Home
      <button
        onClick={handleLogout}
        className="mx-2 px-4 py-2 bg-green-400 text-black"
      >
        Logout
      </button>
    </div>
  );
};
