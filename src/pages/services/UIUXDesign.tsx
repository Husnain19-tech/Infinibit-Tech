import { Palette, Eye, Smartphone, Figma, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const UIUXDesign = () => {
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
              <Palette className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Design Services</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              UI/UX <span className="neon-text">Design</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium digital experience design with interactive prototypes and UX research.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Start Designing
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Design <span className="neon-text">Process</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Eye, title: "User Research", desc: "Deep dive into user behavior and pain points" },
              { icon: Figma, title: "Wireframing", desc: "Low-fidelity sketches to map user flows" },
              { icon: Palette, title: "Visual Design", desc: "High-fidelity mockups with brand identity" },
              { icon: Smartphone, title: "Prototyping", desc: "Interactive prototypes for user testing" },
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
          <h2 className="text-4xl font-bold text-center mb-16">Design <span className="neon-text">Tools</span></h2>
          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Design</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Figma & Adobe XD</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Sketch & InVision</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Adobe Creative Suite</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Research</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> User Interviews</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> A/B Testing</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Heatmap Analytics</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Deliverables</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Design System</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Style Guide</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Component Library</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Design <span className="neon-text">Packages</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Essential", price: "$3,000", desc: "Small projects", features: ["5-10 Screens", "Wireframes", "Mockups", "Style Guide", "2 Revisions"] },
              { name: "Professional", price: "$10,000", desc: "Full products", features: ["20-30 Screens", "User Research", "Interactive Prototype", "Design System", "Unlimited Revisions", "User Testing"] },
              { name: "Enterprise", price: "Custom", desc: "Large systems", features: ["Unlimited Screens", "Complete UX Audit", "Advanced Prototypes", "Design Workshops", "Ongoing Support", "Brand Strategy"] },
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
            <h2 className="text-4xl font-bold mb-4">Create <span className="neon-text">Delightful</span> Experiences</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Partner with our design team to craft interfaces users love.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Let's Design Together
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

export default UIUXDesign;
