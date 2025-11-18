import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { Bot, Code, Smartphone, Globe, ShoppingCart, Database, Palette, Plug, Phone, Briefcase, Building, BarChart, MessageSquare, Cloud, Megaphone, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Bot,
    title: "AI Automation Solutions",
    description: "Intelligent workflows that eliminate manual work and automate operations, support, and data handling.",
    link: "/services/ai-automation"
  },
  {
    icon: Code,
    title: "Custom Software Development",
    description: "Full-cycle development for scalable, enterprise-level web and desktop applications.",
    link: "/services/custom-software"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Lightning-fast, beautiful apps for Android, iOS, and cross-platform solutions.",
    link: "/services/mobile-app"
  },
  {
    icon: Globe,
    title: "Web App Development",
    description: "Powerful, interactive web applications using React, Angular, Node.js, and Python.",
    link: "/services/web-app"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "E-commerce systems built to convert and scale globally with payment integrations.",
    link: "/services/ecommerce"
  },
  {
    icon: Database,
    title: "CRM / ERP Systems",
    description: "Fully custom enterprise management systems with role-based access and analytics.",
    link: "/services/crm-erp"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Premium digital experience design with interactive prototypes and UX research.",
    link: "/services/ui-ux-design"
  },
  {
    icon: Plug,
    title: "API Development",
    description: "Secure, scalable API engineering with REST, GraphQL, and microservices.",
    link: "/services/api-development"
  },
  {
    icon: Phone,
    title: "Call Center Solutions",
    description: "End-to-end modern call center systems with auto dialer and agent dashboards.",
    link: "/services/call-center"
  },
  {
    icon: Briefcase,
    title: "Business Consultancy",
    description: "Helping companies transform operations through automation and strategic planning.",
    link: "/services/business-consultancy"
  },
  {
    icon: Building,
    title: "Corporate Solutions",
    description: "Enterprise-grade digital systems with internal portals and automation pipelines.",
    link: "/services/corporate-solutions"
  },
  {
    icon: BarChart,
    title: "Data Engineering & Analytics",
    description: "Turning raw data into meaningful insights with pipelines and BI dashboards.",
    link: "/services/data-engineering"
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Development",
    description: "Custom chatbots for support, sales, and automation with NLP-powered responses.",
    link: "/services/ai-chatbot"
  },
  {
    icon: Cloud,
    title: "SaaS Product Development",
    description: "From idea to launch to scale with multi-tenant architecture and subscription systems.",
    link: "/services/saas"
  },
  {
    icon: Megaphone,
    title: "Digital Marketing & Branding",
    description: "Full digital growth services including social media, paid ads, and brand design.",
    link: "/services/digital-marketing"
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance & Testing",
    description: "Ensuring flawless performance with manual, automated, and load testing.",
    link: "/services/quality-assurance"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section className="relative py-32 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
          
          <div className="container relative z-10 mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold">
                Our <span className="neon-text">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive technology solutions to transform your business. From AI automation to mobile apps, 
                we deliver excellence across 16 specialized service areas.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={index}
                    to={service.link}
                    className="group glass-card p-6 rounded-2xl hover:glow transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex-grow">
                        {service.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary text-sm font-medium">
                        Learn more
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Services;
