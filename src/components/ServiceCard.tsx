import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    link: string;
    imageUrl?: string;
    index: number;
}

/**
 * ServiceCard - 3D Interactive service card with tilt effect
 */
const ServiceCard = ({ icon: Icon, title, description, link, imageUrl, index }: ServiceCardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position for 3D tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth movement
    const springConfig = { stiffness: 150, damping: 15 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1.5, 1.5]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <Link to={link} className="block h-full group perspective-1000">
            <motion.div
                ref={ref}
                className="relative h-full"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                <div
                    className="glass-card h-full flex flex-col relative overflow-hidden rounded-2xl transition-all duration-300"
                >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-background">
                        {imageUrl ? (
                            <>
                                <div className="absolute inset-0 bg-primary/10 animate-pulse skeleton-loader z-0" />
                                <img
                                    src={imageUrl}
                                    alt={title}
                                    className="relative z-10 w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                    loading="lazy"
                                    onLoad={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.previousElementSibling?.classList.add('hidden');
                                        target.classList.add('loaded');
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 pointer-events-none z-20" />
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Icon className="w-24 h-24 text-primary/30" />
                            </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="text-center px-6 space-y-3">
                                <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mx-auto transition-all duration-500 scale-0 -rotate-180 group-hover:scale-100 group-hover:rotate-0">
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <p className="text-white font-semibold text-lg translate-y-4 opacity-0 transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100">Explore Service</p>
                                <p className="text-white/90 text-sm translate-y-4 opacity-0 transition-all duration-300 delay-150 group-hover:translate-y-0 group-hover:opacity-100">{title} solutions</p>
                            </div>
                        </div>

                        {/* Icon Badge */}
                        <div
                            className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-background/80 backdrop-blur-md flex items-center justify-center border border-primary/20 z-30 transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-[360deg] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                        >
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
                            <motion.div
                                className="flex items-center text-primary text-sm font-medium"
                                whileHover={{ x: 5 }}
                            >
                                <span>Learn More</span>
                                <motion.svg
                                    className="w-4 h-4 ml-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    whileHover={{ x: 3 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </motion.svg>
                            </motion.div>
                        </div>
                    </div>

                    {/* Glow Effect */}
                    <div
                        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        style={{
                            background: "radial-gradient(circle at center, rgba(0, 229, 255, 0.1) 0%, transparent 70%)",
                        }}
                    />
                </div>
            </motion.div>
        </Link>
    );
};

export default ServiceCard;
