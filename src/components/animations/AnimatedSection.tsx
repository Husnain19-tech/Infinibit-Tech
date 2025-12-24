import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    variants?: Variants;
    stagger?: boolean;
    delay?: number;
    once?: boolean;
    amount?: number;
}

/**
 * AnimatedSection - Scroll-triggered animation wrapper
 * Automatically animates children when they enter the viewport
 */
const AnimatedSection = ({
    children,
    className = '',
    variants = fadeInUp,
    stagger = false,
    delay = 0,
    once = true,
    amount = 0.2,
}: AnimatedSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount });

    const containerVariants = stagger ? staggerContainer : variants;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className={className}
            style={{ willChange: 'opacity, transform' }}
            transition={{ delay }}
        >
            {stagger ? (
                children
            ) : (
                children
            )}
        </motion.div>
    );
};

export default AnimatedSection;

// Individual animated item for use inside staggered containers
interface AnimatedItemProps {
    children: ReactNode;
    className?: string;
    variants?: Variants;
}

export const AnimatedItem = ({
    children,
    className = '',
    variants = fadeInUp,
}: AnimatedItemProps) => {
    return (
        <motion.div
            variants={variants}
            className={className}
            style={{ willChange: 'opacity, transform' }}
        >
            {children}
        </motion.div>
    );
};
