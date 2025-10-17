import { createContext, useMemo, useState } from "react";
import type {
  Auth,
  AuthContextType,
  AuthProviderProps,
} from "../types/auth.types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<Auth | null>({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyY29lbmdhQHJwZy5jb20iLCJuYW1lIjoiUm9iZXJ0IFJQRyIsImlhdCI6MTc1OTg2NTA4M30.TsFhBvYMl5GQDwnBQf1Do31nl5MrjS9GlBmk5ngtJ0A",
  });

  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
