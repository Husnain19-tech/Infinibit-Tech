import { motion } from 'framer-motion';

interface GlowingOrbProps {
    size?: number;
    color?: string;
    x?: string;
    y?: string;
    blur?: number;
    intensity?: number;
    className?: string;
}

/**
 * GlowingOrb - Animated glowing background element
 * Creates ambient lighting effect with pulse animation
 */
const GlowingOrb = ({
    size = 400,
    color = 'hsl(187, 100%, 50%)',
    x = '50%',
    y = '50%',
    blur = 120,
    intensity = 0.15,
    className = '',
}: GlowingOrbProps) => {
    return (
        <motion.div
            className={`absolute pointer-events-none ${className}`}
            style={{
                left: x,
                top: y,
                width: size,
                height: size,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                filter: `blur(${blur}px)`,
                opacity: intensity,
            }}
            animate={{
                scale: [1, 1.2, 1],
                opacity: [intensity, intensity * 1.5, intensity],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        />
    );
};

export default GlowingOrb;

// Multiple orbs pattern
interface OrbPatternProps {
    className?: string;
}

export const OrbPattern = ({ className = '' }: OrbPatternProps) => {
    const orbs = [
        { x: '20%', y: '30%', size: 500, color: 'hsl(187, 100%, 50%)', intensity: 0.1 },
        { x: '80%', y: '20%', size: 400, color: 'hsl(193, 100%, 39%)', intensity: 0.08 },
        { x: '60%', y: '70%', size: 600, color: 'hsl(187, 100%, 50%)', intensity: 0.12 },
        { x: '10%', y: '80%', size: 350, color: 'hsl(193, 100%, 39%)', intensity: 0.06 },
    ];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {orbs.map((orb, index) => (
                <GlowingOrb
                    key={index}
                    {...orb}
                />
            ))}
        </div>
    );
};
