import React from 'react';
import { Heart, Palette, Sparkles } from 'lucide-react';
import { CoupleConfig } from '../types';
import { RoseFlower, SakuraFlower } from './FloralIcons';

interface HeaderNavProps {
  coupleConfig: CoupleConfig;
  onBackToHero: () => void;
  onOpenColorPalette: () => void;
  petalsEnabled?: boolean;
  onTogglePetals: () => void;
  activeTab: 'all' | 'carta' | 'calendario' | 'cita' | 'musica';
  setActiveTab: (tab: 'all' | 'carta' | 'calendario' | 'cita' | 'musica') => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  coupleConfig,
  onBackToHero,
  onOpenColorPalette,
  petalsEnabled = true,
  onTogglePetals,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--theme-bg)]/92 border-b border-[var(--theme-secondary)]/20 px-3.5 sm:px-4 py-2.5 pt-safe transition-all shadow-xs">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        
        {/* Left: Gerbera Return Shortcut & Anniversary Info */}
        <div className="flex items-center gap-2">
          <button
            id="nav-hero-shortcut"
            onClick={onBackToHero}
            className="w-9 h-9 rounded-full bg-[var(--theme-surface)] flex items-center justify-center border border-[var(--theme-secondary)]/30 text-[var(--theme-primary)] shadow-xs hover:scale-105 active:scale-95 transition cursor-pointer touch-manipulation"
            title="Volver a la flor"
          >
            <RoseFlower className="w-5 h-5 text-[var(--theme-primary)]" />
          </button>
          <div className="leading-tight">
            <span className="font-serif text-xs sm:text-sm font-bold text-stone-800 tracking-tight block">
              {coupleConfig.anniversaryDisplay}
            </span>
            <span className="text-[9.5px] sm:text-[10px] text-[var(--theme-primary)] uppercase tracking-widest block font-bold">
              Nuestro Aniversario
            </span>
          </div>
        </div>

        {/* Right: Palette, Petals, Sound & Settings Controls */}
        <div className="flex items-center gap-1.5">
          
          {/* Color Palette Button */}
          <button
            id="nav-palette-btn"
            onClick={onOpenColorPalette}
            className="w-8 h-8 rounded-full bg-white/95 border border-stone-200 text-stone-700 hover:text-[var(--theme-primary)] flex items-center justify-center transition shadow-xs active:scale-90 cursor-pointer touch-manipulation"
            title="Personalizar Paleta de Colores"
          >
            <Palette className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
          </button>

          {/* Falling Petals Toggle Button */}
          <button
            id="nav-petals-btn"
            onClick={onTogglePetals}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition shadow-xs active:scale-90 cursor-pointer touch-manipulation ${
              petalsEnabled
                ? 'bg-[var(--theme-surface)] border-[var(--theme-secondary)]/50 text-[var(--theme-primary)]'
                : 'bg-white/85 border-stone-200 text-stone-400 hover:text-stone-700'
            }`}
            title={petalsEnabled ? 'Pétalos flotantes activos' : 'Activar lluvia de pétalos'}
          >
            <Sparkles className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

      {/* Screen / Chapter Tabs with no-scrollbar and snap */}
      <div className="max-w-md mx-auto mt-2 flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-[11px] snap-x touch-manipulation">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer snap-start touch-manipulation ${
            activeTab === 'all'
              ? 'text-white font-semibold shadow-xs'
              : 'bg-white/80 text-stone-600 hover:bg-stone-100'
          }`}
          style={activeTab === 'all' ? { backgroundColor: 'var(--theme-accent-dark, #3D5D91)' } : {}}
        >
          Todo
        </button>
        <button
          onClick={() => setActiveTab('carta')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer snap-start touch-manipulation ${
            activeTab === 'carta'
              ? 'text-white font-semibold shadow-xs'
              : 'bg-white/80 text-stone-600 hover:bg-stone-100'
          }`}
          style={activeTab === 'carta' ? { backgroundColor: 'var(--theme-primary, #6C0820)' } : {}}
        >
          Carta & Fotos
        </button>
        <button
          onClick={() => setActiveTab('calendario')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer snap-start touch-manipulation ${
            activeTab === 'calendario'
              ? 'text-white font-semibold shadow-xs'
              : 'bg-white/80 text-stone-600 hover:bg-stone-100'
          }`}
          style={activeTab === 'calendario' ? { backgroundColor: 'var(--theme-primary, #6C0820)' } : {}}
        >
          Calendario
        </button>
        <button
          onClick={() => setActiveTab('cita')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer snap-start touch-manipulation ${
            activeTab === 'cita'
              ? 'text-white font-semibold shadow-xs'
              : 'bg-white/80 text-stone-600 hover:bg-stone-100'
          }`}
          style={activeTab === 'cita' ? { backgroundColor: 'var(--theme-primary, #6C0820)' } : {}}
        >
          Coordenadas
        </button>
        <button
          onClick={() => setActiveTab('musica')}
          className={`px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer snap-start touch-manipulation ${
            activeTab === 'musica'
              ? 'text-white font-semibold shadow-xs'
              : 'bg-white/80 text-stone-600 hover:bg-stone-100'
          }`}
          style={activeTab === 'musica' ? { backgroundColor: 'var(--theme-primary, #6C0820)' } : {}}
        >
          Canción
        </button>
      </div>
    </header>
  );
};
