import React from 'react';

interface DandaProps {
  className?: string;
}

export const WoodenDanda3D: React.FC<DandaProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center animate-3d-danda-spin ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
      >
        <defs>
          <linearGradient id="danda3DWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="35%" stopColor="#B45309" />
            <stop offset="70%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
          <linearGradient id="brassRivet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Polished Solid Wood Danda Shaft */}
        <path
          d="M 28 172 L 158 32 Q 172 22 182 32 Q 188 42 178 56 L 44 192 Q 30 196 24 186 Q 20 176 28 172 Z"
          fill="url(#danda3DWood)"
          stroke="#291807"
          strokeWidth="3.5"
        />

        {/* Highlight sheen along top edge */}
        <path
          d="M 32 170 L 160 35"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Decorative Brass Rings / Rivets */}
        <line x1="44" y1="156" x2="58" y2="170" stroke="url(#brassRivet)" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="54" y1="146" x2="68" y2="160" stroke="url(#brassRivet)" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="64" y1="136" x2="78" y2="150" stroke="url(#brassRivet)" strokeWidth="4.5" strokeLinecap="round" />

        {/* Comic Impact Blast */}
        <circle cx="168" cy="38" r="16" fill="#FDE047" opacity="0.8" className="animate-ping" />
        <path d="M 142 16 L 156 30" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        <path d="M 184 12 L 174 30" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        <path d="M 194 52 L 176 46" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
};

interface CoinProps {
  className?: string;
  label?: string;
}

export const GoldDealCoin3D: React.FC<CoinProps> = ({ className = '', label = 'DEAL OFFERED' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center animate-3d-coin-rotate pointer-events-none z-40 ${className}`}>
      {/* 3D Gold Coin Token */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-1.5 shadow-[0_10px_30px_rgba(245,158,11,0.6)] border-2 border-yellow-200 flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-500 via-yellow-300 to-amber-600 border border-yellow-100/80 flex items-center justify-center shadow-inner">
          <span className="text-3xl sm:text-4xl font-black text-amber-950 filter drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
            ₹
          </span>
        </div>
        {/* Shimmer light badge */}
        <div className="absolute top-1 right-2 text-sm animate-ping">✨</div>
      </div>
      {label && (
        <span className="mt-1.5 px-3 py-0.5 rounded-full bg-amber-500/90 border border-yellow-300 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-md">
          {label}
        </span>
      )}
    </div>
  );
};
