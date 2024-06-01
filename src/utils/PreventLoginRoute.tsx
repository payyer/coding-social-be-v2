import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PreventLoginRoute = () => {
  const accessToken = Cookies.get("accessToken");
  return accessToken ? <Navigate to={"/"} /> : <Outlet />;
};

export default PreventLoginRoute;
