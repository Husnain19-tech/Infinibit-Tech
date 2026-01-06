import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface QuoteStepCard3DProps {
  children: React.ReactNode;
  step: number;
  isActive: boolean;
}

export default function QuoteStepCard3D({ children, step, isActive }: QuoteStepCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Subtle rotation based on mouse position
    setRotateY((mouseX / rect.width) * 8);
    setRotateX(-(mouseY / rect.height) * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

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
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        scale: isActive ? 1 : 0.98
      }}
      exit={{ opacity: 0, y: -30, rotateX: 15 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        scale: { duration: 0.3 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Animated background glow */}
      <motion.div
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${stepColors[step - 1] || stepColors[0]} blur-xl`}
        animate={{
          opacity: isHovering ? 0.8 : 0.4,
          scale: isHovering ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Step indicator floating badge */}
      <motion.div
        className="absolute -top-3 -left-3 z-20 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
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

      {/* Main card with 3D transform */}
      <motion.div
        className="relative rounded-xl backdrop-blur-xl bg-card/80 border border-border/50 overflow-hidden"
        animate={{
          rotateX,
          rotateY,
          boxShadow: isHovering
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${glowColors[step - 1]}`
            : "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
        }}
        transition={{ duration: 0.1, ease: "linear" }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              ${105 + rotateY * 2}deg,
              transparent 40%,
              rgba(255, 255, 255, 0.05) 50%,
              transparent 60%
            )`,
          }}
        />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            background: `linear-gradient(${rotateY * 3}deg, ${glowColors[step - 1]}, transparent, ${glowColors[step - 1]})`,
            opacity: isHovering ? 0.3 : 0,
            padding: "1px",
          }}
          animate={{ opacity: isHovering ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles inside card */}
        {isHovering && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: glowColors[step - 1].replace("0.3", "0.8"),
                  left: `${20 + i * 15}%`,
                  bottom: "0%",
                }}
                animate={{
                  y: [0, -100 - i * 20],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Content with depth */}
        <div
          className="relative z-10 p-8"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          {children}
        </div>
      </motion.div>

      {/* Reflection effect */}
      <motion.div
        className="absolute -bottom-4 left-4 right-4 h-8 rounded-xl opacity-20 blur-md"
        style={{
          background: `linear-gradient(to bottom, ${glowColors[step - 1]}, transparent)`,
          transform: "scaleY(-0.3) translateZ(-10px)",
        }}
        animate={{
          opacity: isHovering ? 0.3 : 0.1,
        }}
      />
    </motion.div>
  );
}
