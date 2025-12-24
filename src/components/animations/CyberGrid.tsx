import { memo } from 'react';

interface CyberGridProps {
    className?: string;
    color?: string;
    animated?: boolean;
}

/**
 * CyberGrid - Futuristic animated grid background
 * Lightweight CSS-only animation for sci-fi effect
 */
const CyberGrid = memo(({
    className = '',
    color = 'rgba(0, 229, 255, 0.03)',
    animated = true,
}: CyberGridProps) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {/* Animated grid lines */}
            <div
                className={`absolute inset-0 ${animated ? 'animate-grid-flow' : ''}`}
                style={{
                    backgroundImage: `
            linear-gradient(${color} 1px, transparent 1px),
            linear-gradient(90deg, ${color} 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                    backgroundPosition: '0 0',
                }}
            />

            {/* Perspective grid floor effect */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[40vh]"
                style={{
                    background: `linear-gradient(to top, ${color.replace('0.03', '0.08')}, transparent)`,
                    transform: 'perspective(500px) rotateX(60deg)',
                    transformOrigin: 'bottom',
                }}
            />

            {/* Scanning line effect */}
            {animated && (
                <div
                    className="absolute left-0 right-0 h-[2px] animate-scan-line"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${color.replace('0.03', '0.5')}, transparent)`,
                        boxShadow: `0 0 20px ${color.replace('0.03', '0.3')}`,
                    }}
                />
            )}
        </div>
    );
});

CyberGrid.displayName = 'CyberGrid';

export default CyberGrid;
