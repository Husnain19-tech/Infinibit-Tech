import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Mail, 
  FileText, 
  MessageCircle,
  Users,
  Briefcase,
  FolderOpen,
  Settings,
  Shield,
  History,
  Wrench,
  UserCircle,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AppRole } from "@/hooks/useAuth";
import logo from "@/assets/logo.jpg";

interface AdminSidebarProps {
  roles: AppRole[];
  onSignOut: () => void;
  profileName?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles?: AppRole[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Quotes", href: "/admin/quotes", icon: FileText },
  { label: "Chats", href: "/admin/chats", icon: MessageCircle },
  { label: "Services", href: "/admin/services", icon: Wrench, roles: ["owner", "developer"] },
  { label: "Portfolio", href: "/admin/portfolio", icon: FolderOpen, roles: ["owner", "developer"] },
  { label: "Team", href: "/admin/team", icon: Users, roles: ["owner", "hr"] },
  { label: "Careers", href: "/admin/careers", icon: Briefcase, roles: ["owner", "hr"] },
  { label: "User Management", href: "/admin/users", icon: Shield, roles: ["owner"] },
  { label: "Audit Logs", href: "/admin/audit", icon: History, roles: ["owner"] },
  { label: "Settings", href: "/admin/settings", icon: Settings, roles: ["owner"] },
];

export default function AdminSidebar({ roles, onSignOut, profileName }: AdminSidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const hasAccess = (item: NavItem): boolean => {
    if (!item.roles) return true;
    return item.roles.some(role => roles.includes(role));
  };

  const isActive = (href: string): boolean => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className={cn(
      "h-screen sticky top-0 border-r border-border bg-card/50 backdrop-blur-sm transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded" />
              <span className="font-bold text-sm">Admin Panel</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.filter(hasAccess).map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User & Actions */}
        <div className="p-2 border-t border-border space-y-1">
          {!collapsed && profileName && (
            <div className="px-3 py-2 text-xs text-muted-foreground truncate">
              <UserCircle className="h-4 w-4 inline mr-2" />
              {profileName}
            </div>
          )}
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            title={collapsed ? "Back to Site" : undefined}
          >
            <Home className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
