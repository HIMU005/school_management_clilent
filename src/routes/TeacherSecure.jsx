import { Navigate } from "react-router";
import useUserInfo from "../hooks/useUserInfo";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

// eslint-disable-next-line react/prop-types
const TeacherSecure = ({ children }) => {
  const { userInfo, isLoading } = useUserInfo();

  if (isLoading) return <LoadingPage />;

  // if (userInfo?.role === "TEACHER") return children;
  if (userInfo && userInfo.role === "TEACHER") return children;

  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default TeacherSecure;
