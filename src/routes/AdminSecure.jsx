import { Navigate } from "react-router";
import { toast } from "react-toastify";
import useUserInfo from "../hooks/useUserInfo";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

// eslint-disable-next-line react/prop-types
const AdminSecure = ({ children }) => {
  const { userInfo, isLoading } = useUserInfo();

  if (isLoading) return <LoadingPage />;

  if (userInfo && userInfo.isAdmin === true) return children;

  toast.warn("Only admin have access for this route");

  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default AdminSecure;
