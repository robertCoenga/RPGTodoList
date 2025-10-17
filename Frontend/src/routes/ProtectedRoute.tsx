import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) navigate("/login", { replace: true });
  }),
    [navigate, auth];

  return children;
}
