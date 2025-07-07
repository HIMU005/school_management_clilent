/* eslint-disable react/prop-types */
import { IoClose, IoReorderThreeOutline } from "react-icons/io5";
import useUserInfo from "../../../hooks/useUserInfo";
import AdminRouter from "../Navigation/AdminRouter";
import DefaultDashNavigation from "../Navigation/DefaultDashNavigation";
import StudentRouter from "../Navigation/StudentRouter";
import TeacherRouter from "../Navigation/TeacherRouter";
const DashboardNav = ({ isOpen, setIsOpen }) => {
  const { userInfo } = useUserInfo();
  return (
    <>
      <div
        className={`${isOpen ? "text-white " : "text-black "} text-3xl z-[60] `}
      >
        {isOpen ? (
          <IoClose onClick={() => setIsOpen(!isOpen)} />
        ) : (
          <IoReorderThreeOutline onClick={() => setIsOpen(!isOpen)} />
        )}
      </div>
      <div
        className={`fixed top-0 left-0 h-screen w-96 bg-[#2C3E50] shadow-lg p-4 z-50 transform transition-transform duration-600 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full  ">
          <div></div>
          <div>
            {/* when the user is admin then show the admin router */}
            {userInfo?.isAdmin && <AdminRouter />}
            {/* when the user is teacher then show the teacher router */}
            {userInfo?.role === "TEACHER" && <TeacherRouter />}
            {/* when the user is student then show the default navigation */}
            {userInfo?.role === "STUDENT" && <StudentRouter />}

            <DefaultDashNavigation />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;
