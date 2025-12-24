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
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

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
        <Link to={link} className="block h-full">
            <motion.div
                ref={ref}
                className="group relative h-full perspective-1000"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                <motion.div
                    className="glass-card h-full flex flex-col relative overflow-hidden rounded-2xl"
                    whileHover={{
                        boxShadow: "0 25px 50px -12px rgba(0, 229, 255, 0.25)",
                        borderColor: "hsl(187, 100%, 50%)",
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-background">
                        {imageUrl ? (
                            <>
                                <motion.img
                                    src={imageUrl}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    whileHover={{ scale: 1.1, filter: "blur(2px)" }}
                                    transition={{ duration: 0.5 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Icon className="w-24 h-24 text-primary/30" />
                            </div>
                        )}

                        {/* Hover Overlay */}
                        <motion.div
                            className="absolute inset-0 bg-primary/95 backdrop-blur-sm flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center px-6 space-y-3">
                                <motion.div
                                    className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mx-auto"
                                    initial={{ scale: 0, rotate: -180 }}
                                    whileHover={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <Icon className="w-8 h-8 text-white" />
                                </motion.div>
                                <p className="text-white font-semibold text-lg">Explore Service</p>
                                <p className="text-white/90 text-sm">{title} solutions</p>
                            </div>
                        </motion.div>

                        {/* Icon Badge */}
                        <motion.div
                            className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-primary/20"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Icon className="w-6 h-6 text-primary" />
                        </motion.div>
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
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{
                            background: "radial-gradient(circle at center, rgba(0, 229, 255, 0.1) 0%, transparent 70%)",
                        }}
                    />
                </motion.div>
            </motion.div>
        </Link>
    );
};

export default ServiceCard;
