import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ServiceCard from "@/components/ServiceCard";
import { servicesData } from "@/data/servicesData";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Breadcrumbs />
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
              {servicesData.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  icon={service.icon}
                  title={service.title}
                  description={service.shortDescription}
                  link={service.link}
                  imageUrl={`/images/services/${service.id}.jpg`}
                  index={index}
                />
              ))}
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
