import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "global-reach", label: "Global Reach" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "stats", label: "Stats" },
  { id: "process", label: "Process" },
  { id: "about", label: "About" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

const ScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="group flex items-center gap-3"
          aria-label={`Scroll to ${label}`}
        >
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-xs font-medium text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
          >
            {label}
          </motion.span>

          {/* Dot indicator */}
          <div className="relative">
            <motion.div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === id
                  ? "border-primary bg-primary scale-100"
                  : "border-foreground/30 bg-transparent scale-75 group-hover:scale-100 group-hover:border-primary/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            {activeSection === id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-full bg-primary/30"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
        </button>
      ))}
    </motion.nav>
  );
};

export default ScrollNavigation;
