// import Navbar from './components/navbar/Navbar';
// import { GoMoveToTop } from "react-icons/go";
// import Footer from './components/footer/Footer';
// import { useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { MyNavBar } from "../components/MyNavBar";
import { ChatBox } from "../components/ChatBox";
import { MediaModal } from "../components/MediaModal";
import { PreviewPostMedia } from "../components/PreviewPostMedia/PreviewPostMedia";
import { CreatePostModal } from "../components/CreatePostModal";
interface LayoutProps {
  children: React.ReactNode; // Specify children of type React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const shouldHideNavFooter = () => {
    const hideOnPaths = ["/login", "/register", "/404"]; // Array of paths to hide on
    return hideOnPaths.some((path) => location.pathname.startsWith(path));
  };

  return (
    <>
      <div className="layout relative h-screen bg-background">
        {!shouldHideNavFooter() && <MyNavBar />}
        <Outlet /> {/* Placeholder for nested routes */}
        {children} {/* Render any additional content passed as props */}
      </div>
      <ChatBox />
      <MediaModal />
      <CreatePostModal />
      <PreviewPostMedia />
    </>
  );
};
