import React, { useState, useMemo } from 'react';

interface GerberaDaisyProps {
  isBloomed?: boolean;
  bloomProgress?: number; // 0 (closed bud) to 1 (full open radiant blossom)
  onTap?: (e?: React.MouseEvent | React.TouchEvent) => void;
  className?: string;
  showStem?: boolean;
  interactiveSparks?: boolean;
}

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const GerberaDaisy: React.FC<GerberaDaisyProps> = ({
  isBloomed = true,
  bloomProgress,
  onTap,
  className = 'w-72 h-72',
  showStem = true,
  interactiveSparks = true,
}) => {
  // Normalize progress (0 to 1) - default fully bloomed
  const progress = bloomProgress !== undefined ? Math.max(0, Math.min(1, bloomProgress)) : (isBloomed ? 1 : 0.08);

  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // 28 outer ray petals radiating in full circle for ultra-rich flower density
  const outerPetalAngles = useMemo(() => Array.from({ length: 28 }, (_, i) => (i * 360) / 28), []);
  // 22 middle layer petals interleaved
  const midPetalAngles = useMemo(() => Array.from({ length: 22 }, (_, i) => (i * 360) / 22 + 8), []);
  // 18 inner collar petals (trans florets)
  const innerPetalAngles = useMemo(() => Array.from({ length: 18 }, (_, i) => (i * 360) / 18 + 10), []);
  // 10 green calyx sepals (phyllaries) that protect the bud
  const calyxAngles = useMemo(() => Array.from({ length: 10 }, (_, i) => (i * 360) / 10 + 18), []);

  // Fibonacci Golden Spiral Seeds for realistic botanical disc center
  const discFlorets = useMemo(() => {
    const goldenAngle = 2.399963; // radians
    return Array.from({ length: 64 }, (_, i) => {
      const idx = i + 1;
      const radius = Math.sqrt(idx) * 2.75;
      const angle = idx * goldenAngle;
      return {
        id: idx,
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        size: Math.max(1.1, 2.2 - (idx / 64) * 0.9),
      };
    });
  }, []);

  // Handle touch or click to create sparkles and trigger haptics
  const handleClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (interactiveSparks) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clientX = 'touches' in e && e.touches[0] ? e.touches[0].clientX : ('clientX' in e ? e.clientX : rect.left + rect.width / 2);
      const clientY = 'touches' in e && e.touches[0] ? e.touches[0].clientY : ('clientY' in e ? e.clientY : rect.top + rect.height / 2);

      const sparkleColors = ['#F2AEBC', '#D4AF37', '#6C0820', '#FFFFFF', '#F2DCDB'];

      const newSpark: SparkleParticle = {
        id: Date.now() + Math.random(),
        x: clientX - rect.left,
        y: clientY - rect.top,
        color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      };

      setSparkles((prev) => [...prev.slice(-6), newSpark]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, 950);
    }

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate?.([20, 30]);
      } catch {
        // Fallback
      }
    }

    onTap?.(e);
  };

  // Subtle 3D tilt tracking for mobile touches
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleTouchEnd = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Petal dynamic calculations based on progress (0 to 1)
  const outerScale = 0.25 + progress * 0.75;
  const outerY = 32 * (1 - progress);
  const outerPetalFoldAngle = (1 - progress) * 55;
  const midScale = 0.28 + progress * 0.72;
  const midY = 24 * (1 - progress);
  const innerScale = 0.35 + progress * 0.65;
  const centerScale = 0.42 + progress * 0.58;
  const centerOpacity = 0.3 + progress * 0.7;
  const pollenGlowOpacity = progress * 0.95;

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleClick}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative flex items-center justify-center cursor-pointer select-none transition-transform duration-500 will-change-transform touch-manipulation ${className}`}
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
      title="Gerbera Rosa"
    >
      {/* Floating touch sparkles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute pointer-events-none rounded-full animate-ping z-30"
          style={{
            left: s.x,
            top: s.y,
            width: '15px',
            height: '15px',
            backgroundColor: s.color,
            boxShadow: `0 0 14px ${s.color}`,
          }}
        />
      ))}

      {/* Romantic Aura behind the Flower */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-700 blur-2xl -z-10 animate-sunburst"
        style={{
          width: `${145 + progress * 135}px`,
          height: `${145 + progress * 135}px`,
          background: `radial-gradient(circle, var(--theme-secondary, #F2AEBC) 0%, var(--theme-primary, #6C0820) 65%, transparent 100%)`,
          opacity: 0.3 + progress * 0.5,
          transform: `scale(${0.9 + progress * 0.2})`,
        }}
      />

      <svg
        className="w-full h-full drop-shadow-2xl overflow-visible animate-flower-breathe"
        viewBox="0 0 320 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Drop Shadow for 3D Petal Layering */}
          <filter id="petalShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.28" />
          </filter>

          {/* Deep center shadow */}
          <filter id="centerDiscGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1" stdDeviation="4" floodColor="#F2AEBC" floodOpacity="0.55" />
          </filter>

          {/* Romantic Burgundy/Rose Theme Outer Petals */}
          <linearGradient id="flowerOuterGrad" x1="0" y1="0" x2="0" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2F4" />
            <stop offset="25%" stopColor="var(--theme-secondary, #F2AEBC)" />
            <stop offset="75%" stopColor="var(--theme-primary, #6C0820)" />
            <stop offset="100%" stopColor="#3E0412" />
          </linearGradient>

          {/* Mid Layer */}
          <linearGradient id="flowerMidGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF7F9" />
            <stop offset="35%" stopColor="var(--theme-secondary, #F2AEBC)" />
            <stop offset="85%" stopColor="var(--theme-primary, #6C0820)" />
            <stop offset="100%" stopColor="#4A0516" />
          </linearGradient>

          {/* Inner Layer */}
          <linearGradient id="flowerInnerGrad" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--theme-surface, #F2DCDB)" />
            <stop offset="50%" stopColor="var(--theme-secondary, #F2AEBC)" />
            <stop offset="100%" stopColor="var(--theme-primary, #6C0820)" />
          </linearGradient>

          {/* Velvety Center Disc Eye: Wine Gerbera */}
          <radialGradient id="flowerCenterDisc" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#190206" />
            <stop offset="45%" stopColor="#35050F" />
            <stop offset="75%" stopColor="#6C0820" />
            <stop offset="90%" stopColor="#9E1432" />
            <stop offset="100%" stopColor="#250309" />
          </radialGradient>

          {/* Pollen Ring */}
          <radialGradient id="pollenRingGrad" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#F5D061" />
            <stop offset="85%" stopColor="#E2A62C" />
            <stop offset="100%" stopColor="#6C0820" />
          </radialGradient>

          {/* Calyx green sepals */}
          <linearGradient id="calyxSepalGrad" x1="0" y1="0" x2="0" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#86AF86" />
            <stop offset="50%" stopColor="#466E46" />
            <stop offset="100%" stopColor="#264426" />
          </linearGradient>

          {/* Botanical Stem gradient */}
          <linearGradient id="flowerStemGrad" x1="155" y1="145" x2="165" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6E966E" />
            <stop offset="40%" stopColor="#497049" />
            <stop offset="80%" stopColor="#2F4C2F" />
            <stop offset="100%" stopColor="#1E331E" />
          </linearGradient>

          {/* Leaf Gradients with sunlight sheen */}
          <linearGradient id="leafLeftGrad" x1="120" y1="215" x2="60" y2="295" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8BB28B" />
            <stop offset="45%" stopColor="#557C55" />
            <stop offset="100%" stopColor="#2F4D2F" />
          </linearGradient>
          <linearGradient id="leafRightGrad" x1="200" y1="230" x2="255" y2="310" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#81A881" />
            <stop offset="50%" stopColor="#4A704A" />
            <stop offset="100%" stopColor="#2B462B" />
          </linearGradient>
        </defs>

        {/* 1. BOTANICAL STEM & LEAVES */}
        {showStem && (
          <g className="animate-stem-sway origin-bottom">
            {/* Natural curved stem with organic taper */}
            <path
              d="M160 148 C158 205 163 275 160 345"
              stroke="url(#flowerStemGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Stem sunlight highlight ridge */}
            <path
              d="M158.2 152 C156.4 205 161.2 275 158.2 345"
              stroke="#B4DAB4"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Left Leaf: Lobed Botanical Gerbera Leaf */}
            <g className="transition-transform duration-700" style={{ transform: `scale(${0.9 + progress * 0.1})` }}>
              <path
                d="M159 235 C124 212 85 220 62 245 C75 258 102 254 116 270 C92 278 76 290 68 310 C97 315 130 292 159 265 Z"
                fill="url(#leafLeftGrad)"
                opacity="0.96"
                filter="url(#petalShadow)"
              />
              <path
                d="M159 240 C125 244 98 260 70 305"
                stroke="#C0E5C0"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.65"
              />
              <path d="M125 252 L106 244" stroke="#C0E5C0" strokeWidth="1" opacity="0.45" />
              <path d="M108 268 L88 262" stroke="#C0E5C0" strokeWidth="1" opacity="0.45" />

              {/* Dewdrop on Left Leaf */}
              <circle cx="95" cy="256" r="2.8" fill="#FFFFFF" opacity="0.8" className="animate-dew-sparkle" />
              <circle cx="94" cy="255" r="1" fill="#FFFFFF" />
            </g>

            {/* Right Leaf */}
            <g className="transition-transform duration-700" style={{ transform: `scale(${0.9 + progress * 0.1})` }}>
              <path
                d="M161 245 C192 228 228 234 252 255 C238 268 212 262 200 278 C224 284 242 296 250 316 C220 318 186 294 161 272 Z"
                fill="url(#leafRightGrad)"
                opacity="0.94"
                filter="url(#petalShadow)"
              />
              <path
                d="M161 250 C192 255 218 270 244 308"
                stroke="#C0E5C0"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path d="M195 264 L214 256" stroke="#C0E5C0" strokeWidth="1" opacity="0.4" />
              <path d="M214 280 L232 274" stroke="#C0E5C0" strokeWidth="1" opacity="0.4" />

              {/* Dewdrop on Right Leaf */}
              <circle cx="218" cy="272" r="2.4" fill="#FFFFFF" opacity="0.75" className="animate-dew-sparkle" />
            </g>
          </g>
        )}

        {/* 2. BLOSSOM HEAD GROUP (Centered at X: 160, Y: 142) */}
        <g transform="translate(160, 142)">

          {/* CALYX SEPALS (Phyllaries: Reflex down as flower unfolds) */}
          <g className="flower-calyx">
            {calyxAngles.map((angle) => {
              const sepalScale = 1 - progress * 0.4;
              const sepalY = progress * 15;
              return (
                <g
                  key={`calyx-${angle}`}
                  style={{
                    transformOrigin: '0px 0px',
                    transition: 'all 0.85s cubic-bezier(0.18, 0.89, 0.32, 1.25)',
                    transform: `rotate(${angle}deg) scale(${sepalScale}) translateY(${sepalY}px)`,
                  }}
                >
                  <path
                    d="M-4 -6 C-6 -20 -4.5 -35 0 -42 C4.5 -35 6 -20 4 -6 Z"
                    fill="url(#calyxSepalGrad)"
                    opacity={0.9 - progress * 0.45}
                  />
                </g>
              );
            })}
          </g>

          {/* LAYER 1: 28 OUTER RAY FLORETS (Grand Petals) */}
          <g className="flower-outer-petals" filter="url(#petalShadow)">
            {outerPetalAngles.map((angle, i) => {
              const delay = (i * 0.012).toFixed(3);
              return (
                <g
                  key={`outer-${angle}`}
                  style={{
                    transformOrigin: '0px 0px',
                    transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 0.5s ease`,
                    transform: `rotate(${angle}deg) scale(${outerScale}) translateY(${outerY}px) rotateX(${outerPetalFoldAngle}deg)`,
                  }}
                >
                  <path
                    d="M-6.2 -18 C-8.2 -50 -8.5 -96 0 -110 C8.5 -96 8.2 -50 6.2 -18 C4 -5 -4 -5 -6.2 -18 Z"
                    fill="url(#flowerOuterGrad)"
                    opacity="0.96"
                  />
                  {/* Subtle central vein & reflection */}
                  <path
                    d="M0 -22 L0 -100"
                    stroke="#FFFFFF"
                    strokeWidth="0.85"
                    opacity="0.4"
                    strokeLinecap="round"
                  />
                  {/* Dewdrop on selected outer petals */}
                  {i % 7 === 2 && (
                    <circle cx="-1.5" cy="-75" r="1.8" fill="#FFFFFF" opacity="0.85" className="animate-dew-sparkle" />
                  )}
                </g>
              );
            })}
          </g>

          {/* LAYER 2: 22 MIDDLE PETALS (Interleaved Depth Layer) */}
          <g className="flower-mid-petals" filter="url(#petalShadow)">
            {midPetalAngles.map((angle, i) => {
              const delay = (i * 0.015 + 0.06).toFixed(3);
              return (
                <g
                  key={`mid-${angle}`}
                  style={{
                    transformOrigin: '0px 0px',
                    transition: `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 0.5s ease`,
                    transform: `rotate(${angle}deg) scale(${midScale}) translateY(${midY}px)`,
                  }}
                >
                  <path
                    d="M-5.2 -14 C-7 -40 -6.8 -80 0 -92 C6.8 -80 7 -40 5.2 -14 C3.5 -3 -3.5 -3 -5.2 -14 Z"
                    fill="url(#flowerMidGrad)"
                    opacity="0.98"
                  />
                  <path
                    d="M0 -18 L0 -82"
                    stroke="#FFFDF5"
                    strokeWidth="0.75"
                    opacity="0.45"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </g>

          {/* LAYER 3: 18 INNER TRANS FLORETS (Velvety Collar Surrounding the Center Disc) */}
          <g className="flower-inner-petals">
            {innerPetalAngles.map((angle, i) => {
              const delay = (i * 0.01 + 0.12).toFixed(3);
              return (
                <g
                  key={`inner-${angle}`}
                  style={{
                    transformOrigin: '0px 0px',
                    transition: `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                    transform: `rotate(${angle}deg) scale(${innerScale})`,
                  }}
                >
                  <path
                    d="M-4.2 -10 C-5.5 -26 -5 -50 0 -58 C5 -50 5.5 -26 4.2 -10 C2.8 -2 -2.8 -2 -4.2 -10 Z"
                    fill="url(#flowerInnerGrad)"
                    opacity="0.99"
                  />
                </g>
              );
            })}
          </g>

          {/* LAYER 4: BOTANICAL VELVETY DISC EYE WITH FIBONACCI SPIRALS */}
          <g
            className="flower-center-eye transition-all duration-700"
            filter="url(#centerDiscGlow)"
            style={{
              transform: `scale(${centerScale})`,
              opacity: centerOpacity,
            }}
          >
            {/* Outer Pollen / Stamen Ring - Anchored inside flower center */}
            <g>
              <circle
                cx="0"
                cy="0"
                r="26"
                fill="none"
                stroke="url(#pollenRingGrad)"
                strokeWidth="3.8"
                strokeDasharray="3 3.5"
                opacity={pollenGlowOpacity}
              />
            </g>

            {/* Velvety Disc Cushion */}
            <circle cx="0" cy="0" r="23.5" fill="url(#flowerCenterDisc)" />

            {/* Inner Darkest Core */}
            <circle cx="0" cy="0" r="14.5" fill="#140105" opacity="0.95" />
            <circle cx="0" cy="0" r="7.5" fill="#0B0003" />

            {/* FIBONACCI GOLDEN SPIRAL FLORET SEEDS */}
            {discFlorets.map((floret) => (
              <circle
                key={`floret-${floret.id}`}
                cx={floret.x}
                cy={floret.y}
                r={floret.size}
                fill={
                  floret.id % 4 === 0
                    ? '#F8C8CE'
                    : floret.id % 4 === 1
                    ? '#E2A62C'
                    : floret.id % 4 === 2
                    ? '#9E1432'
                    : '#4A0516'
                }
                opacity={pollenGlowOpacity * (0.65 + (floret.id / 64) * 0.35)}
              />
            ))}

            {/* Golden Anthers Ring - Anchored inside flower center */}
            <g>
              {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg) => (
                <circle
                  key={`anther-${deg}`}
                  cx="0"
                  cy="-20.5"
                  r="1.6"
                  fill="#F5D061"
                  opacity={pollenGlowOpacity}
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>

            {/* Specular Catchlight on the Dewy Disc */}
            <ellipse cx="-4.5" cy="-4.5" rx="3.5" ry="2.5" fill="#FFFFFF" opacity="0.38" transform="rotate(-30 -4.5 -4.5)" />
          </g>

        </g>
      </svg>
    </div>
  );
};
