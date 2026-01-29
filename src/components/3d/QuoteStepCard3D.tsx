import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface QuoteStepCard3DProps {
  children: React.ReactNode;
  step: number;
  isActive: boolean;
}

export default function QuoteStepCard3D({ children, step, isActive }: QuoteStepCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  // Removed interactive 3D rotation state to ensure click reliability
  const [isHovering, setIsHovering] = useState(false);

  const stepColors = [
    "from-cyan-500/20 to-cyan-500/5",
    "from-blue-500/20 to-blue-500/5",
    "from-purple-500/20 to-purple-500/5",
    "from-green-500/20 to-green-500/5",
  ];

  const glowColors = [
    "rgba(0, 229, 255, 0.3)",
    "rgba(59, 130, 246, 0.3)",
    "rgba(168, 85, 247, 0.3)",
    "rgba(34, 197, 94, 0.3)",
  ];

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isActive ? 1 : 0.98
      }}
      exit={{ opacity: 0, y: -30 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        scale: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated background glow */}
      <motion.div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${stepColors[step - 1] || stepColors[0]} blur-xl pointer-events-none`}
        animate={{
          opacity: isHovering ? 0.8 : 0.4,
          scale: isHovering ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Step indicator floating badge */}
      <motion.div
        className="absolute -top-3 -left-3 z-20 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${glowColors[step - 1]}, transparent)`,
          boxShadow: `0 0 20px ${glowColors[step - 1]}`,
          border: `2px solid ${glowColors[step - 1].replace("0.3", "0.6")}`,
        }}
        animate={{
          y: isHovering ? -4 : 0,
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-foreground">{step}</span>
      </motion.div>

      {/* Main card - 2D but with premium styling */}
      <motion.div
        className="relative rounded-xl backdrop-blur-xl bg-card/80 border border-border/50 overflow-hidden"
        animate={{
          boxShadow: isHovering
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${glowColors[step - 1]}`
            : "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: `linear-gradient(45deg, ${glowColors[step - 1]}, transparent, ${glowColors[step - 1]})`,
            opacity: isHovering ? 0.3 : 0,
            padding: "1px",
          }}
          animate={{ opacity: isHovering ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content - strictly 2D for clicks */}
        <div className="relative z-10 p-8">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
