import LinkPage from "./navigate";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { VerifyAccount } from "./pages/Verify";
import PrivateRoute from "./utils/PrivateRoute";
import PreventLoginRoute from "./utils/PreventLoginRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RePassword } from "./pages/RePassword";
import { SendVerifyCode } from "./pages/SendVerifyCode";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          {LinkPage.map((link) => {
            return (
              <Route key={link.link} path={link.link} element={link.element} />
            );
          })}
        </Route>
        <Route element={<PreventLoginRoute />}>
          <Route element={<Login />} path="/login" />
          <Route element={<VerifyAccount />} path="/verify" />
          <Route element={<Register />} path="/register" />
          <Route element={<RePassword />} path="/repassword" />
          <Route element={<SendVerifyCode />} path="/sendVerifyCode" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
