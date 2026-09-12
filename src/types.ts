export interface ThemePalette {
  id: string;
  name: string;
  primary: string; // User: #6C0820
  secondary: string; // User: #F2AEBC
  surface: string; // User: #F2DCDB
  accent: string; // User: #5A86CB
  accentDark: string; // User: #3D5D91
  bg: string;
  cardBg: string;
  text: string;
}

export interface Memory {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  note: string;
  flowerType?: string;
  imageUrl?: string;
  colorGradient: string;
  iconName: 'sunset' | 'coffee' | 'heart' | 'sparkles' | 'camera' | 'music';
  rotation: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  flower: string;
  iconName: 'smile' | 'wind' | 'battery-charging' | 'heart';
}

export interface MysteryClue {
  id: string;
  clueNumber: number;
  question: string;
  answer: string;
  details: string;
  flowerIcon: string;
  colorTheme: 'rose' | 'sage';
}

export interface CoupleConfig {
  person1: string;
  person2: string;
  initials: string;
  anniversaryDate: string; // e.g. "2026-09-14"
  anniversaryDisplay: string; // e.g. "14 de Septiembre, 2026"
  unlockTargetDate: string; // e.g. "2026-09-13T16:20:00"
  songTitle: string;
  songArtist: string;
  songUrl?: string;
  songCoverUrl?: string;
  songAudioSrc?: string;
}

