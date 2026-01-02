import { useState } from "react";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, TrendingUp, Users, Clock, Star, Quote, Filter, ExternalLink, Globe, Layers, Search, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePublicPortfolio } from "@/hooks/usePortfolio";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { projects, isLoading } = usePublicPortfolio();

  const categories = [
    "All", 
    "E-Commerce", 
    "Healthcare", 
    "Real Estate", 
    "Non-Profit", 
    "Business", 
    "Lifestyle",
    "MERN Stack",
    "LAMP Stack",
    "WordPress",
    "WebFlow",
    "Shopify"
  ];

  // Filter by category and search query
  const filteredProjects = (projects || []).filter(project => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      (project.industry?.toLowerCase().includes(searchLower) ?? false) ||
      (project.tech_stack?.some(tech => tech.toLowerCase().includes(searchLower)) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6 animate-fade-in">
            <Badge className="glass-card border-primary/30 text-primary px-6 py-2 text-sm">
              Our Client Projects
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold neon-text">
              Portfolio & Delivered Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing our expertise in building stunning, functional websites for clients worldwide. Each project represents our commitment to excellence and client satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "50+", label: "Industries Served" },
              { value: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <Card key={index} className="glass-card text-center p-6 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold neon-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Category Filter */}
      <section className="py-8 px-6">
        <div className="container mx-auto space-y-6">
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by project name, technology, or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 py-6 glass-card border-primary/20 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </p>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full transition-all duration-300 text-sm ${activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    : "glass-card hover:bg-primary/10"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="glass-card overflow-hidden group border-primary/20 hover:border-primary/50 transition-all duration-500 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-glow-dark via-glow-dark/50 to-transparent opacity-60" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-primary-foreground border-0">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Project Type Badge */}
                    {project.project_type && (
                      <div className="absolute top-4 right-4">
                        <Badge className="glass-card border-white/20 text-foreground text-xs">
                          {project.project_type}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.industry && (
                        <p className="text-sm text-primary/80 mt-1 flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {project.industry}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>

                    {/* Features */}
                    {project.features && project.features.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">Key Features</h4>
                        <ul className="grid grid-cols-2 gap-1">
                          {project.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                              <span className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.tech_stack.slice(0, 4).map((tech, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="text-xs bg-primary/5 border-primary/20 text-muted-foreground hover:bg-primary/10"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.tech_stack.length > 4 && (
                            <Badge 
                              variant="outline" 
                              className="text-xs bg-primary/5 border-primary/20 text-muted-foreground"
                            >
                              +{project.tech_stack.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* View Project Link */}
                    {project.external_url && (
                      <a 
                        href={project.external_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group/link pt-2"
                      >
                        <span className="text-sm font-medium">View Live Project</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto">
          <div className="glass-card p-12 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="glass-card border-primary/30 text-primary px-4 py-1 text-sm">
                  Our Expertise
                </Badge>
                <h2 className="text-4xl font-bold">
                  Building <span className="neon-text">Digital Excellence</span>
                </h2>
                <p className="text-muted-foreground">
                  We specialize in creating stunning, high-performance websites using industry-leading platforms. Each project is crafted with attention to detail, SEO optimization, and conversion-focused design.
                </p>
                <ul className="space-y-3">
                  {[
                    "Custom Design & Development",
                    "E-Commerce Solutions",
                    "SEO & Performance Optimization",
                    "Ongoing Support & Maintenance",
                    "Full-Stack MERN & LAMP Development",
                    "WordPress & Shopify Customization"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/services">
                  <Button className="glass-button group mt-4">
                    View All Services
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Globe className="w-8 h-8" />, label: "Wix Expert" },
                  { icon: <TrendingUp className="w-8 h-8" />, label: "SEO Optimized" },
                  { icon: <Users className="w-8 h-8" />, label: "User-Centric" },
                  { icon: <Star className="w-8 h-8" />, label: "Premium Quality" }
                ].map((item, index) => (
                  <Card key={index} className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-primary mb-2 flex justify-center">{item.icon}</div>
                    <p className="text-sm font-medium">{item.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto rounded-3xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your <span className="neon-text">Project</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's create something amazing together. Get in touch for a free consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/quote">
                <Button size="lg" className="glass-button group">
                  Get a Quote
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/#contact">
                <Button size="lg" variant="outline" className="glass-card border-primary/30 hover:bg-primary/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Portfolio;
