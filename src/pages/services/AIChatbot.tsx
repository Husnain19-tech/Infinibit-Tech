import { MessageSquare, Bot, Zap, Brain, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const AIChatbot = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">Chatbot AI</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              AI Chatbot <span className="neon-text">Development</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Custom chatbots for support, sales, and automation with NLP-powered responses.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link to="/#contact">
                <Button size="lg" className="glass-button group">
                  Build Your Chatbot
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Chatbot <span className="neon-text">Capabilities</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Brain, title: "NLP Powered", desc: "Natural language understanding and context awareness" },
              { icon: Zap, title: "24/7 Support", desc: "Instant responses to customer queries anytime" },
              { icon: Bot, title: "Multi-channel", desc: "Deploy on web, WhatsApp, Messenger, and Slack" },
              { icon: MessageSquare, title: "Smart Routing", desc: "Seamless handoff to human agents when needed" },
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
                <h3 className="text-xl font-semibold mb-4 text-primary">AI Engines</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> OpenAI GPT-4</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Google DialogFlow</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Rasa & Botpress</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Channels</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Website Widget</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> WhatsApp Business</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Facebook Messenger</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Intent Recognition</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> CRM Integration</li>
                  <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-primary" /> Analytics Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Bot <span className="neon-text">Packages</span></h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Basic Bot", price: "$3,000", desc: "Simple FAQ bot", features: ["Rule-based Logic", "Single Channel", "Up to 50 Intents", "Basic Analytics", "3 Months Support"] },
              { name: "Smart Bot", price: "$10,000", desc: "AI-powered bot", features: ["NLP Integration", "Multi-channel", "Unlimited Intents", "CRM Integration", "Advanced Analytics", "12 Months Support"] },
              { name: "Enterprise Bot", price: "Custom", desc: "Complex systems", features: ["Custom AI Training", "All Channels", "Voice Support", "API Integrations", "24/7 Support", "Dedicated Team"] },
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
            <h2 className="text-4xl font-bold mb-4">Automate Customer <span className="neon-text">Engagement</span></h2>
            <p className="text-xl text-muted-foreground mb-8">
              Deploy an AI chatbot that handles queries, generates leads, and boosts satisfaction.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Launch Your Bot
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

export default AIChatbot;
