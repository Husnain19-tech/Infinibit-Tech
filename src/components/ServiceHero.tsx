import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { GlowingOrb, ParticleBackground } from "@/components/animations";
import { fadeInUp, staggerContainer, heroTextReveal } from "@/lib/animations";
import { Link } from "react-router-dom";

interface ServiceHeroProps {
    title: string;
    description: string;
    images?: string[];
    icon: React.ReactNode;
    ctaText?: string;
    ctaLink?: string;
}

/**
 * ServiceHero - Immersive hero section for service pages
 * Replaced carousel with 3D animated background
 */
const ServiceHero = ({
    title,
    description,
    images = [],
    icon,
    ctaText = "Get Started",
    ctaLink = "/contact"
}: ServiceHeroProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Split title for styling - last word gets neon effect
    const titleWords = title.split(' ');
    const lastWord = titleWords.pop();
    const titleStart = titleWords.join(' ');

    return (
        <section ref={ref} className="relative pt-32 pb-24 overflow-hidden min-h-[70vh] flex items-center">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(216,30%,10%)] to-background" />

            {/* Background Image with Parallax */}
            {images[0] && (
                <motion.div
                    className="absolute inset-0 z-0"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <img
                        src={images[0]}
                        alt={title}
                        className="w-full h-full object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
                </motion.div>
            )}

            {/* Particle Effect */}
            <ParticleBackground
                particleCount={30}
                interactive={true}
                color="hsl(187, 100%, 50%)"
                minSize={1}
                maxSize={4}
            />

            {/* Glowing Orbs */}
            <GlowingOrb x="80%" y="20%" size={500} intensity={0.12} />
            <GlowingOrb x="10%" y="70%" size={400} color="hsl(193, 100%, 39%)" intensity={0.08} />

            {/* Center Glow */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container relative z-10 mx-auto px-6">
                <motion.div
                    className="max-w-4xl mx-auto text-center space-y-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Service Badge */}
                    <motion.div
                        className="inline-flex items-center space-x-2 glass-card px-5 py-2.5"
                        variants={fadeInUp}
                    >
                        <motion.div
                            className="text-primary"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            {icon}
                        </motion.div>
                        <span className="text-sm text-primary font-medium tracking-wider uppercase">
                            Professional Services
                        </span>
                    </motion.div>

                    {/* Title with Animation */}
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold leading-tight"
                        variants={heroTextReveal}
                    >
                        {titleStart}{' '}
                        <motion.span
                            className="neon-text inline-block"
                            animate={{
                                textShadow: [
                                    "0 0 20px rgba(0, 229, 255, 0.5)",
                                    "0 0 40px rgba(0, 229, 255, 0.8)",
                                    "0 0 20px rgba(0, 229, 255, 0.5)",
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            {lastWord}
                        </motion.span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                        variants={fadeInUp}
                    >
                        {description}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        className="flex gap-4 justify-center pt-4"
                        variants={fadeInUp}
                    >
                        <Link to={ctaLink}>
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 30px rgba(0, 229, 255, 0.5)"
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    size="lg"
                                    className="glass-button group text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    {ctaText}
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
                    <motion.div
                        className="w-1.5 h-1.5 bg-primary rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
};

export default ServiceHero;
