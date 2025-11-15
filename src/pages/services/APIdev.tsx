import { Plug, Zap, Shield, Code2, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const APIdev = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <Plug className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">API Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              API <span className="neon-text">Development</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Secure, scalable API engineering with REST, GraphQL, and microservices.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Build Your API
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">API <span className="neon-text">Expertise</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Code2, title: "RESTful APIs", desc: "Industry-standard REST API architecture" },
              { icon: Plug, title: "GraphQL", desc: "Flexible queries for modern applications" },
              { icon: Shield, title: "Security First", desc: "OAuth 2.0, JWT, and rate limiting" },
              { icon: Zap, title: "High Performance", desc: "Optimized for speed and scalability" },
            ].map((feature, i) => (
              <div key={i} className="glass-card p-6 hover:scale-105 transition-all duration-300">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Tech <span className="neon-text">Stack</span></h2>
          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Frameworks</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Node.js & Express</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> FastAPI & Django</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> .NET Core</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Architecture</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Microservices</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Event-driven</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Serverless</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Tools</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Swagger & Postman</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Docker & K8s</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> API Gateway</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Development <span className="neon-text">Packages</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Basic API", price: "$5,000", desc: "Simple integrations", features: ["5-10 Endpoints", "REST or GraphQL", "Basic Auth", "Documentation", "Testing Suite"] },
              { name: "Advanced API", price: "$15,000", desc: "Complex systems", features: ["20+ Endpoints", "Microservices", "Advanced Security", "Rate Limiting", "Monitoring", "Support"] },
              { name: "Enterprise", price: "Custom", desc: "Large scale", features: ["Unlimited Endpoints", "Multi-region", "Custom Architecture", "24/7 Support", "SLA Agreement", "DevOps"] },
            ].map((plan, i) => (
              <div key={i} className={`glass-card p-8 ${i === 1 ? 'border-2 border-primary' : ''}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold neon-text mb-2">{plan.price}</div>
                <p className="text-muted-foreground mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center text-sm">
                      <Check className="w-4 h-4 mr-2 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/#contact">
                  <Button className="w-full glass-button">Get Started</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Power Your Apps with <span className="neon-text">Robust APIs</span></h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's build APIs that scale and integrate seamlessly.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Discuss Your API Needs
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default APIdev;
