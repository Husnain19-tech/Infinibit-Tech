import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, CheckCircle, Trophy, Globe } from "lucide-react";
import { CountUp, GlowingOrb } from "@/components/animations";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";

const stats = [
    { label: "Projects Delivered", value: 50, suffix: "+", icon: CheckCircle },
    { label: "Happy Clients", value: 30, suffix: "+", icon: Users },
    { label: "Years Experience", value: 15, suffix: "+", icon: Trophy },
    { label: "Global Reach", value: 10, suffix: "+", icon: Globe },
];

const Stats = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.4 });

    return (
        <section ref={ref} id="stats" className="py-24 relative overflow-hidden">
            {/* Background Image with Parallax */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <img
                    src="/images/services/corporate-solutions-2.jpg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
            </motion.div>

            {/* Glowing Orbs */}
            <GlowingOrb x="10%" y="50%" size={400} intensity={0.08} />
            <GlowingOrb x="90%" y="50%" size={350} color="hsl(193, 100%, 39%)" intensity={0.06} />

            <div className="container relative z-10 mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Proven <span className="neon-text">Results</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Numbers that speak for our commitment to excellence and client success.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="relative group"
                            variants={scaleIn}
                            custom={index}
                        >
                            <motion.div
                                className="glass-card p-8 text-center relative overflow-hidden"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 40px rgba(0, 229, 255, 0.25)",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Animated background glow on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />

                                {/* Icon with pulse animation */}
                                <motion.div
                                    className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 relative z-10"
                                    animate={isInView ? {
                                        boxShadow: [
                                            "0 0 0 0 rgba(0, 229, 255, 0)",
                                            "0 0 0 10px rgba(0, 229, 255, 0.1)",
                                            "0 0 0 0 rgba(0, 229, 255, 0)",
                                        ],
                                    } : {}}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.2,
                                    }}
                                >
                                    <stat.icon className="w-7 h-7 text-primary" />
                                </motion.div>

                                {/* Animated Counter */}
                                <div className="text-4xl md:text-5xl font-bold neon-text mb-2 relative z-10">
                                    <CountUp
                                        end={stat.value}
                                        suffix={stat.suffix}
                                        duration={2.5}
                                    />
                                </div>

                                {/* Label */}
                                <div className="text-muted-foreground font-medium relative z-10">
                                    {stat.label}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Stats;
