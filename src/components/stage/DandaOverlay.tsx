import React, { useEffect } from 'react';
import { sound } from '../../utils/audio';

interface Props {
  isActive: boolean;
  message?: string;
  onDismiss: () => void;
}

export const DandaOverlay: React.FC<Props> = ({ isActive, message, onDismiss }) => {
  useEffect(() => {
    if (isActive) {
      sound.stopSpeaking();
      sound.playDandaBonk();
      // Auto-dismiss after 4.2 seconds if user doesn't click
      const timer = setTimeout(() => {
        onDismiss();
      }, 4200);
      return () => clearTimeout(timer);
    }
  }, [isActive, onDismiss]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-hidden animate-fade-in">
      {/* Screen Shake Container */}
      <div className="relative w-full max-w-lg flex flex-col items-center text-center">
        {/* Animated Cartoon 3D Danda (Wooden Club / Lathi) spinning into frame */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center animate-3d-danda-spin">
          <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
            <defs>
              <linearGradient id="woodGrain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#854D0E" />
                <stop offset="40%" stopColor="#A16207" />
                <stop offset="70%" stopColor="#713F12" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
            </defs>

            {/* Classic Indian Wooden Lathi / Danda */}
            {/* Main polished stick body */}
            <path
              d="M 30 170 L 160 30 Q 175 20 185 30 Q 190 40 180 55 L 45 190 Q 30 195 25 185 Q 20 175 30 170 Z"
              fill="url(#woodGrain)"
              stroke="#291807"
              strokeWidth="3.5"
            />
            {/* Grip Rings / Brass Rivets on Danda */}
            <line x1="45" y1="155" x2="60" y2="170" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
            <line x1="55" y1="145" x2="70" y2="160" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
            <line x1="65" y1="135" x2="80" y2="150" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />

            {/* Comic impact burst stars / whoosh lines */}
            <circle cx="165" cy="40" r="18" fill="#FDE047" opacity="0.85" className="animate-ping" />
            <path d="M 140 15 L 155 30" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            <path d="M 185 10 L 175 30" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
            <path d="M 195 50 L 175 45" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Orbiting Cartoon Dizzy Stars */}
        <div className="flex items-center space-x-4 my-2 animate-star-spin">
          <span className="text-3xl sm:text-4xl">⭐</span>
          <span className="text-4xl sm:text-5xl">💫</span>
          <span className="text-3xl sm:text-4xl">✨</span>
        </div>

        {/* Big Red "DANDA!" Rubber Stamp with Savage Sound effect */}
        <div className="relative my-3 animate-stamp-zoom">
          <div className="px-6 py-2.5 bg-red-600 border-4 border-yellow-300 rounded-2xl shadow-[0_0_35px_rgba(220,38,38,0.9)] transform -rotate-6">
            <h1 className="text-4xl sm:text-6xl font-black tracking-widest text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] uppercase">
              DANDA! 🏏
            </h1>
          </div>
        </div>

        {/* Funny Hinglish Burn Feedback Box */}
        <div className="w-full max-w-md mt-3 p-4 bg-slate-900 border-2 border-red-500 rounded-2xl shadow-2xl text-center">
          <p className="text-xs uppercase tracking-wider text-red-400 font-bold mb-1">
            Savage Pitch Reality Check
          </p>
          <p className="text-base sm:text-lg font-bold text-amber-200">
            "{message || 'Confidence 100%, Preparation 2%! Danda lag gaya!'}"
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Pitch sahi, toh paisa. Pitch galat, toh danda!
          </p>

          <button
            onClick={onDismiss}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-lg transition-transform active:scale-95 text-sm uppercase tracking-wide cursor-pointer"
          >
            Hisaab Samjho & Continue ➡️
          </button>
        </div>
      </div>
    </div>
  );
};
