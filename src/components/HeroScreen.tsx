import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Palette } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GerberaDaisy } from './GerberaDaisy';
import { SakuraFlower, RoseFlower, DaisyFlower, LavenderFlower } from './FloralIcons';
import { CoupleConfig } from '../types';

interface HeroScreenProps {
  coupleConfig?: CoupleConfig;
  onOpenStory: () => void;
  onOpenColorPalette?: () => void;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({
  coupleConfig,
  onOpenStory,
  onOpenColorPalette,
}) => {
  // Automatic gentle entrance bloom from bud to full blossom
  const [bloomProgress, setBloomProgress] = useState(0.2);
  const [isOpeningCinematic, setIsOpeningCinematic] = useState(false);

  useEffect(() => {
    // Smooth automatic bloom
    const timer = setTimeout(() => {
      setBloomProgress(1.0);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Touch flower to trigger soft sparkle effect
  const handleFlowerTap = () => {
    confetti({
      particleCount: 28,
      spread: 55,
      origin: { y: 0.45 },
      colors: ['#6C0820', '#F2AEBC', '#F2DCDB', '#5A86CB', '#D4AF37'],
    });
  };

  // Grand cinematic opening when user opens story
  const handleGrandOpening = () => {
    setIsOpeningCinematic(true);
    setBloomProgress(1.0);

    // Grand confetti explosion
    confetti({
      particleCount: 90,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#6C0820', '#F2AEBC', '#5A86CB', '#3D5D91', '#D4AF37', '#FFFFFF'],
    });

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate?.([30, 40, 30, 50, 60]);
      } catch {
        // Fallback
      }
    }

    setTimeout(() => {
      onOpenStory();
    }, 600);
  };

  return (
    <div
      id="hero-entry-container"
      className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-b from-[#FFFDFC] via-[#FAF4F4] to-[#F5ECEE] select-none overflow-y-auto sm:overflow-hidden min-h-[100dvh] h-[100dvh] pb-safe pt-safe transition-all duration-700 ease-out touch-manipulation"
    >
      {/* Decorative Botanical Corners */}
      <div className="absolute top-2 left-2 opacity-25 pointer-events-none">
        <SakuraFlower className="w-9 h-9 text-[var(--theme-primary)]" />
      </div>
      <div className="absolute top-2 right-2 opacity-25 pointer-events-none">
        <RoseFlower className="w-9 h-9 text-[var(--theme-primary)]" />
      </div>

      {/* Floating Gentle Petals in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <div className="absolute top-12 left-[12%] animate-float-gentle text-rose-300">
          <DaisyFlower className="w-6 h-6" />
        </div>
        <div className="absolute top-28 right-[10%] animate-float-gentle text-pink-300" style={{ animationDelay: '1.8s' }}>
          <LavenderFlower className="w-5 h-5" />
        </div>
      </div>

      {/* 1. TOP STATUS & CONTROLS BAR */}
      <header className="relative pt-1 w-full max-w-sm mx-auto flex items-center justify-between z-20 px-1 shrink-0">
        <div
          id="hero-badge"
          className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[11px] tracking-wider uppercase rounded-full font-semibold border shadow-xs backdrop-blur-md"
          style={{
            backgroundColor: 'var(--theme-surface, #F2DCDB)',
            color: 'var(--theme-primary, #6C0820)',
            borderColor: 'var(--theme-secondary, #F2AEBC)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>{coupleConfig?.initials || 'A&G'} • {coupleConfig?.anniversaryDisplay || '14 de Septiembre, 2026'}</span>
        </div>

        {onOpenColorPalette && (
          <button
            onClick={onOpenColorPalette}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-stone-700 hover:text-[var(--theme-primary)] text-xs font-semibold border border-stone-200 shadow-xs hover:shadow-sm active:scale-95 transition cursor-pointer touch-manipulation"
            title="Personalizar paleta de colores"
          >
            <Palette className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            <span className="font-medium">Paleta</span>
          </button>
        )}
      </header>

      {/* 2. CENTER STAGE: HIGH-FIDELITY BOTANICAL GERBERA (Automatic Blooming) */}
      <main
        id="hero-flower-wrapper"
        className="relative flex-1 flex flex-col items-center justify-center my-auto z-10 w-full max-w-sm mx-auto py-2"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-700 ${
            isOpeningCinematic ? 'scale-110 rotate-2' : 'hover:scale-105 active:scale-95'
          }`}
        >
          <GerberaDaisy
            bloomProgress={bloomProgress}
            onTap={handleFlowerTap}
            className="w-60 h-60 xs:w-68 xs:h-68 sm:w-76 sm:h-76"
          />
        </div>
      </main>

      {/* 3. BOTTOM CALL-TO-ACTION SECTION */}
      <footer className="relative w-full max-w-sm mx-auto pb-4 pt-1 flex flex-col items-center text-center z-20 shrink-0">
        {/* Text above the button: "Una Gerbera..." */}
        <p
          id="hero-title"
          className="font-serif text-2xl sm:text-[28px] font-bold text-stone-800 mb-3 tracking-tight"
        >
          Una Gerbera...
        </p>

        {/* Big Touch Target Button: "Para nuestra cita ->" */}
        <button
          id="hero-open-story-btn"
          onClick={handleGrandOpening}
          className="group relative w-full overflow-hidden rounded-full py-3.5 px-6 text-white font-semibold shadow-lg hover:shadow-xl active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer touch-manipulation min-h-[48px]"
          style={{
            background: 'linear-gradient(135deg, var(--theme-primary, #6C0820) 0%, var(--theme-accent-dark, #3D5D91) 100%)',
          }}
        >
          <span className="relative z-10 text-sm sm:text-[15px] tracking-wide font-medium">
            Para nuestra cita -&gt;
          </span>
          <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </button>
      </footer>
    </div>
  );
};
