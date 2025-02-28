import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <h2>wait.............</h2>;
  }
  if (user) return children;
  return <Navigate to="/login" state={location.pathname} replace={true} />;
};

export default PrivateRoute;
