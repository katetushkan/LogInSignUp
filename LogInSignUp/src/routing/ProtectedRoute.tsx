import { useAuthToken } from "../contexts/AuthProvider/AuthProvider.tsx";
import { Navigate, Outlet } from "react-router";
import { Paths } from "./paths.ts";

interface IProtectedRoute {}

export const ProtectedRoute = ({}: IProtectedRoute) => {
  const { token } = useAuthToken();

  if (!token) {
    return <Navigate to={Paths.ACCESS_SCREEN} replace />;
  }

  return <Outlet />;
};
