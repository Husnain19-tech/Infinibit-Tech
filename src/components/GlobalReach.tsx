import { motion } from "framer-motion";
import { lazy, Suspense, useState, useEffect } from "react";
import { Globe, Users, Building2, Handshake } from "lucide-react";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

const Scene3D = lazy(() => import("@/components/3d/Scene3D"));
const Globe3D = lazy(() => import("@/components/3d/Globe3D"));

const stats = [
  { icon: Globe, value: "25+", label: "Countries Served" },
  { icon: Users, value: "500K+", label: "Users Worldwide" },
  { icon: Building2, value: "8", label: "Global Offices" },
  { icon: Handshake, value: "150+", label: "Enterprise Clients" },
];

const GlobalReach = () => {
  const [is3DReady, setIs3DReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIs3DReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="global-reach" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(216,30%,8%)] to-background" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center space-x-2 glass-card px-6 py-3 mb-6"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium tracking-wider uppercase">
              Global Presence
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-heading-text">Trusted </span>
            <span className="neon-text">Worldwide</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            From startups to Fortune 500 companies, we deliver cutting-edge solutions
            across continents, time zones, and industries.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Globe */}
          <motion.div
            className="relative h-[400px] md:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Glow effect behind globe */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-primary/20 rounded-full blur-3xl" />
            </div>

            {is3DReady ? (
              <Suspense
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-primary/30 rounded-full animate-pulse" />
                  </div>
                }
              >
                <Scene3D cameraPosition={[0, 0, 3]}>
                  <ambientLight intensity={0.3} />
                  <directionalLight position={[5, 5, 5]} intensity={0.5} />
                  <pointLight position={[-5, -5, -5]} intensity={0.3} color="#0097A7" />
                  <Globe3D />
                </Scene3D>
              </Suspense>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-48 h-48 border-2 border-primary/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass-card p-6 md:p-8 group"
                whileHover={{
                  scale: 1.05,
                  borderColor: "hsl(187, 100%, 50%)",
                  boxShadow: "0 20px 40px rgba(0, 229, 255, 0.2)",
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <motion.div
                  className="text-3xl md:text-4xl font-bold neon-text mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trusted By Logos placeholder */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted by industry leaders worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
            {["Enterprise Co.", "TechGlobal", "InnovateCorp", "FutureTech", "DataDrive"].map(
              (company, index) => (
                <motion.div
                  key={index}
                  className="text-lg md:text-xl font-semibold text-muted-foreground"
                  whileHover={{ opacity: 1, scale: 1.1 }}
                >
                  {company}
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalReach;
