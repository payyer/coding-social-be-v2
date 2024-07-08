import { AllSearchUser } from "./pages/AllSearchUser";
import { Home } from "./pages/Home";
import { Message } from "./pages/Message";
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
   {
      link: "/messages/:chatRoomId",
      element: <Message />,
   },
];

export default LinkPage;
