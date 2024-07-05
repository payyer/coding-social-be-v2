import { AllSearchUser } from "./pages/AllSearchUser";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";

const LinkPage = [
  {
    link: "/",
    element: <Home />,
  },
  {
    link: "/allSearchUser",
    element: <AllSearchUser />,
  },
  {
    link: "/profile/:userId",
    element: <Profile />,
  },
];

export default LinkPage;
