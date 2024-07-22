import { AllSearchUser } from "./pages/AllSearchUser";
import { Home } from "./pages/Home";
import { Job } from "./pages/Job";
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
  {
    link: "/job/:jobId",
    element: <Job />,
  },
];

export default LinkPage;
