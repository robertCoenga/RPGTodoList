import { Home } from "../pages/Home";
import type { AppRoute } from "../types/routes.types";
export const Routes: AppRoute[] = [
  {
    index: true,
    element: <Home />,
    label: "Home",
  },
];
