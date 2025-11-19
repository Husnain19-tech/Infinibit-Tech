import { Bot, Zap, Brain, Workflow, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const AIAutomation = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">AI Solutions</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              AI Automation <span className="neon-text">Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Intelligent workflows that eliminate manual work and automate operations, support, and data handling.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Key <span className="neon-text">Features</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Brain, title: "Intelligent Decision Making", desc: "ML-powered algorithms that learn and adapt to your business logic" },
              { icon: Workflow, title: "Workflow Automation", desc: "End-to-end process automation across departments and systems" },
              { icon: Zap, title: "Real-time Processing", desc: "Lightning-fast data processing and instant action triggers" },
              { icon: Bot, title: "Smart Bots", desc: "AI agents that handle repetitive tasks 24/7 without human intervention" },
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

      {/* Tech Stack Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Tech <span className="neon-text">Stack</span></h2>
          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">AI & ML</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> TensorFlow & PyTorch</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> OpenAI GPT Integration</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> LangChain & Vector DBs</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Automation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> n8n & Zapier</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> RPA Tools (UiPath)</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Custom Python Scripts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Flexible <span className="neon-text">Pricing</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Starter", price: "$5,000", desc: "Perfect for small teams", features: ["1-2 Workflows", "Basic AI Integration", "Email Support", "1 Month Support"] },
              { name: "Professional", price: "$15,000", desc: "For growing businesses", features: ["5-10 Workflows", "Advanced AI Features", "Priority Support", "3 Months Support", "Custom Training"] },
              { name: "Enterprise", price: "Custom", desc: "For large organizations", features: ["Unlimited Workflows", "Full AI Suite", "24/7 Support", "Ongoing Maintenance", "Dedicated Team"] },
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

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Ready to <span className="neon-text">Automate</span>?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how AI automation can transform your business operations.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Schedule a Consultation
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

export default AIAutomation;
