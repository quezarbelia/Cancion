import React, { useState } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { CoupleConfig } from '../types';

interface PersonalizeModalProps {
  config: CoupleConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: CoupleConfig) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<CoupleConfig>({ ...config });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-stone-200 space-y-4 relative animate-sheet-slide max-h-[92dvh] overflow-y-auto no-scrollbar pb-safe touch-manipulation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab handle */}
        <div className="w-10 h-1 rounded-full bg-stone-300 mx-auto -mt-1 mb-2 sm:hidden" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center transition cursor-pointer active:scale-90"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-full bg-[#F8E8E8] text-[#93545D] flex items-center justify-center mx-auto border border-[#B76E79]/20">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-800">
            Personalizar Nuestra Historia
          </h3>
          <p className="text-xs text-stone-500">
            Adapta los nombres, iniciales y fechas especiales a tu gusto.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-stone-700">
          <div>
            <label className="block text-xs font-semibold mb-1 text-stone-700">Iniciales del Sello (ej. S&M):</label>
            <input
              type="text"
              value={formData.initials}
              onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-[#B76E79] focus:ring-1 focus:ring-[#B76E79] outline-none text-sm sm:text-xs"
              maxLength={6}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-stone-700">Texto Fecha Aniversario:</label>
            <input
              type="text"
              value={formData.anniversaryDisplay}
              onChange={(e) => setFormData({ ...formData, anniversaryDisplay: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-[#B76E79] focus:ring-1 focus:ring-[#B76E79] outline-none text-sm sm:text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-stone-700">Título de la Canción:</label>
            <input
              type="text"
              value={formData.songTitle}
              onChange={(e) => setFormData({ ...formData, songTitle: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-[#B76E79] focus:ring-1 focus:ring-[#B76E79] outline-none text-sm sm:text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-stone-700">Subtítulo o Dedicatoria:</label>
            <input
              type="text"
              value={formData.songArtist}
              onChange={(e) => setFormData({ ...formData, songArtist: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-[#B76E79] focus:ring-1 focus:ring-[#B76E79] outline-none text-sm sm:text-xs"
              required
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition cursor-pointer active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-[#B76E79] to-[#93545D] text-white text-xs font-semibold rounded-xl transition shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
