import { ReactNode, useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface PageTransition3DProps {
  children: ReactNode;
}

// Route hierarchy for determining transition direction
const routeOrder: Record<string, number> = {
  "/": 0,
  "/services": 1,
  "/portfolio": 2,
  "/team": 3,
  "/careers": 4,
  "/contact": 5,
  "/quote": 6,
  "/auth": 7,
};

// Get route depth for nested routes (e.g., /services/ai-automation)
const getRouteInfo = (path: string): { order: number; depth: number } => {
  const segments = path.split("/").filter(Boolean);
  const baseRoute = "/" + (segments[0] || "");
  const order = routeOrder[baseRoute] ?? routeOrder[path] ?? 10;
  return { order, depth: segments.length };
};

// 3D Transition variants based on navigation direction
const createTransitionVariants = (direction: "forward" | "backward" | "deeper" | "shallower"): Variants => {
  const configs = {
    forward: {
      initial: { 
        opacity: 0, 
        x: "8%", 
        rotateY: 8,
        scale: 0.95,
        filter: "blur(8px)",
        transformPerspective: 1200,
      },
      animate: { 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        scale: 1,
        filter: "blur(0px)",
        transformPerspective: 1200,
      },
      exit: { 
        opacity: 0, 
        x: "-8%", 
        rotateY: -8,
        scale: 0.95,
        filter: "blur(8px)",
        transformPerspective: 1200,
      },
    },
    backward: {
      initial: { 
        opacity: 0, 
        x: "-8%", 
        rotateY: -8,
        scale: 0.95,
        filter: "blur(8px)",
        transformPerspective: 1200,
      },
      animate: { 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        scale: 1,
        filter: "blur(0px)",
        transformPerspective: 1200,
      },
      exit: { 
        opacity: 0, 
        x: "8%", 
        rotateY: 8,
        scale: 0.95,
        filter: "blur(8px)",
        transformPerspective: 1200,
      },
    },
    deeper: {
      initial: { 
        opacity: 0, 
        scale: 1.1, 
        z: 200,
        rotateX: -5,
        filter: "blur(10px)",
        transformPerspective: 1200,
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        z: 0,
        rotateX: 0,
        filter: "blur(0px)",
        transformPerspective: 1200,
      },
      exit: { 
        opacity: 0, 
        scale: 0.9, 
        z: -200,
        rotateX: 5,
        filter: "blur(10px)",
        transformPerspective: 1200,
      },
    },
    shallower: {
      initial: { 
        opacity: 0, 
        scale: 0.9, 
        z: -200,
        rotateX: 5,
        filter: "blur(10px)",
        transformPerspective: 1200,
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        z: 0,
        rotateX: 0,
        filter: "blur(0px)",
        transformPerspective: 1200,
      },
      exit: { 
        opacity: 0, 
        scale: 1.1, 
        z: 200,
        rotateX: -5,
        filter: "blur(10px)",
        transformPerspective: 1200,
      },
    },
  };

  return configs[direction];
};

const transitionConfig = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  mass: 0.8,
};

/**
 * PageTransition3D - Cinematic 3D page transitions with direction awareness
 * Provides smooth, perspective-based transitions between routes
 */
const PageTransition3D = ({ children }: PageTransition3DProps) => {
  const location = useLocation();
  const prevPathRef = useRef<string>(location.pathname);
  const [direction, setDirection] = useState<"forward" | "backward" | "deeper" | "shallower">("forward");

  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    if (prevPath !== currentPath) {
      const prevInfo = getRouteInfo(prevPath);
      const currentInfo = getRouteInfo(currentPath);

      // Determine direction based on route hierarchy and depth
      if (currentInfo.depth > prevInfo.depth) {
        setDirection("deeper");
      } else if (currentInfo.depth < prevInfo.depth) {
        setDirection("shallower");
      } else if (currentInfo.order > prevInfo.order) {
        setDirection("forward");
      } else {
        setDirection("backward");
      }

      prevPathRef.current = currentPath;
    }
  }, [location.pathname]);

  const variants = createTransitionVariants(direction);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transitionConfig}
        style={{
          willChange: "opacity, transform, filter",
          minHeight: "100vh",
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
      >
        {/* Animated overlay for extra depth effect */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 100%)",
          }}
        />
        
        {/* Page content */}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition3D;
