import { ShoppingCart, TrendingUp, CreditCard, Globe2, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const Ecommerce = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <ShoppingCart className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">E-commerce</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              E-commerce <span className="neon-text">Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              E-commerce systems built to convert and scale globally with payment integrations.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Launch Your Store
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Our <span className="neon-text">E-commerce</span> Solutions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: TrendingUp, title: "High Conversion", desc: "Optimized checkout flows that maximize sales" },
              { icon: CreditCard, title: "Payment Gateway", desc: "Stripe, PayPal, and 50+ payment methods" },
              { icon: Globe2, title: "Multi-currency", desc: "Sell globally with automatic currency conversion" },
              { icon: ShoppingCart, title: "Inventory Management", desc: "Real-time stock tracking and automated alerts" },
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
                <h3 className="text-xl font-semibold mb-4 text-primary">Platforms</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Shopify & WooCommerce</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Magento & BigCommerce</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Custom Solutions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Payments</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Stripe & PayPal</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Square & Authorize.net</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Crypto Payments</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Product Search & Filters</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Reviews & Ratings</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Email Automation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Store <span className="neon-text">Packages</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Starter Store", price: "$8,000", desc: "Small catalogs", features: ["Up to 100 Products", "Payment Integration", "Basic SEO", "Mobile Responsive", "Admin Dashboard"] },
              { name: "Growth Store", price: "$25,000", desc: "Growing businesses", features: ["Unlimited Products", "Advanced Features", "Marketing Tools", "Analytics", "Multi-currency", "Email Campaigns"] },
              { name: "Enterprise", price: "Custom", desc: "Large retailers", features: ["Multi-vendor", "Custom Integrations", "Advanced Analytics", "24/7 Support", "Dedicated Server", "White Label"] },
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
            <h2 className="text-4xl font-bold mb-4">Ready to <span className="neon-text">Sell Online</span>?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Launch a high-converting e-commerce store that scales with your business.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Start Selling
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

export default Ecommerce;
