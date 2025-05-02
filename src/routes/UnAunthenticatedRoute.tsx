import { Navigate, Outlet } from "react-router-dom";

const UnAuthenticatedRoute: React.FC = () => {
  let data: any = localStorage.getItem("token");
  const validUser: any = data ? true : false;
  return validUser ? <Navigate to="/" /> : <Outlet/>;
};

export default UnAuthenticatedRoute;
