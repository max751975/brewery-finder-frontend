import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedTypes }) => {
  const location = useLocation();
  return allowedTypes?.includes("admin") ? (
    <Outlet />
  ) : allowedTypes?.includes("user") ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
