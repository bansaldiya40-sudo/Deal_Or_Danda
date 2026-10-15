import React from 'react';
import { StartupData } from '../../types/game';
import { formatRupees, calculateValuation } from '../../utils/valuation';

interface Props {
  startup: StartupData;
  score: number;
  dandaCount: number;
  currentRound: number;
  totalRounds: number;
}

export const StageBackdrop: React.FC<Props> = ({
  startup,
  score,
  dandaCount,
  currentRound,
  totalRounds,
}) => {
  const { postMoney } = calculateValuation(startup.askAmount, startup.askEquity);

  // Calculate pitch temperature
  const getPitchStatus = () => {
    if (score >= 75) return { text: 'HIGH DEAL 🔥', color: 'text-emerald-400 border-emerald-500/60 bg-emerald-950/40' };
    if (score >= 45) return { text: 'NEGOTIATION ⚖️', color: 'text-amber-400 border-amber-500/60 bg-amber-950/40' };
    return { text: 'DANGER 🏏', color: 'text-red-400 border-red-500/60 bg-red-950/40 animate-pulse' };
  };

  const status = getPitchStatus();

  return (
    <div className="relative w-full max-w-5xl mx-auto mb-1 select-none">
      {/* Studio Stage LED Compact HUD Screen */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-indigo-500/30 px-2.5 sm:px-3 py-1.5 shadow-[0_2px_15px_rgba(30,27,75,0.5)] backdrop-blur-md">
        {/* Subtle LED Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

        <div className="relative z-10 flex items-center justify-between gap-1.5 sm:gap-3 flex-wrap">
          {/* Left: Round & Startup Key Metrics */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            {/* Live Round Badge */}
            <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-indigo-950/90 border border-indigo-500/40 shrink-0">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-indigo-200 uppercase">
                ROUND {Math.min(currentRound, totalRounds)}/{totalRounds}
              </span>
            </div>

            {/* The Ask */}
            <div className="flex items-center space-x-1 text-[11px] sm:text-xs">
              <span className="text-slate-400 text-[10px] sm:text-[11px]">Ask:</span>
              <span className="font-bold text-amber-400 font-mono">{formatRupees(startup.askAmount)}</span>
              <span className="text-slate-400 text-[10px]">({startup.askEquity}%)</span>
            </div>

            {/* Implied Valuation */}
            <div className="hidden xs:flex items-center space-x-1 text-[11px] sm:text-xs">
              <span className="text-slate-400 text-[10px] sm:text-[11px]">Valuation:</span>
              <span className="font-bold text-cyan-400 font-mono">{formatRupees(postMoney)}</span>
            </div>

            {/* Monthly Sales */}
            <div className="hidden md:flex items-center space-x-1 text-[11px] sm:text-xs">
              <span className="text-slate-400 text-[10px] sm:text-[11px]">Sales:</span>
              <span className="font-bold text-emerald-400 font-mono">{formatRupees(startup.monthlyRevenue)}/mo</span>
            </div>
          </div>

          {/* Right: Tank Sentiment + Dandas + Score */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs">
            {/* Tank Sentiment Pill */}
            <div className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold ${status.color}`}>
              {status.text}
            </div>

            {/* Danda Count */}
            <div className="px-2 py-0.5 rounded-md bg-red-950/80 border border-red-500/50 text-red-300 font-bold flex items-center space-x-1 text-[10px] sm:text-[11px]">
              <span>🏏</span>
              <span className="text-white font-mono">{dandaCount}</span>
            </div>

            {/* Pitch Score */}
            <div className="px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/50 text-amber-300 font-bold flex items-center space-x-1 text-[10px] sm:text-[11px]">
              <span className="hidden xs:inline">Score:</span>
              <span className="text-white font-mono font-black">{score}/100</span>
            </div>
          </div>
        </div>

        {/* Integrated Bottom Micro Progress Bar */}
        <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-slate-800/80">
          <div
            className={`h-full transition-all duration-500 ${
              score >= 70
                ? 'bg-gradient-to-r from-amber-400 to-emerald-400'
                : score >= 40
                ? 'bg-gradient-to-r from-amber-500 to-amber-300'
                : 'bg-gradient-to-r from-red-600 to-red-400'
            }`}
            style={{ width: `${Math.max(5, Math.min(100, score))}%` }}
          />
        </div>
      </div>
    </div>
  );
};
