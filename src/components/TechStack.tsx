import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    Code2, Database, Globe, Smartphone, Cloud,
    Cpu, Layers, Box, Braces, Server, Palette, Workflow
} from "lucide-react";
import { GlowingOrb } from "@/components/animations";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const technologies = [
    { name: "React", icon: Code2, color: "#61DAFB" },
    { name: "Node.js", icon: Server, color: "#339933" },
    { name: "TypeScript", icon: Braces, color: "#3178C6" },
    { name: "Next.js", icon: Globe, color: "#000000" },
    { name: "Flutter", icon: Smartphone, color: "#02569B" },
    { name: "AWS", icon: Cloud, color: "#FF9900" },
    { name: "Python", icon: Code2, color: "#3776AB" },
    { name: "TensorFlow", icon: Cpu, color: "#FF6F00" },
    { name: "Docker", icon: Box, color: "#2496ED" },
    { name: "Kubernetes", icon: Layers, color: "#326CE5" },
    { name: "GraphQL", icon: Workflow, color: "#E10098" },
    { name: "MongoDB", icon: Database, color: "#47A248" },
];

const TechStack = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} id="tech-stack" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[hsl(216,30%,6%)] via-[hsl(216,35%,8%)] to-[hsl(216,30%,6%)]" />
            <GlowingOrb x="25%" y="20%" size={500} intensity={0.06} />
            <GlowingOrb x="75%" y="80%" size={400} color="hsl(193, 100%, 39%)" intensity={0.05} />

            <div className="container relative z-10 mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Powered by <span className="neon-text">Modern Tech</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        We leverage the latest frameworks and tools to build scalable, high-performance solutions.
                    </p>
                </motion.div>

                {/* Tech Grid */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            variants={fadeInUp}
                            custom={index}
                        >
                            <motion.div
                                className="glass-card p-6 flex flex-col items-center justify-center h-[140px] relative overflow-hidden"
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: "hsl(187, 100%, 50%)",
                                    boxShadow: "0 0 30px rgba(0, 229, 255, 0.2)",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Hover glow effect */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: `radial-gradient(circle at center, ${tech.color}15 0%, transparent 70%)`,
                                    }}
                                />

                                {/* Icon with rotation on hover */}
                                <motion.div
                                    className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 relative z-10"
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.6, type: "spring" }}
                                >
                                    <tech.icon className="w-7 h-7 text-primary" />
                                </motion.div>

                                {/* Name */}
                                <span className="font-medium text-foreground relative z-10 group-hover:text-primary transition-colors">
                                    {tech.name}
                                </span>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Marquee Effect - Infinite Scroll */}
                <motion.div
                    className="mt-16 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <div className="flex space-x-8 animate-marquee">
                        {[...technologies, ...technologies].map((tech, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 text-muted-foreground/50 whitespace-nowrap"
                            >
                                <tech.icon className="w-4 h-4" />
                                <span className="text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
