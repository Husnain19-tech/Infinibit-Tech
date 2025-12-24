import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface CountUpProps {
    end: number;
    start?: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
    decimals?: number;
    separator?: string;
}

/**
 * CountUp - Animated number counter
 * Smoothly counts from start to end value when in viewport
 */
const CountUp = ({
    end,
    start = 0,
    duration = 2,
    suffix = '',
    prefix = '',
    className = '',
    decimals = 0,
    separator = ',',
}: CountUpProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [hasAnimated, setHasAnimated] = useState(false);

    // Spring animation for smooth counting
    const springValue = useSpring(start, {
        stiffness: 50,
        damping: 30,
        duration: duration * 1000,
    });

    // Transform to display value
    const displayValue = useTransform(springValue, (latest) => {
        const formatted = latest.toFixed(decimals);
        const parts = formatted.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return parts.join('.');
    });

    // Trigger animation when in view
    useEffect(() => {
        if (isInView && !hasAnimated) {
            springValue.set(end);
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated, end, springValue]);

    return (
        <motion.span
            ref={ref}
            className={`inline-block tabular-nums ${className}`}
        >
            {prefix}
            <motion.span>{displayValue}</motion.span>
            {suffix}
        </motion.span>
    );
};

export default CountUp;

// Odometer-style digit counter
interface OdometerProps {
    value: number;
    className?: string;
}

export const Odometer = ({ value, className = '' }: OdometerProps) => {
    const digits = String(value).split('');

    return (
        <span className={`inline-flex overflow-hidden ${className}`}>
            {digits.map((digit, index) => (
                <motion.span
                    key={`${index}-${digit}`}
                    className="inline-block"
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                        delay: index * 0.1,
                    }}
                >
                    {digit}
                </motion.span>
            ))}
        </span>
    );
};
