import { Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ServiceHero from "@/components/ServiceHero";
import InfoCard from "@/components/InfoCard";
import TechStackCard from "@/components/TechStackCard";
import { Button } from "@/components/ui/button";
import { getServiceById } from "@/data/servicesData";

const SaaS = () => {
  const serviceData = getServiceById("saas");
  if (!serviceData) return null;

  return (
    <div className="min-h-screen">
      <Navigation />
      <Breadcrumbs />
      <ServiceHero title={serviceData.title} description={serviceData.longDescription} images={["/images/services/saas-1.jpg", "/images/services/saas-2.jpg", "/images/services/saas-3.jpg"]} icon={<Cloud className="w-4 h-4" />} />
      <section className="py-20 relative"><div className="container mx-auto px-6"><InfoCard title="Why Choose SaaS Development" features={serviceData.whyChoose} imageUrl="/images/services/saas-why.webp" imagePosition="left" /></div></section>
      <section className="py-20 relative"><div className="container mx-auto px-6"><TechStackCard techStack={serviceData.techStack} imageUrl="/images/services/saas-tech.webp" imagePosition="right" /></div></section>
      <section className="py-20 relative"><div className="container mx-auto px-6"><div className="glass-card p-12 text-center max-w-4xl mx-auto rounded-3xl"><h2 className="text-4xl font-bold mb-4">Ready to <span className="neon-text">Launch</span>?</h2><p className="text-xl text-muted-foreground mb-8">Build and scale your SaaS product.</p><Link to="/#contact"><Button size="lg" className="glass-button group">Get Started<svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Button></Link></div></div></section>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default SaaS;
