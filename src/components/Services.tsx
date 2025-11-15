import { Bot, Code, Smartphone, Globe, ShoppingCart, Database, Palette, Plug, Phone, Briefcase, Building, BarChart, MessageSquare, Cloud, Megaphone, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Automation Solutions",
    description: "Intelligent workflows that eliminate manual work and automate operations, support, and data handling."
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Full-cycle development for scalable, enterprise-level web and desktop applications."
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Lightning-fast, beautiful apps for Android, iOS, and cross-platform solutions."
  },
  {
    icon: Globe,
    title: "Web App Development",
    description: "Powerful, interactive web applications using React, Angular, Node.js, and Python."
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "E-commerce systems built to convert and scale globally with payment integrations."
  },
  {
    icon: Database,
    title: "CRM / ERP Systems",
    description: "Fully custom enterprise management systems with role-based access and analytics."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Premium digital experience design with interactive prototypes and UX research."
  },
  {
    icon: Plug,
    title: "API Development",
    description: "Secure, scalable API engineering with REST, GraphQL, and microservices."
  },
  {
    icon: Phone,
    title: "Call Center Solutions",
    description: "End-to-end modern call center systems with auto dialer and agent dashboards."
  },
  {
    icon: Briefcase,
    title: "Business Consultancy",
    description: "Helping companies transform operations through automation and strategic planning."
  },
  {
    icon: Building,
    title: "Corporate Solutions",
    description: "Enterprise-grade digital systems with internal portals and automation pipelines."
  },
  {
    icon: BarChart,
    title: "Data Engineering & Analytics",
    description: "Turning raw data into meaningful insights with pipelines and BI dashboards."
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Development",
    description: "Custom chatbots for support, sales, and automation with NLP-powered responses."
  },
  {
    icon: Cloud,
    title: "SaaS Product Development",
    description: "From idea to launch to scale with multi-tenant architecture and subscription systems."
  },
  {
    icon: Megaphone,
    title: "Digital Marketing & Branding",
    description: "Full digital growth services including social media, paid ads, and brand design."
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance & Testing",
    description: "Ensuring flawless performance with manual, automated, and load testing."
  }
];

const Services = () => {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container relative z-10 mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
            <span className="text-sm text-primary">Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="neon-text">16</span> Tech Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From AI automation to SaaS development, we deliver enterprise-grade solutions that transform businesses.
          </p>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 hover:scale-105 transition-all duration-300 group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
