import { Route, Routes } from "react-router";
import Home from "../Home";
import DashBoardLayout from "../layout/DashBoardLayout";
import Root from "../layout/Root";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import AddBooks from "../Pages/Dashboard/adminRoute.jsx/AddBooks";
import AllBooks from "../Pages/Dashboard/adminRoute.jsx/AllBooks";
import DashboardHome from "../Pages/Dashboard/commonRoute/DashboardHome";
import Profile from "../Pages/Dashboard/commonRoute/Profile";
import UpdateProfile from "../Pages/Dashboard/commonRoute/UpdateProfile";
import PayBill from "../Pages/Dashboard/studentRoute/PayBill";
import PaymentList from "../Pages/Dashboard/studentRoute/PaymentList";
import SeeAttendance from "../Pages/Dashboard/studentRoute/SeeAttendance";
import SeeALLAttendance from "../Pages/Dashboard/teacherRoute/SeeALLAttendance";
import TakeAttendance from "../Pages/Dashboard/teacherRoute/TakeAttendance";
import About from "../Pages/Home/About";
import Contact from "../Pages/Home/Contact";
import AdminSecure from "./AdminSecure";
import PrivateRoute from "./PrivateRoute";
import StudentSecure from "./StudentSecure";
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
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashBoardLayout />
          </PrivateRoute>
        }
      >
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
        {/* teacher see all attendance here  */}
        <Route
          path="see-attendance"
          element={
            <PrivateRoute>
              <TeacherSecure>
                <SeeALLAttendance />
              </TeacherSecure>
            </PrivateRoute>
          }
        />

        {/* students private route are here  */}
        {/* see attendance mine */}
        <Route
          path="see-attendance-mine"
          element={
            <PrivateRoute>
              <StudentSecure>
                <SeeAttendance />
              </StudentSecure>
            </PrivateRoute>
          }
        />

        {/* student payment route */}
        <Route
          path="payment"
          element={
            <PrivateRoute>
              <StudentSecure>
                <PayBill />
              </StudentSecure>
            </PrivateRoute>
          }
        />
        {/* student see payment list route */}
        <Route
          path="see-payment-list"
          element={
            <PrivateRoute>
              <StudentSecure>
                <PaymentList />
              </StudentSecure>
            </PrivateRoute>
          }
        />

        {/* route for admin  */}
        {/* add books  */}
        <Route
          path="add-subject"
          element={
            <PrivateRoute>
              <AdminSecure>
                <AddBooks />
              </AdminSecure>
            </PrivateRoute>
          }
        />
        <Route
          path="all-subjects"
          element={
            <PrivateRoute>
              <AdminSecure>
                <AllBooks />
              </AdminSecure>
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default HomeRoute;
