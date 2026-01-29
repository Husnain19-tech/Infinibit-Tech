import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface TeamCard3DProps {
  children: React.ReactNode;
  index?: number;
}

const TeamCard3D = ({ children, index = 0 }: TeamCard3DProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (max 15 degrees)
    const rotateYValue = (mouseX / (rect.width / 2)) * 3; // Reduced from 15
    const rotateXValue = -(mouseY / (rect.height / 2)) * 3; // Reduced from 15

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="h-full relative"
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
          z: isHovered ? 50 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
      >
        {/* Glow effect behind card */}
        <motion.div
          className="absolute -inset-2 rounded-xl bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 blur-xl pointer-events-none"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.05 : 0.95,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Reflection/shine effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none z-10 overflow-hidden"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
            style={{
              transform: `translateX(${rotateY * 2}px) translateY(${-rotateX * 2}px)`,
            }}
          />
        </motion.div>

        {/* Main content */}
        <div className="relative z-0 h-full">{children}</div>

        {/* Bottom shadow for depth */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/30 blur-xl rounded-full"
          animate={{
            opacity: isHovered ? 0.5 : 0.2,
            scaleX: isHovered ? 1.1 : 1,
            y: isHovered ? 8 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TeamCard3D;
