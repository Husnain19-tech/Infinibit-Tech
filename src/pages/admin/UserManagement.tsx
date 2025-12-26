import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { RefreshCw, Shield, UserPlus, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";
import { useAuth, UserRole } from "@/hooks/useAuth";

interface UserWithRole {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  department: string | null;
  position: string | null;
  created_at: string;
  roles: UserRole[];
}

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [inviteData, setInviteData] = useState({ email: "", password: "", fullName: "", role: "employee" as UserRole });
  const [newRole, setNewRole] = useState<UserRole>("employee");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      const usersWithRoles: UserWithRole[] = (profiles || []).map(profile => ({
        ...profile,
        roles: (roles || [])
          .filter(r => r.user_id === profile.user_id)
          .map(r => r.role as UserRole)
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleInviteUser = async () => {
    if (!inviteData.email || !inviteData.password || !inviteData.fullName) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // Create user via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: inviteData.email,
        password: inviteData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: { full_name: inviteData.fullName }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create user");

      // Add role
      const { error: roleError } = await supabase
        .from("user_roles")
        .insert({
          user_id: authData.user.id,
          role: inviteData.role,
          assigned_by: user?.id
        });

      if (roleError) throw roleError;

      toast.success("User invited successfully");
      setShowInviteDialog(false);
      setInviteData({ email: "", password: "", fullName: "", role: "employee" });
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to invite user");
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    try {
      // Remove existing roles
      await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", selectedUser.user_id);

      // Add new role
      const { error } = await supabase
        .from("user_roles")
        .insert({
          user_id: selectedUser.user_id,
          role: newRole,
          assigned_by: user?.id
        });

      if (error) throw error;

      toast.success("Role updated successfully");
      setShowRoleDialog(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to remove this user's access?")) return;

    try {
      // Remove roles
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId);

      if (error) throw error;

      toast.success("User access removed");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to remove user access");
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "owner": return "bg-amber-500";
      case "developer": return "bg-blue-500";
      case "hr": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage team members and their roles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchUsers} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={() => setShowInviteDialog(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Team Members ({users.length})
          </CardTitle>
          <CardDescription>
            Owners have full access. Developers can manage content. HR can manage team and careers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No users found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.full_name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.department || "-"}</TableCell>
                    <TableCell>{u.position || "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {u.roles.length > 0 ? u.roles.map((role) => (
                          <Badge key={role} className={`${getRoleBadgeColor(role)} text-white`}>
                            {role}
                          </Badge>
                        )) : (
                          <Badge variant="outline">No role</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(u.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(u);
                            setNewRole(u.roles[0] || "employee");
                            setShowRoleDialog(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(u.user_id)}
                          disabled={u.user_id === user?.id}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Invite User Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                value={inviteData.fullName}
                onChange={(e) => setInviteData({ ...inviteData, fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={inviteData.email}
                onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label>Temporary Password</Label>
              <Input
                type="password"
                value={inviteData.password}
                onChange={(e) => setInviteData({ ...inviteData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={inviteData.role} onValueChange={(v) => setInviteData({ ...inviteData, role: v as UserRole })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>Cancel</Button>
            <Button onClick={handleInviteUser}>Invite User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Role for {selectedUser?.full_name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Role</Label>
              <Select value={newRole} onValueChange={(v) => setNewRole(v as UserRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRoleDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateRole}>Update Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
