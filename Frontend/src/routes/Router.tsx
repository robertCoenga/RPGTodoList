import { createBrowserRouter } from "react-router-dom";
import { LayoutResolver } from "./layouts/LayoutResolver";
import { Root } from "./Root";
import { Routes } from "./Routes";

const routesWithLayout = Routes.map((routes) => ({
  ...routes,
  element: LayoutResolver(routes, Routes),
}));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: routesWithLayout,
  },
]);
