import { Outlet } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";

const SharedLayout = () => {
  return (
    <>
      <Sidebar />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
