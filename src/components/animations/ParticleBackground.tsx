import { useMemo, memo } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

interface ParticleBackgroundProps {
    particleCount?: number;
    className?: string;
    color?: string;
    minSize?: number;
    maxSize?: number;
    interactive?: boolean;
}

/**
 * ParticleBackground - Performance-optimized particle system
 * Uses CSS animations instead of JS for 60fps performance
 */
const ParticleBackground = memo(({
    particleCount = 25,
    className = '',
    color = 'hsl(187, 100%, 50%)',
    minSize = 2,
    maxSize = 5,
}: ParticleBackgroundProps) => {
    // Generate particles with random properties (runs once)
    const particles = useMemo<Particle[]>(() => {
        return Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: minSize + Math.random() * (maxSize - minSize),
            duration: 20 + Math.random() * 15,
            delay: Math.random() * 10,
            opacity: 0.2 + Math.random() * 0.4,
        }));
    }, [particleCount, minSize, maxSize]);

    return (
        <div
            className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
            style={{ willChange: 'auto' }}
        >
            {/* Gradient overlay for depth */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, hsl(216, 45%, 7%) 70%)',
                }}
            />

            {/* CSS-animated particles for better performance */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full particle-float"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: color,
                        opacity: particle.opacity,
                        boxShadow: `0 0 ${particle.size * 2}px ${color}`,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}
        </div>
    );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
