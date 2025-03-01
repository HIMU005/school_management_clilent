import { Navigate } from "react-router";
import useUserInfo from "../hooks/useUserInfo";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

// eslint-disable-next-line react/prop-types
const AdminSecure = ({ children }) => {
  const { userInfo, isLoading } = useUserInfo();

  if (isLoading) <LoadingPage />;

  if (userInfo.isAdmin === true) return children;

  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default AdminSecure;
