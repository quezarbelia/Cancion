import React, { useState, useEffect } from 'react';
import {
  defaultCoupleConfig,
  defaultMemories,
  defaultChecklist,
  defaultClues,
} from './data/storyData';
import { CoupleConfig, Memory, ChecklistItem, ThemePalette } from './types';
import { romanticAudio } from './utils/audioSynth';
import { defaultTheme, applyThemeToDocument } from './utils/theme';
import { HeroScreen } from './components/HeroScreen';
import { HeaderNav } from './components/HeaderNav';
import { CartaDigital } from './components/CartaDigital';
import { CalendarioEspecial } from './components/CalendarioEspecial';
import { CoordenadasCita } from './components/CoordenadasCita';
import { CancionEspecial } from './components/CancionEspecial';
import { MemoryModal } from './components/MemoryModal';
import { PersonalizeModal } from './components/PersonalizeModal';
import { ColorPaletteModal } from './components/ColorPaletteModal';
import { FloatingPetals } from './components/FloatingPetals';
import { FloralDivider } from './components/FloralIcons';

export default function App() {
  const [showHero, setShowHero] = useState(true);
  
  // 1. Color Palette state with default user palette (#6C0820, #F2AEBC, #F2DCDB, #5A86CB, #3D5D91)
  const [themePalette, setThemePalette] = useState<ThemePalette>(() => {
    const saved = localStorage.getItem('nuestra_historia_theme');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultTheme;
      }
    }
    return defaultTheme;
  });

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  // Apply theme to document element immediately
  useEffect(() => {
    applyThemeToDocument(themePalette);
  }, [themePalette]);

  const [coupleConfig, setCoupleConfig] = useState<CoupleConfig>(() => {
    const saved = localStorage.getItem('nuestra_historia_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultCoupleConfig,
          ...parsed,
          initials: 'A&G',
          songTitle: 'Una Gerbera...',
          unlockTargetDate: '2026-09-13T16:20:00',
          anniversaryDate: '2026-09-14',
          anniversaryDisplay: '14 de Septiembre, 2026',
          songUrl: 'https://drive.google.com/file/d/1c--0dxkPz4XxsdUeb9pNEqv3BlWftoIM/view?usp=sharing',
          songCoverUrl: '/cover-una-gerbera.jpg',
          songAudioSrc: '/una-gerbera.mp3',
        };
      } catch {
        return defaultCoupleConfig;
      }
    }
    return defaultCoupleConfig;
  });

  const [memories] = useState<Memory[]>(defaultMemories);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist);
  const [clues] = useState(defaultClues);
  const [activeTab, setActiveTab] = useState<'all' | 'carta' | 'calendario' | 'cita' | 'musica'>('all');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    romanticAudio.setPlayStateListener((playing) => {
      setIsAudioPlaying(playing);
    });
  }, []);

  const handleToggleAudio = () => {
    romanticAudio.toggle();
  };

  const handleOpenStory = () => {
    setShowHero(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleChecklist = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSaveConfig = (newConfig: CoupleConfig) => {
    setCoupleConfig(newConfig);
    localStorage.setItem('nuestra_historia_config', JSON.stringify(newConfig));
  };

  const handleSaveTheme = (newTheme: ThemePalette) => {
    setThemePalette(newTheme);
    applyThemeToDocument(newTheme);
    localStorage.setItem('nuestra_historia_theme', JSON.stringify(newTheme));
  };

  return (
    <div
      className="min-h-screen font-sans antialiased relative transition-colors duration-500"
      style={{
        backgroundColor: 'var(--theme-bg, #FAF4F4)',
        color: 'var(--theme-text, #2A181C)',
      }}
    >
      {/* Dynamic Floating Flower Petals throughout the app - Always active across entire page */}
      <FloatingPetals enabled={true} count={28} />

      {/* 1. HERO ENTRY SCREEN WITH REALISTIC GERBERA DAISY */}
      {showHero && (
        <HeroScreen
          coupleConfig={coupleConfig}
          onOpenStory={handleOpenStory}
          onOpenColorPalette={() => setIsPaletteOpen(true)}
        />
      )}

      {/* 2. MAIN STORYLINE APP & CHAPTER SCREENS */}
      <div
        className={`transition-opacity duration-700 ${
          showHero ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Persistent Floating Navigation with Floral and Palette controls */}
        <HeaderNav
          coupleConfig={coupleConfig}
          onBackToHero={() => {
            setShowHero(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenColorPalette={() => setIsPaletteOpen(true)}
          petalsEnabled={true}
          onTogglePetals={() => {}}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Content Container with Safe Area Padding */}
        <main className="max-w-md mx-auto px-3.5 sm:px-4 pt-4 sm:pt-6 pb-28 pb-safe space-y-8 sm:space-y-10 relative z-20">
          <div key={activeTab} className="animate-fade-in-slide space-y-8 sm:space-y-10">
            {/* Chapter 1: Carta Digital y Recuerdos Polaroid con Flores */}
            {(activeTab === 'all' || activeTab === 'carta') && (
              <CartaDigital
                coupleConfig={coupleConfig}
                memories={memories}
                onSelectMemory={(mem) => setSelectedMemory(mem)}
              />
            )}

            {/* Chapter 2: Calendario Especial con Guirnalda Botánica */}
            {(activeTab === 'all' || activeTab === 'calendario') && (
              <CalendarioEspecial coupleConfig={coupleConfig} />
            )}

            {/* Chapter 3: Coordenadas de la Cita con Pistas Florales y Paleta Vestimenta */}
            {(activeTab === 'all' || activeTab === 'cita') && (
              <CoordenadasCita
                checklist={checklist}
                clues={clues}
                onToggleChecklist={handleToggleChecklist}
              />
            )}

            {/* Chapter 4: Canción Especial con Bloqueo Temporal y Girasoles */}
            {(activeTab === 'all' || activeTab === 'musica') && (
              <CancionEspecial
                coupleConfig={coupleConfig}
                isAudioPlaying={isAudioPlaying}
                onToggleAudio={handleToggleAudio}
              />
            )}
          </div>

          {/* App Footer */}
          <footer className="text-center pt-6 pb-4 space-y-2 border-t border-[var(--theme-secondary)]/20 text-stone-500">
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-12 bg-[var(--theme-secondary)]/40" />
              <p className="font-script text-2xl sm:text-3xl text-[var(--theme-primary)]">
                Gracias por caminar a mi lado
              </p>
              <div className="h-[1px] w-12 bg-[var(--theme-secondary)]/40" />
            </div>
            <p className="text-xs text-stone-500 font-medium tracking-wide">
              14 de septiembre de 2026
            </p>
          </footer>
        </main>
      </div>

      {/* 3. MODALS */}
      <MemoryModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />

      <PersonalizeModal
        config={coupleConfig}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveConfig}
      />

      <ColorPaletteModal
        currentTheme={themePalette}
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onSaveTheme={handleSaveTheme}
      />
    </div>
  );
}
