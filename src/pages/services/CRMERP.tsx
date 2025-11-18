import { Database, Users, BarChart3, Settings, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const CRMERP = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <Database className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Enterprise Systems</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              CRM / ERP <span className="neon-text">Systems</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fully custom enterprise management systems with role-based access and analytics.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Transform Your Business
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">System <span className="neon-text">Capabilities</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Users, title: "Customer Management", desc: "360° customer view with interaction history" },
              { icon: BarChart3, title: "Advanced Analytics", desc: "Real-time dashboards and custom reports" },
              { icon: Settings, title: "Process Automation", desc: "Automate workflows across departments" },
              { icon: Database, title: "Centralized Data", desc: "Single source of truth for all business data" },
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
                <h3 className="text-xl font-semibold mb-4 text-primary">Core</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Custom Development</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Salesforce Integration</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> SAP & Oracle</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Role-based Access</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Custom Workflows</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> API Integrations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Modules</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Sales & Marketing</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Inventory & Supply</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> HR & Finance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Implementation <span className="neon-text">Plans</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Small Business", price: "$20,000", desc: "Up to 20 users", features: ["Core CRM Features", "Basic Automation", "Standard Reports", "Email Support", "3 Months Training"] },
              { name: "Mid-Market", price: "$60,000", desc: "Up to 100 users", features: ["Full CRM/ERP Suite", "Advanced Automation", "Custom Reports", "Priority Support", "6 Months Training", "Integrations"] },
              { name: "Enterprise", price: "Custom", desc: "Unlimited users", features: ["Complete Solution", "Multi-location", "Advanced Analytics", "24/7 Support", "Ongoing Training", "Dedicated Manager"] },
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
            <h2 className="text-4xl font-bold mb-4">Streamline Your <span className="neon-text">Operations</span></h2>
            <p className="text-xl text-muted-foreground mb-8">
              Implement a custom CRM/ERP system that grows with your business.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Schedule Demo
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

export default CRMERP;
