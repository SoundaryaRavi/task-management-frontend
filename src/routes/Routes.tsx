import { useRoutes } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnAuthenticatedRoute from "./UnAunthenticatedRoute";
import Task from "../pages/Task";

const routes = [
  {
    path: "/",
    element: <AuthenticatedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Task />,
          }
        ],
      },
    ],
  },
  {
    path: "",
    element: <UnAuthenticatedRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />
      }
    ],
  },
];

export default function Routes() {
  return useRoutes(routes);
}
