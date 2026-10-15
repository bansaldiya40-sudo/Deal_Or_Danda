import React from 'react';
import { EmotionState } from '../../types/game';

interface Props {
  emotion: EmotionState;
  isSpeaking: boolean;
  className?: string;
}

export const AshneerCharacter: React.FC<Props> = ({ emotion, isSpeaking, className = '' }) => {
  // Determine facial expression specifics based on emotion
  const getEyebrowTransform = () => {
    switch (emotion) {
      case 'angry':
        return { left: 'rotate(15deg) translateY(4px)', right: 'rotate(-15deg) translateY(4px)' };
      case 'confused':
        return { left: 'rotate(-18deg) translateY(-6px)', right: 'rotate(5deg) translateY(0px)' };
      case 'impressed':
        return { left: 'translateY(-3px)', right: 'translateY(-3px)' };
      case 'laughing':
        return { left: 'rotate(-5deg) translateY(-2px)', right: 'rotate(5deg) translateY(-2px)' };
      case 'rejecting':
        return { left: 'rotate(12deg) translateY(3px)', right: 'rotate(-12deg) translateY(3px)' };
      default:
        return { left: 'rotate(0deg)', right: 'rotate(0deg)' };
    }
  };

  const getMouthShape = () => {
    if (isSpeaking) {
      return (
        <path
          d="M 88 128 Q 100 142 112 128 Q 100 134 88 128 Z"
          fill="#5B1111"
          className="animate-pulse"
        />
      );
    }
    switch (emotion) {
      case 'angry':
        return <path d="M 86 132 Q 100 120 114 132" stroke="#5B1111" strokeWidth="4" strokeLinecap="round" fill="none" />;
      case 'impressed':
        return <path d="M 88 127 Q 100 138 112 127" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />;
      case 'laughing':
        return <path d="M 86 126 Q 100 144 114 126 Z" fill="#881337" stroke="#4C0519" strokeWidth="1.5" />;
      case 'confused':
        return <path d="M 88 131 Q 102 127 114 133" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />;
      case 'rejecting':
        return <path d="M 86 134 L 114 130" stroke="#5B1111" strokeWidth="3.5" strokeLinecap="round" fill="none" />;
      default:
        return <path d="M 89 129 Q 100 131 111 129" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />;
    }
  };

  const getHeadTransform = () => {
    switch (emotion) {
      case 'angry':
        return 'translate(0px, 4px) rotate(-2deg)';
      case 'confused':
        return 'translate(-3px, -2px) rotate(-6deg)';
      case 'impressed':
        return 'translate(0px, 3px) rotate(2deg)';
      case 'laughing':
        return 'translate(0px, -4px) rotate(3deg)';
      case 'rejecting':
        return 'translate(0px, 0px) rotate(-4deg)';
      case 'questioning':
        return 'translate(0px, 5px) scale(1.02)';
      default:
        return 'translate(0px, 0px)';
    }
  };

  const brows = getEyebrowTransform();

  return (
    <div className={`relative flex flex-col items-center justify-end select-none ${className}`}>
      {/* SVG Character */}
      <svg
        viewBox="0 0 200 220"
        className="w-full h-auto max-h-[220px] transition-transform duration-300 filter drop-shadow-lg"
      >
        <defs>
          <linearGradient id="ashneerSuit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="ashneerSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0A97E" />
            <stop offset="100%" stopColor="#C98B60" />
          </linearGradient>
          <linearGradient id="ashneerGlasses" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* Seated Torso & Dark Blazer */}
        <g id="ashneer-body" className="transition-all duration-300">
          {/* Shoulders & Jacket */}
          <path
            d="M 40 220 L 46 160 Q 60 148 90 148 Q 100 148 110 148 Q 140 148 154 160 L 160 220 Z"
            fill="url(#ashneerSuit)"
          />
          {/* White Shirt Collar & V-Neck */}
          <polygon points="90,148 110,148 100,185" fill="#F8FAFC" />
          {/* Dark Red Accent Pocket Square */}
          <polygon points="60,178 74,178 67,170" fill="#991B1B" />
          {/* Jacket Lapels */}
          <path d="M 72 154 L 92 188 L 84 220" stroke="#0F172A" strokeWidth="2.5" fill="none" />
          <path d="M 128 154 L 108 188 L 116 220" stroke="#0F172A" strokeWidth="2.5" fill="none" />

          {/* Hands Resting on Desk or Pointing */}
          {emotion === 'angry' || emotion === 'questioning' ? (
            <g className="transition-all duration-300">
              {/* Leaning forward fist / pointing finger */}
              <circle cx="82" cy="198" r="10" fill="#C98B60" />
              <rect x="74" y="194" width="18" height="12" rx="5" fill="#D3976C" />
              {/* Pointing index finger */}
              <rect x="110" y="188" width="22" height="8" rx="4" fill="#C98B60" transform="rotate(-15 110 188)" />
            </g>
          ) : (
            <g>
              {/* Hands resting calmly */}
              <ellipse cx="78" cy="202" rx="14" ry="8" fill="#C98B60" />
              <ellipse cx="122" cy="202" rx="14" ry="8" fill="#C98B60" />
            </g>
          )}
        </g>

        {/* Head & Face Group with animated transformations */}
        <g
          id="ashneer-head"
          style={{
            transform: getHeadTransform(),
            transformOrigin: '100px 145px',
            transition: 'transform 0.25s ease-out',
          }}
        >
          {/* Neck */}
          <rect x="91" y="132" width="18" height="22" fill="#C98B60" />

          {/* Face Contour (Broad, structured jawline) */}
          <path
            d="M 68 85 Q 66 128 80 138 Q 100 148 120 138 Q 134 128 132 85 Q 130 52 100 52 Q 70 52 68 85 Z"
            fill="url(#ashneerSkin)"
          />

          {/* Subtle Five O'Clock Stubble Shadow */}
          <path
            d="M 76 115 Q 74 135 88 141 Q 100 146 112 141 Q 126 135 124 115 Q 116 134 100 135 Q 84 134 76 115 Z"
            fill="#8B5E3C"
            opacity="0.32"
          />

          {/* Ears */}
          <ellipse cx="67" cy="98" rx="6" ry="11" fill="#C98B60" />
          <ellipse cx="133" cy="98" rx="6" ry="11" fill="#C98B60" />

          {/* Ashneer Hair (Trimmed, neat side part with slight salt-and-pepper hairline) */}
          <path
            d="M 66 82 C 64 50 82 40 100 40 C 122 40 135 52 134 82 C 127 68 118 64 100 64 C 84 64 74 68 66 82 Z"
            fill="#1E293B"
          />
          {/* Subtle Hair Highlight */}
          <path d="M 85 45 Q 100 42 118 47" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Eyebrows (Dynamic expression based on emotion) */}
          {/* Left Eyebrow */}
          <rect
            x="76"
            y="82"
            width="18"
            height="4"
            rx="2"
            fill="#0F172A"
            style={{
              transform: brows.left,
              transformOrigin: '85px 84px',
              transition: 'transform 0.2s ease',
            }}
          />
          {/* Right Eyebrow */}
          <rect
            x="106"
            y="82"
            width="18"
            height="4"
            rx="2"
            fill="#0F172A"
            style={{
              transform: brows.right,
              transformOrigin: '115px 84px',
              transition: 'transform 0.2s ease',
            }}
          />

          {/* Eyes with CSS Blinking */}
          <g className="animate-[blink_4s_infinite]">
            {/* Left Eye */}
            <ellipse cx="85" cy="94" rx="6" ry="4" fill="#FFFFFF" />
            <circle cx="86" cy="94" r="2.8" fill="#1E293B" />
            <circle cx="87" cy="93" r="1" fill="#FFFFFF" />

            {/* Right Eye */}
            <ellipse cx="115" cy="94" rx="6" ry="4" fill="#FFFFFF" />
            <circle cx="114" cy="94" r="2.8" fill="#1E293B" />
            <circle cx="115" cy="93" r="1" fill="#FFFFFF" />
          </g>

          {/* Ashneer's Signature Rectangular Spectacles */}
          <g id="ashneer-glasses">
            {/* Left Frame */}
            <rect
              x="74"
              y="87"
              width="22"
              height="15"
              rx="3"
              fill="none"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
            {/* Right Frame */}
            <rect
              x="104"
              y="87"
              width="22"
              height="15"
              rx="3"
              fill="none"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
            {/* Glasses Bridge */}
            <line x1="96" y1="92" x2="104" y2="92" stroke="#0F172A" strokeWidth="2.5" />
            {/* Lens Glare Sheen */}
            <line x1="77" y1="90" x2="84" y2="99" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="107" y1="90" x2="114" y2="99" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Nose (Strong straight bridge) */}
          <path d="M 100 90 L 98 112 L 104 113" stroke="#A76D46" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Dynamic Mouth */}
          {getMouthShape()}
        </g>
      </svg>
    </div>
  );
};
