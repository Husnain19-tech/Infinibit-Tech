import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const heroSlides = [
    {
        image: "/images/services/saas-1.jpg",
        title: "Technology Reimagined",
        subtitle: "We build intelligent, enterprise-grade digital solutions that automate operations, accelerate growth, and transform customer experiences.",
        cta: "Start Your Project",
        link: "/#contact"
    },
    {
        image: "/images/services/corporate-solutions-1.jpg",
        title: "Future-Ready Solutions",
        subtitle: "Empowering businesses with cutting-edge AI, cloud, and software infrastructure designed for the modern era.",
        cta: "Explore Services",
        link: "/services"
    },
    {
        image: "/images/services/business-consultancy-1.jpg",
        title: "Strategic Innovation",
        subtitle: "Partner with us to navigate your digital transformation journey with expert consultancy and technical excellence.",
        cta: "View Portfolio",
        link: "/portfolio"
    }
];

const HomeHero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Carousel Backgrounds */}
            {heroSlides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}

            {/* Content */}
            <div className="container relative z-20 mx-auto px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4 animate-fade-in">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm text-primary font-medium tracking-wider uppercase">AI-Powered Innovation Studio</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-white">
                        {heroSlides[currentSlide].title.split(" ").map((word, i) => (
                            <span key={i} className={i === 1 ? "neon-text block" : "block"}>
                                {word}{" "}
                            </span>
                        ))}
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        {heroSlides[currentSlide].subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Link to={heroSlides[currentSlide].link}>
                            <Button size="lg" className="glass-button group text-lg px-8 py-6">
                                {heroSlides[currentSlide].cta}
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/services">
                            <Button size="lg" variant="outline" className="glass-button text-lg px-8 py-6 bg-transparent hover:bg-white/10">
                                Our Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-4">
                <button
                    onClick={prevSlide}
                    className="p-2 rounded-full glass-card hover:bg-primary/20 transition-colors"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <div className="flex gap-2 items-center">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-primary w-8" : "bg-white/50 hover:bg-white"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    className="p-2 rounded-full glass-card hover:bg-primary/20 transition-colors"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 text-white" />
                </button>
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
};

export default HomeHero;
