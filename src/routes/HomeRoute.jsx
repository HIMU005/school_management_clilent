import { Route, Routes } from "react-router";
import Home from "../Home";
import DashBoardLayout from "../layout/DashBoardLayout";
import Root from "../layout/Root";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import About from "../Pages/Home/About";
import Contact from "../Pages/Home/Contact";
import PrivateRoute from "./PrivateRoute";

const HomeRoute = () => {
  return (
    <Routes>
      <Route element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* dashboard  */}
      <Route path="/dashboard" element={<DashBoardLayout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <DashboardHome />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default HomeRoute;
