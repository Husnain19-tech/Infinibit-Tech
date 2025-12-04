import { Bot } from "lucide-react";
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

const AIAutomation = () => {
  const serviceData = getServiceById("ai-automation");

  if (!serviceData) return null;

  return (
    <div className="min-h-screen">
      <Navigation />
      <Breadcrumbs />

      {/* Hero with Carousel */}
      <ServiceHero
        title={serviceData.title}
        description={serviceData.longDescription}
        images={[
          "/images/services/ai-automation-1.jpg",
          "/images/services/ai-automation-2.jpg",
          "/images/services/ai-automation-3.jpg"
        ]}
        icon={<Bot className="w-4 h-4" />}
        ctaText="Get Started"
        ctaLink="/#contact"
      />

      {/* Why Choose Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <InfoCard
            title="Why Choose AI Automation"
            features={serviceData.whyChoose}
            imageUrl="/images/services/ai-automation-2.jpg"
            imagePosition="left"
          />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <TechStackCard
            title="Tech Stack"
            techStack={serviceData.techStack}
            imageUrl="/images/services/ai-automation-3.jpg"
            imagePosition="right"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto rounded-3xl">
            <h2 className="text-4xl font-bold mb-4">
              Ready to <span className="neon-text">Automate</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss how AI automation can transform your business operations.
            </p>
            <Link to="/#contact">
              <Button size="lg" className="glass-button group">
                Schedule a Consultation
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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

export default AIAutomation;
