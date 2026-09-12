import React from 'react';
import { Camera, Infinity, Sparkles, Heart } from 'lucide-react';
import { Memory, CoupleConfig } from '../types';
import { RoseFlower, SakuraFlower, OrchidFlower, TulipFlower, FloralDivider, Sunflower } from './FloralIcons';
import { getOptimizedImageUrl } from '../utils/imageHelper';

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
        {/* Botanical corner embellishments */}
        <div className="absolute top-2 left-2 opacity-15 pointer-events-none">
          <RoseFlower className="w-10 h-10" />
        </div>
        <div className="absolute bottom-2 right-2 opacity-15 pointer-events-none">
          <SakuraFlower className="w-10 h-10" />
        </div>

        {/* Letter Header */}
        <div className="flex items-center justify-between border-b border-[#E5D7C7] pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-script text-lg shadow-sm border border-white"
              style={{ backgroundColor: 'var(--theme-accent-dark, #3D5D91)' }}
            >
              {coupleConfig.initials}
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--theme-primary)] font-bold block">
                Para mi niña hermosa
              </span>
              <h3 className="font-serif font-bold text-stone-800 text-base sm:text-lg">
                Para el amor de mi vida
              </h3>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-[var(--theme-surface)] flex items-center justify-center text-[var(--theme-primary)] border border-[var(--theme-secondary)]/40">
            <RoseFlower className="w-4 h-4" />
          </div>
        </div>

        {/* Letter Body */}
        <div className="space-y-3.5 text-xs sm:text-[13.5px] leading-relaxed text-stone-700 font-normal">
          <p>
            <span className="font-serif text-3xl float-left mr-1.5 leading-none text-[var(--theme-primary)] font-bold">
              S
            </span>
            i tuviera que volver a repetir un momento de mi vida, sin duda sería cuando te conocí, ha sido lo mejor que me ha pasado.
          </p>
          <p>
            Gracias por siempre alegrarme la vida. Sé que hemos tenido momentos hermosos, como difíciles, pero sin embargo siempre te elegiré; nunca me iré de tu lado, porque eres lo más importante para mí.
          </p>

          <blockquote
            className="p-3 my-2 rounded-2xl border-l-4 italic bg-[#FAF5EE] text-stone-800 text-xs sm:text-[13px] shadow-2xs"
            style={{ borderColor: 'var(--theme-primary, #6C0820)' }}
          >
            "Te amo porque, a pesar de todas las situaciones, siempre me has amado tanto."
          </blockquote>

          <p>
            Esta escapadita es un poco de lo mucho que te mereces. Amo pasar tiempo contigo y que podamos seguir creando nuevos recuerdos y un futuro juntos, lleno de amor y felicidad.
          </p>
        </div>

        {/* Delicate Floral Flourish Divider */}
        <div className="my-4">
          <FloralDivider className="w-full text-[var(--theme-secondary)] opacity-80" />
        </div>

        {/* Signature */}
        <div className="flex items-end justify-between pt-1">
          <div>
            <span className="text-[11px] text-stone-500 font-serif block">Siempre tuyo,</span>
            <span className="font-script text-2xl text-[var(--theme-primary)] block -mt-1">
              Con amor infinito
            </span>
          </div>
          <span className="w-8 h-8 rounded-full bg-[var(--theme-surface)] flex items-center justify-center text-[var(--theme-primary)] shadow-xs">
            <Infinity className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Chapter Part 2: Polaroid Photo Memories Grid */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[var(--theme-primary)] font-bold block">
              Nuestros Recuerdos
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 flex items-center gap-2">
              Momentos Inolvidables
              <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
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
                    src={getOptimizedImageUrl(memory.imageUrl)}
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
