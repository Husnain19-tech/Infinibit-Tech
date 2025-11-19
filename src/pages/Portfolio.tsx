import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Clock, Star, Quote } from "lucide-react";

const Portfolio = () => {
  const caseStudies = [
    {
      id: 1,
      title: "E-Commerce Platform Transformation",
      client: "RetailCo Global",
      category: "E-Commerce",
      image: "bg-gradient-to-br from-primary/20 to-accent/20",
      description: "Complete digital transformation of a legacy retail system into a modern, scalable e-commerce platform.",
      challenge: "RetailCo was struggling with a 15-year-old monolithic system that couldn't handle peak traffic and had a 68% cart abandonment rate.",
      solution: "Built a microservices-based e-commerce platform with AI-powered recommendations, real-time inventory, and seamless checkout experience.",
      metrics: [
        { label: "Revenue Increase", before: "$2.4M", after: "$8.1M", growth: "+237%" },
        { label: "Cart Abandonment", before: "68%", after: "24%", growth: "-65%" },
        { label: "Page Load Time", before: "8.2s", after: "1.1s", growth: "-87%" },
        { label: "Mobile Conversions", before: "12%", after: "42%", growth: "+250%" }
      ],
      techStack: ["React", "Node.js", "PostgreSQL", "Redis", "AWS", "Stripe"],
      testimonial: {
        text: "Infinibit Tech transformed our business. The new platform not only handles 10x our previous traffic but has tripled our revenue in just 6 months.",
        author: "Sarah Chen",
        position: "CTO, RetailCo Global"
      },
      duration: "4 months",
      team: "8 developers"
    },
    {
      id: 2,
      title: "AI-Powered Healthcare Management System",
      client: "MediCare Plus",
      category: "Healthcare AI",
      image: "bg-gradient-to-br from-accent/20 to-primary/20",
      description: "Revolutionary healthcare platform with AI diagnostics assistance and patient management.",
      challenge: "Manual patient record management leading to 40% administrative overhead and delayed care decisions.",
      solution: "Developed an AI-powered system with predictive analytics, automated record management, and real-time patient monitoring.",
      metrics: [
        { label: "Admin Time Saved", before: "40%", after: "8%", growth: "-80%" },
        { label: "Patient Satisfaction", before: "72%", after: "94%", growth: "+31%" },
        { label: "Diagnosis Accuracy", before: "85%", after: "97%", growth: "+14%" },
        { label: "Response Time", before: "45min", after: "5min", growth: "-89%" }
      ],
      techStack: ["Python", "TensorFlow", "React", "FastAPI", "MongoDB", "Azure"],
      testimonial: {
        text: "The AI system has revolutionized how we deliver care. We're seeing patients faster and making better-informed decisions.",
        author: "Dr. Michael Torres",
        position: "Chief Medical Officer, MediCare Plus"
      },
      duration: "6 months",
      team: "12 developers"
    },
    {
      id: 3,
      title: "Fintech Mobile Banking App",
      client: "NeoBank Digital",
      category: "Fintech",
      image: "bg-gradient-to-br from-primary/30 to-secondary/20",
      description: "Next-generation mobile banking app with AI fraud detection and instant transfers.",
      challenge: "Traditional banking app with poor UX, high fraud rates, and slow transaction processing.",
      solution: "Built a modern mobile-first banking platform with biometric security, real-time fraud detection, and instant P2P transfers.",
      metrics: [
        { label: "User Growth", before: "50K", after: "850K", growth: "+1600%" },
        { label: "Fraud Incidents", before: "2.4%", after: "0.1%", growth: "-96%" },
        { label: "Transaction Speed", before: "2-3 days", after: "Instant", growth: "100%" },
        { label: "App Rating", before: "2.8★", after: "4.8★", growth: "+71%" }
      ],
      techStack: ["React Native", "Node.js", "MongoDB", "TensorFlow", "AWS", "Plaid"],
      testimonial: {
        text: "Infinibit Tech delivered beyond expectations. Our user base grew 16x and fraud is virtually eliminated.",
        author: "James Wilson",
        position: "CEO, NeoBank Digital"
      },
      duration: "5 months",
      team: "10 developers"
    },
    {
      id: 4,
      title: "Enterprise CRM with AI Analytics",
      client: "SalesPro Enterprise",
      category: "Enterprise Software",
      image: "bg-gradient-to-br from-accent/30 to-primary/10",
      description: "Intelligent CRM platform with predictive analytics and automated lead scoring.",
      challenge: "Scattered customer data across 12 different tools, leading to missed opportunities and poor customer insights.",
      solution: "Unified CRM platform with AI-powered lead scoring, automated workflows, and comprehensive analytics dashboard.",
      metrics: [
        { label: "Sales Efficiency", before: "42%", after: "87%", growth: "+107%" },
        { label: "Lead Conversion", before: "8%", after: "28%", growth: "+250%" },
        { label: "Data Accuracy", before: "63%", after: "98%", growth: "+56%" },
        { label: "Customer Retention", before: "71%", after: "92%", growth: "+30%" }
      ],
      techStack: ["Vue.js", "Django", "PostgreSQL", "Redis", "Python", "GCP"],
      testimonial: {
        text: "The AI-powered insights have transformed our sales process. We're closing deals 3x faster with higher success rates.",
        author: "Linda Martinez",
        position: "VP of Sales, SalesPro Enterprise"
      },
      duration: "7 months",
      team: "14 developers"
    }
  ];

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
              Our Success Stories
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold neon-text">
              Portfolio & Case Studies
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from real clients. See how we've transformed businesses across industries with cutting-edge technology and innovative solutions.
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
              { value: "$250M+", label: "Revenue Generated" },
              { value: "50+", label: "Industries Served" }
            ].map((stat, index) => (
              <Card key={index} className="glass-card text-center p-6">
                <div className="text-4xl font-bold neon-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6">
        <div className="container mx-auto space-y-32">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Project Image/Visual */}
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <Card className="glass-card overflow-hidden group cursor-pointer">
                  <div className={`${study.image} h-80 flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
                    <div className="text-center p-8">
                      <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
                        {study.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-foreground">{study.client}</h3>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Project Details */}
              <div className={`space-y-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div>
                  <h2 className="text-4xl font-bold mb-4 neon-text">{study.title}</h2>
                  <p className="text-lg text-muted-foreground">{study.description}</p>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-4">
                  <Card className="glass-card p-6">
                    <h4 className="text-sm font-semibold text-primary mb-2">THE CHALLENGE</h4>
                    <p className="text-sm text-muted-foreground">{study.challenge}</p>
                  </Card>
                  <Card className="glass-card p-6">
                    <h4 className="text-sm font-semibold text-primary mb-2">OUR SOLUTION</h4>
                    <p className="text-sm text-muted-foreground">{study.solution}</p>
                  </Card>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {study.metrics.map((metric, idx) => (
                    <Card key={idx} className="glass-card p-4">
                      <div className="text-xs text-muted-foreground mb-2">{metric.label}</div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm text-muted-foreground line-through">{metric.before}</span>
                        <ArrowRight className="w-3 h-3 text-primary" />
                        <span className="text-lg font-bold text-primary">{metric.after}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-400">
                        <TrendingUp className="w-3 h-3" />
                        <span>{metric.growth}</span>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-3">TECH STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.techStack.map((tech, idx) => (
                      <Badge key={idx} className="glass-card border-primary/20 text-foreground">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{study.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{study.team}</span>
                  </div>
                </div>

                {/* Testimonial */}
                <Card className="glass-card p-6 border-primary/20">
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-sm text-muted-foreground italic mb-4">
                    "{study.testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{study.testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{study.testimonial.position}</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="glass-card p-12 text-center border-primary/30">
            <h2 className="text-4xl font-bold mb-4 neon-text">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can transform your business with innovative technology solutions.
            </p>
            <Button size="lg" className="glass-button bg-primary text-primary-foreground hover:bg-primary/90 px-8">
              Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Portfolio;
