import { Outlet } from "react-router";
import Footer from "../components/shared/Footer";
import NavBar from "../components/shared/NavBar";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
