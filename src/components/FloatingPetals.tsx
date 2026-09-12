import React, { useMemo } from 'react';

interface FloatingPetalsProps {
  count?: number;
  enabled?: boolean;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  count = 26,
  enabled = true,
}) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Stagger delays so petals are already mid-flight on first render
      const initialDelay = -((i * 1.8) % 12);
      return {
        id: i,
        left: `${(i * 13.7) % 96 + 2}%`,
        animationDuration: `${7 + (i % 7) * 1.8}s`,
        animationDelay: `${initialDelay}s`,
        size: 14 + (i % 6) * 3.5,
        rotation: `${(i * 47) % 360}deg`,
        petalType: i % 4, // 0: Rose, 1: Sakura, 2: Gerbera, 3: Soft Wine Rose
        opacity: 0.55 + (i % 5) * 0.1,
      };
    });
  }, [count]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[60] select-none">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute -top-10 animate-floatPetal"
          style={{
            left: p.left,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity,
          }}
        >
          {p.petalType === 0 && (
            // Curved Rose Petal
            <svg
              width={p.size}
              height={p.size * 1.3}
              viewBox="0 0 30 40"
              fill="none"
              style={{ transform: `rotate(${p.rotation})` }}
            >
              <path
                d="M15 0 C25 8 30 22 25 35 C15 42 5 35 3 24 C0 10 8 2 15 0 Z"
                fill="var(--theme-primary, #6C0820)"
                opacity="0.8"
              />
              <path
                d="M15 4 C21 12 25 24 20 32"
                stroke="var(--theme-secondary, #F2AEBC)"
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
          )}

          {p.petalType === 1 && (
            // Sakura Petal
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 32 32"
              fill="none"
              style={{ transform: `rotate(${p.rotation})` }}
            >
              <path
                d="M16 2 C22 10 28 14 26 24 C24 30 18 30 16 27 C14 30 8 30 6 24 C4 14 10 10 16 2 Z"
                fill="var(--theme-secondary, #F2AEBC)"
                opacity="0.75"
              />
            </svg>
          )}

          {p.petalType === 2 && (
            // Gerbera Ray Florette Petal
            <svg
              width={p.size * 0.7}
              height={p.size * 1.6}
              viewBox="0 0 16 40"
              fill="none"
              style={{ transform: `rotate(${p.rotation})` }}
            >
              <path
                d="M8 0 C14 10 15 30 8 40 C1 30 2 10 8 0 Z"
                fill="var(--theme-surface, #F2DCDB)"
                stroke="var(--theme-primary, #6C0820)"
                strokeWidth="0.8"
                opacity="0.8"
              />
            </svg>
          )}

          {p.petalType === 3 && (
            // Velvet Rose Petal
            <svg
              width={p.size * 0.9}
              height={p.size * 1.25}
              viewBox="0 0 24 32"
              fill="none"
              style={{ transform: `rotate(${p.rotation})` }}
            >
              <path
                d="M12 0 C19 6 24 18 20 28 C15 33 9 32 4 28 C0 18 5 6 12 0 Z"
                fill="var(--theme-secondary, #F2AEBC)"
                opacity="0.8"
              />
              <path
                d="M12 4 C16 11 18 20 15 26"
                stroke="var(--theme-primary, #6C0820)"
                strokeWidth="0.8"
                opacity="0.4"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
