import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface TextRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    type?: 'words' | 'chars' | 'lines';
}

/**
 * TextReveal - Animated text reveal component
 * Reveals text word-by-word, character-by-character, or line-by-line
 */
const TextReveal = ({
    children,
    className = '',
    delay = 0,
    duration = 0.5,
    type = 'words',
}: TextRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    // Convert children to string
    const text = typeof children === 'string' ? children : String(children);

    // Split text based on type
    const splitText = () => {
        switch (type) {
            case 'chars':
                return text.split('');
            case 'lines':
                return text.split('\n');
            case 'words':
            default:
                return text.split(' ');
        }
    };

    const items = splitText();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: type === 'chars' ? 0.02 : 0.08,
                delayChildren: delay,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -20,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                duration,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            className={`inline-flex flex-wrap ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ perspective: 1000 }}
        >
            {items.map((item, index) => (
                <motion.span
                    key={index}
                    variants={itemVariants}
                    className="inline-block"
                    style={{
                        willChange: 'opacity, transform',
                        marginRight: type === 'words' ? '0.25em' : type === 'chars' ? '0' : '0',
                    }}
                >
                    {item}
                    {type === 'chars' && item === ' ' && <span>&nbsp;</span>}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default TextReveal;

// Typewriter effect variant
interface TypewriterProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    cursor?: boolean;
}

export const Typewriter = ({
    text,
    className = '',
    speed = 50,
    delay = 0,
    cursor = true,
}: TypewriterProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.span
            ref={ref}
            className={`inline-block ${className}`}
        >
            {isInView && (
                <>
                    {text.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.01,
                                delay: delay + index * (speed / 1000),
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                    {cursor && (
                        <motion.span
                            className="inline-block w-0.5 h-[1em] bg-primary ml-1"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        />
                    )}
                </>
            )}
        </motion.span>
    );
};
