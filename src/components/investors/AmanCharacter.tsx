import React from 'react';
import { EmotionState } from '../../types/game';

interface Props {
  emotion: EmotionState;
  isSpeaking: boolean;
  className?: string;
}

export const AmanCharacter: React.FC<Props> = ({ emotion, isSpeaking, className = '' }) => {
  const getEyebrowTransform = () => {
    switch (emotion) {
      case 'angry':
        return { left: 'rotate(12deg) translateY(3px)', right: 'rotate(-12deg) translateY(3px)' };
      case 'confused':
        return { left: 'rotate(-15deg) translateY(-5px)', right: 'rotate(0deg) translateY(0px)' };
      case 'impressed':
        return { left: 'translateY(-4px) rotate(4deg)', right: 'translateY(-4px) rotate(-4deg)' };
      case 'laughing':
        return { left: 'translateY(-2px) rotate(-8deg)', right: 'translateY(-2px) rotate(8deg)' };
      case 'rejecting':
        return { left: 'rotate(8deg) translateY(2px)', right: 'rotate(-8deg) translateY(2px)' };
      default:
        return { left: 'rotate(0deg)', right: 'rotate(0deg)' };
    }
  };

  const getMouthShape = () => {
    if (isSpeaking) {
      return (
        <path
          d="M 88 126 Q 100 142 112 126 Q 100 132 88 126 Z"
          fill="#5B1111"
          className="animate-pulse"
        />
      );
    }
    switch (emotion) {
      case 'angry':
        return <path d="M 88 132 Q 100 122 112 132" stroke="#5B1111" strokeWidth="3.5" strokeLinecap="round" fill="none" />;
      case 'impressed':
        return <path d="M 86 124 Q 100 140 114 124 Z" fill="#991B1B" stroke="#0F172A" strokeWidth="1.5" />;
      case 'laughing':
        return <path d="M 84 122 Q 100 146 116 122 Z" fill="#991B1B" stroke="#0F172A" strokeWidth="1.5" />;
      case 'confused':
        return <path d="M 88 129 Q 102 124 112 130" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />;
      case 'rejecting':
        return <path d="M 88 133 L 112 131" stroke="#334155" strokeWidth="3" strokeLinecap="round" fill="none" />;
      default:
        // Friendly smile
        return <path d="M 88 126 Q 100 136 112 126" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" fill="none" />;
    }
  };

  const getHeadTransform = () => {
    switch (emotion) {
      case 'impressed':
        return 'translate(0px, 2px) rotate(3deg)';
      case 'confused':
        return 'translate(3px, -2px) rotate(6deg)';
      case 'laughing':
        return 'translate(0px, -5px) rotate(-3deg)';
      case 'angry':
        return 'translate(0px, 3px) rotate(-2deg)';
      case 'rejecting':
        return 'translate(-2px, 0px) rotate(4deg)';
      case 'questioning':
        return 'translate(0px, 4px) rotate(2deg) scale(1.02)';
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
          <linearGradient id="amanJacket" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="100%" stopColor="#1C1917" />
          </linearGradient>
          <linearGradient id="amanSkin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2A97B" />
            <stop offset="100%" stopColor="#CC8B58" />
          </linearGradient>
          <linearGradient id="amanTee" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>

        {/* Torso & Stylish Jacket */}
        <g id="aman-body">
          {/* Shoulders */}
          <path
            d="M 42 220 L 48 162 Q 62 150 90 150 Q 100 150 110 150 Q 138 150 152 162 L 158 220 Z"
            fill="url(#amanJacket)"
          />
          {/* Red Graphic Tee underneath */}
          <polygon points="90,150 110,150 100,186" fill="url(#amanTee)" />
          {/* Jacket Zipper & Collar details */}
          <path d="M 76 156 L 90 186 L 85 220" stroke="#44403C" strokeWidth="2.5" fill="none" />
          <path d="M 124 156 L 110 186 L 115 220" stroke="#44403C" strokeWidth="2.5" fill="none" />

          {/* Signature boAt Wireless Headphones / Neckband around Neck */}
          <g id="aman-headphones">
            {/* Neckband curve */}
            <path
              d="M 75 152 Q 100 170 125 152"
              stroke="#E11D48"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Metallic tips / earbuds dangling */}
            <circle cx="75" cy="154" r="5" fill="#1E293B" stroke="#E11D48" strokeWidth="1.5" />
            <circle cx="125" cy="154" r="5" fill="#1E293B" stroke="#E11D48" strokeWidth="1.5" />
          </g>

          {/* Animated Hands */}
          {emotion === 'impressed' ? (
            /* Thumbs up gesture */
            <g>
              <ellipse cx="78" cy="200" rx="12" ry="8" fill="#CC8B58" />
              {/* Thumbs up right hand */}
              <circle cx="126" cy="192" r="8" fill="#CC8B58" />
              <rect x="123" y="180" width="6" height="14" rx="3" fill="#D89768" />
            </g>
          ) : emotion === 'confused' ? (
            /* Hand scratching chin/head */
            <g>
              <ellipse cx="78" cy="202" rx="12" ry="8" fill="#CC8B58" />
              <path d="M 124 195 Q 135 170 130 148" stroke="#CC8B58" strokeWidth="8" strokeLinecap="round" fill="none" />
              <circle cx="130" cy="144" r="7" fill="#D89768" />
            </g>
          ) : (
            /* Hands casually placed on desk */
            <g>
              <ellipse cx="76" cy="202" rx="14" ry="7" fill="#CC8B58" />
              <ellipse cx="124" cy="202" rx="14" ry="7" fill="#CC8B58" />
            </g>
          )}
        </g>

        {/* Head & Face Group */}
        <g
          id="aman-head"
          style={{
            transform: getHeadTransform(),
            transformOrigin: '100px 145px',
            transition: 'transform 0.25s ease-out',
          }}
        >
          {/* Neck */}
          <rect x="91" y="132" width="18" height="22" fill="#CC8B58" />

          {/* Face (Chiseled, friendly oval face) */}
          <path
            d="M 70 82 Q 68 126 82 136 Q 100 146 118 136 Q 132 126 130 82 Q 130 50 100 50 Q 70 50 70 82 Z"
            fill="url(#amanSkin)"
          />

          {/* Trimmed modern beard / stubble along jawline */}
          <path
            d="M 74 108 Q 72 132 84 138 Q 100 144 116 138 Q 128 132 126 108 Q 120 128 100 132 Q 80 128 74 108 Z"
            fill="#5A3A22"
            opacity="0.38"
          />

          {/* Ears */}
          <ellipse cx="69" cy="96" rx="6" ry="10" fill="#CC8B58" />
          <ellipse cx="131" cy="96" rx="6" ry="10" fill="#CC8B58" />

          {/* Aman's Signature Modern Quiff / Pompadour Hairstyle */}
          <path
            d="M 68 76 C 65 38 88 32 104 32 C 124 32 136 44 134 76 C 128 60 114 56 100 56 C 84 56 74 62 68 76 Z"
            fill="#1C1917"
          />
          {/* Voluminous textured top quiff */}
          <path
            d="M 78 48 Q 98 28 116 36 Q 128 42 124 52 Q 102 44 78 48 Z"
            fill="#292524"
          />

          {/* Dynamic Eyebrows */}
          <rect
            x="76"
            y="79"
            width="17"
            height="4"
            rx="2"
            fill="#1C1917"
            style={{
              transform: brows.left,
              transformOrigin: '84px 81px',
              transition: 'transform 0.2s ease',
            }}
          />
          <rect
            x="107"
            y="79"
            width="17"
            height="4"
            rx="2"
            fill="#1C1917"
            style={{
              transform: brows.right,
              transformOrigin: '115px 81px',
              transition: 'transform 0.2s ease',
            }}
          />

          {/* Blinking Eyes */}
          <g className="animate-[blink_3.8s_infinite]">
            <ellipse cx="85" cy="91" rx="6" ry="4.5" fill="#FFFFFF" />
            <circle cx="86" cy="91" r="2.8" fill="#292524" />
            <circle cx="87" cy="90" r="1" fill="#FFFFFF" />

            <ellipse cx="115" cy="91" rx="6" ry="4.5" fill="#FFFFFF" />
            <circle cx="114" cy="91" r="2.8" fill="#292524" />
            <circle cx="115" cy="90" r="1" fill="#FFFFFF" />
          </g>

          {/* Nose */}
          <path d="M 100 88 L 97 108 L 103 109" stroke="#A66C40" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Dynamic Mouth */}
          {getMouthShape()}
        </g>
      </svg>
    </div>
  );
};
