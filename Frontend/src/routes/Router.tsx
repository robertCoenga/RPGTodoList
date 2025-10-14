import { LayoutResolver } from "./layouts/LayoutResolver";
import { Routes } from "./Routes";

const routesWithLayout = Routes.map((routes) => ({
  ...routes,
  element: LayoutResolver(routes)
}));
