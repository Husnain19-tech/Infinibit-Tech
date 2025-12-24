import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { GlowingOrb } from "@/components/animations";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const testimonials = [
    {
        id: 1,
        name: "Ahmed Khan",
        role: "CEO, TechVentures",
        company: "TechVentures Inc.",
        content: "Infinibit Tech transformed our entire business operations with their AI automation solutions. We saw a 40% reduction in operational costs within the first quarter.",
        rating: 5,
        image: null,
    },
    {
        id: 2,
        name: "Sarah Mitchell",
        role: "CTO, GlobalRetail",
        company: "GlobalRetail Ltd.",
        content: "The mobile app they developed exceeded our expectations. User engagement increased by 60% and our customer satisfaction scores hit an all-time high.",
        rating: 5,
        image: null,
    },
    {
        id: 3,
        name: "Muhammad Ali",
        role: "Director of Operations",
        company: "FinanceHub",
        content: "Their custom CRM solution streamlined our sales process completely. The team's attention to detail and technical expertise is remarkable.",
        rating: 5,
        image: null,
    },
    {
        id: 4,
        name: "Jennifer Lee",
        role: "Founder",
        company: "EduTech Solutions",
        content: "Working with Infinibit Tech was a game-changer for our startup. They delivered a scalable SaaS platform that helped us secure Series A funding.",
        rating: 5,
        image: null,
    },
];

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [activeIndex, setActiveIndex] = useState(0);

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section ref={ref} className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(216,30%,6%)] to-background" />
            <GlowingOrb x="15%" y="30%" size={500} intensity={0.08} />
            <GlowingOrb x="85%" y="70%" size={400} color="hsl(193, 100%, 39%)" intensity={0.06} />

            <div className="container relative z-10 mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4">
                        <span className="text-sm text-primary font-medium tracking-wider uppercase">
                            Client Stories
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        What Our <span className="neon-text">Clients Say</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Don't just take our word for it. Here's what industry leaders have to say about working with us.
                    </p>
                </motion.div>

                {/* Testimonials Carousel */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Main Testimonial Card */}
                        <motion.div
                            key={activeIndex}
                            className="glass-card p-8 md:p-12 relative"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Quote Icon */}
                            <motion.div
                                className="absolute -top-4 left-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                            >
                                <Quote className="w-6 h-6 text-primary-foreground" />
                            </motion.div>

                            {/* Rating */}
                            <div className="flex gap-1 mb-6 mt-4">
                                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                    >
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Content */}
                            <motion.p
                                className="text-xl md:text-2xl text-heading-text leading-relaxed mb-8 italic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                "{testimonials[activeIndex].content}"
                            </motion.p>

                            {/* Author */}
                            <motion.div
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                                    <span className="text-xl font-bold text-primary">
                                        {testimonials[activeIndex].name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-heading-text">{testimonials[activeIndex].name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Navigation */}
                        <div className="flex justify-center gap-4 mt-8">
                            <motion.button
                                onClick={prevTestimonial}
                                className="p-3 rounded-full glass-card hover:bg-primary/20 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronLeft className="w-6 h-6 text-primary" />
                            </motion.button>

                            {/* Dots */}
                            <div className="flex items-center gap-2">
                                {testimonials.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                                ? "w-8 bg-primary"
                                                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                            }`}
                                        whileHover={{ scale: 1.2 }}
                                    />
                                ))}
                            </div>

                            <motion.button
                                onClick={nextTestimonial}
                                className="p-3 rounded-full glass-card hover:bg-primary/20 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronRight className="w-6 h-6 text-primary" />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Client Logos Parade */}
                <motion.div
                    className="mt-20"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-center text-muted-foreground mb-8">Trusted by innovative companies worldwide</p>
                    <div className="flex justify-center flex-wrap gap-8 opacity-60">
                        {["TechVentures", "GlobalRetail", "FinanceHub", "EduTech", "HealthPlus", "DataDriven"].map((company, index) => (
                            <motion.div
                                key={index}
                                className="px-6 py-3 glass-card rounded-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                whileHover={{ opacity: 1, scale: 1.05 }}
                            >
                                <span className="text-muted-foreground font-medium">{company}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
