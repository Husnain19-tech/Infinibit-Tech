import { Globe, Rocket, Database, Lock, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const WebApp = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Web Applications</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Web App <span className="neon-text">Development</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful, interactive web applications using React, Angular, Node.js, and Python.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Start Building
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Core <span className="neon-text">Capabilities</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Rocket, title: "High Performance", desc: "Optimized for speed with lazy loading and caching" },
              { icon: Database, title: "Real-time Data", desc: "WebSocket connections for live updates and sync" },
              { icon: Lock, title: "Secure by Design", desc: "OAuth, JWT, and enterprise-grade authentication" },
              { icon: Globe, title: "Responsive Design", desc: "Pixel-perfect across all devices and screen sizes" },
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
                <h3 className="text-xl font-semibold mb-4 text-primary">Frontend</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> React & Next.js</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Angular & Vue.js</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Tailwind & SASS</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Backend</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Node.js & Express</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Python & Django</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> GraphQL & REST</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Cloud</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> AWS & Azure</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Docker & K8s</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> CI/CD Pipelines</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Investment <span className="neon-text">Packages</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Standard", price: "$10,000", desc: "Small to medium apps", features: ["Up to 10 Pages", "Responsive Design", "Basic Features", "3 Month Support", "SEO Optimized"] },
              { name: "Advanced", price: "$30,000", desc: "Complex applications", features: ["Unlimited Pages", "Custom Features", "Real-time Updates", "6 Month Support", "API Integration", "Admin Panel"] },
              { name: "Enterprise", price: "Custom", desc: "Large-scale systems", features: ["Microservices", "Multi-tenant", "Advanced Security", "24/7 Support", "DevOps Setup", "Scalability"] },
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
                  <Button className="w-full glass-button">Get Quote</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Build Your Next <span className="neon-text">Web Application</span></h2>
            <p className="text-xl text-muted-foreground mb-8">
              Partner with us to create powerful web experiences that drive business growth.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Let's Talk
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default WebApp;
