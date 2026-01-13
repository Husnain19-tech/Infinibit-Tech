import Navigation from "@/components/Navigation";
import HomeHero from "@/components/HomeHero";
import FeaturedServices from "@/components/FeaturedServices";
import GlobalReach from "@/components/GlobalReach";
import TechStack from "@/components/TechStack";
import Stats from "@/components/Stats";
import ProcessSection from "@/components/ProcessSection";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollNavigation from "@/components/ScrollNavigation";
import SEOHead from "@/components/seo/SEOHead";
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from "@/components/seo/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* SEO Head */}
      <SEOHead
        title="Infinibit Tech - AI-Powered Innovation Studio | Enterprise Solutions"
        description="Next-generation software innovation studio providing AI-powered, enterprise-grade digital solutions. Specializing in automation, AI engineering, web & mobile development."
        keywords="AI automation, custom software development, mobile app development, web development, enterprise solutions, SaaS development, digital transformation, machine learning, business intelligence"
        canonical="https://infinibit.tech"
      />
      
      {/* Structured Data for SEO */}
      <OrganizationSchema
        name="Infinibit Tech"
        description="AI-Powered Innovation Studio providing enterprise-grade digital solutions including AI automation, custom software development, and digital transformation services."
        url="https://infinibit.tech"
        contactPoint={{
          contactType: "customer service",
          email: "hello@infinibit.tech",
        }}
      />
      <WebsiteSchema
        name="Infinibit Tech"
        url="https://infinibit.tech"
        description="AI-Powered Innovation Studio"
      />
      <LocalBusinessSchema
        name="Infinibit Tech"
        description="AI-Powered Software Development Company offering custom software, AI automation, and digital transformation services."
        priceRange="$$$"
      />
      
      <Navigation />
      <ScrollNavigation />
      <main>
        <HomeHero />
        <FeaturedServices />
        <GlobalReach />
        <TechStack />
        <Stats />
        <ProcessSection />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
