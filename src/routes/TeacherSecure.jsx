import { Navigate } from "react-router";
import { toast } from "react-toastify";
import useUserInfo from "../hooks/useUserInfo";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

// eslint-disable-next-line react/prop-types
const TeacherSecure = ({ children }) => {
  const { userInfo, isLoading } = useUserInfo();

  if (isLoading) return <LoadingPage />;

  // if (userInfo?.role === "TEACHER") return children;
  if (userInfo && userInfo.role === "TEACHER") return children;

  toast.warn("Only teacher have access for this route");
  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default TeacherSecure;
