import { Outlet } from "react-router-dom";
export function Root() {
  return (
    <div id="root">
      <Outlet />
    </div>
  );
}
