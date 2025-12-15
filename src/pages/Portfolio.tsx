import { useState } from "react";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Clock, Star, Quote, Filter, ExternalLink, Globe, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "E-Commerce", "Healthcare", "Real Estate", "Non-Profit", "Business", "Lifestyle"];

  const wixProjects = [
    {
      id: 1,
      title: "Izzy Wheels",
      category: "E-Commerce",
      image: "/images/portfolio/izzy-wheels.jpg",
      url: "https://www.izzywheels.com/",
      description: "Award-winning designer wheelchair covers transforming mobility aids into fashion statements. Featured in Vogue, Forbes, ELLE, and BBC.",
      features: [
        "E-Commerce Store with Wix Stores",
        "Multi-currency Support",
        "Disney & Wicked Collaborations",
        "Public Speaking Booking System"
      ],
      techStack: ["Wix Velo", "Wix Stores", "Wix Payments", "Custom CSS", "Wix Members"],
      industry: "Fashion & Accessibility",
      type: "E-Commerce Website"
    },
    {
      id: 2,
      title: "Babe Formula",
      category: "E-Commerce",
      image: "/images/portfolio/babe-formula.jpg",
      url: "https://www.babe-formula.com/",
      description: "Premium hair care solutions crafted with intention. Elegant e-commerce platform with sophisticated brand presence.",
      features: [
        "Product Catalog Management",
        "Shopping Cart & Checkout",
        "Newsletter Integration",
        "Social Media Integration"
      ],
      techStack: ["Wix Velo", "Wix Stores", "Wix Forms", "Custom Animations", "Wix CRM"],
      industry: "Beauty & Personal Care",
      type: "E-Commerce Website"
    },
    {
      id: 3,
      title: "Evolve Clothing Gallery",
      category: "E-Commerce",
      image: "/images/portfolio/evolve-clothing.jpg",
      url: "https://www.evolveclothinggallery.com/",
      description: "Premium streetwear and sneaker destination featuring top brands like Adidas, Dr. Martens, and exclusive collections.",
      features: [
        "Advanced Product Filtering",
        "Gift Card System",
        "Brand Categories",
        "New Arrivals Section"
      ],
      techStack: ["Wix Velo", "Wix Stores", "Wix Gift Cards", "Custom Product Pages", "Wix Analytics"],
      industry: "Fashion & Streetwear",
      type: "E-Commerce Website"
    },
    {
      id: 4,
      title: "Industrial Jewellery",
      category: "E-Commerce",
      image: "/images/portfolio/industrial-jewellery.jpg",
      url: "https://www.industrial-jewellery.com/",
      description: "Unique handcrafted jewelry store featuring leather goods and timeless pieces with seasonal collections and holiday specials.",
      features: [
        "Email Popup with Discount",
        "Seasonal Collections",
        "Holiday Jewelry Section",
        "Sample Sale Integration"
      ],
      techStack: ["Wix Velo", "Wix Stores", "Wix Email Marketing", "Custom Popups", "Wix Bookings"],
      industry: "Jewelry & Accessories",
      type: "E-Commerce Website"
    },
    {
      id: 5,
      title: "Raya Del Sol Panama",
      category: "Real Estate",
      image: "/images/portfolio/raya-del-sol.jpg",
      url: "https://www.rayadelsolpanama.com/",
      description: "Sustainable living community in Playa Venao, Panama. Eco-conscious real estate development with regenerative infrastructure.",
      features: [
        "Interactive Site Plan",
        "Property Models Showcase",
        "Sustainability Features",
        "Partner Directory"
      ],
      techStack: ["Wix Velo", "Wix Pro Gallery", "Custom Maps Integration", "Wix Video", "Wix Forms"],
      industry: "Real Estate & Sustainability",
      type: "Real Estate Website"
    },
    {
      id: 6,
      title: "WAMI - Women's Community Justice",
      category: "Non-Profit",
      image: "/images/portfolio/wami.jpg",
      url: "https://wamict.org/",
      description: "Decade of excellence in educating, elevating, and empowering women and families. Non-profit focused on community justice.",
      features: [
        "Donation System",
        "Impact Stories Videos",
        "Program Pages",
        "Volunteer Signup"
      ],
      techStack: ["Wix Velo", "Wix Donations", "Wix Video", "Wix Events", "Wix Members"],
      industry: "Non-Profit & Advocacy",
      type: "Non-Profit Website"
    },
    {
      id: 7,
      title: "New Commonwealth Schools",
      category: "Non-Profit",
      image: "/images/portfolio/new-commonwealth.jpg",
      url: "https://www.newcommonwealthschools.org/",
      description: "Family-run non-profit private schools designed to last 20+ years. One-day-a-week educational programs with rave reviews.",
      features: [
        "School Information System",
        "Testimonials Section",
        "Contact Forms",
        "Event Calendar"
      ],
      techStack: ["Wix Velo", "Wix Forms", "Wix Events", "Wix Blog", "Custom Testimonials"],
      industry: "Education",
      type: "Educational Website"
    },
    {
      id: 8,
      title: "Heard You Need Chauffeur",
      category: "Business",
      image: "/images/portfolio/chauffeur-service.jpg",
      url: "https://www.heardyouneed.com/",
      description: "Premium personal chauffeur and car rental service in Nashville, Tennessee. Luxury transportation with style.",
      features: [
        "Service Booking System",
        "Fleet Gallery",
        "Quote Request Forms",
        "Client Testimonials"
      ],
      techStack: ["Wix Velo", "Wix Bookings", "Wix Forms", "Wix Pro Gallery", "Custom Animations"],
      industry: "Transportation & Luxury",
      type: "Service Business Website"
    },
    {
      id: 9,
      title: "Growth Method Consulting",
      category: "Business",
      image: "/images/portfolio/growth-consulting.jpg",
      url: "https://david39192.wixsite.com/mysite",
      description: "Mobile app and SaaS growth consulting. Proven method to scale businesses beyond expectations with team alignment.",
      features: [
        "Consultation Scheduling",
        "Case Studies",
        "Stages of Evolution Guide",
        "Contact Integration"
      ],
      techStack: ["Wix Velo", "Wix Bookings", "Wix Blog", "Custom Landing Pages", "Wix Analytics"],
      industry: "Consulting & Tech",
      type: "Business Consulting Website"
    },
    {
      id: 10,
      title: "Daley Inventories",
      category: "Business",
      image: "/images/portfolio/daley-inventories.jpg",
      url: "https://www.daleyinventories.com/",
      description: "Professional property inventory services with accredited clerks. Comprehensive reports, gas safety, and electrical checks.",
      features: [
        "Online Booking System",
        "Price Calculator",
        "Service Categories",
        "Brochure Downloads"
      ],
      techStack: ["Wix Velo", "Wix Bookings", "Wix Forms", "Wix Pricing Tables", "Custom Documents"],
      industry: "Property Services",
      type: "Service Business Website"
    },
    {
      id: 11,
      title: "Let's Get Social Raleigh",
      category: "Lifestyle",
      image: "/images/portfolio/lets-get-social.jpg",
      url: "https://www.letsgetsocialraleigh.com/",
      description: "Community engagement and events platform in Raleigh. Major programs for economic and community development.",
      features: [
        "Event Calendar",
        "City Partnership Info",
        "Program Directory",
        "Community Impact Stats"
      ],
      techStack: ["Wix Velo", "Wix Events", "Wix Bookings", "Custom Calendar", "Wix CRM"],
      industry: "Community & Events",
      type: "Community Platform"
    }
  ];

  const filteredProjects = activeCategory === "All"
    ? wixProjects
    : wixProjects.filter(project => project.category === activeCategory);

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

      {/* Category Filter */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${activeCategory === category
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
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-glow-dark via-glow-dark/50 to-transparent opacity-60" />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="glass-button bg-primary text-primary-foreground px-6 py-3 rounded-full flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform duration-300"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Live Site
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground border-0">
                      {project.category}
                    </Badge>
                  </div>

                  {/* Project Type Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="glass-card border-white/20 text-foreground text-xs">
                      {project.type}
                    </Badge>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-primary/80 mt-1 flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {project.industry}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  {/* Features */}
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

                  {/* Tech Stack */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 4).map((tech, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className="text-xs bg-primary/5 border-primary/20 text-muted-foreground hover:bg-primary/10"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 4 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs bg-primary/5 border-primary/20 text-muted-foreground"
                        >
                          +{project.techStack.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* View Project Link */}
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors pt-2 group/link"
                  >
                    <span>View Live Project</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <Card className="glass-card p-8 md:p-12 border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  Our Expertise
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold neon-text">
                  Full-Stack Web Development
                </h2>
                <p className="text-muted-foreground">
                  From stunning e-commerce platforms to comprehensive business solutions, we deliver projects that exceed expectations. Our team specializes in:
                </p>
                <ul className="space-y-2">
                  {[
                    "Custom E-Commerce Solutions",
                    "Business & Corporate Websites",
                    "Non-Profit & Educational Platforms",
                    "Real Estate & Property Portals",
                    "Service Booking Systems",
                    "Community & Event Platforms"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "11+", label: "Wix Projects" },
                  { value: "6", label: "Industries" },
                  { value: "100%", label: "Client Approval" },
                  { value: "48hr", label: "Avg. Response" }
                ].map((stat, index) => (
                  <Card key={index} className="glass-card p-4 text-center hover:border-primary/50 transition-colors">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="glass-card p-12 text-center border-primary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4 neon-text">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how we can bring your vision to life with a stunning, professional website.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quote">
                  <Button size="lg" className="glass-button bg-primary text-primary-foreground hover:bg-primary/90 px-8 group">
                    Get a Free Quote <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="glass-card border-primary/30 hover:bg-primary/10 px-8">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Portfolio;