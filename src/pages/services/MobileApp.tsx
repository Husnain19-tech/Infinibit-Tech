import { Smartphone, Zap, Users, Globe2, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";

const MobileApp = () => {
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
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Mobile Development</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Mobile App <span className="neon-text">Development</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Lightning-fast, beautiful apps for Android, iOS, and cross-platform solutions.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Build Your App
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Platform <span className="neon-text">Expertise</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Smartphone, title: "iOS Native", desc: "Swift & SwiftUI for premium Apple experiences" },
              { icon: Smartphone, title: "Android Native", desc: "Kotlin & Jetpack Compose for powerful Android apps" },
              { icon: Globe2, title: "Cross-Platform", desc: "React Native & Flutter for multi-platform deployment" },
              { icon: Zap, title: "PWA Development", desc: "Progressive web apps that work like native applications" },
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
                <h3 className="text-xl font-semibold mb-4 text-primary">iOS</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Swift & SwiftUI</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Xcode & TestFlight</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Core Data & CloudKit</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Android</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Kotlin & Compose</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Android Studio</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Firebase & Room DB</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Cross-Platform</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> React Native</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Flutter & Dart</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Expo & Capacitor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Pricing <span className="neon-text">Options</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Single Platform", price: "$20,000", desc: "iOS or Android", features: ["Native Development", "App Store Deployment", "4 Month Timeline", "Push Notifications", "Analytics Setup"] },
              { name: "Cross-Platform", price: "$35,000", desc: "iOS + Android", features: ["React Native/Flutter", "Dual Deployment", "5 Month Timeline", "Offline Support", "Payment Integration"] },
              { name: "Enterprise", price: "Custom", desc: "Complex apps", features: ["Native + Web", "Advanced Features", "Ongoing Support", "Custom Backend", "White Label Option"] },
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
            <h2 className="text-4xl font-bold mb-4">Ready to Launch Your <span className="neon-text">Mobile App</span>?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's create an app that users love and App Stores feature.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Start Your Project
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

export default MobileApp;
