import { Megaphone, TrendingUp, Target, Share2, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const DigitalMarketing = () => {
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
              <Megaphone className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Growth Marketing</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Digital Marketing & <span className="neon-text">Branding</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Full digital growth services including social media, paid ads, and brand design.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Grow Your Brand
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Marketing <span className="neon-text">Services</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Share2, title: "Social Media", desc: "Content creation and community management" },
              { icon: Target, title: "Paid Advertising", desc: "Google Ads, Facebook, Instagram, LinkedIn" },
              { icon: TrendingUp, title: "SEO & Content", desc: "Search optimization and content marketing" },
              { icon: Megaphone, title: "Brand Strategy", desc: "Logo design, brand guidelines, and identity" },
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
          <h2 className="text-4xl font-bold text-center mb-16">Marketing <span className="neon-text">Channels</span></h2>
          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Organic</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> SEO Optimization</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Content Marketing</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Email Campaigns</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Paid</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Google Ads (PPC)</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Social Media Ads</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Display Advertising</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Branding</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Logo & Identity</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Brand Guidelines</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Creative Assets</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Marketing <span className="neon-text">Plans</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Starter", price: "$2,000/mo", desc: "Small businesses", features: ["Social Media (2 platforms)", "Content Creation", "Basic SEO", "Monthly Reports", "Email Support"] },
              { name: "Growth", price: "$5,000/mo", desc: "Growing brands", features: ["All Platforms", "Paid Ad Management", "Advanced SEO", "Content Strategy", "Weekly Reports", "Priority Support"] },
              { name: "Enterprise", price: "Custom", desc: "Large campaigns", features: ["Full Service Marketing", "Brand Strategy", "Multi-channel Ads", "Custom Analytics", "24/7 Support", "Dedicated Manager"] },
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
            <h2 className="text-4xl font-bold mb-4">Scale Your <span className="neon-text">Digital Presence</span></h2>
            <p className="text-xl text-muted-foreground mb-8">
              Drive growth with data-driven marketing strategies and creative campaigns.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Start Growing Today
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

export default DigitalMarketing;
