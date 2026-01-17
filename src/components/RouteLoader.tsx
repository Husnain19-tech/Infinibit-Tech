import { motion, AnimatePresence } from "framer-motion";

interface RouteLoaderProps {
  isLoading: boolean;
}

/**
 * Non-blocking overlay loader that shows during route transitions
 * Keeps the current page visible while the next page loads
 */
const RouteLoader = ({ isLoading }: RouteLoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Subtle backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Loader */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteLoader;
