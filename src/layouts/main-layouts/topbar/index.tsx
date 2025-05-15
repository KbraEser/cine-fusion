import { Outlet } from "react-router-dom";
import Navbar from "../../../components/common/Navbar";

const Topbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Topbar;
