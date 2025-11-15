import { Phone, Headphones, BarChart2, Users, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const CallCenter = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <Phone className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Call Center Tech</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Call Center <span className="neon-text">Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end modern call center systems with auto dialer and agent dashboards.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Transform Your Call Center
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Platform <span className="neon-text">Features</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Phone, title: "Auto Dialer", desc: "Intelligent predictive and progressive dialing" },
              { icon: Headphones, title: "Agent Dashboard", desc: "Unified interface with CRM integration" },
              { icon: BarChart2, title: "Real-time Analytics", desc: "Live monitoring and performance metrics" },
              { icon: Users, title: "Call Recording", desc: "Automated recording with quality assurance" },
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
                <h3 className="text-xl font-semibold mb-4 text-primary">Telephony</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Twilio & Vonage</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Asterisk & FreePBX</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> WebRTC</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> IVR System</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Call Routing</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Queue Management</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Integration</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> CRM Integration</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Analytics Dashboard</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Reporting Tools</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Pricing <span className="neon-text">Tiers</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Starter", price: "$10,000", desc: "Up to 10 agents", features: ["Basic Dialer", "Call Recording", "Basic Reports", "Email Support", "Setup Training"] },
              { name: "Professional", price: "$30,000", desc: "Up to 50 agents", features: ["Advanced Dialer", "CRM Integration", "Real-time Analytics", "Priority Support", "Custom Workflows", "API Access"] },
              { name: "Enterprise", price: "Custom", desc: "Unlimited agents", features: ["Full Feature Suite", "Multi-location", "Advanced Analytics", "24/7 Support", "Custom Development", "SLA Agreement"] },
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
            <h2 className="text-4xl font-bold mb-4">Modernize Your <span className="neon-text">Call Center</span></h2>
            <p className="text-xl text-muted-foreground mb-8">
              Boost agent productivity and customer satisfaction with our advanced platform.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Request Demo
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

export default CallCenter;
