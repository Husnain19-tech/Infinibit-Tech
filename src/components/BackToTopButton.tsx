import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-8 right-8 md:bottom-24 md:right-8 z-50"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Button
                        size="icon"
                        onClick={scrollToTop}
                        className="w-12 h-12 rounded-full glass-button bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 shadow-[0_0_20px_rgba(0,229,255,0.3)] backdrop-blur-md"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-6 h-6 animate-bounce" />
                        <div className="absolute inset-0 rounded-full animate-pulse-ring" />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BackToTopButton;
