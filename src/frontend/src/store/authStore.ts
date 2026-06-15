import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../integrations/supabase/client";

export enum UserRole {
  guest = "guest",
  customer = "customer",
  admin = "admin",
}

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
      reset: () =>
        set({
          role: UserRole.guest,
          isAdmin: false,
        }),
    }),
    {
      name: "funky-chic-auth",
    },
  ),
);

export function useAuth() {
  const queryClient = useQueryClient();

  const { role, isAdmin, setRole, setIsAdmin, reset } = useAuthStore();

  const [user, setUser] = useState<User | null>(null);

  const [session, setSession] = useState<Session | null>(null);

  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsInitializing(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsInitializing(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (
    email: string,
    password: string,
  ) => {
    return supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const register = async (
    email: string,
    password: string,
  ) => {
    return supabase.auth.signUp({
      email,
      password,
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    reset();
    queryClient.clear();
  };

  useEffect(() => {
    if (!user) {
      reset();
      return;
    }

    const role =
      user.user_metadata?.role === "admin"
        ? UserRole.admin
        : UserRole.customer;

    setRole(role);
    setIsAdmin(role === UserRole.admin);
  }, [user]);

  return {
    user,
    session,
    isAuthenticated: !!user,
    isInitializing,
    isLoggingIn: false,
    role,
    isAdmin,
    login,
    register,
    logout,
  };
}