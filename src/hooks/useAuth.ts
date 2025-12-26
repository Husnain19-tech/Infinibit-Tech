// hooks/useAuth.ts
import { useState, useEffect, useCallback, useMemo } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Role types
export type UserRole = "owner" | "developer" | "hr" | "employee";

// Profile interface (combines profiles + user_roles)
export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  department?: string;
  position?: string;
  phone?: string;
  role: UserRole;
  created_at: string;
}

// Type for authentication guard
export type RequiredRole = UserRole | 'admin';

// Main hook - optimized
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoized fetch function - NO DEPENDENCIES to prevent loops
  const fetchUserProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log("📡 Fetching profile for:", userId);

      const [profilePromise, rolePromise] = [
        supabase.from("profiles").select("*").eq("user_id", userId).single(),
        supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle()
      ];

      const [pRes, rRes] = await Promise.all([profilePromise, rolePromise]);

      if (pRes.error) {
        if (pRes.error.code === 'PGRST116') {
          console.log("🔄 Profile not found, creating default...");
          const { data: userData } = await supabase.auth.getUser();
          const email = userData.user?.email || "";

          const { data: newP, error: e } = await supabase
            .from("profiles")
            .insert([{ user_id: userId, email, full_name: email.split('@')[0] }])
            .select().single();

          if (e) throw e;

          await supabase.from("user_roles").insert([{ user_id: userId, role: 'employee' }]);

          const prof = { ...newP, role: 'employee' as UserRole };
          setProfile(prof as UserProfile); // Cast to UserProfile
          return prof as UserProfile; // Cast to UserProfile
        }
        throw pRes.error;
      }

      if (rRes.error) {
        console.error("❌ Role fetch error (500?):", rRes.error);
        setError(`Role error: ${rRes.error.message}`);
      }

      // EMERGENCY FALLBACK: Hardcode owner for your specific email
      // This ensures you never get locked out even if Supabase has RLS loops
      let userRole: UserRole = (rRes.data?.role as UserRole) || 'employee';

      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser?.email === 'husnainshabeer029@gmail.com') {
        console.log("👑 Emergency Admin Bypass Activated for husnainshabeer029@gmail.com");
        userRole = 'owner';
      }

      const combined = { ...pRes.data, role: userRole };
      console.log("✅ Profile & Role loaded:", { userId, role: userRole });
      setProfile(combined as UserProfile); // Cast to UserProfile
      return combined as UserProfile; // Cast to UserProfile

    } catch (err) {
      console.error("❌ Auth Error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred during profile fetch.");
      return null;
    }
  }, []); // No dependencies = no loops

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const { data: { session: s } } = await supabase.auth.getSession();
      if (!isMounted) return;

      setSession(s);
      setUser(s?.user ?? null);

      if (s?.user) {
        await fetchUserProfile(s.user.id);
      }
      setLoading(false);
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!isMounted) return;

      setUser(currentSession?.user ?? null);
      setSession(currentSession);
      setError(null); // Clear error on auth state change

      if (event === 'SIGNED_IN' && currentSession?.user) {
        await fetchUserProfile(currentSession.user.id);
        setLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        setLoading(false);
      } else if (event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') {
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id);
        }
        setLoading(false);
      } else if (event === 'USER_UPDATED') {
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]); // fetchUserProfile is stable due to its empty dependency array

  // Memoized role check functions for performance
  const hasRole = useCallback((role: UserRole): boolean => {
    return profile?.role === role;
  }, [profile]);

  const isOwner = useMemo(() => hasRole("owner"), [hasRole]);
  const isDeveloper = useMemo(() => hasRole("developer"), [hasRole]);
  const isHR = useMemo(() => hasRole("hr"), [hasRole]);
  const isEmployee = useMemo(() => hasRole("employee"), [hasRole]);
  const isAdmin = useMemo(() => isOwner || isDeveloper || isHR, [isOwner, isDeveloper, isHR]);

  // Auth actions
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        setUser(null);
        setSession(null);
        setProfile(null);
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Password reset failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Return public API
  return {
    // State
    user,
    session,
    profile,
    loading,
    error,

    // Role checks
    hasRole,
    isOwner,
    isDeveloper,
    isHR,
    isEmployee,
    isAdmin,

    // Actions
    signIn,
    signUp,
    signOut,
    resetPassword,

    // Utilities
    refetch: user ? () => fetchUserProfile(user.id) : () => Promise.resolve(null),
    clearError: () => setError(null),
  };
}

// Optimized auth guard hook
export function useAuthGuard(requiredRole?: RequiredRole) {
  const { user, profile, loading, isAdmin, hasRole } = useAuth();

  const hasAccess = useMemo(() => {
    if (!user) return false;
    if (!requiredRole) return true;
    if (requiredRole === 'admin') return isAdmin;
    return hasRole(requiredRole);
  }, [user, requiredRole, isAdmin, hasRole]);

  return {
    user,
    profile,
    loading,
    hasAccess,
    isAuthenticated: !!user,
    isAdmin,
  };
}