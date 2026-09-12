import React from 'react';
import { CalendarHeart, Pin, Sparkles } from 'lucide-react';
import { CoupleConfig } from '../types';
import { RoseFlower, DaisyFlower, LavenderFlower, SakuraFlower, TulipFlower, Sunflower } from './FloralIcons';

interface CalendarioEspecialProps {
  coupleConfig: CoupleConfig;
}

export const CalendarioEspecial: React.FC<CalendarioEspecialProps> = ({ coupleConfig }) => {
  // September has 30 days. Sept 1, 2026 is Tuesday (D:30, L:31 of August)
  const daysInSeptember = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <section id="calendario-section" className="relative">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-xl shadow-stone-200/50 border border-[var(--theme-secondary)]/30 overflow-hidden relative">
        
        {/* Botanical Garland Header */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-3.5 opacity-75 pb-2 border-b border-stone-100">
          <DaisyFlower className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <LavenderFlower className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <RoseFlower className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--theme-primary)]" />
          <TulipFlower className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <SakuraFlower className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <Sunflower className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[var(--theme-accent-dark)] font-bold block">
              La Fecha Especial
            </span>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-stone-800 flex items-center gap-1.5">
              Septiembre 2026
              <Sparkles className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
            </h3>
          </div>
          <div
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-xs border"
            style={{
              backgroundColor: 'var(--theme-surface, #F2DCDB)',
              color: 'var(--theme-primary, #6C0820)',
              borderColor: 'var(--theme-secondary, #F2AEBC)',
            }}
          >
            <CalendarHeart className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
            <span>Día 14</span>
          </div>
        </div>

        {/* Days of Week (Sunday to Saturday) */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] sm:text-xs font-semibold text-stone-500 mb-2">
          <span>D</span>
          <span>L</span>
          <span>M</span>
          <span>M</span>
          <span>J</span>
          <span>V</span>
          <span>S</span>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center text-xs">
          {/* Previous month offset days (August 30, 31) */}
          <div className="p-1.5 sm:p-2 text-stone-400 rounded-lg">30</div>
          <div className="p-1.5 sm:p-2 text-stone-400 rounded-lg">31</div>

          {/* Days 1 to 13 */}
          {daysInSeptember.slice(0, 13).map((day) => (
            <div
              key={day}
              className={`p-1.5 sm:p-2 rounded-lg transition ${
                day === 13
                  ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
              title={day === 13 ? 'Desbloqueo de tu canción (4:20 PM)' : undefined}
            >
              {day}
            </div>
          ))}

          {/* SEPTEMBER 14: SPECIAL HIGHLIGHT */}
          <div
            className="relative p-1.5 sm:p-2 font-bold rounded-2xl flex flex-col items-center justify-center shadow-lg ring-2 scale-105 transition-transform"
            style={{
              backgroundColor: 'var(--theme-surface, #F2DCDB)',
              color: 'var(--theme-primary, #6C0820)',
              borderColor: 'var(--theme-primary, #6C0820)',
              borderWidth: '2px',
              borderStyle: 'solid',
            }}
          >
            {/* Animated pulsing heart */}
            <span className="absolute -top-2 -right-1 flex h-4 w-4">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: 'var(--theme-primary, #6C0820)' }}
              />
              <span
                className="relative inline-flex rounded-full h-4 w-4 items-center justify-center text-white text-[8px] font-bold"
                style={{ backgroundColor: 'var(--theme-primary, #6C0820)' }}
              >
                ♥
              </span>
            </span>
            <span className="text-xs sm:text-sm font-bold">14</span>
            <span className="text-[7.5px] sm:text-[8px] tracking-tighter uppercase font-bold">
              Amor
            </span>
          </div>

          {/* Days 15 to 30 */}
          {daysInSeptember.slice(14).map((day) => (
            <div
              key={day}
              className="p-1.5 sm:p-2 text-stone-600 hover:bg-stone-100/60 rounded-lg transition"
            >
              {day}
            </div>
          ))}

          {/* Next month offset days */}
          <div className="p-1.5 sm:p-2 text-stone-400 rounded-lg">1</div>
          <div className="p-1.5 sm:p-2 text-stone-400 rounded-lg">2</div>
          <div className="p-1.5 sm:p-2 text-stone-400 rounded-lg">3</div>
        </div>

        {/* Bottom Callout Banner */}
        <div
          className="mt-4 p-3.5 sm:p-4 rounded-2xl border flex items-center gap-3 shadow-xs"
          style={{
            background: 'linear-gradient(to right, var(--theme-surface, #F2DCDB), #FFFFFF, var(--theme-surface, #F2DCDB))',
            borderColor: 'var(--theme-secondary, #F2AEBC)',
          }}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[var(--theme-primary)] shrink-0 border border-stone-100">
            <Pin className="w-4 h-4 animate-bounce" style={{ animationDuration: '2.5s' }} />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-serif font-bold text-stone-800">
              14 de Septiembre, 2026: Nuestro Día
            </p>
            <p className="text-[11px] text-stone-600 mt-0.5">
              Un momento especial reservado exclusivamente para abrazarnos, estar juntitos y disfrutarnos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
