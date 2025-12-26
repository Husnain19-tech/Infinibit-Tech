import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageCircle,
  FileText,
  RefreshCw,
  Users,
  Briefcase,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { profile, isAdmin, isOwner, isDeveloper, isHR } = useAuth();
  const [stats, setStats] = useState({
    contacts: 0,
    quotes: 0,
    chats: 0,
    users: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setRefreshing(true);
    try {
      const [contactsRes, quotesRes, chatsRes, usersRes] = await Promise.all([
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("quote_submissions").select("*", { count: "exact", head: true }),
        supabase.from("chat_submissions").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        contacts: contactsRes.count || 0,
        quotes: quotesRes.count || 0,
        chats: chatsRes.count || 0,
        users: usersRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const getRoleBadge = () => {
    if (isOwner) return { label: "Owner", color: "bg-amber-500" };
    if (isDeveloper) return { label: "Developer", color: "bg-blue-500" };
    if (isHR) return { label: "HR", color: "bg-green-500" };
    return { label: "Employee", color: "bg-gray-500" };
  };

  const roleBadge = getRoleBadge();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name || "Admin"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${roleBadge.color}`}>
            {roleBadge.label}
          </span>
          <Button variant="outline" size="sm" onClick={fetchStats} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Contact Messages
            </CardTitle>
            <Mail className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.contacts}</div>
            <p className="text-xs text-muted-foreground mt-1">Total inquiries</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Quote Requests
            </CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.quotes}</div>
            <p className="text-xs text-muted-foreground mt-1">Project requests</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Chat Messages
            </CardTitle>
            <MessageCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.chats}</div>
            <p className="text-xs text-muted-foreground mt-1">Widget messages</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Team Members
            </CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered users</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <a href="/admin/contacts">
                <Mail className="h-6 w-6" />
                <span>View Contacts</span>
              </a>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <a href="/admin/quotes">
                <FileText className="h-6 w-6" />
                <span>View Quotes</span>
              </a>
            </Button>
            {isOwner || isHR ? (
              <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                <a href="/admin/team">
                  <Users className="h-6 w-6" />
                  <span>Manage Team</span>
                </a>
              </Button>
            ) : null}
            {isOwner || isHR ? (
              <Button variant="outline" className="h-20 flex-col gap-2" asChild>
                <a href="/admin/careers">
                  <Briefcase className="h-6 w-6" />
                  <span>Manage Jobs</span>
                </a>
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
