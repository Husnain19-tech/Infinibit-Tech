import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Sparkles, Award, Users, Rocket } from "lucide-react";
import { GlowingOrb, AnimatedSection } from "@/components/animations";
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, scaleIn } from "@/lib/animations";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} id="about" className="relative py-32 overflow-hidden">
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: 0 }}
      >
        <img
          src="/images/services/business-consultancy-2.jpg"
          alt="Office Background"
          className="w-full h-full object-cover opacity-8"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </motion.div>

      {/* Glowing Orbs */}
      <GlowingOrb x="85%" y="15%" size={500} intensity={0.1} />
      <GlowingOrb x="5%" y="80%" size={400} color="hsl(193, 100%, 39%)" intensity={0.08} />

      <div className="container relative z-10 mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16 space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2">
              <span className="text-sm text-primary">About Infinibit Tech</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Building the <span className="neon-text">Future</span>
            </h2>
          </motion.div>

          {/* Main Content Card */}
          <motion.div
            className="glass-card p-8 md:p-12 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <motion.p
                  className="text-xl text-muted-foreground leading-relaxed mb-6"
                  variants={fadeInLeft}
                >
                  Infinibit Tech is a <span className="text-primary font-semibold">next-generation software innovation studio</span> providing AI-powered,
                  enterprise-grade digital solutions. We specialize in automation, AI engineering,
                  web & mobile development, enterprise systems, and digital transformation for global businesses.
                </motion.p>
                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed"
                  variants={fadeInLeft}
                >
                  Founded by <span className="text-primary font-semibold">Husnain Shabbir</span> & <span className="text-primary font-semibold">Rafay Butt</span>,
                  the company is built on the vision of merging <span className="text-heading-text">technology + intelligence + creativity</span> into scalable, future-proof digital products.
                </motion.p>
              </div>

              {/* Founder Highlight */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Husnain Shabbir", role: "Co-Founder & CEO", icon: Rocket },
                    { name: "Rafay Butt", role: "Co-Founder & CTO", icon: Award },
                  ].map((founder, index) => (
                    <motion.div
                      key={index}
                      className="glass-card p-6 text-center"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 30px rgba(0, 229, 255, 0.2)",
                      }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <founder.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="font-bold text-heading-text">{founder.name}</h4>
                      <p className="text-sm text-muted-foreground">{founder.role}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Mission, Vision, Values */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {[
              {
                icon: Target,
                title: "Mission",
                content: "To empower businesses with intelligent digital solutions that automate operations, accelerate growth, and deliver exceptional customer experiences.",
              },
              {
                icon: Eye,
                title: "Vision",
                content: "To become Pakistan's most trusted global technology partner — building products that transform industries through AI, data, and innovation.",
              },
              {
                icon: Sparkles,
                title: "Values",
                content: null,
                values: ["Innovation First", "Precision Engineering", "Client Partnership", "Transparency", "Excellence"],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 group"
                variants={scaleIn}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 229, 255, 0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="mb-4 p-3 bg-primary/10 rounded-xl w-fit"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <item.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                {item.content ? (
                  <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                ) : (
                  <ul className="text-muted-foreground space-y-2">
                    {item.values?.map((value, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <span className="text-primary mr-2">✓</span>
                        <span>{value}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Impact Metrics */}
          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-center mb-8">Measurable Business Outcomes</h3>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-5 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {[
                { name: "Cost Reduction", icon: "📉" },
                { name: "Operational Automation", icon: "⚡" },
                { name: "Revenue Growth", icon: "📈" },
                { name: "Customer Experience", icon: "🎯" },
                { name: "Digital Transformation", icon: "🚀" },
              ].map((outcome, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl"
                    whileHover={{
                      boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
                    }}
                  >
                    {outcome.icon}
                  </motion.div>
                  <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {outcome.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
