import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { servicesData } from "@/data/servicesData";
import ServiceCard from "./ServiceCard";
import { Button } from "./ui/button";

const FeaturedServices = () => {
    // Select top 4 services to feature
    const featuredServices = servicesData.slice(0, 4);

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-dark-surface/50 -z-10" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
                            <span className="text-sm text-primary font-medium tracking-wider uppercase">Our Expertise</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Transforming Ideas into <span className="neon-text">Digital Reality</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            We deliver cutting-edge solutions across the entire digital spectrum, from AI automation to custom software development.
                        </p>
                    </div>
                    <Link to="/services" className="hidden md:block">
                        <Button variant="outline" className="glass-button group">
                            View All Services
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredServices.map((service, index) => (
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

                <div className="mt-12 text-center md:hidden">
                    <Link to="/services">
                        <Button variant="outline" className="glass-button group">
                            View All Services
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedServices;
