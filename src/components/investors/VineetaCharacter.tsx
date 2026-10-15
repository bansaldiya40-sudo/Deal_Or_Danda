import React from 'react';
import { EmotionState } from '../../types/game';

interface Props {
  emotion: EmotionState;
  isSpeaking: boolean;
  className?: string;
}

export const VineetaCharacter: React.FC<Props> = ({ emotion, isSpeaking, className = '' }) => {
  const getEyebrowTransform = () => {
    switch (emotion) {
      case 'angry':
        return { left: 'rotate(14deg) translateY(3px)', right: 'rotate(-14deg) translateY(3px)' };
      case 'confused':
        return { left: 'rotate(-16deg) translateY(-5px)', right: 'rotate(4deg) translateY(0px)' };
      case 'impressed':
        return { left: 'translateY(-3px)', right: 'translateY(-3px)' };
      case 'laughing':
        return { left: 'translateY(-2px) rotate(-6deg)', right: 'translateY(-2px) rotate(6deg)' };
      case 'rejecting':
        return { left: 'rotate(10deg) translateY(2px)', right: 'rotate(-10deg) translateY(2px)' };
      default:
        return { left: 'rotate(0deg)', right: 'rotate(0deg)' };
    }
  };

  const getMouthShape = () => {
    if (isSpeaking) {
      return (
        <path
          d="M 89 127 Q 100 141 111 127 Q 100 133 89 127 Z"
          fill="#BE185D"
          className="animate-pulse"
        />
      );
    }
    switch (emotion) {
      case 'angry':
        return <path d="M 89 133 Q 100 123 111 133" stroke="#9D174D" strokeWidth="3.5" strokeLinecap="round" fill="none" />;
      case 'impressed':
        return <path d="M 87 125 Q 100 139 113 125 Z" fill="#DB2777" stroke="#9D174D" strokeWidth="1.5" />;
      case 'laughing':
        return <path d="M 86 123 Q 100 144 114 123 Z" fill="#BE185D" stroke="#831843" strokeWidth="1.5" />;
      case 'confused':
        return <path d="M 89 130 Q 101 126 112 131" stroke="#831843" strokeWidth="3" strokeLinecap="round" fill="none" />;
      case 'rejecting':
        return <path d="M 88 133 L 112 131" stroke="#9D174D" strokeWidth="3.5" strokeLinecap="round" fill="none" />;
      default:
        // Poised, slight elegant smile with signature berry lips
        return <path d="M 88 127 Q 100 134 112 127" stroke="#DB2777" strokeWidth="3.5" strokeLinecap="round" fill="none" />;
    }
  };

  const getHeadTransform = () => {
    switch (emotion) {
      case 'impressed':
        return 'translate(0px, 2px) rotate(-2deg)';
      case 'confused':
        return 'translate(-3px, -2px) rotate(-5deg)';
      case 'laughing':
        return 'translate(0px, -4px) rotate(2deg)';
      case 'angry':
        return 'translate(0px, 3px) rotate(2deg)';
      case 'rejecting':
        return 'translate(0px, 0px) rotate(-4deg)';
      case 'questioning':
        return 'translate(0px, 4px) scale(1.02)';
      default:
        return 'translate(0px, 0px)';
    }
  };

  const brows = getEyebrowTransform();

  return (
    <div className={`relative flex flex-col items-center justify-end select-none ${className}`}>
      <svg
        viewBox="0 0 200 220"
        className="w-full h-auto max-h-[220px] transition-transform duration-300 filter drop-shadow-lg"
      >
        <defs>
          <linearGradient id="vineetaBlazer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BE185D" />
            <stop offset="100%" stopColor="#831843" />
          </linearGradient>
          <linearGradient id="vineetaSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F2C29B" />
            <stop offset="100%" stopColor="#DEA074" />
          </linearGradient>
        </defs>

        {/* Torso & Chic Power Blazer */}
        <g id="vineeta-body">
          {/* Shoulders */}
          <path
            d="M 44 220 L 50 162 Q 64 150 90 150 Q 100 150 110 150 Q 136 150 150 162 L 156 220 Z"
            fill="url(#vineetaBlazer)"
          />
          {/* Silk Top underneath */}
          <polygon points="90,150 110,150 100,184" fill="#FDF2F8" />
          {/* Blazer Lapel Lines */}
          <path d="M 76 154 L 92 186 L 86 220" stroke="#831843" strokeWidth="2.5" fill="none" />
          <path d="M 124 154 L 108 186 L 114 220" stroke="#831843" strokeWidth="2.5" fill="none" />

          {/* Notebook & Pen on desk */}
          <g id="vineeta-notepad">
            {/* Spiral Notebook */}
            <rect x="68" y="196" width="30" height="22" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="72" y1="202" x2="94" y2="202" stroke="#94A3B8" strokeWidth="1" />
            <line x1="72" y1="207" x2="94" y2="207" stroke="#94A3B8" strokeWidth="1" />
            <line x1="72" y1="212" x2="88" y2="212" stroke="#94A3B8" strokeWidth="1" />

            {/* Hand holding gold pen */}
            {emotion === 'questioning' ? (
              <g>
                {/* Hand raised with pen */}
                <ellipse cx="120" cy="186" rx="8" ry="6" fill="#DEA074" />
                <line x1="112" y1="194" x2="132" y2="174" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                {/* Resting hand near notepad */}
                <ellipse cx="100" cy="202" rx="10" ry="7" fill="#DEA074" />
                <line x1="98" y1="196" x2="114" y2="205" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}
          </g>
        </g>

        {/* Head & Face Group */}
        <g
          id="vineeta-head"
          style={{
            transform: getHeadTransform(),
            transformOrigin: '100px 145px',
            transition: 'transform 0.25s ease-out',
          }}
        >
          {/* Sleek Dark Hair - Behind Back layer */}
          <path
            d="M 64 80 C 60 120 62 145 68 160 C 72 162 76 150 78 135 C 78 110 78 85 78 80 Z"
            fill="#18181B"
          />
          <path
            d="M 136 80 C 140 120 138 145 132 160 C 128 162 124 150 122 135 C 122 110 122 85 122 80 Z"
            fill="#18181B"
          />

          {/* Neck */}
          <rect x="92" y="132" width="16" height="22" fill="#DEA074" />

          {/* Face (Graceful, chiseled diamond structure) */}
          <path
            d="M 72 82 Q 70 122 84 135 Q 100 144 116 135 Q 130 122 128 82 Q 128 52 100 52 Q 72 52 72 82 Z"
            fill="url(#vineetaSkin)"
          />

          {/* Ears with subtle gold studs */}
          <ellipse cx="71" cy="98" rx="5" ry="9" fill="#DEA074" />
          <circle cx="70" cy="101" r="2" fill="#F59E0B" />
          <ellipse cx="129" cy="98" rx="5" ry="9" fill="#DEA074" />
          <circle cx="130" cy="101" r="2" fill="#F59E0B" />

          {/* Vineeta's Sleek Dark Shoulder-Length Hairstyle with side sweep */}
          <path
            d="M 68 76 C 66 40 85 36 100 36 C 122 36 134 46 132 76 C 128 58 116 52 100 52 C 82 52 72 60 68 76 Z"
            fill="#18181B"
          />
          {/* Front swept bangs strand */}
          <path
            d="M 72 65 Q 88 54 114 62 Q 128 68 130 82 Q 124 74 112 68 Q 94 62 72 65 Z"
            fill="#27272A"
          />

          {/* Eyebrows (Arched, elegant) */}
          <path
            d="M 76 80 Q 84 76 93 81"
            stroke="#18181B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{
              transform: brows.left,
              transformOrigin: '84px 79px',
              transition: 'transform 0.2s ease',
            }}
          />
          <path
            d="M 107 81 Q 116 76 124 80"
            stroke="#18181B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{
              transform: brows.right,
              transformOrigin: '115px 79px',
              transition: 'transform 0.2s ease',
            }}
          />

          {/* Eyes with subtle eyeliner wing and blinking */}
          <g className="animate-[blink_4.2s_infinite]">
            {/* Left Eye with Eyeliner */}
            <path d="M 78 90 Q 86 85 94 92" stroke="#18181B" strokeWidth="2" fill="none" />
            <ellipse cx="86" cy="92" rx="5.5" ry="4" fill="#FFFFFF" />
            <circle cx="86" cy="92" r="2.6" fill="#18181B" />
            <circle cx="87" cy="91" r="1" fill="#FFFFFF" />

            {/* Right Eye with Eyeliner */}
            <path d="M 106 92 Q 114 85 122 90" stroke="#18181B" strokeWidth="2" fill="none" />
            <ellipse cx="114" cy="92" rx="5.5" ry="4" fill="#FFFFFF" />
            <circle cx="114" cy="92" r="2.6" fill="#18181B" />
            <circle cx="115" cy="91" r="1" fill="#FFFFFF" />
          </g>

          {/* Delicate Nose */}
          <path d="M 100 89 L 98 107 L 103 108" stroke="#BD8256" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Bold Berry / Fuchsia Lips */}
          {getMouthShape()}
        </g>
      </svg>
    </div>
  );
};
