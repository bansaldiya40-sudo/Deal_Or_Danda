import React from 'react';
import { InvestorId, EmotionState } from '../../types/game';
import { INVESTORS } from '../../data/investors';
import { AshneerCharacter } from './AshneerCharacter';
import { AmanCharacter } from './AmanCharacter';
import { VineetaCharacter } from './VineetaCharacter';
import { NamitaCharacter } from './NamitaCharacter';
import { Volume2 } from 'lucide-react';

interface Props {
  activeAskerId?: InvestorId | null;
  speakingInvestorId?: InvestorId | null;
  investorEmotions: Record<InvestorId, EmotionState>;
  investorQuotes?: Record<InvestorId, string>;
  outInvestors?: Record<InvestorId, boolean>;
  onInvestorClick?: (id: InvestorId) => void;
  onReplayVoice?: (id: InvestorId) => void;
  subtitleText?: string;
  isDeskSlamming?: boolean;
  advancingInvestorId?: InvestorId | null;
}

export const InvestorDesk: React.FC<Props> = ({
  activeAskerId,
  speakingInvestorId,
  investorEmotions,
  investorQuotes,
  outInvestors,
  onInvestorClick,
  onReplayVoice,
  subtitleText,
  isDeskSlamming = false,
  advancingInvestorId = null,
}) => {
  const getEmotionBadge = (emotion: EmotionState, isAsker: boolean, isOut: boolean) => {
    if (isOut) {
      return { text: 'OUT! ❌', color: 'bg-rose-950 text-rose-300 border border-rose-500 font-extrabold' };
    }
    if (isAsker) {
      return { text: 'Questioning 🎙️', color: 'bg-amber-500 text-slate-950 font-black animate-pulse' };
    }
    switch (emotion) {
      case 'impressed':
        return { text: 'Impressed 🤩', color: 'bg-emerald-500 text-slate-950 font-bold' };
      case 'angry':
        return { text: 'Enraged 🤬', color: 'bg-rose-600 text-white font-bold animate-bounce' };
      case 'confused':
        return { text: 'Doubtful 🤨', color: 'bg-amber-600 text-white' };
      case 'laughing':
        return { text: 'Laughing 😂', color: 'bg-yellow-400 text-slate-950 font-bold' };
      case 'rejecting':
        return { text: 'I am OUT 🚫', color: 'bg-slate-700 text-rose-300 border border-rose-500' };
      case 'questioning':
        return { text: 'Probing 🧐', color: 'bg-cyan-500 text-slate-950' };
      default:
        return { text: 'Evaluating 👂', color: 'bg-slate-800 text-slate-300' };
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-2 select-none">
      {/* Studio Lighting Spotlight Cones above Sharks */}
      <div className="absolute inset-0 pointer-events-none flex justify-around opacity-25 overflow-hidden">
        {INVESTORS.map((inv) => {
          const isHighlighted = activeAskerId === inv.id || speakingInvestorId === inv.id;
          return (
            <div
              key={inv.id}
              className={`w-24 sm:w-32 h-28 sm:h-36 bg-gradient-to-b from-amber-200/25 via-amber-400/10 to-transparent blur-xl transform transition-all duration-500 ${
                isHighlighted ? 'opacity-100 scale-125' : 'opacity-20'
              }`}
            />
          );
        })}
      </div>

      {/* The 4 Seated Investors Grid */}
      <div className="relative z-10 grid grid-cols-4 gap-1.5 sm:gap-3 items-end mb-[-14px] sm:mb-[-18px]">
        {INVESTORS.map((inv) => {
          const emotion = investorEmotions[inv.id] || 'idle';
          const isAsker = activeAskerId === inv.id;
          const isSpeaking = speakingInvestorId === inv.id;
          const isOut = !!outInvestors?.[inv.id];
          const badge = getEmotionBadge(emotion, isAsker, isOut);
          const quote = investorQuotes?.[inv.id];

          const isImpressed = emotion === 'impressed';
          const isAngry = emotion === 'angry';

          return (
            <div
              key={inv.id}
              onClick={() => onInvestorClick?.(inv.id)}
              className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 group ${
                isSpeaking
                  ? 'scale-105 z-30'
                  : isAsker
                  ? 'scale-102 z-20'
                  : isOut
                  ? 'opacity-60 grayscale-[40%]'
                  : 'hover:scale-102'
              } ${isImpressed ? 'animate-bounce' : ''} ${
                isAngry ? 'translate-y-1 scale-105 filter drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]' : ''
              } ${advancingInvestorId === inv.id ? 'opacity-0 scale-75 pointer-events-none' : ''}`}
            >
              {/* Dynamic Speech Bubble */}
              {quote && (
                <div className="absolute -top-10 sm:-top-14 z-40 w-28 sm:w-44 p-1.5 bg-slate-900/95 border border-amber-400 rounded-lg shadow-xl text-[10px] sm:text-[11px] text-amber-200 leading-tight text-center backdrop-blur-md animate-fade-in pointer-events-none">
                  <p className="font-semibold italic">"{quote}"</p>
                  <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-amber-400 rotate-45" />
                </div>
              )}

              {/* Status Emotion Pill & Voice Replay Button */}
              <div className="flex items-center space-x-1 mb-0.5">
                <div className={`px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] shadow-sm transition-colors ${badge.color}`}>
                  {badge.text}
                </div>
                {onReplayVoice && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReplayVoice(inv.id);
                    }}
                    title={`Replay ${inv.name}'s voice`}
                    className="p-0.5 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-400 transition-colors cursor-pointer"
                  >
                    <Volume2 size={10} />
                  </button>
                )}
              </div>

              {/* Character Illustration SVG with OUT Overlay */}
              <div className="w-full max-w-[85px] sm:max-w-[105px] md:max-w-[120px] relative">
                {inv.id === 'ashneer' && (
                  <AshneerCharacter emotion={emotion} isSpeaking={isSpeaking} />
                )}
                {inv.id === 'aman' && (
                  <AmanCharacter emotion={emotion} isSpeaking={isSpeaking} />
                )}
                {inv.id === 'vineeta' && (
                  <VineetaCharacter emotion={emotion} isSpeaking={isSpeaking} />
                )}
                {inv.id === 'namita' && (
                  <NamitaCharacter emotion={emotion} isSpeaking={isSpeaking} />
                )}

                {/* Animated OUT Stamp Overlay */}
                {isOut && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-stamp-zoom z-30">
                    <div className="px-2 py-0.5 bg-red-600 border border-yellow-300 rounded shadow-lg transform -rotate-12">
                      <span className="text-white font-black text-xs tracking-wider uppercase drop-shadow">
                        OUT! ❌
                      </span>
                    </div>
                  </div>
                )}

                {/* Active Speaking Halo */}
                {isSpeaking && (
                  <div className="absolute -inset-1 rounded-full bg-amber-400/30 blur-md pointer-events-none -z-10 animate-pulse" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* The Sleek Curved High-Tech Investor Desk */}
      <div
        className={`relative z-20 w-full transition-transform ${
          isDeskSlamming ? 'animate-[bounce_0.15s_ease-in-out_2] scale-102 filter drop-shadow-[0_10px_20px_rgba(239,68,68,0.5)]' : ''
        }`}
      >
        {/* Visual Desk Slam Impact Sparks */}
        {isDeskSlamming && (
          <div className="absolute -top-3 inset-x-0 flex justify-center space-x-4 text-xs font-black text-amber-300 animate-bounce pointer-events-none z-30">
            <span>💥 THUD! 💥</span>
            <span>💥 SLAM! 💥</span>
          </div>
        )}

        {/* Desk Top Bevel */}
        <div className="h-3.5 sm:h-5 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-t-xl border-t border-slate-700 shadow-xl flex items-center justify-around px-3">
          {INVESTORS.map((inv) => (
            <div key={inv.id} className="flex items-center space-x-1.5">
              {/* Gooseneck Mic with live audio activity light */}
              <div className="flex flex-col items-center opacity-85">
                <div
                  className={`w-1 h-1 rounded-full ${
                    speakingInvestorId === inv.id
                      ? 'bg-emerald-400 ring-2 ring-emerald-300 animate-ping'
                      : activeAskerId === inv.id
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-red-500'
                  }`}
                />
                <div className="w-0.5 h-2 bg-slate-400" />
                <div className="w-2.5 h-0.5 rounded bg-slate-600" />
              </div>
              {/* Water Tumbler */}
              <div className="w-2 h-2.5 bg-cyan-200/40 rounded-b-sm border border-cyan-400/50 backdrop-blur-sm" />
            </div>
          ))}
        </div>

        {/* Desk Main Front Face with LED Accent Lighting & Nameplates */}
        <div className="w-full py-1.5 sm:py-2 px-2.5 bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-b-xl border-x border-b border-slate-800 shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
          {/* Nameplates Grid */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3 text-center">
            {INVESTORS.map((inv) => {
              const isAsker = activeAskerId === inv.id;
              const isSpeaking = speakingInvestorId === inv.id;
              const isOut = !!outInvestors?.[inv.id];

              return (
                <div
                  key={inv.id}
                  className={`py-0.5 sm:py-1 px-1 rounded-md border transition-all duration-300 ${
                    isSpeaking
                      ? 'bg-amber-500/20 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-102'
                      : isAsker
                      ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      : isOut
                      ? 'bg-slate-950 border-red-900/60 opacity-60'
                      : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <p
                    className={`font-black text-[10px] sm:text-xs tracking-wide truncate ${
                      isSpeaking
                        ? 'text-yellow-300 font-extrabold'
                        : isAsker
                        ? 'text-amber-400 font-extrabold'
                        : isOut
                        ? 'text-slate-500 line-through'
                        : 'text-slate-200'
                    }`}
                  >
                    {inv.name}
                  </p>
                  <p className="hidden sm:block text-[8px] sm:text-[9px] text-slate-400 truncate font-mono">
                    {inv.fictionalTitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Subtitle Ticker Bar */}
          {subtitleText && (
            <div className="mt-1.5 py-0.5 px-2 bg-slate-950/90 border border-amber-500/40 rounded text-center text-[10px] sm:text-xs text-amber-200 animate-fade-in flex items-center justify-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <p className="truncate font-medium">"{subtitleText}"</p>
            </div>
          )}

          {/* Glowing Stage Underglow Neon Strip */}
          <div className="mt-1.5 h-0.5 w-full bg-gradient-to-r from-red-600 via-amber-400 via-pink-500 to-emerald-500 rounded-full blur-[1px] opacity-75 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
