import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
    className?: string;
    iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, iconOnly = false }) => {
    return (
        <div className={cn("flex flex-col items-center justify-center text-center group", className)}>
            {/* Logo Container with Metallic Gold Background */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-yellow-400 group-hover:scale-105 overflow-hidden">
                {/* Metallic Gold Gradient Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#fff9c4_0%,#fbc02d_50%,#f9a825_100%)] shadow-inner" />

                {/* Animated Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-20deg] group-hover:animate-[shine_1.5s_infinite] transition-transform duration-1000" />

                {/* Logo Content (SVG) */}
                <div className="relative z-10 w-[75%] h-[75%] flex flex-col items-center justify-center pt-2">
                    <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-auto drop-shadow-sm"
                    >
                        {/* Main Flower Knot - Intricate Line Art */}
                        <g transform="translate(50, 32) scale(0.6)" className="text-slate-900" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            {/* Petal Path Pattern */}
                            {[0, 72, 144, 216, 288].map((angle) => (
                                <path
                                    key={angle}
                                    d="M0 -35 C 15 -15, 30 0, 0 10 C -30 0, -15 -15, 0 -35"
                                    transform={`rotate(${angle})`}
                                    className="opacity-90"
                                />
                            ))}
                            <circle cx="0" cy="-5" r="3" fill="currentColor" />
                        </g>

                        {/* Smaller Accent Flower to the Right */}
                        <g transform="translate(72, 42) scale(0.22)" className="text-slate-900" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            {[0, 72, 144, 216, 288].map((angle) => (
                                <path
                                    key={angle}
                                    d="M0 -35 C 15 -15, 30 0, 0 10 C -30 0, -15 -15, 0 -35"
                                    transform={`rotate(${angle})`}
                                />
                            ))}
                        </g>

                        {/* Tiny Star/Flower Detail */}
                        <g transform="translate(74, 58) scale(0.12)" className="text-slate-900" fill="currentColor">
                            <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
                        </g>

                        {/* VCJ Name in the Gold Circle */}
                        <text
                            x="50"
                            y="82"
                            textAnchor="middle"
                            className="fill-slate-900 font-serif font-black text-4xl"
                            style={{ letterSpacing: '-0.02em' }}
                        >
                            VCJ
                        </text>
                    </svg>
                </div>
            </div>

            {!iconOnly && (
                <div className="flex flex-col items-center leading-none mt-2">
                    <span className="text-[10px] md:text-[12px] font-serif font-black tracking-[0.3em] uppercase text-slate-900 group-hover:text-yellow-700 transition-colors">
                        VCJ
                    </span>
                    <span className="text-[6px] md:text-[8px] tracking-[0.5em] uppercase font-bold text-slate-500 group-hover:text-yellow-600 transition-colors mt-1 whitespace-nowrap">
                        VIMAL CHHAGANLAL
                    </span>
                </div>
            )}
        </div>
    );
};
