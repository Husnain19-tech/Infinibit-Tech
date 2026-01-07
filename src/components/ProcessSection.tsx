import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
    MessageSquare,
    Lightbulb,
    Code2,
    TestTube,
    Rocket,
    HeartHandshake
} from "lucide-react";
import { GlowingOrb } from "@/components/animations";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const processSteps = [
    {
        icon: MessageSquare,
        title: "Discovery",
        description: "We start by understanding your business, goals, and challenges through in-depth consultations.",
        duration: "Week 1",
    },
    {
        icon: Lightbulb,
        title: "Strategy & Planning",
        description: "Our team crafts a comprehensive roadmap with clear milestones, timelines, and deliverables.",
        duration: "Week 2",
    },
    {
        icon: Code2,
        title: "Development",
        description: "Agile development with regular sprints, continuous integration, and transparent progress updates.",
        duration: "Weeks 3-8",
    },
    {
        icon: TestTube,
        title: "Testing & QA",
        description: "Rigorous testing across all scenarios to ensure stability, security, and performance.",
        duration: "Week 9",
    },
    {
        icon: Rocket,
        title: "Launch",
        description: "Seamless deployment with monitoring, documentation, and training for your team.",
        duration: "Week 10",
    },
    {
        icon: HeartHandshake,
        title: "Ongoing Support",
        description: "Continuous maintenance, updates, and optimization to keep your solution running smoothly.",
        duration: "Ongoing",
    },
];

const ProcessSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} id="process" className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(216,30%,8%)] to-background" />
            <GlowingOrb x="10%" y="20%" size={400} intensity={0.06} />
            <GlowingOrb x="90%" y="80%" size={500} color="hsl(193, 100%, 39%)" intensity={0.08} />

            <div className="container relative z-10 mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
                        <span className="text-sm text-primary font-medium tracking-wider uppercase">
                            How We Work
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Our <span className="neon-text">Process</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        A proven methodology that ensures successful project delivery, every time.
                    </p>
                </motion.div>

                {/* Process Timeline */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Animated connecting line */}
                    <motion.div
                        className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20"
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Steps */}
                    <motion.div
                        className="space-y-12 md:space-y-0"
                        variants={staggerContainer}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                                variants={fadeInUp}
                                custom={index}
                            >
                                {/* Content Card */}
                                <motion.div
                                    className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="glass-card p-6 inline-block max-w-md"
                                        whileHover={{
                                            boxShadow: "0 0 30px rgba(0, 229, 255, 0.2)",
                                        }}
                                    >
                                        <span className="text-xs text-primary font-medium uppercase tracking-wider">
                                            {step.duration}
                                        </span>
                                        <h3 className="text-xl font-bold text-heading-text mt-2 mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </motion.div>
                                </motion.div>

                                {/* Center Icon */}
                                <motion.div
                                    className="relative z-10"
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{
                                        delay: 0.3 + index * 0.15,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                >
                                    <motion.div
                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
                                        whileHover={{
                                            scale: 1.2,
                                            boxShadow: "0 0 40px rgba(0, 229, 255, 0.5)",
                                        }}
                                        animate={{
                                            boxShadow: [
                                                "0 0 0 0 rgba(0, 229, 255, 0)",
                                                "0 0 0 20px rgba(0, 229, 255, 0.1)",
                                                "0 0 0 0 rgba(0, 229, 255, 0)",
                                            ],
                                        }}
                                        transition={{
                                            boxShadow: {
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: index * 0.3,
                                            },
                                        }}
                                    >
                                        <step.icon className="w-8 h-8 text-primary-foreground" />
                                    </motion.div>

                                    {/* Step number */}
                                    <motion.span
                                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary"
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.5 + index * 0.15 }}
                                    >
                                        {index + 1}
                                    </motion.span>
                                </motion.div>

                                {/* Empty space for layout */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
