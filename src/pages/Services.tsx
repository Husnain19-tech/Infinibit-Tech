import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ServiceCard from "@/components/ServiceCard";
import { servicesData } from "@/data/servicesData";
import { GlowingOrb, ParticleBackground } from "@/components/animations";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Input } from "@/components/ui/input";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [searchQuery, setSearchQuery] = useState("");

  // Filter services based on search
  const filteredServices = servicesData.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <Breadcrumbs />
      <main>
        <section ref={ref} className="relative py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(216,30%,8%)] to-background" />
          <ParticleBackground particleCount={25} interactive={false} />
          <GlowingOrb x="80%" y="20%" size={600} intensity={0.1} />
          <GlowingOrb x="10%" y="80%" size={500} color="hsl(193, 100%, 39%)" intensity={0.08} />

          <div className="container relative z-10 mx-auto px-6">
            {/* Header */}
            <motion.div
              className="text-center mb-16 space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 glass-card px-4 py-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-sm text-primary font-medium tracking-wider uppercase">
                  16 Specialized Solutions
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold">
                Our <motion.span
                  className="neon-text"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(0, 229, 255, 0.5)",
                      "0 0 40px rgba(0, 229, 255, 0.8)",
                      "0 0 20px rgba(0, 229, 255, 0.5)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >Services</motion.span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive technology solutions to transform your business. From AI automation to mobile apps,
                we deliver excellence across 16 specialized service areas.
              </p>

              {/* Search Bar */}
              <motion.div
                className="max-w-md mx-auto relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 glass-card border-primary/20 focus:border-primary"
                />
              </motion.div>
            </motion.div>

            {/* Services Count */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              <span className="text-muted-foreground">
                Showing <span className="text-primary font-semibold">{filteredServices.length}</span> services
              </span>
            </motion.div>

            {/* Services Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  custom={index}
                >
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.shortDescription}
                    link={service.link}
                    imageUrl={`/images/services/${service.id}.jpg`}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* No Results */}
            {filteredServices.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-muted-foreground text-lg">
                  No services found matching "{searchQuery}"
                </p>
              </motion.div>
            )}

            {/* Stats Section */}
            <motion.div
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {[
                { value: "16", label: "Service Areas" },
                { value: "50+", label: "Projects Delivered" },
                { value: "100%", label: "Client Satisfaction" },
                { value: "24/7", label: "Support Available" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 text-center"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 229, 255, 0.2)" }}
                >
                  <div className="text-3xl font-bold neon-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Services;
