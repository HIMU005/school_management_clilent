import { Route, Routes } from "react-router";
import Home from "../Home";
import DashBoardLayout from "../layout/DashBoardLayout";
import Root from "../layout/Root";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import DashboardHome from "../Pages/Dashboard/commonRoute/DashboardHome";
import Profile from "../Pages/Dashboard/commonRoute/Profile";
import UpdateProfile from "../Pages/Dashboard/commonRoute/UpdateProfile";
import TakeAttendance from "../Pages/Dashboard/teacherRoute/TakeAttendance";
import About from "../Pages/Home/About";
import Contact from "../Pages/Home/Contact";
import PrivateRoute from "./PrivateRoute";
import TeacherSecure from "./TeacherSecure";
// import TeacherSecure from "./TeacherSecure";

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
        {/* dashboard default  */}
        <Route
          index
          element={
            <PrivateRoute>
              <DashboardHome />
            </PrivateRoute>
          }
        />

        {/* dashboard profile  */}
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* dashboard update profile profile  */}
        <Route
          path="updateProfile"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />
        {/* teacher take attendance here  */}
        <Route
          path="take-attendance"
          element={
            <PrivateRoute>
              <TeacherSecure>
                <TakeAttendance />
              </TeacherSecure>
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default HomeRoute;
