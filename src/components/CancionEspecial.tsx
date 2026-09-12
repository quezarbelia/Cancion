import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Sparkles,
  Music,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Download,
  Disc3,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CoupleConfig } from '../types';
import { romanticAudio } from '../utils/audioSynth';
import { Sunflower, LavenderFlower, RoseFlower } from './FloralIcons';

interface CancionEspecialProps {
  coupleConfig: CoupleConfig;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const CancionEspecial: React.FC<CancionEspecialProps> = ({
  coupleConfig,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [isPlayingActualSong, setIsPlayingActualSong] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      // Robust cross-platform date parsing for iOS Safari, Android, and desktop
      let target: Date;
      if (typeof coupleConfig.unlockTargetDate === 'string') {
        const parts = coupleConfig.unlockTargetDate.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
        if (parts) {
          const [, y, m, d, h, min, s] = parts;
          target = new Date(Number(y), Number(m) - 1, Number(d), Number(h), Number(min), Number(s || 0));
        } else {
          target = new Date(coupleConfig.unlockTargetDate);
        }
      } else {
        target = new Date(coupleConfig.unlockTargetDate);
      }

      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setIsUnlocked(true);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [coupleConfig.unlockTargetDate]);

  const togglePlaySong = () => {
    if (audioRef.current) {
      if (isPlayingActualSong) {
        audioRef.current.pause();
        setIsPlayingActualSong(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlayingActualSong(true);
        }).catch(() => {
          onToggleAudio();
        });
      }
    } else {
      onToggleAudio();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = Math.floor(pct * duration);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isCurrentlyPlaying = isPlayingActualSong || isAudioPlaying;

  return (
    <section id="cancion-section" className="relative">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-7 shadow-xl shadow-stone-200/60 border border-[var(--theme-secondary)]/30 overflow-hidden">
        
        {/* Header with status badge */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10.5px] uppercase tracking-widest text-[var(--theme-primary)] font-bold block">
              Tu canción
            </span>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-stone-800 flex items-center gap-1.5">
              Una Gerbera...
              <RoseFlower className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--theme-primary)]" />
            </h3>
          </div>

          <div
            id="song-status-badge"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all"
            style={
              isUnlocked
                ? {
                    backgroundColor: 'var(--theme-surface, #F2DCDB)',
                    color: 'var(--theme-primary, #6C0820)',
                    borderColor: 'var(--theme-secondary, #F2AEBC)',
                  }
                : {
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    borderColor: '#FDE68A',
                  }
            }
          >
            {isUnlocked ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                <span>Desbloqueada</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Bloqueada</span>
              </>
            )}
          </div>
        </div>

        {/* LOCKED STATE VIEW */}
        {!isUnlocked ? (
          <div id="locked-state-card" className="space-y-4 py-1">
            <div
              className="text-center p-4 sm:p-6 rounded-3xl border border-dashed"
              style={{
                background: 'linear-gradient(to bottom, #FAF5F5, var(--theme-surface, #F2DCDB) 40%, #FFFDF8 100%)',
                borderColor: 'var(--theme-secondary, #F2AEBC)',
              }}
            >
              {/* Animated Lock Icon */}
              <div
                className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-white shadow-md flex items-center justify-center border"
                style={{ borderColor: 'var(--theme-secondary, #F2AEBC)' }}
              >
                <Lock className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse" style={{ color: 'var(--theme-primary, #6C0820)' }} />
                <div
                  className="absolute inset-0 rounded-full border-2 animate-ping opacity-35"
                  style={{ borderColor: 'var(--theme-primary, #6C0820)' }}
                />
              </div>

              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider mb-2 border" style={{ backgroundColor: 'var(--theme-surface, #F2DCDB)', color: 'var(--theme-primary, #6C0820)', borderColor: 'var(--theme-secondary, #F2AEBC)' }}>
                Llegó el momento
              </span>
              <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-lg mb-1 leading-snug">
                Esta canción se desbloquea el domingo a las 4:20 de la tarde
              </h4>
              <p className="text-[11.5px] sm:text-xs text-stone-600 max-w-xs mx-auto mb-4 leading-relaxed">
                El candado se abrirá automáticamente en ese momento exacto.
              </p>

              {/* Countdown Numbers Grid */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 max-w-xs mx-auto text-center">
                <div className="bg-white/95 p-2 sm:p-2.5 rounded-xl shadow-xs border border-stone-200">
                  <span className="font-serif font-bold text-base sm:text-lg block leading-none" style={{ color: 'var(--theme-primary, #6C0820)' }}>
                    {timeLeft.days}
                  </span>
                  <span className="text-[8.5px] sm:text-[9px] uppercase font-semibold text-stone-500 tracking-wider">
                    Días
                  </span>
                </div>
                <div className="bg-white/95 p-2 sm:p-2.5 rounded-xl shadow-xs border border-stone-200">
                  <span className="font-serif font-bold text-base sm:text-lg block leading-none" style={{ color: 'var(--theme-primary, #6C0820)' }}>
                    {timeLeft.hours}
                  </span>
                  <span className="text-[8.5px] sm:text-[9px] uppercase font-semibold text-stone-500 tracking-wider">
                    Horas
                  </span>
                </div>
                <div className="bg-white/95 p-2 sm:p-2.5 rounded-xl shadow-xs border border-stone-200">
                  <span className="font-serif font-bold text-base sm:text-lg block leading-none" style={{ color: 'var(--theme-primary, #6C0820)' }}>
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[8.5px] sm:text-[9px] uppercase font-semibold text-stone-500 tracking-wider">
                    Mins
                  </span>
                </div>
                <div className="bg-white/95 p-2 sm:p-2.5 rounded-xl shadow-xs border border-stone-200">
                  <span className="font-serif font-bold text-base sm:text-lg block leading-none" style={{ color: 'var(--theme-primary, #6C0820)' }}>
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[8.5px] sm:text-[9px] uppercase font-semibold text-stone-500 tracking-wider">
                    Segs
                  </span>
                </div>
              </div>
            </div>

            {/* Blurred Mockup Player with Custom Artwork Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 select-none opacity-70">
              <div className="p-3 sm:p-3.5 bg-stone-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-200 overflow-hidden shrink-0 shadow-inner flex items-center justify-center">
                  {coupleConfig.songCoverUrl ? (
                    <img
                      src={coupleConfig.songCoverUrl}
                      alt="Portada Una Gerbera"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover blur-[2px]"
                    />
                  ) : (
                    <Music className="w-5 h-5 text-stone-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] uppercase font-bold text-stone-400 tracking-wider block">
                    Tu canción
                  </span>
                  <p className="font-serif font-bold text-xs sm:text-sm text-stone-700 truncate">
                    Una Gerbera...
                  </p>
                  <p className="text-[10.5px] text-stone-400 truncate">
                    Se revelará a las 4:20 PM
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-400">
                  <Lock className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="absolute inset-0 backdrop-blur-[2px] flex items-center justify-center bg-stone-900/10">
                <span className="text-[11px] font-semibold text-stone-800 bg-white/95 px-3.5 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-stone-200">
                  <Lock className="w-3 h-3 text-[var(--theme-primary)]" />
                  Disponible domingo 4:20 PM
                </span>
              </div>
            </div>

          </div>
        ) : (
          /* UNLOCKED STATE VIEW */
          <div id="unlocked-state-card" className="space-y-3.5 pt-1 animate-fadeIn">
            {/* Toast announcement */}
            <div
              className="p-3 rounded-2xl border flex items-center gap-2.5"
              style={{
                backgroundColor: 'var(--theme-surface, #F2DCDB)',
                borderColor: 'var(--theme-secondary, #F2AEBC)',
              }}
            >
              <span className="w-7 h-7 rounded-full bg-white shadow-xs flex items-center justify-center text-[var(--theme-primary)] shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
              </span>
              <p className="text-xs sm:text-[13px] text-stone-800 font-medium">
                ¡Llegó el momento! Nuestra canción ha sido revelada para celebrar juntos.
              </p>
            </div>

            {/* Mini Player */}
            <div className="bg-gradient-to-b from-[#FFFDFC] to-[#FBF8F5] rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-md">
              <div className="flex items-center gap-3.5 mb-3">
                
                {/* Album Artwork */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-md border border-stone-200 shrink-0 bg-stone-900 flex items-center justify-center group">
                  {coupleConfig.songCoverUrl ? (
                    <img
                      src={coupleConfig.songCoverUrl}
                      alt={coupleConfig.songTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center text-white ${
                        isAudioPlaying ? 'animate-spin' : ''
                      }`}
                      style={{
                        background: 'radial-gradient(circle, var(--theme-secondary, #F2AEBC) 10%, var(--theme-primary, #6C0820) 70%, #1A0307 100%)',
                        animationDuration: '8s',
                      }}
                    >
                      <Disc3 className="w-8 h-8 sm:w-9 sm:h-9" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[9.5px] uppercase font-bold text-[var(--theme-primary)] tracking-wider block">
                    Canción Oficial
                  </span>
                  <h4 className="font-serif font-bold text-stone-800 text-sm sm:text-base truncate">
                    {coupleConfig.songTitle}
                  </h4>
                  <p className="text-xs text-stone-500 truncate">
                    {coupleConfig.songArtist}
                  </p>
                </div>

                {/* Favorite Heart Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition shadow-xs cursor-pointer touch-manipulation active:scale-90 ${
                    isFavorite
                      ? 'bg-[var(--theme-surface)] border-[var(--theme-secondary)] text-[var(--theme-primary)]'
                      : 'bg-white border-stone-200 text-stone-400 hover:text-[var(--theme-primary)]'
                  }`}
                  title="Añadir a favoritas"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Seekable Progress Bar with generous mobile hit area */}
              <div className="space-y-1 my-2">
                <div
                  onClick={handleSeek}
                  className="w-full py-2 cursor-pointer touch-manipulation group"
                  title="Adelantar / Retroceder canción"
                >
                  <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full transition-all duration-200"
                      style={{
                        width: `${progressPercent}%`,
                        background: 'linear-gradient(to right, var(--theme-secondary, #F2AEBC), var(--theme-primary, #6C0820))',
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10.5px] text-stone-500 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Real Audio Player element */}
              <audio
                ref={audioRef}
                src={coupleConfig.songAudioSrc || '/una-gerbera.mp3'}
                preload="metadata"
                onTimeUpdate={() => {
                  if (audioRef.current) {
                    setCurrentTime(Math.floor(audioRef.current.currentTime));
                  }
                }}
                onLoadedMetadata={() => {
                  if (audioRef.current && audioRef.current.duration) {
                    setDuration(Math.floor(audioRef.current.duration));
                  }
                }}
                onEnded={() => {
                  setIsPlayingActualSong(false);
                }}
              />

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-6 pt-1 pb-2">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                    }
                    setCurrentTime(0);
                  }}
                  className="text-stone-400 hover:text-stone-800 transition p-2 cursor-pointer touch-manipulation active:scale-90"
                  title="Reiniciar"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlaySong}
                  className="w-12 h-12 sm:w-13 sm:h-13 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer touch-manipulation"
                  style={{
                    background: 'linear-gradient(135deg, var(--theme-primary, #6C0820) 0%, var(--theme-accent-dark, #3D5D91) 100%)',
                  }}
                  title={isCurrentlyPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {isCurrentlyPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => {
                    const nextSeek = Math.min(duration, currentTime + 15);
                    if (audioRef.current) {
                      audioRef.current.currentTime = nextSeek;
                    }
                    setCurrentTime(nextSeek);
                  }}
                  className="text-stone-400 hover:text-stone-800 transition p-2 cursor-pointer touch-manipulation active:scale-90"
                  title="Avanzar 15s"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Direct MP3 Download Button */}
              <div className="pt-3 border-t border-stone-200/60 mt-1">
                <a
                  href="/una-gerbera.mp3"
                  download="Una_Gerbera.mp3"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition shadow-xs hover:shadow-sm active:scale-[0.98] cursor-pointer touch-manipulation"
                  style={{
                    backgroundColor: 'var(--theme-surface, #F2DCDB)',
                    color: 'var(--theme-primary, #6C0820)',
                    borderColor: 'var(--theme-secondary, #F2AEBC)',
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar canción Una Gerbera... (.mp3)</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
