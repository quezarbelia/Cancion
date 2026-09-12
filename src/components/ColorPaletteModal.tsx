import React, { useState } from 'react';
import { X, Palette, Check, Sparkles, RefreshCw, Wand2 } from 'lucide-react';
import { ThemePalette } from '../types';
import { predefinedThemes, applyThemeToDocument } from '../utils/theme';

interface ColorPaletteModalProps {
  currentTheme: ThemePalette;
  isOpen: boolean;
  onClose: () => void;
  onSaveTheme: (theme: ThemePalette) => void;
}

export const ColorPaletteModal: React.FC<ColorPaletteModalProps> = ({
  currentTheme,
  isOpen,
  onClose,
  onSaveTheme,
}) => {
  const [activePalette, setActivePalette] = useState<ThemePalette>({ ...currentTheme });
  const [customPrimary, setCustomPrimary] = useState(currentTheme.primary);
  const [customSecondary, setCustomSecondary] = useState(currentTheme.secondary);
  const [customSurface, setCustomSurface] = useState(currentTheme.surface);
  const [customAccent, setCustomAccent] = useState(currentTheme.accent);
  const [customAccentDark, setCustomAccentDark] = useState(currentTheme.accentDark);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: ThemePalette) => {
    setActivePalette(preset);
    setCustomPrimary(preset.primary);
    setCustomSecondary(preset.secondary);
    setCustomSurface(preset.surface);
    setCustomAccent(preset.accent);
    setCustomAccentDark(preset.accentDark);
    applyThemeToDocument(preset);
  };

  const handleColorChange = (key: 'primary' | 'secondary' | 'surface' | 'accent' | 'accentDark', val: string) => {
    const updated = { ...activePalette, [key]: val, name: 'Personalizado' };
    setActivePalette(updated);
    if (key === 'primary') setCustomPrimary(val);
    if (key === 'secondary') setCustomSecondary(val);
    if (key === 'surface') setCustomSurface(val);
    if (key === 'accent') setCustomAccent(val);
    if (key === 'accentDark') setCustomAccentDark(val);
    applyThemeToDocument(updated);
  };

  const handleSave = () => {
    const finalPalette: ThemePalette = {
      ...activePalette,
      primary: customPrimary,
      secondary: customSecondary,
      surface: customSurface,
      accent: customAccent,
      accentDark: customAccentDark,
    };
    onSaveTheme(finalPalette);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full p-4 sm:p-6 shadow-2xl border border-stone-200 max-h-[90dvh] overflow-y-auto no-scrollbar space-y-4 sm:space-y-5 relative animate-sheet-slide pb-safe touch-manipulation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile grab handle */}
        <div className="w-10 h-1 rounded-full bg-stone-300 mx-auto -mt-1 mb-2 sm:hidden" />

        {/* Header */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center transition cursor-pointer active:scale-90"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: activePalette.primary }}
          >
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-800">
              Paleta de Colores
            </h3>
            <p className="text-xs text-stone-500">
              Personaliza la apariencia y el florecimiento de la aplicación.
            </p>
          </div>
        </div>

        {/* Live Preview Bar */}
        <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
          <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
            Vista Previa Activa: {activePalette.name}
          </span>
          <div className="flex h-9 w-full rounded-xl overflow-hidden shadow-xs border border-stone-300/50">
            <div className="flex-1" style={{ backgroundColor: customPrimary }} title="Primario" />
            <div className="flex-1" style={{ backgroundColor: customSecondary }} title="Secundario" />
            <div className="flex-1" style={{ backgroundColor: customSurface }} title="Superficie" />
            <div className="flex-1" style={{ backgroundColor: customAccent }} title="Acento" />
            <div className="flex-1" style={{ backgroundColor: customAccentDark }} title="Acento Oscuro" />
          </div>
        </div>

        {/* 1. Presets Section */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
            Esquemas Predefinidos
          </span>
          <div className="grid grid-cols-2 gap-2">
            {predefinedThemes.map((preset) => {
              const isSelected = activePalette.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-2xl border text-left transition flex flex-col gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'border-stone-800 bg-stone-50 ring-2 ring-[var(--theme-primary)]'
                      : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-800 truncate">
                      {preset.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-stone-800" />}
                  </div>
                  {/* Swatches mini strip */}
                  <div className="flex h-3.5 w-full rounded-md overflow-hidden border border-black/10">
                    <div className="flex-1" style={{ backgroundColor: preset.primary }} />
                    <div className="flex-1" style={{ backgroundColor: preset.secondary }} />
                    <div className="flex-1" style={{ backgroundColor: preset.surface }} />
                    <div className="flex-1" style={{ backgroundColor: preset.accent }} />
                    <div className="flex-1" style={{ backgroundColor: preset.accentDark }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Custom Hex Codes Section */}
        <div className="space-y-3 pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
              Introducir Códigos Hexadecimales
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Primary Color */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={customPrimary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer border border-stone-300 overflow-hidden"
                />
                <div>
                  <span className="text-[11px] font-bold text-stone-700 block">Primario (Flor y Títulos)</span>
                  <span className="text-[10px] text-stone-400">#6C0820</span>
                </div>
              </div>
              <input
                type="text"
                value={customPrimary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                className="w-24 px-2 py-1 text-xs font-mono rounded-lg border border-stone-300 uppercase text-center bg-white"
                maxLength={7}
              />
            </div>

            {/* Secondary Color */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={customSecondary}
                  onChange={(e) => handleColorChange('secondary', e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer border border-stone-300 overflow-hidden"
                />
                <div>
                  <span className="text-[11px] font-bold text-stone-700 block">Secundario (Pétalos y Acentos)</span>
                  <span className="text-[10px] text-stone-400">#F2AEBC</span>
                </div>
              </div>
              <input
                type="text"
                value={customSecondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                className="w-24 px-2 py-1 text-xs font-mono rounded-lg border border-stone-300 uppercase text-center bg-white"
                maxLength={7}
              />
            </div>

            {/* Surface Color */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={customSurface}
                  onChange={(e) => handleColorChange('surface', e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer border border-stone-300 overflow-hidden"
                />
                <div>
                  <span className="text-[11px] font-bold text-stone-700 block">Superficie / Resplandor</span>
                  <span className="text-[10px] text-stone-400">#F2DCDB</span>
                </div>
              </div>
              <input
                type="text"
                value={customSurface}
                onChange={(e) => handleColorChange('surface', e.target.value)}
                className="w-24 px-2 py-1 text-xs font-mono rounded-lg border border-stone-300 uppercase text-center bg-white"
                maxLength={7}
              />
            </div>

            {/* Accent Color */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={customAccent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer border border-stone-300 overflow-hidden"
                />
                <div>
                  <span className="text-[11px] font-bold text-stone-700 block">Acento Océano / Detalles</span>
                  <span className="text-[10px] text-stone-400">#5A86CB</span>
                </div>
              </div>
              <input
                type="text"
                value={customAccent}
                onChange={(e) => handleColorChange('accent', e.target.value)}
                className="w-24 px-2 py-1 text-xs font-mono rounded-lg border border-stone-300 uppercase text-center bg-white"
                maxLength={7}
              />
            </div>

            {/* Accent Dark Color */}
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={customAccentDark}
                  onChange={(e) => handleColorChange('accentDark', e.target.value)}
                  className="w-7 h-7 rounded-lg cursor-pointer border border-stone-300 overflow-hidden"
                />
                <div>
                  <span className="text-[11px] font-bold text-stone-700 block">Acento Marino Profundo</span>
                  <span className="text-[10px] text-stone-400">#3D5D91</span>
                </div>
              </div>
              <input
                type="text"
                value={customAccentDark}
                onChange={(e) => handleColorChange('accentDark', e.target.value)}
                className="w-24 px-2 py-1 text-xs font-mono rounded-lg border border-stone-300 uppercase text-center bg-white"
                maxLength={7}
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => handleSelectPreset(predefinedThemes[0])}
            className="px-3.5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            title="Restablecer a la paleta del usuario"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Por Defecto</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl text-white text-xs font-semibold shadow-md transition hover:opacity-95 cursor-pointer"
            style={{ backgroundColor: customPrimary }}
          >
            Aplicar y Guardar Paleta
          </button>
        </div>
      </div>
    </div>
  );
};
