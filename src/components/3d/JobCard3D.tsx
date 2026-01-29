import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface JobCard3DProps {
  children: React.ReactNode;
  index?: number;
}

const JobCard3D = ({ children, index = 0 }: JobCard3DProps) => {
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

    // Subtle rotation for job cards (reduced for stability)
    const rotateYValue = (mouseX / (rect.width / 2)) * 2;
    const rotateXValue = -(mouseY / (rect.height / 2)) * 2;

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
      className="relative"
      initial={{ opacity: 0, y: 40, rotateX: -5 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative"
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.01 : 1,
          z: isHovered ? 30 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform"
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-lg pointer-events-none"
          animate={{
            opacity: isHovered ? 0.5 : 0,
            scale: isHovered ? 1.02 : 0.98,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none z-10 overflow-hidden"
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
            animate={{
              x: isHovered ? ["-100%", "100%"] : "-100%",
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Left accent bar */}
        <motion.div
          className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-primary via-accent to-primary pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0.3,
            scaleY: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Main content */}
        <div className="relative z-0">{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default JobCard3D;
