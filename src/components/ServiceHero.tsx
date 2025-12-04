import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface ServiceHeroProps {
    title: string;
    description: string;
    images?: string[];
    icon: React.ReactNode;
    ctaText?: string;
    ctaLink?: string;
}

const ServiceHero = ({
    title,
    description,
    images = [],
    icon,
    ctaText = "Get Started",
    ctaLink = "/#contact"
}: ServiceHeroProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-advance carousel
    useEffect(() => {
        if (!isAutoPlaying || images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, images.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
        setIsAutoPlaying(false);
    };

    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-dark-surface/50 to-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

            <div className="container relative z-10 mx-auto px-6">
                {/* Carousel Section */}
                {images.length > 0 && (
                    <div className="max-w-5xl mx-auto mb-12">
                        <div className="relative aspect-video rounded-3xl overflow-hidden glass-card group">
                            {/* Images */}
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${title} - Slide ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                    {/* Gradient overlay for better text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                                </div>
                            ))}

                            {/* Navigation Arrows - Only show if more than 1 image */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>

                                    {/* Dots Indicator */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToSlide(index)}
                                                className={`h-2 rounded-full transition-all ${index === currentSlide
                                                        ? "w-8 bg-primary"
                                                        : "w-2 bg-white/50 hover:bg-white/80"
                                                    }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Hero Content */}
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
                        <div className="text-primary">{icon}</div>
                        <span className="text-sm text-primary font-medium">Professional Services</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        {title.split(' ').slice(0, -1).join(' ')}{' '}
                        <span className="neon-text">{title.split(' ').slice(-1)}</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>

                    <div className="flex gap-4 justify-center pt-4">
                        <a href={ctaLink}>
                            <Button size="lg" className="glass-button group">
                                {ctaText}
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
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceHero;
