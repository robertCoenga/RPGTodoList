import type { AppRoute } from "../../types/routes.types";

export function LayoutResolver({ element }: AppRoute) {
  return <>{children}</>;
}
