import { ThemePalette } from '../types';

export const predefinedThemes: ThemePalette[] = [
  {
    id: 'user-palette',
    name: 'Vino & Océano Romántico',
    primary: '#6C0820', // User request: #6C0820
    secondary: '#F2AEBC', // User request: #F2AEBC
    surface: '#F2DCDB', // User request: #F2DCDB
    accent: '#5A86CB', // User request: #5A86CB
    accentDark: '#3D5D91', // User request: #3D5D91
    bg: '#FAF4F4',
    cardBg: '#FFFFFF',
    text: '#2A181C',
  },
  {
    id: 'rose-gold',
    name: 'Rosa Empolvado & Oro',
    primary: '#B76E79',
    secondary: '#F8C8CE',
    surface: '#FDF0F2',
    accent: '#D4AF37',
    accentDark: '#93545D',
    bg: '#FAF7F2',
    cardBg: '#FFFFFF',
    text: '#38282A',
  },
  {
    id: 'botanical-sage',
    name: 'Jardín Botánico & Salvia',
    primary: '#476947',
    secondary: '#A5C9A5',
    surface: '#ECF4EC',
    accent: '#4B7B94',
    accentDark: '#2F4F2F',
    bg: '#F6F9F6',
    cardBg: '#FFFFFF',
    text: '#1F2E1F',
  },
  {
    id: 'sunset-terracotta',
    name: 'Atardecer Borgoña & Coral',
    primary: '#8A283B',
    secondary: '#F49B90',
    surface: '#FCEFEB',
    accent: '#4C7A9E',
    accentDark: '#5E1B29',
    bg: '#FAF5F2',
    cardBg: '#FFFFFF',
    text: '#311D21',
  },
  {
    id: 'lavender-dream',
    name: 'Lavanda & Ciruela Silvestre',
    primary: '#5E3875',
    secondary: '#CFAEE6',
    surface: '#F5ECFA',
    accent: '#5282B8',
    accentDark: '#3F2252',
    bg: '#F8F5FB',
    cardBg: '#FFFFFF',
    text: '#261730',
  },
  {
    id: 'sunflower-warm',
    name: 'Girasol & Ámbar',
    primary: '#9E5B00',
    secondary: '#FED166',
    surface: '#FFF7E6',
    accent: '#487CA5',
    accentDark: '#663B00',
    bg: '#FAF7F2',
    cardBg: '#FFFFFF',
    text: '#33220E',
  },
];

export const defaultTheme: ThemePalette = predefinedThemes[0];

export function applyThemeToDocument(palette: ThemePalette) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', palette.primary);
  root.style.setProperty('--theme-secondary', palette.secondary);
  root.style.setProperty('--theme-surface', palette.surface);
  root.style.setProperty('--theme-accent', palette.accent);
  root.style.setProperty('--theme-accent-dark', palette.accentDark);
  root.style.setProperty('--theme-bg', palette.bg);
  root.style.setProperty('--theme-card-bg', palette.cardBg);
  root.style.setProperty('--theme-text', palette.text);
}
