import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface FloatingElementProps {
    children: ReactNode;
    className?: string;
    rotateIntensity?: number;
    floatIntensity?: number;
    glowColor?: string;
    enableMouseFollow?: boolean;
}

/**
 * FloatingElement - 3D floating/rotating element with mouse-follow parallax
 * Creates depth and interactivity for hero sections and cards
 */
const FloatingElement = ({
    children,
    className = '',
    rotateIntensity = 15,
    floatIntensity = 20,
    glowColor = 'rgba(0, 229, 255, 0.3)',
    enableMouseFollow = true,
}: FloatingElementProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation
    const springConfig = { stiffness: 150, damping: 15 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [rotateIntensity, -rotateIntensity]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-rotateIntensity, rotateIntensity]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!enableMouseFollow || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
            }}
        >
            <motion.div
                style={{
                    rotateX: enableMouseFollow ? rotateX : 0,
                    rotateY: enableMouseFollow ? rotateY : 0,
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    y: [0, -floatIntensity, 0],
                }}
                transition={{
                    y: {
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    },
                }}
            >
                {/* Glow effect */}
                <motion.div
                    className="absolute inset-0 rounded-3xl -z-10"
                    style={{
                        background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
                        filter: 'blur(40px)',
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                {children}
            </motion.div>
        </motion.div>
    );
};

export default FloatingElement;
