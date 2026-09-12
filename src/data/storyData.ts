import { Memory, ChecklistItem, MysteryClue, CoupleConfig } from '../types';

export const defaultCoupleConfig: CoupleConfig = {
  person1: 'A',
  person2: 'G',
  initials: 'A&G',
  anniversaryDate: '2026-09-14',
  anniversaryDisplay: '14 de Septiembre, 2026',
  unlockTargetDate: '2026-09-13T16:20:00', // Domingo a las 4:20 PM
  songTitle: 'Una Gerbera...',
  songArtist: 'Para ti, con todo mi amor',
  songUrl: 'https://drive.google.com/file/d/1c--0dxkPz4XxsdUeb9pNEqv3BlWftoIM/view?usp=sharing',
  songCoverUrl: '/cover-una-gerbera.jpg',
  songAudioSrc: '/una-gerbera.mp3',
};

export const defaultMemories: Memory[] = [
  {
    id: '1',
    title: '1er dia',
    subtitle: '1er dia juntos ✨',
    date: '5 Jul 2025',
    note: 'No me pude aguantar hasta nuestra primera cita que con tantos nervios te pedi que fueras mi novia.',
    imageUrl: 'https://drive.google.com/file/d/1LiElN8VGxFGfVTsbbsVngqcm6s4-Tt6G/view?usp=sharing',
    colorGradient: 'from-amber-200 via-rose-300 to-rose-500',
    iconName: 'sunset',
    rotation: '-rotate-1',
  },
  {
    id: '2',
    title: 'Segunda cita',
    subtitle: 'Segunda cita ✨',
    date: '27 Jul 2026',
    note: 'Esa sonrisa que me mata cada que te veo, esa que me hipnotiza',
    imageUrl: 'https://drive.google.com/file/d/1Enq3IqhZ4-lDzTCkarRVGBfDUnCPxYIh/view?usp=sharing',
    colorGradient: 'from-emerald-200 via-teal-300 to-stone-700',
    iconName: 'coffee',
    rotation: 'rotate-2',
  },
  {
    id: '3',
    title: 'Museo',
    subtitle: 'Museo y sonrisas ✨',
    date: '10 Ago 2025',
    note: 'En aquel museo descubri que me encantaba pasar tiempo contigo, me encantaba ver como tus ojos brillaban cuando veias algo que te gustaba',
    imageUrl: 'https://drive.google.com/file/d/1-FIaLW4STgEqkBZ09yQELVDFils2OqdP/view?usp=sharing',
    colorGradient: 'from-indigo-300 via-purple-300 to-slate-800',
    iconName: 'sparkles',
    rotation: '-rotate-2',
  },
  {
    id: '4',
    title: 'Aniversario',
    subtitle: 'Primer aniversario ✨',
    date: '5 Jul 2025',
    note: 'Cada dia que pasa me enamoro mas de ti, eres la mejor persona del mundo y no puedo imaginar mi vida sin ti.',
    imageUrl: 'https://drive.google.com/file/d/1d_INg2kiWzGkbmJPH5aXVcsA5XmhnwOe/view?usp=sharing',
    colorGradient: 'from-rose-100 via-pink-200 to-amber-200',
    iconName: 'heart',
    rotation: 'rotate-1',
  },
];

export const defaultChecklist: ChecklistItem[] = [
  {
    id: 'chk-1',
    text: 'Tu sonrisa más bonita (la que me enamora)',
    checked: true,
    flower: 'Orquídea',
    iconName: 'smile',
  },
  {
    id: 'chk-2',
    text: 'Una sudadera para el camino en la moto',
    checked: false,
    flower: 'Lavanda',
    iconName: 'wind',
  },
  {
    id: 'chk-3',
    text: 'Batería en el teléfono para fotos y memorias juntos',
    checked: false,
    flower: 'Girasol',
    iconName: 'battery-charging',
  },
  {
    id: 'chk-4',
    text: 'Ganas de relajarnos y descansar un ratito a solas',
    checked: false,
    flower: 'Rosa Silvestre',
    iconName: 'heart',
  },
];

export const defaultClues: MysteryClue[] = [
  {
    id: 'clue-1',
    clueNumber: 1,
    question: '¿Qué comeremos?',
    answer: 'Algo rápido y rico',
    details: 'Para aprovechar el tiempo al máximo juntos.',
    flowerIcon: 'Margarita',
    colorTheme: 'rose',
  },
  {
    id: 'clue-2',
    clueNumber: 2,
    question: 'Tu canción especial',
    answer: 'A las 4:20 de la tarde',
    details: 'A las 4 de la tarde podrás escucharla.',
    flowerIcon: 'Lirio',
    colorTheme: 'sage',
  },
];
