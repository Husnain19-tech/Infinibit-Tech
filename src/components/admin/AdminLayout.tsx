import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AdminSidebar from "./AdminSidebar";
import { toast } from "sonner";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, loading, isAdmin, profile, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!loading && user && !isAdmin) {
      toast.error("You don't have admin access");
      navigate("/");
    }
  }, [loading, user, isAdmin, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar
        roles={profile?.role ? [profile.role] : []}
        onSignOut={handleSignOut}
        profileName={profile?.full_name}
      />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
