import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuth } from "../store/authStore";

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isAdmin, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        data-ocid="admin.loading_state"
        style={{ color: "oklch(var(--muted-foreground))" }}
      >
        <div className="text-center">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3"
            style={{ borderColor: "oklch(var(--primary))" }}
          />
          <p className="font-body text-sm">Verifying access…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return (
      <div
        className="flex items-center justify-center min-h-[60vh]"
        data-ocid="admin.error_state"
      >
        <div className="text-center max-w-md px-4">
          <p
            className="font-display text-6xl font-black mb-4"
            style={{ color: "oklch(var(--destructive))" }}
          >
            403
          </p>
          <h2
            className="font-display text-2xl font-bold uppercase tracking-tight mb-2"
            style={{ color: "oklch(var(--foreground))" }}
          >
            Admin Only
          </h2>
          <p
            className="font-body text-sm"
            style={{ color: "oklch(var(--muted-foreground))" }}
          >
            You don&apos;t have permission to access this area.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
