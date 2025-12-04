import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    link: string;
    imageUrl?: string;
    index: number;
}

const ServiceCard = ({ icon: Icon, title, description, link, imageUrl, index }: ServiceCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            to={link}
            className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02]"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Card Container */}
            <div className="glass-card h-full flex flex-col relative overflow-hidden">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-background">
                    {imageUrl ? (
                        <>
                            <img
                                src={imageUrl}
                                alt={title}
                                className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? "blur-sm scale-110" : "blur-0 scale-100"
                                    }`}
                                loading="lazy"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Icon className="w-24 h-24 text-primary/30" />
                        </div>
                    )}

                    {/* Hover Overlay with Info */}
                    <div
                        className={`absolute inset-0 bg-primary/95 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <div className="text-center px-6 space-y-3">
                            <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                                <Icon className="w-8 h-8 text-white" />
                            </div>
                            <p className="text-white font-semibold text-lg">Click for More Info</p>
                            <p className="text-white/90 text-sm">Explore our {title.toLowerCase()} services</p>
                            <div className="flex items-center justify-center text-white text-sm font-medium pt-2">
                                <span>Learn More</span>
                                <svg
                                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                            </div>
                        </div>
                    </div>

                    {/* Icon Badge - Top Left */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex-grow leading-relaxed">
                        {description}
                    </p>

                    {/* Bottom Action */}
                    <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                            <span>Explore Service</span>
                            <svg
                                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                        </div>
                    </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl" />
                </div>
            </div>
        </Link>
    );
};

export default ServiceCard;
