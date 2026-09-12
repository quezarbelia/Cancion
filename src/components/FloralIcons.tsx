import React from 'react';

interface FlowerIconProps {
  className?: string;
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

// 1. Rosa Clásica Romántica (Rose)
export const RoseFlower: React.FC<FlowerIconProps> = ({
  className = 'w-6 h-6',
  primaryColor = 'var(--theme-primary, #6C0820)',
  secondaryColor = 'var(--theme-secondary, #F2AEBC)',
}) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M32 10C24 10 18 16 18 24C18 35 32 48 32 48C32 48 46 35 46 24C46 16 40 10 32 10Z"
      fill={secondaryColor}
      opacity="0.3"
    />
    {/* Rose spiral petals */}
    <path
      d="M32 16C26 16 22 20 22 26C22 34 32 44 32 44C32 44 42 34 42 26C42 20 38 16 32 16Z"
      fill={primaryColor}
      opacity="0.85"
    />
    <path
      d="M32 20C28.7 20 26 22.7 26 26C26 31 32 37 32 37C32 37 38 31 38 26C38 22.7 35.3 20 32 20Z"
      fill={secondaryColor}
    />
    <path
      d="M32 23C30.3 23 29 24.3 29 26C29 28.5 32 31.5 32 31.5C32 31.5 35 28.5 35 26C35 24.3 33.7 23 32 23Z"
      fill={primaryColor}
    />
    {/* Rose stem & leaves */}
    <path d="M32 44V56" stroke="#4D6B4D" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M32 48C26 46 22 50 20 54C26 55 30 52 32 48Z" fill="#587A58" />
    <path d="M32 50C38 48 42 52 44 56C38 57 34 54 32 50Z" fill="#587A58" />
  </svg>
);

// 2. Tulipán Elegante (Tulip)
export const TulipFlower: React.FC<FlowerIconProps> = ({
  className = 'w-6 h-6',
  primaryColor = 'var(--theme-primary, #6C0820)',
  secondaryColor = 'var(--theme-secondary, #F2AEBC)',
}) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 36V58" stroke="#4D6B4D" strokeWidth="2.5" strokeLinecap="round" />
    {/* Leaves */}
    <path d="M32 48C20 44 14 34 16 22C24 30 30 40 32 48Z" fill="#6B8E6B" opacity="0.9" />
    <path d="M32 45C44 41 50 31 48 19C40 27 34 37 32 45Z" fill="#5A7D5A" opacity="0.9" />
    {/* Center petal */}
    <path d="M32 12C28 20 28 32 32 38C36 32 36 20 32 12Z" fill={secondaryColor} />
    {/* Left petal */}
    <path d="M32 38C26 38 20 30 20 20C25 18 30 24 32 38Z" fill={primaryColor} opacity="0.9" />
    {/* Right petal */}
    <path d="M32 38C38 38 44 30 44 20C39 18 34 24 32 38Z" fill={primaryColor} />
  </svg>
);

// 3. Girasol Dorado (Sunflower)
export const Sunflower: React.FC<FlowerIconProps> = ({
  className = 'w-6 h-6',
  primaryColor = '#E59B1B',
  secondaryColor = '#FFE27A',
}) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(32,32)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <path
          key={deg}
          d="M0 -24 C-3 -16 -3 -8 0 0 C3 -8 3 -16 0 -24 Z"
          fill={deg % 60 === 0 ? primaryColor : secondaryColor}
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="9" fill="#422509" />
      <circle cx="0" cy="0" r="7" fill="#663A0F" />
      <circle cx="-2" cy="-2" r="2" fill="#E59B1B" opacity="0.6" />
    </g>
  </svg>
);

// 4. Margarita Silvestre (Daisy)
export const DaisyFlower: React.FC<FlowerIconProps> = ({
  className = 'w-6 h-6',
  primaryColor = '#FFFFFF',
  secondaryColor = '#F2DCDB',
}) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(32,32)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <path
          key={deg}
          d="M0 -22 C-3.5 -14 -3 -6 0 0 C3 -6 3.5 -14 0 -22 Z"
          fill={primaryColor}
          stroke={secondaryColor}
          strokeWidth="0.8"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="7.5" fill="#E5A823" />
      <circle cx="-1.5" cy="-1.5" r="2" fill="#FFE082" />
    </g>
  </svg>
);

// 5. Ramillete de Lavanda (Lavender)
export const LavenderFlower: React.FC<FlowerIconProps> = ({
  className = 'w-6 h-6',
  primaryColor = 'var(--theme-accent, #5A86CB)',
  secondaryColor = 'var(--theme-accent-dark, #3D5D91)',
}) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 60V14" stroke="#5E7D5E" strokeWidth="2" strokeLinecap="round" />
    {/* Lavender florets */}
    {[16, 22, 28, 34, 40].map((y, idx) => (
      <g key={y}>
        <ellipse cx="27" cy={y} rx="3.5" ry="5.5" transform={`rotate(-25 27 ${y})`} fill={idx % 2 === 0 ? primaryColor : secondaryColor} />
        <ellipse cx="37" cy={y} rx="3.5" ry="5.5" transform={`rotate(25 37 ${y})`} fill={idx % 2 === 0 ? secondaryColor : primaryColor} />
      </g>
    ))}
    <ellipse cx="32" cy="12" rx="3" ry="5" fill={primaryColor} />
  </svg>
);

// 6. Flor de Cerezo / Sakura
export const SakuraFlower: React.FC<FlowerIconProps> = ({
  className = 'w-6 h-6',
  primaryColor = 'var(--theme-secondary, #F2AEBC)',
  secondaryColor = 'var(--theme-primary, #6C0820)',
}) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(32,32)">
      {[0, 72, 144, 216, 288].map((deg) => (
        <path
          key={deg}
          d="M0 -22 C-5 -16 -6 -8 0 0 C6 -8 5 -16 0 -22 Z"
          fill={primaryColor}
          stroke={secondaryColor}
          strokeWidth="0.8"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle cx="0" cy="0" r="4.5" fill={secondaryColor} />
      {[0, 72, 144, 216, 288].map((deg) => (
        <circle key={`dot-${deg}`} cx="0" cy="-9" r="1" fill={secondaryColor} transform={`rotate(${deg})`} />
      ))}
    </g>
  </svg>
);

// 7. Orquídea Real (Orchid)
export const OrchidFlower: React.FC<FlowerIconProps> = ({
  className = 'w-6 h-6',
  primaryColor = 'var(--theme-primary, #6C0820)',
  secondaryColor = 'var(--theme-surface, #F2DCDB)',
}) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(32,32)">
      {/* Top petal */}
      <path d="M0 -24 C-7 -18 -8 -8 0 0 C8 -8 7 -18 0 -24 Z" fill={secondaryColor} stroke={primaryColor} strokeWidth="1" />
      {/* Lateral petals */}
      <path d="M-22 -4 C-16 -10 -8 -6 0 0 C-8 6 -16 2 -22 -4 Z" fill={secondaryColor} stroke={primaryColor} strokeWidth="1" />
      <path d="M22 -4 C16 -10 8 -6 0 0 C8 6 16 2 22 -4 Z" fill={secondaryColor} stroke={primaryColor} strokeWidth="1" />
      {/* Lower lip (labellum) */}
      <path d="M0 18 C-9 12 -7 2 0 0 C7 2 9 12 0 18 Z" fill={primaryColor} />
      <circle cx="0" cy="4" r="3" fill="#FFE082" />
    </g>
  </svg>
);

// 8. Lirio / Azucena (Lily)
export const LilyFlower: React.FC<FlowerIconProps> = ({
  className = 'w-6 h-6',
  primaryColor = 'var(--theme-accent, #5A86CB)',
  secondaryColor = 'var(--theme-surface, #F2DCDB)',
}) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(32,34)">
      <path d="M0 -24 C-9 -14 -6 -4 0 0 C6 -4 9 -14 0 -24 Z" fill={secondaryColor} stroke={primaryColor} strokeWidth="1" />
      <path d="M-20 -10 C-18 -2 -8 0 0 0 C-8 0 -18 -2 -20 -10 Z" fill={secondaryColor} stroke={primaryColor} strokeWidth="1" />
      <path d="M20 -10 C18 -2 8 0 0 0 C8 0 18 -2 20 -10 Z" fill={secondaryColor} stroke={primaryColor} strokeWidth="1" />
      {/* Stamens */}
      <path d="M0 0 L-4 -12 M0 0 L0 -15 M0 0 L4 -12" stroke="#B27D23" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="-4" cy="-13" r="1.5" fill="#8C5311" />
      <circle cx="0" cy="-16" r="1.5" fill="#8C5311" />
      <circle cx="4" cy="-13" r="1.5" fill="#8C5311" />
    </g>
  </svg>
);

// Guirnalda o Enredadera Floral decorativa
export const FloralDivider: React.FC<{ className?: string }> = ({ className = 'w-full h-8' }) => (
  <div className={`flex items-center justify-center gap-2.5 my-3 opacity-80 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--theme-primary)] to-transparent opacity-30" />
    <SakuraFlower className="w-4 h-4 text-[var(--theme-primary)]" />
    <RoseFlower className="w-5 h-5 text-[var(--theme-primary)]" />
    <DaisyFlower className="w-4 h-4" />
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--theme-primary)] to-transparent opacity-30" />
  </div>
);
