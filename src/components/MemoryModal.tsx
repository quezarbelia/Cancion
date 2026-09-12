import React from 'react';
import { X, Heart, Calendar, Sparkles } from 'lucide-react';
import { Memory } from '../types';
import { getOptimizedImageUrl } from '../utils/imageHelper';

interface MemoryModalProps {
  memory: Memory | null;
  onClose: () => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({ memory, onClose }) => {
  if (!memory) return null;

  return (
    <div
      id="memory-modal-overlay"
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-4 sm:p-5 shadow-2xl border border-stone-200 text-center space-y-3.5 relative animate-sheet-slide max-h-[90dvh] overflow-y-auto no-scrollbar pb-safe touch-manipulation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab bar */}
        <div className="w-10 h-1 rounded-full bg-stone-300 mx-auto -mt-1 mb-2 sm:hidden" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center transition cursor-pointer touch-manipulation active:scale-90"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image / Card */}
        <div className="w-full aspect-[4/5] rounded-2xl bg-stone-100 overflow-hidden relative shadow-inner">
          {memory.imageUrl ? (
            <img
              src={getOptimizedImageUrl(memory.imageUrl)}
              alt={memory.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-tr ${memory.colorGradient} flex items-center justify-center text-white`}>
              <Heart className="w-12 h-12 fill-current opacity-80" />
            </div>
          )}
          <span className="absolute bottom-2.5 right-2.5 text-xs bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full font-mono flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {memory.date}
          </span>
        </div>

        {/* Caption and description */}
        <div className="space-y-1.5 text-left px-1">
          <span className="text-[10px] uppercase font-bold text-[#B76E79] tracking-widest block">
            {memory.subtitle}
          </span>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-800">
            {memory.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-sans">
            {memory.note}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition cursor-pointer active:scale-[0.98] touch-manipulation"
        >
          Cerrar Recuerdo
        </button>
      </div>
    </div>
  );
};
