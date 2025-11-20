import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, Home, Briefcase, FolderOpen, Mail, MessageSquare, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const quickLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Services", path: "/services", icon: Briefcase },
    { name: "Portfolio", path: "/portfolio", icon: FolderOpen },
    { name: "Contact", path: "/contact", icon: Mail },
    { name: "Get Quote", path: "/quote", icon: MessageSquare },
    { name: "Careers", path: "/careers", icon: Users },
    { name: "Team", path: "/team", icon: Building },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      
      // Simple keyword-based navigation
      if (query.includes("service") || query.includes("what") || query.includes("offer")) {
        navigate("/services");
      } else if (query.includes("portfolio") || query.includes("work") || query.includes("project")) {
        navigate("/portfolio");
      } else if (query.includes("contact") || query.includes("reach") || query.includes("email")) {
        navigate("/contact");
      } else if (query.includes("quote") || query.includes("price") || query.includes("cost")) {
        navigate("/quote");
      } else if (query.includes("career") || query.includes("job") || query.includes("hiring")) {
        navigate("/careers");
      } else if (query.includes("team") || query.includes("about") || query.includes("who")) {
        navigate("/team");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
        <h2 className="mb-2 text-3xl font-semibold text-foreground">Page Not Found</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Search Feature */}
        <form onSubmit={handleSearch} className="mb-12 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for pages (e.g., services, portfolio, contact)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Quick Links */}
        <div className="mb-8">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {quickLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant="outline"
                  className="h-auto w-full flex-col gap-2 py-4"
                >
                  <link.icon className="h-5 w-5" />
                  <span className="text-sm">{link.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <Link to="/">
          <Button size="lg" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
