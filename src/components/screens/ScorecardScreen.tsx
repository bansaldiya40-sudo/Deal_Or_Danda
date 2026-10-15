import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  StartupData,
  InvestorOffer,
  PitchRoundResult,
} from '../../types/game';
import { formatRupees } from '../../utils/valuation';
import { sound } from '../../utils/audio';
import {
  Trophy,
  Award,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface Props {
  startup: StartupData;
  score: number;
  dandaCount: number;
  pitchResults: PitchRoundResult[];
  acceptedDeal: InvestorOffer | null;
  onPlayAgain: () => void;
}

export const ScorecardScreen: React.FC<Props> = ({
  startup,
  score,
  dandaCount,
  pitchResults,
  acceptedDeal,
  onPlayAgain,
}) => {
  // Determine final ending type
  const isDeal = !!acceptedDeal;
  const isDandaEnding = dandaCount >= 2 || (score < 40 && !isDeal);
  const isNoDeal = !isDeal && !isDandaEnding;

  useEffect(() => {
    if (isDeal) {
      sound.playDealFanfare();
      // Fire confetti burst!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    } else if (isDandaEnding) {
      sound.playBuzz();
    } else {
      sound.playCorrect();
    }
  }, [isDeal, isDandaEnding]);

  // Identify strongest and weakest moments from pitchResults
  const bestRound = [...pitchResults].sort((a, b) => b.pointsAwarded - a.pointsAwarded)[0];
  const worstRound = [...pitchResults].sort((a, b) => a.pointsAwarded - b.pointsAwarded)[0];

  // 3 Actionable Improvements tailored to startup metrics & answers
  const actionableAdvice = [
    startup.monthlyExpenses > startup.monthlyRevenue
      ? 'Unit Economics & Burn: Focus on reaching contribution-margin breakeven before pitching aggressive valuations.'
      : 'Capital Efficiency: Great cash discipline! Leverage healthy margins to negotiate lower equity dilution next time.',
    worstRound?.dandaTriggered
      ? 'Avoid Vanity Metrics: Replace buzzwords and top-down fantasies with validated cohort retention and bottom-up sales data.'
      : 'Moat Defensibility: Continue hardening your proprietary IP and exclusive contracts against fast followers.',
    'Valuation Realism: Anchor valuation asks to 4x-8x current trailing ARR multiples for faster shark alignment in Indian markets.',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-none animate-fade-in">
      {/* Verdict Hero Banner */}
      <div className="text-center mb-8">
        {isDeal ? (
          <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-500 shadow-[0_0_50px_rgba(16,185,129,0.4)]">
            <div className="px-8 py-5 rounded-3xl bg-slate-950 flex flex-col items-center">
              <span className="text-5xl mb-2">🎉</span>
              <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-amber-400 m-0 uppercase tracking-tight">
                DEAL SECURED! 🤝
              </h2>
              <p className="text-sm sm:text-lg font-bold text-slate-200 mt-2">
                Partnered with {acceptedDeal?.investorName} for{' '}
                <span className="text-amber-400">
                  {formatRupees(acceptedDeal?.amount || 0)} at {acceptedDeal?.equity}% equity
                </span>
                !
              </p>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Post-Money Valuation: {formatRupees(acceptedDeal?.postMoneyValuation || 0)}
              </p>
            </div>
          </div>
        ) : isDandaEnding ? (
          <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-red-600 via-amber-500 to-red-600 shadow-[0_0_50px_rgba(220,38,38,0.5)]">
            <div className="px-8 py-5 rounded-3xl bg-slate-950 flex flex-col items-center">
              <span className="text-5xl mb-2">🏏</span>
              <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-red-500 m-0 uppercase tracking-tight">
                DEAL NAHI MILA… DANDA MILA! 💥
              </h2>
              <p className="text-sm sm:text-lg font-bold text-red-300 mt-2">
                Confidence was 100%, but preparation was 2%!
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Zero deals secured! Received {dandaCount} cartoon bonk moments and danda strikes. Back to the drawing board!
              </p>
            </div>
          </div>
        ) : (
          <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-slate-700 via-cyan-500 to-slate-700 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
            <div className="px-8 py-5 rounded-3xl bg-slate-950 flex flex-col items-center">
              <span className="text-5xl mb-2">⚖️</span>
              <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-cyan-300 to-white m-0 uppercase tracking-tight">
                NO DEAL (HONORABLE EXIT)
              </h2>
              <p className="text-sm sm:text-lg font-bold text-slate-300 mt-2">
                A solid pitch, but valuation and category alignment did not close today.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                The sharks respected your hustle. Maintain your equity and scale independently!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Score & Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Pitch Score Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center flex flex-col justify-center items-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-2">
            <Trophy size={24} />
          </div>
          <p className="text-xs text-slate-400 uppercase font-semibold">Pitch Score</p>
          <p className="text-3xl font-black text-white mt-1 font-mono">
            {score}<span className="text-base text-slate-400 font-normal">/100</span>
          </p>
          <p className="text-[10px] text-amber-300 mt-1 font-bold">
            {score >= 80 ? 'Elite Tank Performance' : score >= 50 ? 'Promising Venture' : 'Needs Fundamental Rework'}
          </p>
        </div>

        {/* Danda Bonks Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center flex flex-col justify-center items-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-2 text-2xl">
            🏏
          </div>
          <p className="text-xs text-slate-400 uppercase font-semibold">Danda Count</p>
          <p className="text-3xl font-black text-white mt-1 font-mono">
            {dandaCount}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            {dandaCount === 0 ? 'Zero Dandas! Pure discipline!' : `${dandaCount} Savage reality checks received`}
          </p>
        </div>

        {/* Valuation Result */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center flex flex-col justify-center items-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-2">
            <TrendingUp size={24} />
          </div>
          <p className="text-xs text-slate-400 uppercase font-semibold">Final Outcome</p>
          <p className="text-lg font-black text-cyan-300 mt-1">
            {isDeal ? formatRupees(acceptedDeal?.postMoneyValuation || 0) : 'Bootstrapped'}
          </p>
          <p className="text-[10px] text-slate-400 mt-1">
            {isDeal ? 'Capital Secured' : '100% Founder Equity Kept'}
          </p>
        </div>
      </div>

      {/* Pitch Highlights: Strongest & Weakest Part */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Strongest Moment */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-1">
            <CheckCircle2 size={16} />
            <span>Strongest Pitch Moment</span>
          </div>
          <p className="text-xs text-slate-200 mt-1">
            {bestRound?.feedback || 'Consistent and balanced answers across rounds.'}
          </p>
          <p className="text-[10px] text-emerald-300 mt-2 font-mono">
            Awarded +{bestRound?.pointsAwarded || 15} points
          </p>
        </div>

        {/* Weakest Moment */}
        <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30">
          <div className="flex items-center space-x-2 text-red-400 font-bold text-sm mb-1">
            <XCircle size={16} />
            <span>Toughest Shark Moment</span>
          </div>
          <p className="text-xs text-slate-200 mt-1">
            {worstRound?.feedback || 'All rounds handled adequately.'}
          </p>
          <p className="text-[10px] text-red-300 mt-2 font-mono">
            {worstRound?.dandaTriggered ? 'Triggered Danda Bonk 🏏' : 'Needs sharper metrics next time'}
          </p>
        </div>
      </div>

      {/* Actionable Startup Improvements */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 mb-8">
        <h3 className="text-sm font-bold text-amber-300 mb-3 flex items-center space-x-2">
          <Sparkles size={16} />
          <span>3 Actionable Startup Lessons for {startup.name}</span>
        </h3>
        <ul className="space-y-2.5">
          {actionableAdvice.map((advice, idx) => (
            <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0 mt-0.5 text-[10px]">
                {idx + 1}
              </span>
              <span>{advice}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Play Again CTA */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onPlayAgain();
          }}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2 cursor-pointer uppercase tracking-wider"
        >
          <RotateCcw size={20} />
          <span>Pitch Another Startup</span>
        </button>
      </div>
    </div>
  );
};
