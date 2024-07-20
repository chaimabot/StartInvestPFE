import { Navigate, useRoutes } from "react-router-dom";
import {
  PageHome,
  Register,
  Login,
  Forgetpassword,
  Resetpassword,
} from "../services/index";

const NoAuthentificatedRouter = () => {
  const routes = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/",
      element: <PageHome />,
    },
    {
      path: "/forgot-password",
      element: <Forgetpassword />,
    },

    {
      path: "/:token",
      element: <Resetpassword />,
    },
    {
      path: "/*",
      element: <Navigate to="login" replace />,
    },
  ]);
  return routes;
};

export default NoAuthentificatedRouter;
