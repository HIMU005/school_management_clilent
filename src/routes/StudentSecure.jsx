import { Navigate } from "react-router";
import { toast } from "react-toastify";
import useUserInfo from "../hooks/useUserInfo";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

// eslint-disable-next-line react/prop-types
const StudentSecure = ({ children }) => {
  const { userInfo, isLoading } = useUserInfo();

  if (isLoading) return <LoadingPage />;

  if (userInfo && userInfo.role === "STUDENT") return children;

  toast.warn("Only student have access for this route");
  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default StudentSecure;
