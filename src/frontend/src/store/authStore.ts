import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRole } from "../backend.d";
import { useBackend } from "../hooks/useBackend";

interface AuthState {
  role: UserRole;
  isAdmin: boolean;
  setRole: (role: UserRole) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: UserRole.guest,
      isAdmin: false,
      setRole: (role) => set({ role }),
      setIsAdmin: (isAdmin) => set({ isAdmin }),
      reset: () => set({ role: UserRole.guest, isAdmin: false }),
    }),
    { name: "zola-auth-state" },
  ),
);

// Hook combining Internet Identity platform auth + role state from backend
export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
  } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { role, isAdmin, setRole, setIsAdmin, reset } = useAuthStore();
  const { actor, isFetching: isActorFetching } = useBackend();

  // Sync role and admin status from backend after auth resolves
  useEffect(() => {
    if (!isAuthenticated || isActorFetching || !actor) return;

    let cancelled = false;
    (async () => {
      try {
        const [userRole, adminStatus] = await Promise.all([
          actor.getCallerUserRole(),
          actor.isCallerAdmin(),
        ]);
        if (!cancelled) {
          setRole(userRole);
          setIsAdmin(adminStatus);
        }
      } catch {
        // silently ignore; role stays at persisted value
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, actor, isActorFetching, setRole, setIsAdmin]);

  const handleLogout = () => {
    clear();
    reset();
    queryClient.clear();
  };

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isAdmin,
    role,
    identity,
    login,
    logout: handleLogout,
  };
}
