import { memo } from 'react';

// Following rendering-hoist-jsx: Static background component extracted
export const TacticalBackground = memo(() => {
    return (
        <>
            {/* Dark base with topographic overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1420] to-[#0a0f1a]" />

            {/* Tactical grid overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #00d9ff 1px, transparent 1px),
                        linear-gradient(to bottom, #00d9ff 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Topographic lines effect */}
            <svg
                className="absolute inset-0 w-full h-full opacity-5"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="topo" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                        <path
                            d="M50,50 Q75,25 100,50 T150,50"
                            stroke="#00d9ff"
                            strokeWidth="1"
                            fill="none"
                        />
                        <path
                            d="M30,80 Q55,60 80,80 T130,80"
                            stroke="#00d9ff"
                            strokeWidth="1"
                            fill="none"
                        />
                        <path
                            d="M60,120 Q85,100 110,120 T160,120"
                            stroke="#00d9ff"
                            strokeWidth="1"
                            fill="none"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#topo)" />
            </svg>

            {/* Faint circuit board pattern in corners */}
            <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20,20 L50,20 L50,50" stroke="#00d9ff" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="50" r="4" fill="#00d9ff" />
                    <path d="M50,50 L80,50 L80,80" stroke="#00d9ff" strokeWidth="2" fill="none" />
                    <circle cx="80" cy="80" r="4" fill="#00d9ff" />
                    <path d="M20,80 L50,80" stroke="#00d9ff" strokeWidth="2" fill="none" />
                    <path d="M80,20 L80,50" stroke="#00d9ff" strokeWidth="2" fill="none" />
                </svg>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 opacity-5 transform rotate-180">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20,20 L50,20 L50,50" stroke="#00d9ff" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="50" r="4" fill="#00d9ff" />
                    <path d="M50,50 L80,50 L80,80" stroke="#00d9ff" strokeWidth="2" fill="none" />
                    <circle cx="80" cy="80" r="4" fill="#00d9ff" />
                </svg>
            </div>

            {/* Vignette effect */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 15, 26, 0.8) 100%)'
                }}
            />
        </>
    );
});

TacticalBackground.displayName = 'TacticalBackground';
