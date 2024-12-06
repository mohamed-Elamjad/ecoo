import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import Loader from "../Layout/Loader/Loader";

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (isAdmin && user.role !== "admin") {
        navigate("/login");
      }
    }
  }, [loading, isAuthenticated, isAdmin, user, navigate]);
  if (loading) {
    return <div><Loader/></div>;
  }
  if (!isAuthenticated) {
    return null;
  }
  if (isAdmin && user.role !== "admin") {
    return null;
  }
  return <Outlet />;
};
export default ProtectedRoute;
