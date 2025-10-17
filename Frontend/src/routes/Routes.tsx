import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import type { AppRoute } from "../types/routes.types";
export const Routes: AppRoute[] = [
  {
    index: true,
    element: <Home />,
    label: "Home",
  },
  {
    path: "/login",
    element: <Login />,
    label: "Login",
  },
];
