import React from 'react';
import { StartupData } from '../../types/game';

interface Props {
  startup: StartupData;
  isBonked: boolean;
  isSlapped?: boolean;
  score: number;
  className?: string;
}

export const FounderPodium: React.FC<Props> = ({
  startup,
  isBonked,
  isSlapped = false,
  score,
  className = '',
}) => {
  const isPained = isBonked || isSlapped;

  const crop = startup.founderPhotoCrop || { zoom: 1, x: 0, y: 0 };
  const photoWidth = 56 * (crop.zoom || 1);
  const photoHeight = 80 * (crop.zoom || 1);
  const photoX = 81 - photoWidth / 2 + (crop.x || 0);
  const photoY = 85 - photoHeight / 2 + (crop.y || 0);

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Cartoon Sweat Drops if under pressure or score is low */}
      {score < 30 && !isPained && (
        <div className="absolute -top-4 right-8 animate-bounce text-cyan-300 text-lg">
          💧
        </div>
      )}

      {/* Comic Orbiting Stars and Dizzy Swirls on Bonk or Slap */}
      {isPained && (
        <div className="absolute -top-6 flex items-center justify-center space-x-2 z-30 animate-bounce">
          <span className="text-xl animate-spin">⭐</span>
          <span className="text-2xl animate-pulse">💫</span>
          <span className="text-xl animate-spin">⭐</span>
        </div>
      )}

      {/* Founder Character Illustration */}
      <div
        className={`relative w-16 sm:w-20 h-20 sm:h-24 transition-all duration-300 ${
          isPained ? 'animate-head-bonk' : 'animate-float-bob'
        }`}
      >
        <svg viewBox="0 0 160 200" className="w-full h-full filter drop-shadow-md">
          <defs>
            <linearGradient id="founderSkin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2A97B" />
              <stop offset="100%" stopColor="#CC8B58" />
            </linearGradient>
            <linearGradient id="founderHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            {/* Clip path for custom uploaded founder face */}
            <clipPath id="founderFaceClip">
              <path d="M 56 75 Q 54 112 66 122 Q 81 130 96 122 Q 108 112 106 75 Q 106 48 81 48 Q 56 48 56 75 Z" />
            </clipPath>
          </defs>

          {/* Shoulders & Casual Founder Tech Hoodie */}
          <path
            d="M 30 200 L 36 145 Q 50 135 75 135 Q 85 135 105 135 Q 120 135 130 145 L 136 200 Z"
            fill="url(#founderHoodie)"
          />
          {/* White inner t-shirt */}
          <polygon points="72,135 90,135 81,160" fill="#FFFFFF" />

          {/* Head & Face */}
          <g
            transform={
              isSlapped
                ? 'rotate(-18 80 90) translate(-8, 3)'
                : isBonked
                ? 'rotate(8 80 90)'
                : 'rotate(0)'
            }
          >
            {/* Neck */}
            <rect x="73" y="118" width="16" height="20" fill="#CC8B58" />

            {/* Face Shape / Background */}
            <path
              d="M 56 75 Q 54 112 66 122 Q 81 130 96 122 Q 108 112 106 75 Q 106 48 81 48 Q 56 48 56 75 Z"
              fill="url(#founderSkin)"
            />

            {/* Custom Uploaded Founder Photo if available */}
            {startup.founderPhoto ? (
              <>
                <g clipPath="url(#founderFaceClip)">
                  <image
                    href={startup.founderPhoto}
                    x={photoX}
                    y={photoY}
                    width={photoWidth}
                    height={photoHeight}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
                {/* Crying Expression Overlay for Custom Photo */}
                {isPained && (
                  <>
                    {/* Sad wobbly mouth overlay */}
                    <path
                      d="M 72 108 Q 80 102 88 108"
                      stroke="#0F172A"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      fill="none"
                    />
                    {/* Crying eye squint lines */}
                    <path
                      d="M 64 78 L 71 82 L 64 86"
                      stroke="#0F172A"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M 98 78 L 91 82 L 98 86"
                      stroke="#0F172A"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {/* Default Hair (Messy startup founder hair) */}
                <path
                  d="M 53 70 C 50 40 70 34 82 34 C 100 34 112 42 109 70 C 103 55 94 50 81 50 C 67 50 58 58 53 70 Z"
                  fill="#1E293B"
                />

                {/* Ears */}
                <ellipse cx="54" cy="85" rx="5" ry="8" fill="#CC8B58" />
                <ellipse cx="108" cy="85" rx="5" ry="8" fill="#CC8B58" />

                {/* Eyebrows */}
                {isPained ? (
                  <g>
                    {/* Sad angled crying eyebrows */}
                    <line x1="60" y1="76" x2="72" y2="70" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
                    <line x1="88" y1="70" x2="100" y2="76" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
                  </g>
                ) : (
                  <g>
                    <line x1="62" y1="71" x2="74" y2="71" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="86" y1="71" x2="98" y2="71" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                )}

                {/* Eyes */}
                {isSlapped ? (
                  /* Dramatic shut crying eyes (> <) */
                  <g>
                    <path d="M 63 80 L 71 83 L 63 86" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <path d="M 99 80 L 91 83 L 99 86" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </g>
                ) : isBonked ? (
                  /* Dazed spiral / X eyes when bonked */
                  <g>
                    <text x="62" y="86" fontSize="12" fill="#0F172A" fontWeight="bold">X</text>
                    <text x="88" y="86" fontSize="12" fill="#0F172A" fontWeight="bold">X</text>
                  </g>
                ) : (
                  /* Normal eager eyes */
                  <g className="animate-[blink_4s_infinite]">
                    <ellipse cx="68" cy="82" rx="4.5" ry="3.5" fill="#FFFFFF" />
                    <circle cx="68" cy="82" r="2.2" fill="#0F172A" />
                    <ellipse cx="92" cy="82" rx="4.5" ry="3.5" fill="#FFFFFF" />
                    <circle cx="92" cy="82" r="2.2" fill="#0F172A" />
                  </g>
                )}

                {/* Glasses */}
                <rect x="59" y="76" width="18" height="12" rx="2" fill="none" stroke="#2563EB" strokeWidth="1.8" />
                <rect x="83" y="76" width="18" height="12" rx="2" fill="none" stroke="#2563EB" strokeWidth="1.8" />
                <line x1="77" y1="81" x2="83" y2="81" stroke="#2563EB" strokeWidth="1.8" />

                {/* Mouth */}
                {isSlapped ? (
                  /* Wailing open crying mouth */
                  <g>
                    <path d="M 72 105 Q 80 118 88 105 Z" fill="#7F1D1D" stroke="#0F172A" strokeWidth="2" />
                    <ellipse cx="80" cy="111" rx="4" ry="2.5" fill="#F87171" />
                  </g>
                ) : isBonked ? (
                  /* Wobbly mouth */
                  <path d="M 72 108 Q 76 104 80 108 Q 84 112 88 108" stroke="#0F172A" strokeWidth="2.2" fill="none" />
                ) : score >= 60 ? (
                  /* Confident grin */
                  <path d="M 72 104 Q 80 114 88 104" stroke="#0F172A" strokeWidth="2.5" fill="none" />
                ) : (
                  /* Serious nervous mouth */
                  <path d="M 73 106 L 87 106" stroke="#0F172A" strokeWidth="2.2" fill="none" />
                )}
              </>
            )}

            {/* Funny Animated Falling Tears Streams on Both Cheeks */}
            {isPained && (
              <g>
                {/* Left Cheek Falling Tears Stream */}
                <g>
                  <path d="M 66 86 Q 63 100 65 116" stroke="#38BDF8" strokeWidth="2.5" fill="none" opacity="0.65" strokeLinecap="round" />
                  <circle cx="65" cy="88" r="3.2" fill="#0284C7">
                    <animate attributeName="cy" from="88" to="122" dur="0.75s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="0.75s" repeatCount="indefinite" />
                    <animate attributeName="r" values="2;3.5;2.5;1.5" keyTimes="0;0.3;0.8;1" dur="0.75s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="64" cy="96" r="2.8" fill="#38BDF8">
                    <animate attributeName="cy" from="94" to="124" dur="0.75s" begin="0.35s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="0.75s" begin="0.35s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="65" cy="118" r="3.2" fill="#0284C7" opacity="0.85" />
                </g>

                {/* Right Cheek Falling Tears Stream */}
                <g>
                  <path d="M 94 86 Q 97 100 95 116" stroke="#38BDF8" strokeWidth="2.5" fill="none" opacity="0.65" strokeLinecap="round" />
                  <circle cx="95" cy="88" r="3.2" fill="#0284C7">
                    <animate attributeName="cy" from="88" to="122" dur="0.75s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="0.75s" repeatCount="indefinite" />
                    <animate attributeName="r" values="2;3.5;2.5;1.5" keyTimes="0;0.3;0.8;1" dur="0.75s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="96" cy="96" r="2.8" fill="#38BDF8">
                    <animate attributeName="cy" from="94" to="124" dur="0.75s" begin="0.35s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="0.75s" begin="0.35s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="95" cy="118" r="3.2" fill="#0284C7" opacity="0.85" />
                </g>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* Modern Stage Pitch Podium */}
      <div className="w-24 sm:w-28 bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-t-lg border-t border-x border-amber-400/60 py-0.5 sm:py-1 px-1.5 text-center shadow-lg -mt-1 z-10">
        <p className="text-[9px] uppercase tracking-wider text-amber-300 font-bold truncate">
          {startup.name}
        </p>
        <div className="h-0.5 w-full bg-amber-400/40 my-0.5" />
        <p className="text-[8px] text-slate-400 truncate">
          {startup.industry}
        </p>
      </div>
    </div>
  );
};
