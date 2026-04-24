import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "../store/authStore";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        data-ocid="protected.loading_state"
        style={{ color: "oklch(var(--muted-foreground))" }}
      >
        <div className="text-center">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3"
            style={{ borderColor: "oklch(var(--primary))" }}
          />
          <p className="font-body text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
}
