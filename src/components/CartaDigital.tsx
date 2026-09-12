import React from 'react';
import { Camera, Infinity, Sparkles, Heart } from 'lucide-react';
import { Memory, CoupleConfig } from '../types';
import { RoseFlower, SakuraFlower, OrchidFlower, TulipFlower, FloralDivider, Sunflower } from './FloralIcons';

interface CartaDigitalProps {
  coupleConfig: CoupleConfig;
  memories: Memory[];
  onSelectMemory: (mem: Memory) => void;
}

export const CartaDigital: React.FC<CartaDigitalProps> = ({
  coupleConfig,
  memories,
  onSelectMemory,
}) => {
  return (
    <section id="carta-section" className="space-y-6">
      {/* Parchment Love Letter Card with Floral Watermarks */}
      <div className="relative bg-[#FDFBF7] rounded-3xl p-5 sm:p-7 shadow-xl shadow-stone-200/60 border border-[#EDE4DA] overflow-hidden">
        {/* Paper Corner Floral Accents */}
        <div className="absolute top-2 right-2 opacity-25 pointer-events-none">
          <RoseFlower className="w-14 h-14 sm:w-16 sm:h-16 text-[var(--theme-primary)]" />
        </div>
        <div className="absolute bottom-2 left-2 opacity-20 pointer-events-none">
          <OrchidFlower className="w-14 h-14 sm:w-16 sm:h-16 text-[var(--theme-secondary)]" />
        </div>

        {/* Wax Seal Header */}
        <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-[var(--theme-secondary)]/30">
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full text-white flex items-center justify-center shadow-md border-2 border-white shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--theme-primary, #6C0820) 0%, var(--theme-accent-dark, #3D5D91) 100%)',
            }}
          >
            <span className="font-script text-xl pt-0.5 tracking-wider">{coupleConfig.initials}</span>
          </div>
          <div>
            <p className="text-[10.5px] uppercase tracking-widest text-[var(--theme-primary)] font-bold">
              De mi corazón para ti
            </p>
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-stone-800 leading-tight">
              Para el amor de mi vida
            </h2>
          </div>
        </div>

        {/* Digital Letter Body */}
        <div className="space-y-3.5 text-stone-700 font-sans text-xs sm:text-[14.5px] leading-relaxed">
          <p className="first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-serif first-letter:float-left first-letter:mr-2 first-letter:leading-none text-stone-700" style={{ color: 'var(--theme-text)' }}>
            Si tuviera que volver a escribir cada segundo desde que cruzamos miradas, elegiría exactamente el mismo camino. Encontrarte ha sido el regalo más sincero y la aventura más hermosa que jamás soñé.
          </p>
          <p>
            Gracias por ser mi paz en los días grises, por tus risas contagiosas que iluminan cualquier rincón y por convertir cada momento ordinario en una memoria digna de atesorar para siempre. Hoy no solo celebramos una fecha en el calendario; celebramos la manera tan mágica en que construimos un hogar en los brazos del otro.
          </p>
          
          <blockquote
            className="my-3.5 pl-3.5 border-l-3 italic font-serif text-stone-800 py-2.5 pr-3 rounded-r-2xl text-xs sm:text-sm shadow-xs"
            style={{
              borderColor: 'var(--theme-primary, #6C0820)',
              backgroundColor: 'var(--theme-surface, #F2DCDB)',
            }}
          >
            "No te amo por cómo eres cuando estás frente a mí, sino por cómo soy yo cuando estoy a tu lado: más libre, más feliz y más en paz."
          </blockquote>
          
          <p>
            Esta velada es solo una pequeña muestra de todo lo que mereces hoy y siempre. Relájate, disfruta de cada sorpresa y acompáñame a escribir un capítulo inolvidable más de nuestra historia.
          </p>
        </div>

        {/* Floral Divider */}
        <FloralDivider className="my-4" />

        {/* Sign-off with Infinity Seal */}
        <div className="pt-1 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-600 font-medium">Siempre tuyo(a),</span>
            <p className="font-script text-2xl text-[var(--theme-primary)]">Con amor infinito</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[var(--theme-surface)] flex items-center justify-center text-[var(--theme-primary)] border border-[var(--theme-secondary)]/40 shadow-xs">
            <Infinity className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Polaroid Memories Section with Diverse Floral Badges */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-3.5 px-1">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[var(--theme-primary)] font-bold block">
              Álbum de Momentos
            </span>
            <h3 className="font-serif font-bold text-base sm:text-lg text-stone-800 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[var(--theme-primary)]" />
              Nuestros Recuerdos Favoritos
            </h3>
          </div>
          <span className="text-[10.5px] text-[var(--theme-primary)] bg-[var(--theme-surface)] px-2.5 py-1 rounded-full font-medium border border-[var(--theme-secondary)]/30">
            Toca para ampliar
          </span>
        </div>

        {/* Polaroid Grid with flower types */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {memories.map((memory, idx) => (
            <div
              key={memory.id}
              onClick={() => onSelectMemory(memory)}
              className={`group bg-white p-2 pb-3.5 sm:p-2.5 sm:pb-4 rounded-2xl shadow-md shadow-stone-200/80 border border-stone-200/90 ${memory.rotation} hover:rotate-0 hover:scale-[1.03] transition-all duration-300 cursor-pointer relative overflow-hidden touch-manipulation`}
            >
              {/* Botanical badge in top corner */}
              <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs border border-stone-200">
                {idx % 4 === 0 && <RoseFlower className="w-3.5 h-3.5" />}
                {idx % 4 === 1 && <TulipFlower className="w-3.5 h-3.5" />}
                {idx % 4 === 2 && <SakuraFlower className="w-3.5 h-3.5" />}
                {idx % 4 === 3 && <Sunflower className="w-3.5 h-3.5" />}
              </div>

              <div className="w-full aspect-[4/5] rounded-xl bg-stone-100 overflow-hidden relative flex items-center justify-center">
                {memory.imageUrl ? (
                  <img
                    src={memory.imageUrl}
                    alt={memory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-tr ${memory.colorGradient} flex items-center justify-center text-white`}>
                    <Heart className="w-7 h-7 opacity-85" />
                  </div>
                )}
                
                {/* Date stamp pill */}
                <span className="absolute bottom-2 right-2 text-[9px] bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-mono">
                  {memory.date}
                </span>
              </div>
              <p className="font-script text-base sm:text-lg text-stone-800 text-center mt-2 px-1 truncate">
                {memory.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
