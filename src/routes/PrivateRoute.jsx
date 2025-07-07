import { Navigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../Pages/LoadingPage/LoadingPage";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingPage />;
  }
  if (user) return children;

  toast.warn("You need to login first for visit this site");
  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default PrivateRoute;
