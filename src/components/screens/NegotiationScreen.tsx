import React, { useState, useEffect } from 'react';
import {
  StartupData,
  InvestorOffer,
  PitchRoundResult,
  InvestorId,
} from '../../types/game';
import { INVESTORS } from '../../data/investors';
import { formatRupees, calculateValuation } from '../../utils/valuation';
import { sound } from '../../utils/audio';
import { Check, X, Handshake, Sparkles, Scale, Volume2 } from 'lucide-react';

interface Props {
  startup: StartupData;
  score: number;
  dandaCount: number;
  pitchResults: PitchRoundResult[];
  onDealAccepted: (offer: InvestorOffer) => void;
  onNoDealAccepted: () => void;
}

export const NegotiationScreen: React.FC<Props> = ({
  startup,
  score,
  dandaCount,
  onDealAccepted,
  onNoDealAccepted,
}) => {
  const [offers, setOffers] = useState<InvestorOffer[]>([]);
  const [selectedOfferIndex, setSelectedOfferIndex] = useState<number | null>(null);

  // Counter-offer state
  const [isCountering, setIsCountering] = useState(false);
  const [counterEquity, setCounterEquity] = useState(startup.askEquity);
  const [counterFeedback, setCounterFeedback] = useState<string | null>(null);

  // Generate realistic offers when entering the room
  useEffect(() => {
    const generated: InvestorOffer[] = [];
    const annualRevenue = startup.monthlyRevenue * 12;
    const initialAskValuation = calculateValuation(startup.askAmount, startup.askEquity).postMoney;
    const revenueMultiple = annualRevenue > 0 ? initialAskValuation / annualRevenue : 99;

    INVESTORS.forEach((inv) => {
      let sharkInterest = score;

      // Cashneer penalizes high multiples and high burn heavily
      if (inv.id === 'ashneer') {
        if (revenueMultiple > 25) sharkInterest -= 35;
        if (dandaCount > 0) sharkInterest -= 20 * dandaCount;
        if (startup.monthlyExpenses > startup.monthlyRevenue * 2) sharkInterest -= 20;
      }

      // Demand cares about brand and youth appeal
      if (inv.id === 'aman') {
        if (startup.industry.includes('Consumer') || startup.industry.includes('Food') || startup.industry.includes('E-commerce')) {
          sharkInterest += 15;
        }
        if (dandaCount > 1) sharkInterest -= 25;
      }

      // Win-ita cares about gross margin and unit economics
      if (inv.id === 'vineeta') {
        if (score >= 65) sharkInterest += 10;
        if (dandaCount > 0) sharkInterest -= 15;
      }

      // Namita cares about sustainability and domain alignment
      if (inv.id === 'namita') {
        if (!startup.industry.includes('Health') && !startup.industry.includes('Food') && startup.industry.includes('Hardware')) {
          sharkInterest -= 25;
        }
        if (dandaCount > 0) sharkInterest -= 20;
      }

      // Determine outcome for this shark
      if (sharkInterest >= 75) {
        const equity = sharkInterest >= 88 ? startup.askEquity : Math.min(25, startup.askEquity + 2);
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
              ? `Main aapke requested valuation par ready hoon: ${formatRupees(startup.askAmount)} for ${equity}%. Zabardast pitch!`
              : `Product pasand aaya, but thoda cushion chahiye. ${formatRupees(startup.askAmount)} for ${equity}% equity.`,
          postMoneyValuation: postMoney,
          preMoneyValuation: preMoney,
        });
      } else if (sharkInterest >= 50) {
        const higherEquity = Math.min(25, Math.max(startup.askEquity + 4, Math.round(startup.askEquity * 1.6)));
        const { postMoney, preMoney } = calculateValuation(startup.askAmount, higherEquity);
        generated.push({
          investorId: inv.id,
          investorName: inv.name,
          isOut: false,
          amount: startup.askAmount,
          equity: higherEquity,
          dealType: 'solo',
          message: `Dhandha interesting hai par valuation bohot mehengi hai. Mera offer: ${formatRupees(startup.askAmount)} for ${higherEquity}% equity.`,
          postMoneyValuation: postMoney,
          preMoneyValuation: preMoney,
        });
      } else {
        let outReason = 'Main is deal mein OUT hoon! Foundation scalable honi chahiye.';
        if (inv.id === 'ashneer') {
          outReason = revenueMultiple > 25
            ? 'Bhai valuation bilkul hawa mein hai. Main is valuation pe ek paisa nahi lagaunga. I am OUT!'
            : 'Numbers convincing nahi hain. Dhandhe mein dum nahi laga. I am OUT.';
        } else if (inv.id === 'aman') {
          outReason = 'Yaar brand mein woh kick nahi hai. Hum bhi bana lenge. I am OUT boss.';
        } else if (inv.id === 'vineeta') {
          outReason = 'Unit economics aur CAC recovery period justify nahi ho rahe. Tough market. I am OUT.';
        }

        const { postMoney, preMoney } = calculateValuation(startup.askAmount, startup.askEquity);
        generated.push({
          investorId: inv.id,
          investorName: inv.name,
          isOut: true,
          outReason,
          amount: 0,
          equity: 0,
          dealType: 'solo',
          message: outReason,
          postMoneyValuation: postMoney,
          preMoneyValuation: preMoney,
        });
      }
    });

    // Check for joint offer
    const activeSharks = generated.filter((o) => !o.isOut);
    if (activeSharks.length >= 2) {
      const shark1 = activeSharks[0];
      const shark2 = activeSharks[1];
      const jointEquity = Math.round((shark1.equity + shark2.equity) / 2);
      const { postMoney, preMoney } = calculateValuation(startup.askAmount, jointEquity);

      generated.push({
        investorId: shark1.investorId,
        investorName: `${shark1.investorName} & ${shark2.investorName}`,
        isOut: false,
        amount: startup.askAmount,
        equity: jointEquity,
        dealType: 'joint',
        coInvestorId: shark2.investorId,
        message: `Joint Offer! Hum dono milkar ${formatRupees(startup.askAmount)} denge for ${jointEquity}% equity (${jointEquity / 2}% each)! Double mentorship!`,
        postMoneyValuation: postMoney,
        preMoneyValuation: preMoney,
      });
    }

    setOffers(generated);

    // Play dramatic rejection sound if any sharks are out
    const outCount = generated.filter((o) => o.isOut).length;
    if (outCount > 0) {
      setTimeout(() => sound.playRejectionSound(), 600);
    }
  }, [startup, score, dandaCount]);

  const activeOffers = offers.filter((o) => !o.isOut);
  const outSharks = offers.filter((o) => o.isOut);

  const handleSelectOffer = (idx: number) => {
    sound.playClick();
    setSelectedOfferIndex(idx);
    setIsCountering(false);
    setCounterFeedback(null);
    const offer = activeOffers[idx];
    if (offer) {
      sound.speak(offer.investorId, offer.message);
    }
  };

  const handleReplaySharkVoice = (id: InvestorId, message: string) => {
    sound.speak(id, message);
  };

  const handleAccept = (offer: InvestorOffer) => {
    sound.playDealFanfare();
    onDealAccepted(offer);
  };

  const handleRejectAll = () => {
    sound.playClick();
    onNoDealAccepted();
  };

  const handleProposeCounter = (baseOffer: InvestorOffer) => {
    sound.playClick();
    if (counterEquity >= baseOffer.equity) {
      setCounterFeedback('Counter equity should be lower than shark offer to bargain!');
      return;
    }
    if (counterEquity < startup.askEquity) {
      setCounterFeedback(`You cannot offer less than your initial ask of ${startup.askEquity}%!`);
      return;
    }

    const difference = baseOffer.equity - counterEquity;
    if (difference <= 3 || score >= 70) {
      sound.playDealFanfare();
      const { postMoney, preMoney } = calculateValuation(baseOffer.amount, counterEquity);
      const finalizedOffer: InvestorOffer = {
        ...baseOffer,
        equity: counterEquity,
        postMoneyValuation: postMoney,
        preMoneyValuation: preMoney,
        message: `Counter-offer accepted! Deal closed at ${formatRupees(baseOffer.amount)} for ${counterEquity}%. Welcome to the portfolio!`,
      };
      onDealAccepted(finalizedOffer);
    } else {
      sound.playBuzz();
      const rejectLine = `Sharks rejected ${counterEquity}%. Strictly at ${baseOffer.equity}%, take it or leave it!`;
      setCounterFeedback(rejectLine);
      sound.speak(baseOffer.investorId, `Strictly at ${baseOffer.equity}%, take it or leave it!`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 select-none animate-fade-in">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
          <Handshake size={14} />
          <span>The Tank Negotiation Room</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white m-0">
          Investor Term Sheets & Verdicts
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review the offers on the table, hear shark counter-arguments, negotiate terms, or walk away with pride.
        </p>
      </div>

      {/* Available Offers Grid */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-bold text-amber-300 flex items-center space-x-2">
          <Sparkles size={16} />
          <span>Active Offers on the Table ({activeOffers.length})</span>
        </h3>

        {activeOffers.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900 border border-red-500/40 text-center">
            <p className="text-lg font-bold text-red-400">
              No Offers Made in the Tank
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              All four sharks decided to step out this round due to valuation disconnect or pitch flaws.
            </p>
            <button
              onClick={handleRejectAll}
              className="mt-4 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              See Final Scorecard & Analysis 📊
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeOffers.map((offer, idx) => {
              const isSelected = selectedOfferIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOffer(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-indigo-950/80 to-slate-900 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)] scale-[1.02]'
                      : 'bg-slate-900/90 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div>
                    {/* Offer Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-white">
                        {offer.investorName}
                      </span>
                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReplaySharkVoice(offer.investorId, offer.message);
                          }}
                          className="p-1 rounded bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-400 text-xs transition-colors"
                          title="Hear Offer Voice"
                        >
                          <Volume2 size={13} />
                        </button>
                        {offer.dealType === 'joint' ? (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                            🤝 Joint Offer
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                            Solo Offer
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Financial Terms */}
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 my-2 grid grid-cols-2 gap-2 text-center">
                      <div>
                        <p className="text-[10px] text-slate-400">Amount</p>
                        <p className="text-base font-black text-amber-400">
                          {formatRupees(offer.amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">Equity</p>
                        <p className="text-base font-black text-cyan-400">
                          {offer.equity}%
                        </p>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-slate-700/60">
                        <p className="text-[10px] text-slate-400">
                          Implied Post-Money Valuation:{' '}
                          <span className="font-bold text-slate-200">
                            {formatRupees(offer.postMoneyValuation)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Shark Message */}
                    <p className="text-xs text-slate-300 italic mt-2">
                      "{offer.message}"
                    </p>
                  </div>

                  {/* Actions when selected */}
                  {isSelected && (
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAccept(offer);
                        }}
                        className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wide cursor-pointer transition-transform active:scale-95 flex items-center justify-center space-x-1"
                      >
                        <Check size={14} />
                        <span>Accept Deal</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsCountering(!isCountering);
                          setCounterEquity(Math.max(startup.askEquity, offer.equity - 2));
                        }}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl text-xs border border-amber-500/40 cursor-pointer"
                      >
                        Counter
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Counter-Offer Drawer if toggled */}
      {isCountering && selectedOfferIndex !== null && (
        <div className="mb-6 p-4 rounded-2xl bg-indigo-950/60 border-2 border-amber-400 shadow-2xl animate-fade-in">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center space-x-2">
            <Scale size={16} className="text-amber-400" />
            <span>Countering {activeOffers[selectedOfferIndex].investorName}</span>
          </h4>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Your Counter Equity:</span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  {counterEquity}%
                </span>
              </div>
              <input
                type="range"
                min={startup.askEquity}
                max={activeOffers[selectedOfferIndex].equity}
                step={0.5}
                value={counterEquity}
                onChange={(e) => setCounterEquity(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Original ask: {startup.askEquity}% | Shark offer: {activeOffers[selectedOfferIndex].equity}%
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleProposeCounter(activeOffers[selectedOfferIndex])}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wide cursor-pointer shadow-md"
            >
              Propose Counter
            </button>
          </div>

          {counterFeedback && (
            <p className="text-xs text-red-400 font-semibold mt-2">
              {counterFeedback}
            </p>
          )}
        </div>
      )}

      {/* Animated OUT Sharks Section */}
      {outSharks.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Sharks Stepped Out
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {outSharks.map((outShark) => (
              <div
                key={outShark.investorId}
                className="p-3 rounded-xl bg-slate-900/60 border border-red-900/60 text-xs relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5 text-red-400 font-black">
                    <X size={14} />
                    <span>{outShark.investorName} is OUT:</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleReplaySharkVoice(outShark.investorId, outShark.outReason || outShark.message)}
                    className="p-1 rounded bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400 text-xs transition-colors"
                    title="Hear Rejection Voice"
                  >
                    <Volume2 size={12} />
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 italic">
                  "{outShark.outReason}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Walk Away CTA */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleRejectAll}
          className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
        >
          Walk Away / Conclude Without a Deal →
        </button>
      </div>
    </div>
  );
};
