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
    if (score >= 75) return { text: 'HIGH DEAL PROBABILITY 🔥', color: 'text-emerald-400 border-emerald-500' };
    if (score >= 45) return { text: 'IN NEGOTIATION ZONE ⚖️', color: 'text-amber-400 border-amber-500' };
    return { text: 'CRITICAL DANDA DANGER 🏏', color: 'text-red-500 border-red-500 animate-pulse' };
  };

  const status = getPitchStatus();

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-4 select-none">
      {/* Studio Stage LED Jumbo Screen */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-indigo-950/70 to-slate-950 border-2 border-indigo-500/30 p-3 sm:p-5 shadow-[0_0_40px_rgba(30,27,75,0.7)] backdrop-blur-md">
        {/* Subtle LED Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,38,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

        {/* Top Header Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-indigo-900/60 pb-2 mb-3 gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-300 uppercase">
              LIVE PITCH ROUND {Math.min(currentRound, totalRounds)} / {totalRounds}
            </span>
          </div>

          {/* Danda Count Badge */}
          <div className="flex items-center space-x-3 text-xs">
            <div className="px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/60 text-red-300 font-bold flex items-center space-x-1">
              <span>🏏 Danda Hits:</span>
              <span className="text-white font-mono text-sm">{dandaCount}</span>
            </div>

            <div className="px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/60 text-amber-300 font-bold flex items-center space-x-1">
              <span>Pitch Score:</span>
              <span className="text-white font-mono text-sm">{score}/100</span>
            </div>
          </div>
        </div>

        {/* Central Startup Numbers Display */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {/* Ask Amount */}
          <div className="p-2 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">The Ask</p>
            <p className="text-lg sm:text-2xl font-black text-amber-400">
              {formatRupees(startup.askAmount)}
            </p>
            <p className="text-[10px] text-slate-400">for {startup.askEquity}% equity</p>
          </div>

          {/* Implied Valuation */}
          <div className="p-2 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Valuation</p>
            <p className="text-lg sm:text-2xl font-black text-cyan-400">
              {formatRupees(postMoney)}
            </p>
            <p className="text-[10px] text-slate-400">Post-Money Value</p>
          </div>

          {/* Monthly Sales */}
          <div className="p-2 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Monthly Sales</p>
            <p className="text-lg sm:text-2xl font-black text-emerald-400">
              {formatRupees(startup.monthlyRevenue)}
            </p>
            <p className="text-[10px] text-slate-400">Runway: {formatRupees(startup.monthlyExpenses)}/mo</p>
          </div>

          {/* Live Heat Status */}
          <div className="p-2 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-center">
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Tank Sentiment</p>
            <p className={`text-xs sm:text-sm font-black ${status.color}`}>
              {status.text}
            </p>
          </div>
        </div>

        {/* Pitch Score Progress Bar */}
        <div className="relative z-10 mt-3 pt-2">
          <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
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
    </div>
  );
};
