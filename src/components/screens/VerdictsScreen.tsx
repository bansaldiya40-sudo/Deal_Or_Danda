import React, { useState, useEffect } from 'react';
import {
  StartupData,
  InvestorOffer,
  PitchRoundResult,
  InvestorId,
  EmotionState,
} from '../../types/game';
import { INVESTORS } from '../../data/investors';
import { formatRupees, calculateValuation } from '../../utils/valuation';
import { sound } from '../../utils/audio';
import { InvestorDesk } from '../investors/InvestorDesk';
import { StageBackdrop } from '../stage/StageBackdrop';
import { FounderPodium } from '../stage/FounderPodium';
import { WoodenDanda3D, GoldDealCoin3D } from '../stage/Effects3D';
import { Volume2, ArrowRight, Zap, CheckCircle2, XCircle, RotateCcw, AlertOctagon } from 'lucide-react';

interface Props {
  startup: StartupData;
  score: number;
  dandaCount: number;
  pitchResults: PitchRoundResult[];
  onProceedToNegotiation: (activeOffers: InvestorOffer[]) => void;
  onSpecialDandaEnding: () => void;
}

export const VerdictsScreen: React.FC<Props> = ({
  startup,
  score,
  dandaCount,
  onProceedToNegotiation,
  onSpecialDandaEnding,
}) => {
  const [offers, setOffers] = useState<InvestorOffer[]>([]);
  // Sequential index of verdict being delivered: 0 -> 1 -> 2 -> 3 -> 4 (all finished)
  const [currentVerdictIndex, setCurrentVerdictIndex] = useState<number>(0);
  const [isDelivering, setIsDelivering] = useState<boolean>(false);
  const [speakingSharkId, setSpeakingSharkId] = useState<InvestorId | null>(null);
  const [subtitle, setSubtitle] = useState<string>('');
  const [finalDandaTriggered, setFinalDandaTriggered] = useState<boolean>(false);
  const [showDealCoin, setShowDealCoin] = useState<boolean>(false);

  // Individual shark emotions during verdicts
  const [emotions, setEmotions] = useState<Record<InvestorId, EmotionState>>({
    ashneer: 'idle',
    aman: 'idle',
    vineeta: 'idle',
    namita: 'idle',
  });

  const [quotes, setQuotes] = useState<Record<InvestorId, string>>({
    ashneer: '',
    aman: '',
    vineeta: '',
    namita: '',
  });

  const [outMap, setOutMap] = useState<Record<InvestorId, boolean>>({
    ashneer: false,
    aman: false,
    vineeta: false,
    namita: false,
  });

  // Calculate offers once on mount
  useEffect(() => {
    const generated: InvestorOffer[] = [];
    const annualRevenue = startup.monthlyRevenue * 12;
    const initialAskValuation = calculateValuation(startup.askAmount, startup.askEquity).postMoney;
    const revenueMultiple = annualRevenue > 0 ? initialAskValuation / annualRevenue : 99;

    INVESTORS.forEach((inv) => {
      let sharkInterest = score;

      if (inv.id === 'ashneer') {
        if (revenueMultiple > 20) sharkInterest -= 35;
        if (dandaCount > 0) sharkInterest -= 20 * dandaCount;
        if (startup.monthlyExpenses > startup.monthlyRevenue * 2) sharkInterest -= 20;
      }

      if (inv.id === 'aman') {
        if (
          startup.industry.includes('Consumer') ||
          startup.industry.includes('Food') ||
          startup.industry.includes('E-commerce')
        ) {
          sharkInterest += 15;
        }
        if (dandaCount > 1) sharkInterest -= 25;
      }

      if (inv.id === 'vineeta') {
        if (score >= 60) sharkInterest += 10;
        if (dandaCount > 0) sharkInterest -= 15;
      }

      if (inv.id === 'namita') {
        if (!startup.industry.includes('Health') && !startup.industry.includes('Food') && startup.industry.includes('Hardware')) {
          sharkInterest -= 25;
        }
        if (dandaCount > 0) sharkInterest -= 20;
      }

      // Check threshold for offer vs out
      if (sharkInterest >= 72) {
        const equity = sharkInterest >= 85 ? startup.askEquity : Math.min(25, startup.askEquity + 2);
        const { postMoney, preMoney } = calculateValuation(startup.askAmount, equity);
        generated.push({
          investorId: inv.id,
          investorName: inv.name,
          isOut: false,
          amount: startup.askAmount,
          equity,
          dealType: 'solo',
          message:
            equity === startup.askEquity
              ? `Main ready hoon aapke ask par: ${formatRupees(startup.askAmount)} for ${equity}%! Brilliant business fundamentals!`
              : `Product mein dum hai, par risk cushion chahiye: ${formatRupees(startup.askAmount)} for ${equity}% equity.`,
          postMoneyValuation: postMoney,
          preMoneyValuation: preMoney,
        });
      } else if (sharkInterest >= 50) {
        const higherEquity = Math.min(25, Math.max(startup.askEquity + 4, Math.round(startup.askEquity * 1.5)));
        const { postMoney, preMoney } = calculateValuation(startup.askAmount, higherEquity);
        generated.push({
          investorId: inv.id,
          investorName: inv.name,
          isOut: false,
          amount: startup.askAmount,
          equity: higherEquity,
          dealType: 'solo',
          message: `Category interesting hai par valuation expensive hai. Mera counter: ${formatRupees(startup.askAmount)} for ${higherEquity}% equity.`,
          postMoneyValuation: postMoney,
          preMoneyValuation: preMoney,
        });
      } else {
        let outReason = 'Main is deal mein OUT hoon. All the best!';
        if (inv.id === 'ashneer') {
          outReason = revenueMultiple > 20
            ? 'Bhai, valuation pure hawa mein hai! Main is valuation pe ek rupya nahi lagaunga. I am OUT!'
            : 'Numbers mein dum nahi laga mujhe. Dhandha scalable nahi hai. I am OUT.';
        } else if (inv.id === 'aman') {
          outReason = 'Yaar brand mein woh youth appeal aur swag missing hai. Hum competitor bana lenge. I am OUT boss.';
        } else if (inv.id === 'vineeta') {
          outReason = 'Unit economics aur repeat customer retention justify nahi ho rahe. Highly competitive space. I am OUT.';
        } else if (inv.id === 'namita') {
          outReason = 'Mujhe is sector mein expertise nahi hai, isliye main relate nahi kar pa rahi hoon. And for that reason, I am OUT.';
        }

        const { postMoney, preMoney } = calculateValuation(startup.askAmount, startup.askEquity);
        generated.push({
          investorId: inv.id,
          investorName: inv.name,
          isOut: true,
          amount: 0,
          equity: 0,
          dealType: 'solo',
          message: outReason,
          postMoneyValuation: postMoney,
          preMoneyValuation: preMoney,
        });
      }
    });

    setOffers(generated);
  }, [startup, score, dandaCount]);

  // Set up speech listener
  useEffect(() => {
    sound.setSpeakingListener((id, isSpeaking, text) => {
      setSpeakingSharkId(isSpeaking ? id : null);
      setSubtitle(isSpeaking && text ? text : '');
    });
  }, []);

  // Sequentially deliver each verdict
  const deliverVerdict = (index: number) => {
    if (index >= INVESTORS.length) {
      setCurrentVerdictIndex(INVESTORS.length);
      setIsDelivering(false);

      // Check if NO OFFERS were made
      const active = offers.filter((o) => !o.isOut);
      if (active.length === 0) {
        // Trigger Section H: Special Ending: No Offer = Final Danda!
        triggerFinalDandaEnding();
      }
      return;
    }

    const currentInv = INVESTORS[index];
    const currentOffer = offers.find((o) => o.investorId === currentInv.id);
    if (!currentOffer) return;

    setCurrentVerdictIndex(index);
    setIsDelivering(true);

    if (currentOffer.isOut) {
      // Rejection verdict
      sound.playVerdictOutSound();
      setOutMap((prev) => ({ ...prev, [currentInv.id]: true }));
      setEmotions((prev) => ({ ...prev, [currentInv.id]: 'rejecting' }));
      setQuotes((prev) => ({ ...prev, [currentInv.id]: currentOffer.message }));

      sound.speak(currentInv.id, currentOffer.message, () => {
        setIsDelivering(false);
      });
    } else {
      // Offer verdict
      sound.playVerdictOfferSound();
      setShowDealCoin(true);
      setTimeout(() => setShowDealCoin(false), 2400);
      setEmotions((prev) => ({ ...prev, [currentInv.id]: 'impressed' }));
      setQuotes((prev) => ({ ...prev, [currentInv.id]: currentOffer.message }));

      sound.speak(currentInv.id, currentOffer.message, () => {
        setIsDelivering(false);
      });
    }
  };

  // Start sequence when offers are calculated
  useEffect(() => {
    if (offers.length === 4 && currentVerdictIndex === 0 && !isDelivering) {
      deliverVerdict(0);
    }
  }, [offers]);

  const handleNextVerdict = () => {
    sound.stopSpeaking();
    sound.playClick();
    const nextIndex = currentVerdictIndex + 1;
    deliverVerdict(nextIndex);
  };

  const handleFastForwardAll = () => {
    sound.stopSpeaking();
    sound.playClick();
    // Reveal all verdicts at once
    const newOutMap: Record<InvestorId, boolean> = { ashneer: false, aman: false, vineeta: false, namita: false };
    const newQuotes: Record<InvestorId, string> = { ashneer: '', aman: '', vineeta: '', namita: '' };
    const newEmotions: Record<InvestorId, EmotionState> = { ashneer: 'idle', aman: 'idle', vineeta: 'idle', namita: 'idle' };

    offers.forEach((o) => {
      newOutMap[o.investorId] = o.isOut;
      newQuotes[o.investorId] = o.message;
      newEmotions[o.investorId] = o.isOut ? 'rejecting' : 'impressed';
    });

    setOutMap(newOutMap);
    setQuotes(newQuotes);
    setEmotions(newEmotions);
    setCurrentVerdictIndex(INVESTORS.length);
    setIsDelivering(false);

    const active = offers.filter((o) => !o.isOut);
    if (active.length === 0) {
      triggerFinalDandaEnding();
    }
  };

  const triggerFinalDandaEnding = () => {
    setFinalDandaTriggered(true);
    sound.playFinalDandaSound();
    sound.speak(
      'ashneer',
      'Bhai, dhandha band karo aur time waste mat karo! DEAL NAHI MILA… DANDA MILA!'
    );
  };

  const activeOffers = offers.filter((o) => !o.isOut);
  const isAllDelivered = currentVerdictIndex >= INVESTORS.length;
  const currentInv = INVESTORS[currentVerdictIndex] || null;

  return (
    <div className="relative max-w-5xl mx-auto px-3 sm:px-4 py-4 select-none">
      {/* Special Ending: No Offer = Final Danda Dramatic Overlay (Section H) */}
      {finalDandaTriggered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in text-center">
          {/* Pulsing Red Stage Warning Lights */}
          <div className="absolute inset-0 border-8 border-red-600/60 pointer-events-none animate-pulse" />

          <div className="relative z-10 max-w-md w-full bg-slate-950/95 border-4 border-red-600 rounded-3xl p-6 shadow-[0_0_80px_rgba(239,68,68,0.7)] text-slate-100 flex flex-col items-center">
            {/* 3D Wooden Danda that spins into the scene with comic impact effect */}
            <div className="relative w-36 h-36 my-1 flex items-center justify-center">
              <WoodenDanda3D className="w-full h-full" />
            </div>

            {/* Exact Stamp Graphic Requirement */}
            <div className="animate-stamp-zoom my-3">
              <div className="px-6 py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-xl sm:text-2xl uppercase tracking-widest rounded-2xl border-2 border-yellow-300 shadow-[0_0_35px_rgba(239,68,68,0.9)] transform -rotate-2">
                💥 DEAL NAHI MILA… DANDA MILA! 💥
              </div>
            </div>

            {/* Cashneer's Final Savage Roasting Verdict */}
            <div className="my-3 p-3.5 rounded-xl bg-red-950/50 border border-red-800 text-xs text-amber-200">
              <p className="font-bold text-sm">
                “Bhai, dhandha band karo aur time waste mat karo! Pitch galat, toh danda! All four sharks are OUT!”
              </p>
              <p className="text-[11px] text-red-300 mt-1 font-mono">
                — Cashneer Grover delivers the final verdict
              </p>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Excessive dandas ({dandaCount}) and negative margins led to zero investor offers.
            </p>

            <button
              onClick={onSpecialDandaEnding}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 text-slate-950 font-black text-base uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>View Pitch Scorecard & Performance ➔</span>
            </button>
          </div>
        </div>
      )}

      {/* Stage Backdrop (Jumbo LED Screen) */}
      <StageBackdrop
        startup={startup}
        score={score}
        dandaCount={dandaCount}
        currentRound={5}
        totalRounds={5}
      />

      {/* Four Animated Sharks behind the Desk with Spotlights */}
      <div className="my-2 sm:my-4">
        <InvestorDesk
          activeAskerId={currentInv?.id}
          speakingInvestorId={speakingSharkId}
          investorEmotions={emotions}
          investorQuotes={quotes}
          outInvestors={outMap}
          subtitleText={subtitle}
          onReplayVoice={(id) => {
            const offer = offers.find((o) => o.investorId === id);
            if (offer) sound.speak(id, offer.message);
          }}
        />
      </div>

      {/* 3D Deal Celebration: Gold Investment Token rotating toward the founder */}
      {showDealCoin && (
        <div className="flex justify-center -mb-8 relative z-30 pointer-events-none">
          <GoldDealCoin3D label="SHARK OFFER EXTENDED! 💰" />
        </div>
      )}

      {/* Founder Standing at Podium */}
      <div className="flex justify-center -mt-4 mb-4">
        <FounderPodium startup={startup} isBonked={false} score={score} />
      </div>

      {/* Sequential Verdict Tracker Banner */}
      <div className="bg-slate-900/95 border-2 border-indigo-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center space-x-2">
              <span>Final Investor Verdicts</span>
              <span className="text-amber-400">⚖️</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Each investor delivers their verdict sequentially based on your pitch performance.
            </p>
          </div>

          {!isAllDelivered && (
            <button
              onClick={handleFastForwardAll}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Skip to Summary ⏩</span>
            </button>
          )}
        </div>

        {/* 4 Verdict Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {INVESTORS.map((inv, idx) => {
            const offer = offers.find((o) => o.investorId === inv.id);
            const isRevealed = idx <= currentVerdictIndex;
            const isCurrentlySpeaking = currentVerdictIndex === idx && !isAllDelivered;

            if (!offer || !isRevealed) {
              return (
                <div
                  key={inv.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center opacity-40 flex flex-col items-center justify-center min-h-[140px]"
                >
                  <span className="text-2xl mb-1">⏳</span>
                  <p className="text-xs font-bold text-slate-400">{inv.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">Awaiting Verdict...</p>
                </div>
              );
            }

            return (
              <div
                key={inv.id}
                className={`p-3.5 rounded-xl border transition-all duration-500 flex flex-col justify-between ${
                  isCurrentlySpeaking
                    ? 'ring-2 ring-amber-400 bg-slate-900 shadow-[0_0_25px_rgba(245,158,11,0.3)] scale-102'
                    : offer.isOut
                    ? 'bg-rose-950/30 border-rose-900/60 text-slate-400'
                    : 'bg-emerald-950/30 border-emerald-500/50 text-slate-100 shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-black text-slate-200">{inv.name}</p>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        offer.isOut
                          ? 'bg-rose-900/60 text-rose-300 border border-rose-600'
                          : 'bg-emerald-500 text-slate-950 font-black'
                      }`}
                    >
                      {offer.isOut ? 'OUT ❌' : 'OFFER MADE! 💰'}
                    </span>
                  </div>

                  {!offer.isOut ? (
                    <div className="mb-2 p-2 rounded-lg bg-emerald-900/30 border border-emerald-500/40 text-center">
                      <p className="text-base sm:text-lg font-black text-emerald-400">
                        {formatRupees(offer.amount)} for {offer.equity}%
                      </p>
                      <p className="text-[10px] text-emerald-300/80 font-mono">
                        Valuation: {formatRupees(offer.postMoneyValuation)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-rose-300 italic mb-2">
                      Passed on investment
                    </p>
                  )}

                  <p className="text-[11px] text-slate-300 line-clamp-3 leading-snug">
                    "{offer.message}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => sound.speak(inv.id, offer.message)}
                    className="p-1 rounded bg-slate-850 hover:bg-amber-400 hover:text-slate-950 text-amber-400 transition-colors cursor-pointer"
                    title={`Hear ${inv.name}'s verdict`}
                  >
                    <Volume2 size={13} />
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {offer.isOut ? 'Reason Recorded' : 'Term Sheet Ready'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button: Next Verdict or Proceed to Negotiation */}
        <div className="mt-5 flex items-center justify-end">
          {!isAllDelivered ? (
            <button
              onClick={handleNextVerdict}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
            >
              <span>Next Verdict ➔</span>
            </button>
          ) : activeOffers.length > 0 ? (
            <button
              onClick={() => onProceedToNegotiation(activeOffers)}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-base uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Proceed to Shark Negotiations ({activeOffers.length} {activeOffers.length === 1 ? 'Offer' : 'Offers'}) ➔</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={onSpecialDandaEnding}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-base uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>No Offers Received — View Scorecard ➔</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
