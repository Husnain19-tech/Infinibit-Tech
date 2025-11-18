import { Code, Layers, Shield, Rocket, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const CustomSoftware = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <Code className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Development</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Custom Software <span className="neon-text">Development</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Full-cycle development for scalable, enterprise-level web and desktop applications.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose <span className="neon-text">Custom Software</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Layers, title: "Scalable Architecture", desc: "Built to grow with your business from startup to enterprise" },
              { icon: Shield, title: "Security First", desc: "Industry-standard security protocols and data encryption" },
              { icon: Rocket, title: "Fast Delivery", desc: "Agile methodology ensuring rapid deployment and iteration" },
              { icon: Code, title: "Clean Code", desc: "Maintainable, well-documented code following best practices" },
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
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Angular & Vue</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> TypeScript</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Backend</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Node.js & Python</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> .NET & Java</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Microservices</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Database</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> PostgreSQL & MySQL</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> MongoDB & Redis</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> AWS & Azure</li>
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
              { name: "MVP", price: "$15,000", desc: "Launch your idea", features: ["Core Features", "Web or Desktop", "3 Month Timeline", "Basic Support", "Source Code"] },
              { name: "Full Product", price: "$50,000", desc: "Complete solution", features: ["All Features", "Multi-platform", "6 Month Timeline", "Priority Support", "Documentation", "Training"] },
              { name: "Enterprise", price: "Custom", desc: "Complex systems", features: ["Unlimited Scope", "Full Stack Team", "Ongoing Development", "24/7 Support", "SLA Agreement"] },
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
            <h2 className="text-4xl font-bold mb-4">Let's Build Something <span className="neon-text">Amazing</span></h2>
            <p className="text-xl text-muted-foreground mb-8">
              Transform your vision into reality with our expert development team.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Discuss Your Project
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

export default CustomSoftware;
