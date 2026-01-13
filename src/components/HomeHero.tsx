import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import {
    ParticleBackground,
    CyberGrid,
    FloatingElement,
    GlowingOrb,
} from "@/components/animations";
import {
    fadeInUp,
    staggerContainer,
    heroTextReveal,
    heroCTA,
    scaleIn,
} from "@/lib/animations";
import {
    LazyScene3D as Scene3D,
    LazyHeroSceneContent as HeroSceneContent,
} from "@/components/3d/Lazy3DLoader";

// Floating tech icons data
const floatingIcons = [
    { Icon: Sparkles, x: "10%", y: "20%", delay: 0 },
    { Icon: Zap, x: "85%", y: "25%", delay: 0.5 },
    { Icon: Shield, x: "15%", y: "70%", delay: 1 },
    { Icon: Globe, x: "80%", y: "65%", delay: 1.5 },
];

const HomeHero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [is3DReady, setIs3DReady] = useState(false);

    // Delay 3D loading for better initial page load
    useEffect(() => {
        const timer = setTimeout(() => setIs3DReady(true), 500);
        return () => clearTimeout(timer);
    }, []);

    // Track mouse for 3D interaction
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(216,30%,10%)] to-background" />

            {/* 3D Scene Layer */}
            {is3DReady && (
                <Suspense fallback={null}>
                    <Scene3D className="z-0 opacity-80">
                        <HeroSceneContent mousePosition={mousePosition} />
                    </Scene3D>
                </Suspense>
            )}

            {/* Fallback 2D effects (shown during 3D load) */}
            {!is3DReady && (
                <>
                    <ParticleBackground
                        particleCount={30}
                        interactive={false}
                        color="hsl(187, 100%, 50%)"
                    />
                    <GlowingOrb x="20%" y="30%" size={600} intensity={0.15} />
                    <GlowingOrb x="80%" y="20%" size={400} color="hsl(193, 100%, 39%)" intensity={0.1} />
                </>
            )}

            {/* Glowing Orbs - keep some for depth */}
            <GlowingOrb x="60%" y="80%" size={500} intensity={0.08} />

            {/* Floating Tech Icons */}
            {floatingIcons.map(({ Icon, x, y, delay }, index) => (
                <motion.div
                    key={index}
                    className="absolute z-10 hidden md:block"
                    style={{ left: x, top: y }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: 0.6,
                        scale: 1,
                        y: [0, -20, 0],
                    }}
                    transition={{
                        opacity: { delay, duration: 0.5 },
                        scale: { delay, duration: 0.5 },
                        y: { delay: delay + 0.5, duration: 4 + index, repeat: Infinity, ease: "easeInOut" },
                    }}
                >
                    <div className="p-4 glass-card rounded-2xl backdrop-blur-md">
                        <Icon className="w-8 h-8 text-primary" />
                    </div>
                </motion.div>
            ))}

            {/* Animated Cyber Grid */}
            <CyberGrid animated={true} />

            {/* Main Content */}
            <div className="container relative z-20 mx-auto px-6 text-center">
                <motion.div
                    className="max-w-5xl mx-auto space-y-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div
                        variants={scaleIn}
                        className="inline-flex items-center space-x-2 glass-card px-6 py-3 backdrop-blur-lg"
                    >
                        <motion.div
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm text-primary font-medium tracking-wider uppercase">
                            AI-Powered Innovation Studio
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <FloatingElement
                        floatIntensity={10}
                        rotateIntensity={5}
                        enableMouseFollow={true}
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                            variants={heroTextReveal}
                        >
                            <span className="block text-heading-text">Technology</span>
                            <motion.span
                                className="block neon-text"
                                animate={{
                                    textShadow: [
                                        "0 0 20px rgba(0, 229, 255, 0.5)",
                                        "0 0 40px rgba(0, 229, 255, 0.8)",
                                        "0 0 20px rgba(0, 229, 255, 0.5)",
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                Reimagined
                            </motion.span>
                        </motion.h1>
                    </FloatingElement>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                        variants={fadeInUp}
                    >
                        We build intelligent, enterprise-grade digital solutions that{" "}
                        <span className="text-primary font-medium">automate operations</span>,{" "}
                        <span className="text-primary font-medium">accelerate growth</span>, and{" "}
                        <span className="text-primary font-medium">transform experiences</span>.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                        variants={heroCTA}
                    >
                        <Link to="/quote">
                            <motion.div
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 229, 255, 0.5)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    size="lg"
                                    className="glass-button group text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    Start Your Project
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>
                        </Link>
                        <Link to="/portfolio">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="glass-button text-lg px-8 py-6"
                                >
                                    View Our Work
                                </Button>
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Quick Stats with 3D hover effect */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16"
                        variants={staggerContainer}
                    >
                        {[
                            { value: "50+", label: "Projects Delivered" },
                            { value: "30+", label: "Happy Clients" },
                            { value: "16", label: "Tech Solutions" },
                            { value: "100%", label: "Client Satisfaction" },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="glass-card p-6 group backdrop-blur-md"
                                variants={fadeInUp}
                                whileHover={{
                                    scale: 1.05,
                                    rotateX: 5,
                                    rotateY: 5,
                                    borderColor: "hsl(187, 100%, 50%)",
                                    boxShadow: "0 20px 40px rgba(0, 229, 255, 0.2)",
                                }}
                                style={{ transformStyle: "preserve-3d" }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="text-3xl md:text-4xl font-bold neon-text"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 backdrop-blur-sm">
                    <motion.div
                        className="w-1.5 h-1.5 bg-primary rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </motion.div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
        </section>
    );
};

export default HomeHero;
