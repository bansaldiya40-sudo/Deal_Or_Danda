import React from 'react';
import { EmotionState } from '../../types/game';

interface Props {
  emotion: EmotionState;
  isSpeaking: boolean;
  className?: string;
}

export const NamitaCharacter: React.FC<Props> = ({ emotion, isSpeaking, className = '' }) => {
  const getEyebrowTransform = () => {
    switch (emotion) {
      case 'angry':
        return { left: 'rotate(12deg) translateY(3px)', right: 'rotate(-12deg) translateY(3px)' };
      case 'confused':
        return { left: 'rotate(-16deg) translateY(-5px)', right: 'rotate(2deg) translateY(0px)' };
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
          d="M 89 127 Q 100 140 111 127 Q 100 133 89 127 Z"
          fill="#9F1239"
          className="animate-pulse"
        />
      );
    }
    switch (emotion) {
      case 'angry':
        return <path d="M 89 133 Q 100 124 111 133" stroke="#881337" strokeWidth="3.2" strokeLinecap="round" fill="none" />;
      case 'impressed':
        return <path d="M 87 125 Q 100 138 113 125 Z" fill="#BE123C" stroke="#881337" strokeWidth="1.5" />;
      case 'laughing':
        return <path d="M 87 124 Q 100 142 113 124 Z" fill="#BE123C" stroke="#881337" strokeWidth="1.5" />;
      case 'confused':
        return <path d="M 89 130 Q 101 126 111 131" stroke="#881337" strokeWidth="3" strokeLinecap="round" fill="none" />;
      case 'rejecting':
        return <path d="M 88 132 L 112 131" stroke="#881337" strokeWidth="3.2" strokeLinecap="round" fill="none" />;
      default:
        // Sophisticated serene smile
        return <path d="M 88 126 Q 100 134 112 126" stroke="#BE123C" strokeWidth="3" strokeLinecap="round" fill="none" />;
    }
  };

  const getHeadTransform = () => {
    switch (emotion) {
      case 'impressed':
        return 'translate(0px, 2px) rotate(2deg)';
      case 'confused':
        return 'translate(3px, -2px) rotate(5deg)';
      case 'laughing':
        return 'translate(0px, -4px) rotate(-2deg)';
      case 'angry':
        return 'translate(0px, 3px) rotate(-2deg)';
      case 'rejecting':
        return 'translate(0px, 1px) rotate(3deg)';
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
          <linearGradient id="namitaSuit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
          <linearGradient id="namitaSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5CBA7" />
            <stop offset="100%" stopColor="#E2A676" />
          </linearGradient>
        </defs>

        {/* Torso & Elegant Emerald Designer Jacket */}
        <g id="namita-body">
          {/* Shoulders */}
          <path
            d="M 44 220 L 50 162 Q 64 150 90 150 Q 100 150 110 150 Q 136 150 150 162 L 156 220 Z"
            fill="url(#namitaSuit)"
          />
          {/* Inner Silk Top with Scoop Neckline */}
          <path d="M 88 150 Q 100 178 112 150 Z" fill="#ECFDF5" />

          {/* Pearl / Gem Pendant Necklace */}
          <path d="M 89 152 Q 100 174 111 152" stroke="#FDE047" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="172" r="3.5" fill="#10B981" stroke="#FDE047" strokeWidth="1.2" />

          {/* Jacket Lapels */}
          <path d="M 74 154 L 92 184 L 86 220" stroke="#064E3B" strokeWidth="2.5" fill="none" />
          <path d="M 126 154 L 108 184 L 114 220" stroke="#064E3B" strokeWidth="2.5" fill="none" />

          {/* Hands */}
          {emotion === 'rejecting' ? (
            /* Iconic Hands Raised "I am OUT" gesture */
            <g className="transition-all duration-300">
              {/* Left Palm up */}
              <ellipse cx="64" cy="170" rx="9" ry="12" fill="#E2A676" transform="rotate(-15 64 170)" />
              <line x1="58" y1="165" x2="58" y2="155" stroke="#E2A676" strokeWidth="3" strokeLinecap="round" />
              {/* Right Palm up */}
              <ellipse cx="136" cy="170" rx="9" ry="12" fill="#E2A676" transform="rotate(15 136 170)" />
              <line x1="142" y1="165" x2="142" y2="155" stroke="#E2A676" strokeWidth="3" strokeLinecap="round" />
            </g>
          ) : emotion === 'impressed' ? (
            /* Clapping / Appreciative hands */
            <g>
              <ellipse cx="94" cy="198" rx="8" ry="11" fill="#E2A676" transform="rotate(20 94 198)" />
              <ellipse cx="106" cy="198" rx="8" ry="11" fill="#E2A676" transform="rotate(-20 106 198)" />
            </g>
          ) : (
            /* Hands clasped gracefully on table */
            <g>
              <ellipse cx="92" cy="202" rx="10" ry="7" fill="#E2A676" />
              <ellipse cx="108" cy="202" rx="10" ry="7" fill="#E2A676" />
              <circle cx="100" cy="202" r="5" fill="#F0B587" />
            </g>
          )}
        </g>

        {/* Head & Face Group */}
        <g
          id="namita-head"
          style={{
            transform: getHeadTransform(),
            transformOrigin: '100px 145px',
            transition: 'transform 0.25s ease-out',
          }}
        >
          {/* Back Voluminous Wavy Hair */}
          <path
            d="M 62 82 C 55 125 58 150 68 165 C 74 168 78 152 78 135 C 78 110 78 85 78 82 Z"
            fill="#271C19"
          />
          <path
            d="M 138 82 C 145 125 142 150 132 165 C 126 168 122 152 122 135 C 122 110 122 85 122 82 Z"
            fill="#271C19"
          />

          {/* Neck */}
          <rect x="92" y="132" width="16" height="22" fill="#E2A676" />

          {/* Face (Serene, soft structured oval) */}
          <path
            d="M 72 82 Q 70 124 84 135 Q 100 144 116 135 Q 130 124 128 82 Q 128 52 100 52 Q 72 52 72 82 Z"
            fill="url(#namitaSkin)"
          />

          {/* Ears with Diamond Earring drop */}
          <ellipse cx="71" cy="98" rx="5" ry="9" fill="#E2A676" />
          <circle cx="70" cy="104" r="2.5" fill="#38BDF8" stroke="#F8FAFC" strokeWidth="0.8" />
          <ellipse cx="129" cy="98" rx="5" ry="9" fill="#E2A676" />
          <circle cx="130" cy="104" r="2.5" fill="#38BDF8" stroke="#F8FAFC" strokeWidth="0.8" />

          {/* Namita's Styled Wavy Hair with warm brown highlights */}
          <path
            d="M 66 78 C 64 42 84 36 100 36 C 122 36 136 46 134 78 C 128 58 114 52 100 52 C 84 52 74 60 66 78 Z"
            fill="#271C19"
          />
          {/* Rich textured side waves */}
          <path
            d="M 66 72 Q 58 98 68 122 Q 72 110 74 92 Z"
            fill="#3F2E29"
          />
          <path
            d="M 134 72 Q 142 98 132 122 Q 128 110 126 92 Z"
            fill="#3F2E29"
          />

          {/* Eyebrows (Graceful curved arches) */}
          <path
            d="M 76 80 Q 85 76 94 81"
            stroke="#271C19"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
            style={{
              transform: brows.left,
              transformOrigin: '85px 79px',
              transition: 'transform 0.2s ease',
            }}
          />
          <path
            d="M 106 81 Q 115 76 124 80"
            stroke="#271C19"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
            style={{
              transform: brows.right,
              transformOrigin: '115px 79px',
              transition: 'transform 0.2s ease',
            }}
          />

          {/* Eyes with mascara & CSS blinking */}
          <g className="animate-[blink_4.5s_infinite]">
            <ellipse cx="85" cy="92" rx="5.5" ry="4" fill="#FFFFFF" />
            <circle cx="85" cy="92" r="2.6" fill="#271C19" />
            <circle cx="86" cy="91" r="1" fill="#FFFFFF" />

            <ellipse cx="115" cy="92" rx="5.5" ry="4" fill="#FFFFFF" />
            <circle cx="115" cy="92" r="2.6" fill="#271C19" />
            <circle cx="116" cy="91" r="1" fill="#FFFFFF" />
          </g>

          {/* Soft Nose */}
          <path d="M 100 89 L 98 107 L 102 108" stroke="#BD8256" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Sophisticated Rose Red Lips */}
          {getMouthShape()}
        </g>
      </svg>
    </div>
  );
};
