import { Bot, Code, Smartphone, Globe, ShoppingCart, Database, Palette, Plug, Phone, Briefcase, Building, BarChart, MessageSquare, Cloud, Megaphone, CheckCircle, LucideIcon } from "lucide-react";

export interface ServiceFeature {
    title: string;
    description: string;
}

export interface TechCategory {
    category: string;
    technologies: string[];
}

export interface ServiceData {
    id: string;
    icon: LucideIcon;
    title: string;
    shortDescription: string;
    longDescription: string;
    link: string;
    whyChoose: ServiceFeature[];
    techStack: TechCategory[];
    metaTitle: string;
    metaDescription: string;
}

export const servicesData: ServiceData[] = [
    {
        id: "ai-automation",
        icon: Bot,
        title: "AI Automation Solutions",
        shortDescription: "Intelligent workflows that eliminate manual work and automate operations, support, and data handling.",
        longDescription: "Transform your business operations with cutting-edge AI automation. Our solutions leverage machine learning and intelligent workflows to eliminate repetitive tasks, streamline processes, and unlock unprecedented efficiency.",
        link: "/services/ai-automation",
        whyChoose: [
            {
                title: "Intelligent Decision Making",
                description: "ML-powered algorithms that learn and adapt to your unique business logic and patterns"
            },
            {
                title: "24/7 Operations",
                description: "Automated workflows that run continuously without human intervention or downtime"
            },
            {
                title: "Scalable Architecture",
                description: "Cloud-based solutions that grow seamlessly with your business demands"
            },
            {
                title: "Real-time Processing",
                description: "Lightning-fast data processing with instant action triggers and responses"
            }
        ],
        techStack: [
            {
                category: "AI & ML",
                technologies: ["TensorFlow", "PyTorch", "OpenAI GPT", "LangChain", "Vector Databases"]
            },
            {
                category: "Automation",
                technologies: ["n8n", "Zapier", "UiPath", "Custom Python Scripts", "Apache Airflow"]
            },
            {
                category: "Infrastructure",
                technologies: ["AWS Lambda", "Google Cloud Functions", "Docker", "Kubernetes"]
            }
        ],
        metaTitle: "AI Automation Solutions | Infinibit Tech - Intelligent Workflow Automation",
        metaDescription: "Transform your business with AI-powered automation solutions. Machine learning workflows, intelligent process automation, and 24/7 automated operations."
    },
    {
        id: "custom-software",
        icon: Code,
        title: "Custom Software Development",
        shortDescription: "Full-cycle development for scalable, enterprise-level web and desktop applications.",
        longDescription: "Build powerful, scalable software tailored to your exact business needs. From enterprise applications to complex systems, we deliver custom solutions with clean code and robust architecture.",
        link: "/services/custom-software",
        whyChoose: [
            {
                title: "Scalable Architecture",
                description: "Enterprise-grade systems built to handle growth from thousands to millions of users"
            },
            {
                title: "Security First",
                description: "Built-in security measures, encryption, and compliance with industry standards"
            },
            {
                title: "Clean Code",
                description: "Maintainable, well-documented codebase following best practices and design patterns"
            },
            {
                title: "Agile Development",
                description: "Iterative sprints with continuous delivery and regular stakeholder feedback"
            }
        ],
        techStack: [
            {
                category: "Backend",
                technologies: ["Node.js", "Python", "Java", ".NET Core", "Go"]
            },
            {
                category: "Frontend",
                technologies: ["React", "Angular", "Vue.js", "TypeScript", "Next.js"]
            },
            {
                category: "Database",
                technologies: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch"]
            }
        ],
        metaTitle: "Custom Software Development | Infinibit Tech - Enterprise Solutions",
        metaDescription: "Full-cycle custom software development with scalable architecture, security-first approach, and clean code. Build enterprise applications tailored to your needs."
    },
    {
        id: "mobile-app",
        icon: Smartphone,
        title: "Mobile App Development",
        shortDescription: "Lightning-fast, beautiful apps for Android, iOS, and cross-platform solutions.",
        longDescription: "Create stunning mobile experiences that users love. We develop native and cross-platform apps with beautiful UI, smooth performance, and seamless functionality across all devices.",
        link: "/services/mobile-app",
        whyChoose: [
            {
                title: "Native Performance",
                description: "Optimized code delivering 60fps animations and instant response times"
            },
            {
                title: "Cross-Platform Expertise",
                description: "Single codebase for iOS and Android using React Native or Flutter"
            },
            {
                title: "Beautiful UI/UX",
                description: "Pixel-perfect designs following Material Design and iOS Human Interface Guidelines"
            },
            {
                title: "Offline Capability",
                description: "Apps that work seamlessly even without internet connection"
            }
        ],
        techStack: [
            {
                category: "Native",
                technologies: ["Swift", "Kotlin", "SwiftUI", "Jetpack Compose"]
            },
            {
                category: "Cross-Platform",
                technologies: ["React Native", "Flutter", "Expo", "Capacitor"]
            },
            {
                category: "Backend",
                technologies: ["Firebase", "AWS Amplify", "GraphQL", "REST APIs"]
            }
        ],
        metaTitle: "Mobile App Development | Infinibit Tech - iOS & Android Apps",
        metaDescription: "Professional mobile app development for iOS, Android, and cross-platform. Beautiful UI, native performance, and seamless user experience."
    },
    {
        id: "web-app",
        icon: Globe,
        title: "Web App Development",
        shortDescription: "Powerful, interactive web applications using React, Angular, Node.js, and Python.",
        longDescription: "Build modern web applications that deliver desktop-like experiences in the browser. Progressive web apps, real-time dashboards, and interactive platforms built with cutting-edge technologies.",
        link: "/services/web-app",
        whyChoose: [
            {
                title: "Progressive Web Apps",
                description: "Installable apps that work offline and deliver native-like experiences"
            },
            {
                title: "Real-time Features",
                description: "WebSocket integration for live updates, chat, and collaborative features"
            },
            {
                title: "Responsive Design",
                description: "Perfect experience across desktop, tablet, and mobile devices"
            },
            {
                title: "SEO Optimized",
                description: "Server-side rendering and optimization for maximum search visibility"
            }
        ],
        techStack: [
            {
                category: "Frontend",
                technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"]
            },
            {
                category: "Backend",
                technologies: ["Node.js", "Python", "Express", "FastAPI", "GraphQL"]
            },
            {
                category: "DevOps",
                technologies: ["Vercel", "AWS", "Docker", "CI/CD Pipelines", "Nginx"]
            }
        ],
        metaTitle: "Web App Development | Infinibit Tech - Modern Web Applications",
        metaDescription: "Build powerful web applications with React, Next.js, and modern frameworks. Progressive web apps, real-time features, and responsive design."
    },
    {
        id: "ecommerce",
        icon: ShoppingCart,
        title: "E-commerce Solutions",
        shortDescription: "E-commerce systems built to convert and scale globally with payment integrations.",
        longDescription: "Launch and scale your online store with our comprehensive e-commerce solutions. From Shopify customization to headless commerce, we build platforms that drive sales and delight customers.",
        link: "/services/ecommerce",
        whyChoose: [
            {
                title: "Conversion Optimized",
                description: "UX patterns and checkout flows proven to maximize sales and reduce cart abandonment"
            },
            {
                title: "Payment Integration",
                description: "Secure integration with Stripe, PayPal, and global payment gateways"
            },
            {
                title: "Inventory Management",
                description: "Real-time stock tracking, automated reordering, and multi-warehouse support"
            },
            {
                title: "Global Ready",
                description: "Multi-currency, multi-language support with international shipping integration"
            }
        ],
        techStack: [
            {
                category: "Platforms",
                technologies: ["Shopify", "WooCommerce", "Magento", "Custom Headless"]
            },
            {
                category: "Payments",
                technologies: ["Stripe", "PayPal", "Square", "Razorpay", "Apple Pay"]
            },
            {
                category: "Frontend",
                technologies: ["Next.js", "React", "Shopify Liquid", "Tailwind CSS"]
            }
        ],
        metaTitle: "E-commerce Solutions | Infinibit Tech - Online Store Development",
        metaDescription: "Build high-converting e-commerce platforms with payment integrations, inventory management, and global reach. Shopify, WooCommerce, and custom solutions."
    },
    {
        id: "crm-erp",
        icon: Database,
        title: "CRM / ERP Systems",
        shortDescription: "Fully custom enterprise management systems with role-based access and analytics.",
        longDescription: "Streamline your business operations with custom CRM and ERP systems. Centralize customer data, automate workflows, and gain insights with powerful analytics dashboards.",
        link: "/services/crm-erp",
        whyChoose: [
            {
                title: "Centralized Data",
                description: "Single source of truth for all customer and business data across departments"
            },
            {
                title: "Workflow Automation",
                description: "Automate sales pipelines, approvals, and business processes"
            },
            {
                title: "Advanced Analytics",
                description: "Real-time dashboards, custom reports, and predictive insights"
            },
            {
                title: "Role-Based Access",
                description: "Granular permissions ensuring data security and compliance"
            }
        ],
        techStack: [
            {
                category: "Backend",
                technologies: ["Salesforce", "Odoo", "Custom .NET", "SAP Integration"]
            },
            {
                category: "Database",
                technologies: ["PostgreSQL", "SQL Server", "Oracle", "Data Warehouses"]
            },
            {
                category: "Analytics",
                technologies: ["Power BI", "Tableau", "Custom Dashboards", "ML Models"]
            }
        ],
        metaTitle: "CRM/ERP Systems | Infinibit Tech - Enterprise Management Software",
        metaDescription: "Custom CRM and ERP systems with workflow automation, analytics, and role-based access. Streamline operations and centralize business data."
    },
    {
        id: "ui-ux-design",
        icon: Palette,
        title: "UI/UX Design",
        shortDescription: "Premium digital experience design with interactive prototypes and UX research.",
        longDescription: "Create memorable user experiences with our design-first approach. From research to prototyping to final UI, we craft interfaces that users love and that drive business results.",
        link: "/services/ui-ux-design",
        whyChoose: [
            {
                title: "User-Centered Design",
                description: "Research-backed designs based on real user behavior and feedback"
            },
            {
                title: "Interactive Prototypes",
                description: "Clickable prototypes that validate ideas before development begins"
            },
            {
                title: "Design Systems",
                description: "Scalable component libraries ensuring consistency across products"
            },
            {
                title: "Accessibility First",
                description: "WCAG 2.1 AA compliant designs ensuring inclusivity for all users"
            }
        ],
        techStack: [
            {
                category: "Design Tools",
                technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "ProtoPie"]
            },
            {
                category: "Research",
                technologies: ["Maze", "Hotjar", "UserTesting", "Google Analytics"]
            },
            {
                category: "Development",
                technologies: ["Tailwind CSS", "Material UI", "Ant Design", "Storybook"]
            }
        ],
        metaTitle: "UI/UX Design Services | Infinibit Tech - User Experience Design",
        metaDescription: "Premium UI/UX design with user research, interactive prototypes, and design systems. Create experiences users love."
    },
    {
        id: "api-development",
        icon: Plug,
        title: "API Development & Integrations",
        shortDescription: "Secure, scalable API engineering with REST, GraphQL, and microservices.",
        longDescription: "Build robust APIs that power your digital ecosystem. From RESTful services to GraphQL endpoints, we create scalable, secure, and well-documented APIs.",
        link: "/services/api-development",
        whyChoose: [
            {
                title: "RESTful & GraphQL",
                description: "Modern API architectures optimized for performance and flexibility"
            },
            {
                title: "Security Hardened",
                description: "OAuth 2.0, JWT authentication, rate limiting, and encryption"
            },
            {
                title: "Auto-Generated Docs",
                description: "OpenAPI/Swagger documentation that stays in sync with code"
            },
            {
                title: "Third-Party Integration",
                description: "Seamless connection with payment gateways, CRMs, and SaaS platforms"
            }
        ],
        techStack: [
            {
                category: "Frameworks",
                technologies: ["Express.js", "FastAPI", "Django REST", "Spring Boot"]
            },
            {
                category: "API Styles",
                technologies: ["REST", "GraphQL", "gRPC", "WebSockets", "tRPC"]
            },
            {
                category: "Tools",
                technologies: ["Postman", "Swagger", "API Gateway", "Kong", "Rate Limiting"]
            }
        ],
        metaTitle: "API Development & Integration | Infinibit Tech - REST & GraphQL APIs",
        metaDescription: "Secure, scalable API development with REST, GraphQL, and microservices. Third-party integrations and comprehensive documentation."
    },
    {
        id: "call-center",
        icon: Phone,
        title: "Call Center Solutions",
        shortDescription: "End-to-end modern call center systems with auto dialer and agent dashboards.",
        longDescription: "Deploy state-of-the-art call center technology that improves customer service and agent productivity. Cloud-based systems with advanced features and analytics.",
        link: "/services/call-center",
        whyChoose: [
            {
                title: "Cloud-Based Platform",
                description: "Work from anywhere with reliable cloud infrastructure and 99.9% uptime"
            },
            {
                title: "AI-Powered Routing",
                description: "Intelligent call distribution based on agent skills and customer needs"
            },
            {
                title: "Real-Time Analytics",
                description: "Live dashboards tracking KPIs, agent performance, and customer satisfaction"
            },
            {
                title: "CRM Integration",
                description: "Screen pops with customer history integrated with your CRM system"
            }
        ],
        techStack: [
            {
                category: "Telephony",
                technologies: ["Twilio", "Amazon Connect", "Asterisk", "FreePBX"]
            },
            {
                category: "Features",
                technologies: ["Auto Dialer", "IVR", "Call Recording", "Speech Analytics"]
            },
            {
                category: "Integration",
                technologies: ["Salesforce", "Zendesk", "HubSpot", "Custom CRM"]
            }
        ],
        metaTitle: "Call Center Solutions | Infinibit Tech - Cloud Contact Center Software",
        metaDescription: "Modern call center systems with AI routing, auto dialer, real-time analytics, and CRM integration. Cloud-based contact center solutions."
    },
    {
        id: "business-consultancy",
        icon: Briefcase,
        title: "Business Consultancy",
        shortDescription: "Helping companies transform operations through automation and strategic planning.",
        longDescription: "Navigate digital transformation with expert guidance. We analyze your operations, identify opportunities, and implement technology strategies that drive measurable results.",
        link: "/services/business-consultancy",
        whyChoose: [
            {
                title: "Process Optimization",
                description: "Identify bottlenecks and streamline workflows for maximum efficiency"
            },
            {
                title: "Technology Roadmap",
                description: "Strategic planning for digital transformation aligned with business goals"
            },
            {
                title: "ROI Focused",
                description: "Data-driven recommendations with clear metrics and expected returns"
            },
            {
                title: "Change Management",
                description: "Support teams through technology adoption with training and documentation"
            }
        ],
        techStack: [
            {
                category: "Analysis",
                technologies: ["Business Process Modeling", "Data Analytics", "KPI Tracking"]
            },
            {
                category: "Strategy",
                technologies: ["Digital Transformation", "Cloud Migration", "Automation"]
            },
            {
                category: "Tools",
                technologies: ["Power BI", "Tableau", "Process Mining", "Project Management"]
            }
        ],
        metaTitle: "Business Consultancy | Infinibit Tech - Digital Transformation Consulting",
        metaDescription: "Transform your business with expert technology consulting. Process optimization, digital transformation strategies, and ROI-focused implementations."
    },
    {
        id: "corporate-solutions",
        icon: Building,
        title: "Corporate Solutions",
        shortDescription: "Enterprise-grade digital systems with internal portals and automation pipelines.",
        longDescription: "Modernize your corporate infrastructure with enterprise solutions. Internal portals, employee management systems, and automated workflows built for scale and security.",
        link: "/services/corporate-solutions",
        whyChoose: [
            {
                title: "Employee Portals",
                description: "Self-service platforms for HR, IT, and administrative tasks"
            },
            {
                title: "Document Management",
                description: "Centralized repository with version control and secure access"
            },
            {
                title: "Compliance Ready",
                description: "Built-in audit trails, data governance, and regulatory compliance"
            },
            {
                title: "Integration Hub",
                description: "Connect disparate systems into a unified corporate ecosystem"
            }
        ],
        techStack: [
            {
                category: "Platforms",
                technologies: ["SharePoint", "SAP", "Oracle", "Custom Intranet"]
            },
            {
                category: "Security",
                technologies: ["Active Directory", "SSO", "MFA", "VPN Integration"]
            },
            {
                category: "Automation",
                technologies: ["Power Automate", "RPA", "Workflow Engines"]
            }
        ],
        metaTitle: "Corporate Solutions | Infinibit Tech - Enterprise Digital Systems",
        metaDescription: "Enterprise-grade corporate solutions with employee portals, document management, and workflow automation. Secure, scalable, and compliant."
    },
    {
        id: "data-engineering",
        icon: BarChart,
        title: "Data Engineering & Analytics",
        shortDescription: "Turning raw data into meaningful insights with pipelines and BI dashboards.",
        longDescription: "Unlock the power of your data with robust engineering and analytics. Build data pipelines, warehouses, and visualization dashboards that drive informed decision-making.",
        link: "/services/data-engineering",
        whyChoose: [
            {
                title: "Data Pipelines",
                description: "Automated ETL processes that handle millions of records efficiently"
            },
            {
                title: "Real-Time Analytics",
                description: "Stream processing for instant insights and immediate action"
            },
            {
                title: "Data Quality",
                description: "Validation, cleaning, and enrichment ensuring accurate analysis"
            },
            {
                title: "Predictive Models",
                description: "Machine learning models that forecast trends and behaviors"
            }
        ],
        techStack: [
            {
                category: "Processing",
                technologies: ["Apache Spark", "Airflow", "Kafka", "Databricks"]
            },
            {
                category: "Storage",
                technologies: ["Snowflake", "BigQuery", "Redshift", "Data Lakes"]
            },
            {
                category: "Visualization",
                technologies: ["Tableau", "Power BI", "Looker", "Custom Dashboards"]
            }
        ],
        metaTitle: "Data Engineering & Analytics | Infinibit Tech - Big Data Solutions",
        metaDescription: "Build data pipelines, warehouses, and analytics dashboards. Turn raw data into actionable insights with machine learning and BI tools."
    },
    {
        id: "ai-chatbot",
        icon: MessageSquare,
        title: "AI Chatbot Development",
        shortDescription: "Custom chatbots for support, sales, and automation with NLP-powered responses.",
        longDescription: "Deploy intelligent conversational AI that handles customer inquiries, qualifies leads, and automates support. Available 24/7 with human-like natural language understanding.",
        link: "/services/ai-chatbot",
        whyChoose: [
            {
                title: "Natural Language AI",
                description: "GPT-powered understanding of intent, context, and complex queries"
            },
            {
                title: "Multi-Channel",
                description: "Deploy on website, WhatsApp, Facebook Messenger, and Slack"
            },
            {
                title: "Continuous Learning",
                description: "Bot improves over time by learning from interactions and feedback"
            },
            {
                title: "Human Handoff",
                description: "Seamless escalation to live agents when needed with full context"
            }
        ],
        techStack: [
            {
                category: "AI/NLP",
                technologies: ["OpenAI GPT", "Dialogflow", "Rasa", "LangChain"]
            },
            {
                category: "Platforms",
                technologies: ["WhatsApp API", "Facebook Messenger", "Slack", "Telegram"]
            },
            {
                category: "Backend",
                technologies: ["Node.js", "Python", "WebSockets", "Redis Cache"]
            }
        ],
        metaTitle: "AI Chatbot Development | Infinibit Tech - Conversational AI Solutions",
        metaDescription: "Build intelligent AI chatbots with NLP for customer support, sales, and automation. Multi-channel deployment with continuous learning."
    },
    {
        id: "saas",
        icon: Cloud,
        title: "SaaS Product Development",
        shortDescription: "From idea to launch to scale with multi-tenant architecture and subscription systems.",
        longDescription: "Launch your SaaS product with a team that understands the full lifecycle. Multi-tenant architecture, subscription billing, and infrastructure that scales from 10 to 10 million users.",
        link: "/services/saas",
        whyChoose: [
            {
                title: "Multi-Tenant Architecture",
                description: "Isolated data with shared infrastructure for cost-effective scaling"
            },
            {
                title: "Subscription Billing",
                description: "Stripe integration with plans, trials, upgrades, and invoicing"
            },
            {
                title: "Auto-Scaling",
                description: "Infrastructure that grows automatically with your user base"
            },
            {
                title: "Analytics Built-In",
                description: "Track usage, engagement, churn, and MRR from day one"
            }
        ],
        techStack: [
            {
                category: "Frontend",
                technologies: ["React", "Next.js", "TypeScript", "Tailwind", "Shadcn UI"]
            },
            {
                category: "Backend",
                technologies: ["Node.js", "PostgreSQL", "Redis", "Microservices"]
            },
            {
                category: "Infrastructure",
                technologies: ["AWS", "Vercel", "Docker", "Kubernetes", "CI/CD"]
            }
        ],
        metaTitle: "SaaS Product Development | Infinibit Tech - Build & Launch SaaS",
        metaDescription: "Full-cycle SaaS development with multi-tenant architecture, subscription billing, and auto-scaling infrastructure. Launch and scale your product."
    },
    {
        id: "digital-marketing",
        icon: Megaphone,
        title: "Digital Marketing & Branding",
        shortDescription: "Full digital growth services including social media, paid ads, and brand design.",
        longDescription: "Grow your brand and acquire customers with comprehensive digital marketing. From strategy to execution, we handle SEO, paid advertising, social media, and brand identity.",
        link: "/services/digital-marketing",
        whyChoose: [
            {
                title: "Data-Driven Strategy",
                description: "Campaigns optimized based on analytics, A/B testing, and performance metrics"
            },
            {
                title: "Multi-Channel Campaigns",
                description: "Coordinated presence across Google, Facebook, LinkedIn, and Instagram"
            },
            {
                title: "Brand Identity",
                description: "Complete visual identity from logo to style guide to marketing collateral"
            },
            {
                title: "Content Creation",
                description: "High-quality graphics, videos, and copy that converts"
            }
        ],
        techStack: [
            {
                category: "Advertising",
                technologies: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "TikTok Ads"]
            },
            {
                category: "Analytics",
                technologies: ["Google Analytics", "GTM", "Facebook Pixel", "Mixpanel"]
            },
            {
                category: "Design",
                technologies: ["Adobe Creative Suite", "Figma", "Canva", "Video Editing"]
            }
        ],
        metaTitle: "Digital Marketing & Branding | Infinibit Tech - Growth Marketing Services",
        metaDescription: "Comprehensive digital marketing with SEO, paid ads, social media, and brand design. Data-driven strategies that drive growth."
    },
    {
        id: "quality-assurance",
        icon: CheckCircle,
        title: "Quality Assurance & Testing",
        shortDescription: "Ensuring flawless performance with manual, automated, and load testing.",
        longDescription: "Ship bug-free software with comprehensive QA testing. Our QA engineers ensure your product works perfectly across browsers, devices, and under heavy load.",
        link: "/services/quality-assurance",
        whyChoose: [
            {
                title: "Automated Testing",
                description: "Regression suites that catch bugs before they reach production"
            },
            {
                title: "Performance Testing",
                description: "Load tests simulating thousands of concurrent users"
            },
            {
                title: "Security Testing",
                description: "Penetration testing and vulnerability assessments"
            },
            {
                title: "Cross-Browser/Device",
                description: "Testing across all major browsers, OS versions, and devices"
            }
        ],
        techStack: [
            {
                category: "Automation",
                technologies: ["Selenium", "Cypress", "Playwright", "Jest", "Pytest"]
            },
            {
                category: "Performance",
                technologies: ["JMeter", "k6", "LoadRunner", "Artillery"]
            },
            {
                category: "Security",
                technologies: ["OWASP ZAP", "Burp Suite", "SonarQube", "Snyk"]
            }
        ],
        metaTitle: "Quality Assurance & Testing | Infinibit Tech - QA Testing Services",
        metaDescription: "Comprehensive QA testing with automated, performance, and security testing. Ensure flawless software across all browsers and devices."
    }
];

// Helper function to get service by ID
export const getServiceById = (id: string): ServiceData | undefined => {
    return servicesData.find(service => service.id === id);
};

// Helper function to get service by route
export const getServiceByRoute = (route: string): ServiceData | undefined => {
    return servicesData.find(service => service.link === route);
};
