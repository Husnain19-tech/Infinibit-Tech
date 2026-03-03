import { ReactNode, useRef, useEffect, useState, cloneElement, isValidElement } from "react";
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

// Simplified, faster transition variants
const createTransitionVariants = (direction: "forward" | "backward" | "deeper" | "shallower"): Variants => {
  const configs = {
    forward: {
      initial: { opacity: 0, x: "4%", scale: 0.98 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: "-4%", scale: 0.98 },
    },
    backward: {
      initial: { opacity: 0, x: "-4%", scale: 0.98 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: "4%", scale: 0.98 },
    },
    deeper: {
      initial: { opacity: 0, scale: 1.02 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
    },
    shallower: {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.02 },
    },
  };

  return configs[direction];
};

// Faster, snappier transition
const transitionConfig = {
  type: "tween" as const,
  duration: 0.2,
  ease: "easeOut" as const,
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
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transitionConfig}
        style={{
          willChange: "opacity, transform",
          minHeight: "100vh",
          width: "100%",
        }}
        className="overflow-hidden"
      >
        {isValidElement(children) ? cloneElement(children as React.ReactElement, { location, key: location.pathname }) : children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition3D;
