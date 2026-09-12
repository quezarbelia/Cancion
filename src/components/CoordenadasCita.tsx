import React, { useState } from 'react';
import {
  Compass,
  Wine,
  Sparkles,
  MapPin,
  CheckSquare,
  HelpCircle,
  Gift,
  Heart,
  Navigation,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChecklistItem, MysteryClue } from '../types';
import {
  RoseFlower,
  SakuraFlower,
  LavenderFlower,
  TulipFlower,
  OrchidFlower,
  Sunflower,
  DaisyFlower,
  LilyFlower,
} from './FloralIcons';

interface CoordenadasCitaProps {
  checklist: ChecklistItem[];
  clues: MysteryClue[];
  onToggleChecklist: (id: string) => void;
}

export const CoordenadasCita: React.FC<CoordenadasCitaProps> = ({
  checklist,
  clues,
  onToggleChecklist,
}) => {
  const [flippedClues, setFlippedClues] = useState<Record<string, boolean>>({});
  const [selectedColorName, setSelectedColorName] = useState<string | null>(null);
  const [mapAlert, setMapAlert] = useState<string | null>(null);

  const toggleFlip = (id: string) => {
    setFlippedClues((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = checklist.filter((item) => item.checked).length;

  const handleCheckboxClick = (id: string) => {
    onToggleChecklist(id);
    const item = checklist.find((c) => c.id === id);
    if (!item?.checked && completedCount + 1 === checklist.length) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6C0820', '#F2AEBC', '#5A86CB', '#D4AF37'],
      });
    }
  };

  // Harmonized with the user's custom palette: #6C0820, #F2AEBC, #F2DCDB, #5A86CB, #3D5D91
  const colorPalettes = [
    { name: 'Vino Borgoña', hex: '#6C0820', desc: 'Profundidad, pasión y romance elegante' },
    { name: 'Rosa Seda', hex: '#F2AEBC', desc: 'Ternura floral y delicadeza sedosa' },
    { name: 'Marfil / Crema', hex: '#F2DCDB', desc: 'Luminosidad cálida e íntima' },
    { name: 'Azul Océano', hex: '#5A86CB', desc: 'Serenidad sofisticada de atardecer' },
    { name: 'Azul Noche', hex: '#3D5D91', desc: 'Elegancia clásica e impecable para la velada' },
  ];

  return (
    <section id="coordenadas-section" className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--theme-primary)] font-bold block">
            Todo Listo Para Nosotros
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 flex items-center gap-2">
            Coordenadas de la Cita
            <OrchidFlower className="w-5 h-5 text-[var(--theme-primary)]" />
          </h3>
        </div>
        <span className="w-8 h-8 rounded-full bg-[var(--theme-surface)] flex items-center justify-center text-[var(--theme-primary)] border border-[var(--theme-secondary)]/30 shadow-xs">
          <Compass className="w-4 h-4" />
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        
        {/* Card 1: Ocasión */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-md shadow-stone-200/50 border border-stone-200/80 flex items-start gap-3.5 hover:shadow-lg transition-shadow relative overflow-hidden">
          <div className="w-11 h-11 rounded-2xl bg-[var(--theme-surface)] flex items-center justify-center text-[var(--theme-primary)] shrink-0 border border-[var(--theme-secondary)]/30">
            <Wine className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] uppercase font-bold text-[var(--theme-primary)] tracking-wider block">
              Ocasión
            </span>
            <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base">
              Momento Especial a Solas
            </h4>
            <p className="text-xs sm:text-[13px] text-stone-600 mt-1 leading-relaxed">
              Un momento de intimidad donde podremos estar solitos para disfrutar del otro, descansar abrazaditos y poder sentir nuestra piel.
            </p>
          </div>
          <div className="absolute -bottom-2 -right-2 opacity-15 pointer-events-none">
            <RoseFlower className="w-16 h-16 text-[var(--theme-primary)]" />
          </div>
        </div>

        {/* Card 2: Estilo de Vestimenta */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-md shadow-stone-200/50 border border-stone-200/80 flex items-start gap-3.5 hover:shadow-lg transition-shadow">
          <div className="w-11 h-11 rounded-2xl bg-[var(--theme-surface)] flex items-center justify-center text-[var(--theme-primary)] shrink-0 border border-[var(--theme-secondary)]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[var(--theme-accent-dark)] tracking-wider block">
                Estilo de Vestimenta
              </span>
              <span className="text-[10px] uppercase font-bold text-[var(--theme-primary)] bg-[var(--theme-surface)] px-2 py-0.5 rounded-full border border-[var(--theme-secondary)]/30">
                Opcional
              </span>
            </div>
            <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base mt-0.5">
              Algo sencillo, bonito y cómodo
            </h4>
            <p className="text-xs sm:text-[13px] text-stone-600 mt-1 leading-relaxed">
              Vente con lo que más te guste y te haga sentir libre y cómoda para abrazarnos.
            </p>
          </div>
        </div>

        {/* Card 3: Lugar Secreto & Mapa Estilizado */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-md shadow-stone-200/50 border border-stone-200/80 space-y-3.5 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-800 shrink-0 border border-amber-200">
              <MapPin className="w-5 h-5 text-amber-700" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                Lugar Secreto
              </span>
              <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base">
                Nuestro Rincón Favorito
              </h4>
              <p className="text-xs sm:text-[13px] text-stone-600 mt-1 leading-relaxed">
                Nuestro lugar secreto y favorito para pasar tiempo a solas y disfrutarnos.
              </p>
            </div>
          </div>

          {/* Stylized Map View */}
          <div className="w-full h-32 rounded-2xl bg-gradient-to-br from-stone-100 to-stone-200 border border-stone-200 relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#8FA38F_1.5px,transparent_1.5px)] [background-size:18px_18px]" />
            
            {/* Pulsing ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-24 h-24 rounded-full animate-ping opacity-35"
                style={{ backgroundColor: 'var(--theme-secondary, #F2AEBC)' }}
              />
            </div>

            {/* Center Destination Badge */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div
                className="w-9 h-9 rounded-full text-white flex items-center justify-center shadow-lg border-2 border-white"
                style={{ backgroundColor: 'var(--theme-primary, #6C0820)' }}
              >
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-stone-800 mt-2 bg-white/95 px-3 py-1 rounded-full shadow-xs">
                Nuestro lugar
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Interactive Checklist */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-md shadow-stone-200/50 border border-stone-200/80 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[var(--theme-surface)] flex items-center justify-center text-[var(--theme-primary)]">
                <CheckSquare className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base">
                Cosas Necesarias
              </h4>
            </div>
            <span
              id="checklist-badge"
              className={`text-xs px-2.5 py-1 rounded-full font-bold transition-colors ${
                completedCount === checklist.length
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-[var(--theme-surface)] text-[var(--theme-primary)]'
              }`}
            >
              {completedCount} / {checklist.length} listas
            </span>
          </div>

          <div className="space-y-2">
            {checklist.map((item, idx) => {
              const renderFlower = () => {
                switch (idx % 5) {
                  case 0:
                    return <OrchidFlower className="w-4 h-4" />;
                  case 1:
                    return <LavenderFlower className="w-4 h-4" />;
                  case 2:
                    return <Sunflower className="w-4 h-4" />;
                  case 3:
                    return <RoseFlower className="w-4 h-4" />;
                  default:
                    return <SakuraFlower className="w-4 h-4" />;
                }
              };

              return (
                <label
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition cursor-pointer ${
                    item.checked
                      ? 'bg-[var(--theme-surface)]/40 border-[var(--theme-secondary)]/40 text-stone-800'
                      : 'bg-stone-50/70 border-stone-200/70 text-stone-600 hover:bg-stone-100/60'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheckboxClick(item.id)}
                    className="w-4 h-4 rounded accent-[var(--theme-primary)] focus:ring-0 cursor-pointer"
                  />
                  <span className={`flex-1 text-xs sm:text-[13px] ${item.checked ? 'line-through opacity-70' : ''}`}>
                    {item.text}
                  </span>
                  {renderFlower()}
                </label>
              );
            })}
          </div>
        </div>

        {/* Card 5: Pistas Misteriosas (3D Flip Cards) with Flower Emblems */}
        <div className="bg-[#FDFBF7] rounded-3xl p-4 sm:p-5 shadow-md shadow-stone-200/50 border border-[#EDE4DA] space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[var(--theme-surface)] flex items-center justify-center text-[var(--theme-primary)]">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base">
                Pistas Misteriosas
              </h4>
            </div>
            <span className="text-[11px] text-[var(--theme-primary)] font-medium">Toca para voltear</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
            {clues.map((clue, idx) => {
              const isFlipped = flippedClues[clue.id];
              return (
                <div
                  key={clue.id}
                  onClick={() => toggleFlip(clue.id)}
                  className="h-36 perspective-1000 cursor-pointer group touch-manipulation"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform rounded-2xl shadow-xs ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front View */}
                    <div className="absolute inset-0 bg-white border border-[var(--theme-secondary)]/40 rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-center backface-hidden shadow-xs group-hover:border-[var(--theme-primary)] transition">
                      <span className="text-[11.5px] sm:text-xs font-serif font-bold text-stone-800">
                        Pista #{clue.clueNumber}
                      </span>
                      <div className="my-1">
                        {idx % 2 === 0 ? (
                          <DaisyFlower className="w-5 h-5" />
                        ) : (
                          <LilyFlower className="w-5 h-5" />
                        )}
                      </div>
                      <span className="text-[10.5px] sm:text-[11px] text-stone-600 font-medium line-clamp-2">
                        {clue.question}
                      </span>
                      <span className="text-[9px] text-[var(--theme-primary)] mt-1 font-semibold">Voltear ↻</span>
                    </div>

                    {/* Back View (Revealed Clue) */}
                    <div
                      className="absolute inset-0 border rounded-2xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden shadow-xs overflow-y-auto no-scrollbar"
                      style={{
                        background: 'linear-gradient(135deg, var(--theme-surface, #F2DCDB) 0%, #FFFFFF 100%)',
                        borderColor: 'var(--theme-secondary, #F2AEBC)',
                      }}
                    >
                      <span
                        className="text-xs font-serif font-bold"
                        style={{ color: 'var(--theme-primary, #6C0820)' }}
                      >
                        {clue.answer}
                      </span>
                      <p className="text-[9.5px] sm:text-[10px] text-stone-600 mt-1 leading-snug">
                        {clue.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
