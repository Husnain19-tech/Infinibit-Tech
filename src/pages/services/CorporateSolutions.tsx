import { Building, Shield, Users, Workflow, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const CorporateSolutions = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <Building className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Enterprise</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Corporate <span className="neon-text">Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade digital systems with internal portals and automation pipelines.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Elevate Your Enterprise
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Enterprise <span className="neon-text">Capabilities</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Building, title: "Internal Portals", desc: "Unified employee and vendor portals" },
              { icon: Workflow, title: "Automation", desc: "End-to-end process automation across departments" },
              { icon: Shield, title: "Enterprise Security", desc: "SSO, MFA, and compliance-ready infrastructure" },
              { icon: Users, title: "Collaboration", desc: "Team workspaces and document management" },
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
                <h3 className="text-xl font-semibold mb-4 text-primary">Infrastructure</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> AWS & Azure</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Kubernetes</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Load Balancing</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Security</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> SSO & SAML</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> VPN Integration</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Compliance (SOC2, GDPR)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Integration</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Active Directory</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Legacy Systems</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Third-party APIs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Investment <span className="neon-text">Plans</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Department", price: "$40,000", desc: "Single department", features: ["Internal Portal", "Basic Automation", "Up to 100 Users", "Standard Security", "6 Months Support"] },
              { name: "Company-wide", price: "$120,000", desc: "Full organization", features: ["Multi-portal System", "Advanced Automation", "Unlimited Users", "Enterprise Security", "12 Months Support", "Training Program"] },
              { name: "Global Enterprise", price: "Custom", desc: "Multi-location", features: ["Global Infrastructure", "Custom Development", "Multi-region Support", "24/7 Support", "Dedicated Team", "SLA Agreement"] },
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
            <h2 className="text-4xl font-bold mb-4">Digitize Your <span className="neon-text">Enterprise</span></h2>
            <p className="text-xl text-muted-foreground mb-8">
              Transform your organization with scalable corporate solutions.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Schedule Enterprise Demo
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

export default CorporateSolutions;
