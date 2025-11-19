import { Cloud, Users, CreditCard, Rocket, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const SaaS = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Breadcrumbs />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <Cloud className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">SaaS Development</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              SaaS Product <span className="neon-text">Development</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From idea to launch to scale with multi-tenant architecture and subscription systems.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Build Your SaaS
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">SaaS <span className="neon-text">Essentials</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Users, title: "Multi-tenancy", desc: "Isolated data with shared infrastructure" },
              { icon: CreditCard, title: "Billing System", desc: "Stripe integration with subscription management" },
              { icon: Rocket, title: "Auto-scaling", desc: "Infrastructure that grows with your users" },
              { icon: Cloud, title: "Cloud Native", desc: "Built for AWS, Azure, or GCP from day one" },
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
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> TypeScript</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Tailwind CSS</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Backend</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Node.js & Python</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> PostgreSQL & Redis</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Docker & K8s</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">SaaS Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Stripe Billing</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> User Management</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Analytics & Metrics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Development <span className="neon-text">Phases</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "MVP Launch", price: "$30,000", desc: "3-4 months", features: ["Core Features", "Basic UI/UX", "Auth & Billing", "Single Tier Plan", "Beta Testing", "Initial Support"] },
              { name: "Growth Phase", price: "$80,000", desc: "6-9 months", features: ["Full Feature Set", "Premium Design", "Multi-tier Plans", "API Access", "Analytics", "Marketing Site", "Full Support"] },
              { name: "Scale", price: "Custom", desc: "12+ months", features: ["Enterprise Features", "White Labeling", "Advanced Integrations", "Custom Development", "24/7 Support", "Dedicated Team"] },
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
            <h2 className="text-4xl font-bold mb-4">Launch Your <span className="neon-text">SaaS Startup</span></h2>
            <p className="text-xl text-muted-foreground mb-8">
              Turn your SaaS idea into a profitable recurring revenue business.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Start Your Journey
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

export default SaaS;
