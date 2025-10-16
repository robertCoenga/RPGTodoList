import { Outlet } from "react-router-dom";
export function Root() {
  return (
    <div id="root" className="flex h-dvh w-dvw bg-slate-200 font-roboto">
      <Outlet />
    </div>
  );
}
