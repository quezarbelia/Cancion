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
    title: 'Atardecer junto al mar',
    subtitle: 'Nuestra escapada ✨',
    date: 'Ago 2024',
    note: 'Aquel atardecer donde las olas se llevaron las palabras y supimos, sin decir nada, que esto era para siempre. El cielo parecía pintado para nosotros.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    colorGradient: 'from-amber-200 via-rose-300 to-rose-500',
    iconName: 'sunset',
    rotation: '-rotate-1',
  },
  {
    id: '2',
    title: 'Café bajo la lluvia',
    subtitle: 'Charlas infinitas ☕',
    date: 'Dic 2024',
    note: 'Esas tardes frías refugiados en aquella pequeña cafetería, con dos tazas humeantes y risas que duraron horas. El mundo entero desapareció afuera.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    colorGradient: 'from-emerald-200 via-teal-300 to-stone-700',
    iconName: 'coffee',
    rotation: 'rotate-2',
  },
  {
    id: '3',
    title: 'Noche bajo las estrellas',
    subtitle: 'Promesas y constelaciones ✨',
    date: 'Mar 2025',
    note: 'Envueltos en una misma manta viendo caer estrellas fugaces. En cada una de ellas pedí el mismo deseo: seguir despertando a tu lado.',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80',
    colorGradient: 'from-indigo-300 via-purple-300 to-slate-800',
    iconName: 'sparkles',
    rotation: '-rotate-2',
  },
  {
    id: '4',
    title: 'Risas sin prisa',
    subtitle: 'Momentos espontáneos 🤍',
    date: 'May 2025',
    note: 'Cocinando juntos entre harinas, canciones improvisadas y miradas cómplices. La felicidad más pura se esconde en tus pequeños gestos cotidianos.',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80',
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
