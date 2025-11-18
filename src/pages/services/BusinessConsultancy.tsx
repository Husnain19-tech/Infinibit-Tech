import { Briefcase, TrendingUp, Target, Lightbulb, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const BusinessConsultancy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Strategic Growth</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Business <span className="neon-text">Consultancy</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Helping companies transform operations through automation and strategic planning.
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
          <h2 className="text-4xl font-bold text-center mb-16">Our <span className="neon-text">Approach</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Target, title: "Strategy", desc: "Define clear objectives and roadmap for success" },
              { icon: Lightbulb, title: "Innovation", desc: "Identify opportunities for digital transformation" },
              { icon: TrendingUp, title: "Growth", desc: "Implement scalable solutions for expansion" },
              { icon: Briefcase, title: "Execution", desc: "Deploy changes with minimal disruption" },
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
          <h2 className="text-4xl font-bold text-center mb-16">Service <span className="neon-text">Areas</span></h2>
          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Digital Transformation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Process Automation</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Cloud Migration</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Legacy Modernization</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> AI Integration</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Business Strategy</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Market Analysis</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Competitive Research</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Growth Planning</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> ROI Optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Engagement <span className="neon-text">Models</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Project-Based", price: "$5,000+", desc: "Short-term engagement", features: ["3-6 Month Duration", "Specific Objectives", "Deliverable-focused", "Final Report", "Implementation Plan"] },
              { name: "Retainer", price: "$10,000/mo", desc: "Ongoing partnership", features: ["Monthly Consulting", "Strategic Guidance", "Priority Access", "Quarterly Reviews", "Continuous Support", "Team Training"] },
              { name: "Transformation", price: "Custom", desc: "Large-scale change", features: ["12+ Month Program", "Full Team Engagement", "End-to-end Implementation", "Change Management", "Measurable KPIs", "Executive Support"] },
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
            <h2 className="text-4xl font-bold mb-4">Ready to <span className="neon-text">Scale</span>?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how we can accelerate your business growth.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Book a Strategy Call
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

export default BusinessConsultancy;
