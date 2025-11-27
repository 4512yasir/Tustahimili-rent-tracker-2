import type { ReactNode } from "react";
import { useUser } from "@/context/useUser";
import { useLocation } from "wouter";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useUser();
  const [, setLocation] = useLocation();

  if (!user) {
    // Redirect to login if not logged in
    setLocation("/login");
    return null;
  }

  return <>{children}</>;
}
