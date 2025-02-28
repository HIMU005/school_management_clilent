import { Navigate } from "react-router";
import useUserInfo from "../hooks/useUserInfo";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

// eslint-disable-next-line react/prop-types
const StudentRoute = ({ children }) => {
  const { userInfo, isLoading } = useUserInfo();

  if (isLoading) <LoadingPage />;

  if (userInfo.role === "STUDENT") return children;

  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default StudentRoute;
