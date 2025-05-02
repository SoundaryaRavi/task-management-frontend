import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedRoute = () => {
  let data: any = localStorage.getItem("token");
  const validUser: any = data ? true : false;
  return validUser ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
