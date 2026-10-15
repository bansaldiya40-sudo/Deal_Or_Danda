import React from 'react';
import { InvestorId } from '../../types/game';
import { AshneerCharacter } from '../investors/AshneerCharacter';
import { AmanCharacter } from '../investors/AmanCharacter';
import { VineetaCharacter } from '../investors/VineetaCharacter';
import { NamitaCharacter } from '../investors/NamitaCharacter';

export type InSceneSlapPhase =
  | 'idle'
  | 'disbelief'
  | 'approach'
  | 'windup'
  | 'impact'
  | 'return';

interface Props {
  isActive: boolean;
  investorId: InvestorId;
  phase: InSceneSlapPhase;
}

export const InSceneSlapActor: React.FC<Props> = ({
  isActive,
  investorId,
  phase,
}) => {
  if (!isActive || phase === 'idle') return null;

  // Dynamic positioning & cartoon posture based on slap animation phase
  let actorTransform = 'translate(0px, 0px) scale(1)';
  let armRotation = 'rotate(0deg)';
  let opacity = 'opacity-100';

  switch (phase) {
    case 'disbelief':
      // Starting just stepping off desk
      actorTransform = 'translate(-60px, -60px) scale(0.85)';
      armRotation = 'rotate(10deg)';
      opacity = 'opacity-90';
      break;
    case 'approach':
      // Stepping forward onto stage floor alongside founder
      actorTransform = 'translate(-75px, -10px) scale(1.05)';
      armRotation = 'rotate(-15deg)';
      opacity = 'opacity-100';
      break;
    case 'windup':
      // Exaggerated cartoon wind-up leaning back
      actorTransform = 'translate(-95px, -14px) rotate(-16deg) scale(1.08)';
      armRotation = 'rotate(-55deg)';
      opacity = 'opacity-100';
      break;
    case 'impact':
      // Forward cartoon lunging slap gesture
      actorTransform = 'translate(-42px, -6px) rotate(14deg) scale(1.12)';
      armRotation = 'rotate(45deg)';
      opacity = 'opacity-100';
      break;
    case 'return':
      // Walking back up behind desk
      actorTransform = 'translate(-80px, -65px) scale(0.8) scaleX(-1)';
      armRotation = 'rotate(0deg)';
      opacity = 'opacity-0';
      break;
  }

  return (
    <div
      className={`absolute left-1/2 -translate-x-full z-30 pointer-events-none transition-all duration-300 ease-out select-none ${opacity}`}
      style={{
        transform: actorTransform,
        transitionProperty: 'transform, opacity',
      }}
    >
      {/* Cartoon Shadow underneath Advancing Shark */}
      <div className="absolute -bottom-2 left-6 w-24 h-4 bg-black/40 rounded-full blur-sm" />

      {/* The Specific Investor Character Illustration */}
      <div className="relative w-16 sm:w-20 h-20 sm:h-24 filter drop-shadow-xl">
        {investorId === 'ashneer' && (
          <AshneerCharacter emotion="angry" isSpeaking={false} />
        )}
        {investorId === 'aman' && (
          <AmanCharacter emotion="angry" isSpeaking={false} />
        )}
        {investorId === 'vineeta' && (
          <VineetaCharacter emotion="angry" isSpeaking={false} />
        )}
        {investorId === 'namita' && (
          <NamitaCharacter emotion="angry" isSpeaking={false} />
        )}

        {/* Animated Cartoon Gloved Slapping Arm */}
        <div
          className="absolute -right-3 top-16 w-20 h-20 origin-top-left transition-transform duration-150 ease-out z-40 pointer-events-none"
          style={{ transform: armRotation }}
        >
          <svg viewBox="0 0 80 80" className="w-full h-full filter drop-shadow-md">
            {/* Upper arm sleeve */}
            <path
              d="M 10 15 Q 35 20 50 30"
              stroke={
                investorId === 'ashneer'
                  ? '#1E3A8A'
                  : investorId === 'aman'
                  ? '#0F172A'
                  : investorId === 'vineeta'
                  ? '#831843'
                  : '#581C87'
              }
              strokeWidth="11"
              strokeLinecap="round"
              fill="none"
            />
            {/* Forearm & White Cartoon Gloved Hand */}
            <path
              d="M 45 28 L 68 38"
              stroke="#FFFFFF"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cartoon Gloved Hand Palm & Fingers */}
            <circle cx="68" cy="38" r="7.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
            <path d="M 64 34 L 72 32" stroke="#CBD5E1" strokeWidth="1.5" />
            <path d="M 66 38 L 74 37" stroke="#CBD5E1" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Comic Impact Blast Sparks at Point of Impact */}
      {phase === 'impact' && (
        <div className="absolute -right-8 top-12 z-50 animate-stamp-zoom pointer-events-none">
          <div className="relative flex items-center justify-center">
            {/* Yellow & Orange Comic Starburst */}
            <svg viewBox="0 0 100 100" className="w-20 h-20 filter drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]">
              <polygon
                points="50,5 62,35 95,25 75,50 95,75 62,65 50,95 38,65 5,75 25,50 5,25 38,35"
                fill="#FBBF24"
                stroke="#DC2626"
                strokeWidth="3"
              />
            </svg>
            <span className="absolute font-black text-slate-950 text-sm tracking-wider uppercase drop-shadow transform -rotate-12">
              💥
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
