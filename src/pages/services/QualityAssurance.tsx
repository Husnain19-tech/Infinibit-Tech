import { CheckCircle, Bug, Shield, Zap, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const QualityAssurance = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Quality Assurance</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Quality Assurance & <span className="neon-text">Testing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ensuring flawless performance with manual, automated, and load testing.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Ensure Quality
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Testing <span className="neon-text">Services</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Bug, title: "Manual Testing", desc: "Comprehensive exploratory and functional testing" },
              { icon: Zap, title: "Automation", desc: "Automated test suites for continuous integration" },
              { icon: Shield, title: "Security Testing", desc: "Penetration testing and vulnerability assessment" },
              { icon: CheckCircle, title: "Performance", desc: "Load testing and performance optimization" },
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
          <h2 className="text-4xl font-bold text-center mb-16">Testing <span className="neon-text">Tools</span></h2>
          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Automation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Selenium & Cypress</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Playwright & Puppeteer</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Jest & Mocha</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Performance</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> JMeter & LoadRunner</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> k6 & Gatling</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Lighthouse</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Security</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> OWASP ZAP</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Burp Suite</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Nessus</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Testing <span className="neon-text">Packages</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Essential QA", price: "$3,000", desc: "Basic testing", features: ["Manual Testing", "Bug Reports", "Regression Testing", "Test Cases", "1 Month Support"] },
              { name: "Advanced QA", price: "$10,000", desc: "Comprehensive", features: ["Manual + Automated", "Performance Testing", "Security Audit", "CI/CD Integration", "Detailed Reports", "3 Months Support"] },
              { name: "Enterprise QA", price: "Custom", desc: "Full coverage", features: ["All Testing Types", "Dedicated QA Team", "Continuous Testing", "Custom Frameworks", "24/7 Support", "Ongoing Maintenance"] },
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
            <h2 className="text-4xl font-bold mb-4">Ship with <span className="neon-text">Confidence</span></h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ensure your software is bug-free, secure, and performs flawlessly.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Start Testing
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

export default QualityAssurance;
