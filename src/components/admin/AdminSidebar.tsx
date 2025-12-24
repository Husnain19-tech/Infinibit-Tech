import { useState } from "react";
import {
  Users,
  Settings,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  FileText,
  UserPlus,
  History,
  Briefcase,
  Layers,
  Image,
  Package // Added for Inventory
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  roles: string[];
  onSignOut: () => void;
  profileName?: string;
}

const AdminSidebar = ({ roles, onSignOut, profileName }: AdminSidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Define navigation items based on roles
  const navItems = [
    {
      title: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          show: true,
        },
        {
          label: "Inventory", // NEW
          href: "/admin/inventory",
          icon: Package,
          show: true,
        },
      ],
    },
    {
      title: "Communications",
      items: [
        {
          label: "Contacts",
          href: "/admin/contacts",
          icon: MessageSquare,
          show: true,
        },
        {
          label: "Quotes",
          href: "/admin/quotes",
          icon: FileText,
          show: true,
        },
        {
          label: "Live Chats",
          href: "/admin/chats",
          icon: MessageSquare,
          show: true,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          label: "Users",
          href: "/admin/users",
          icon: Users,
          show: roles.includes("owner") || roles.includes("admin"),
        },
        {
          label: "Careers",
          href: "/admin/careers",
          icon: Briefcase,
          show: roles.includes("owner") || roles.includes("hr"),
        },
      ],
    },
    {
      title: "Content",
      items: [
        {
          label: "Services",
          href: "/admin/services",
          icon: Layers,
          show: true,
        },
        {
          label: "Portfolio",
          href: "/admin/portfolio",
          icon: Image,
          show: true,
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          label: "Audit Logs",
          href: "/admin/audit-logs",
          icon: History,
          show: roles.includes("owner"),
        },
        {
          label: "Settings",
          href: "/admin/settings",
          icon: Settings,
          show: true,
        },
      ],
    },
  ];

  return (
    <div className={`border-r border-border bg-card/50 backdrop-blur-xl h-screen flex flex-col transition-all duration-300 ${collapsed ? "w-[80px]" : "w-[280px]"}`}>
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        {!collapsed && (
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-foreground">
            Infinibit Admin
          </span>
        )}
        {collapsed && <span className="font-bold text-xl text-primary mx-auto">IA</span>}
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {profileName?.[0] || "A"}
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="font-medium text-sm truncate">{profileName || "Admin User"}</p>
              <p className="text-xs text-muted-foreground truncate capitalize">
                {roles[0] || "Staff"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navItems.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {!collapsed && (
              <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.filter(item => item.show).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive(item.href)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    } ${collapsed ? "justify-center" : ""}`}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="outline"
          className={`w-full justify-start ${collapsed ? "justify-center px-0" : ""}`}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Settings className="h-4 w-4" /> : "Collapse Sidebar"}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 ${collapsed ? "justify-center px-0" : ""}`}
          onClick={onSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {!collapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
