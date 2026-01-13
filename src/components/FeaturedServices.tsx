import { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { servicesData } from "@/data/servicesData";
import ServiceCard from "./ServiceCard";
import { Button } from "./ui/button";
import { AnimatedSection, GlowingOrb } from "@/components/animations";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { LazyServicesScene as ServicesScene } from "@/components/3d/Lazy3DLoader";

const FeaturedServices = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    // Select top 4 services to feature
    const featuredServices = servicesData.slice(0, 4);

    return (
        <section id="services" className="py-24 relative overflow-hidden">
            {/* 3D Background Scene */}
            <Suspense fallback={null}>
                <ServicesScene hoveredIndex={hoveredIndex} />
            </Suspense>

            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(216,30%,8%)] to-background -z-10" />
            <GlowingOrb x="90%" y="30%" size={500} intensity={0.08} />
            <GlowingOrb x="5%" y="70%" size={400} color="hsl(193, 100%, 39%)" intensity={0.06} />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <AnimatedSection className="max-w-2xl">
                        <motion.div
                            className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4"
                            variants={fadeInUp}
                        >
                            <span className="text-sm text-primary font-medium tracking-wider uppercase">
                                Our Expertise
                            </span>
                        </motion.div>
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold mb-4"
                            variants={fadeInUp}
                        >
                            Transforming Ideas into{" "}
                            <span className="neon-text">Digital Reality</span>
                        </motion.h2>
                        <motion.p
                            className="text-muted-foreground text-lg"
                            variants={fadeInUp}
                        >
                            We deliver cutting-edge solutions across the entire digital spectrum,
                            from AI automation to custom software development.
                        </motion.p>
                    </AnimatedSection>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="hidden md:block"
                    >
                        <Link to="/services">
                            <motion.div
                                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 229, 255, 0.3)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button variant="outline" className="glass-button group">
                                    View All Services
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>

                {/* Services Grid with Stagger */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {featuredServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            variants={fadeInUp}
                            custom={index}
                            whileHover={{
                                y: -10,
                                transition: { duration: 0.3 }
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
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

                {/* Mobile CTA */}
                <motion.div
                    className="mt-12 text-center md:hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Link to="/services">
                        <Button variant="outline" className="glass-button group">
                            View All Services
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedServices;
