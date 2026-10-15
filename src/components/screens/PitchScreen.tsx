import React, { useState, useEffect } from 'react';
import {
  StartupData,
  InvestorId,
  EmotionState,
  PitchRoundResult,
  PitchAnswer,
  PitchQuestion,
  FollowUpResponseOption,
  DoglapanContradiction,
  ContradictionClaim,
} from '../../types/game';
import { PITCH_QUESTIONS } from '../../data/pitchQuestions';
import { INVESTORS } from '../../data/investors';
import { InvestorDesk } from '../investors/InvestorDesk';
import { StageBackdrop } from '../stage/StageBackdrop';
import { FounderPodium } from '../stage/FounderPodium';
import { DandaOverlay } from '../stage/DandaOverlay';
import { InSceneSlapActor, InSceneSlapPhase } from '../stage/InSceneSlapActor';
import { sound } from '../../utils/audio';
import { detectContradiction } from '../../utils/contradiction';
import { DoglapanClarificationOption } from '../../types/game';
import {
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Volume2,
  Zap,
} from 'lucide-react';

interface Props {
  startup: StartupData;
  questions?: PitchQuestion[];
  onFinishPitch: (results: PitchRoundResult[], finalScore: number, totalDandas: number) => void;
}

export const PitchScreen: React.FC<Props> = ({ startup, questions, onFinishPitch }) => {
  const activeQuestions = questions && questions.length > 0 ? questions : PITCH_QUESTIONS;
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [score, setScore] = useState(50); // Start at neutral 50/100
  const [dandaCount, setDandaCount] = useState(0);
  const [roundResults, setRoundResults] = useState<PitchRoundResult[]>([]);
  const [storedClaims, setStoredClaims] = useState<{ round: number; claim: ContradictionClaim }[]>([]);

  // Speaking state for character mouth animation & subtitle synchronization
  const [speakingSharkId, setSpeakingSharkId] = useState<InvestorId | null>(null);
  const [subtitle, setSubtitle] = useState<string>('');

  // Active shark emotional states
  const [investorEmotions, setInvestorEmotions] = useState<Record<InvestorId, EmotionState>>({
    ashneer: 'idle',
    aman: 'idle',
    vineeta: 'idle',
    namita: 'idle',
  });
  const [investorQuotes, setInvestorQuotes] = useState<Record<InvestorId, string>>({
    ashneer: '',
    aman: '',
    vineeta: '',
    namita: '',
  });

  const [selectedAnswer, setSelectedAnswer] = useState<PitchAnswer | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showDandaModal, setShowDandaModal] = useState(false);
  const [dandaMessage, setDandaMessage] = useState<string>('');
  const [founderBonked, setFounderBonked] = useState(false);
  const [customAnswerText, setCustomAnswerText] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Cross-Questioning & Contradiction states
  const [activeFollowUp, setActiveFollowUp] = useState<PitchAnswer['followUp'] | null>(null);
  const [followUpResolved, setFollowUpResolved] = useState(false);
  const [doglapanAlert, setDoglapanAlert] = useState<DoglapanContradiction | null>(null);
  const [doglapanClarified, setDoglapanClarified] = useState(false);

  // Slap & Physical Animation states
  const [isSlapAnimating, setIsSlapAnimating] = useState(false);
  const [slapPhase, setSlapPhase] = useState<InSceneSlapPhase>('idle');
  const [advancingSharkId, setAdvancingSharkId] = useState<InvestorId | null>(null);
  const [isScreenShaking, setIsScreenShaking] = useState(false);
  const [founderSlapped, setFounderSlapped] = useState(false);
  const [lastSlapRound, setLastSlapRound] = useState<number>(-99);
  const [isDeskSlamming, setIsDeskSlamming] = useState(false);

  const triggerDeskSlam = () => {
    sound.playDeskSlamSound();
    setIsDeskSlamming(true);
    setTimeout(() => setIsDeskSlamming(false), 700);
  };

  const runInSceneSlap = (investorId: InvestorId, roastQuote: string) => {
    setIsSlapAnimating(true);
    setAdvancingSharkId(investorId);
    setSlapPhase('disbelief');
    setInvestorEmotions((prev) => ({ ...prev, [investorId]: 'disbelief' }));

    // 1. Approach toward podium (at 400ms)
    setTimeout(() => {
      setSlapPhase('approach');
    }, 400);

    // 2. Windup arm (at 900ms)
    setTimeout(() => {
      setSlapPhase('windup');
    }, 900);

    // 3. Impact slap with funny sound, star burst, screen shake & crying tears (at 1200ms)
    setTimeout(() => {
      setSlapPhase('impact');
      sound.playSlapSound();
      setIsScreenShaking(true);
      setFounderSlapped(true);
      setTimeout(() => setIsScreenShaking(false), 350);
    }, 1200);

    // 4. Return to desk (at 1500ms)
    setTimeout(() => {
      setSlapPhase('return');
    }, 1500);

    // 5. Back at desk, speaks roast automatically! (at 2050ms)
    setTimeout(() => {
      setSlapPhase('idle');
      setAdvancingSharkId(null);
      setInvestorQuotes((prev) => ({ ...prev, [investorId]: roastQuote }));
      setInvestorEmotions((prev) => ({ ...prev, [investorId]: 'angry' }));
      sound.speak(investorId, roastQuote);
    }, 2050);

    // 6. Complete slap sequence and restore interaction (at 3200ms)
    setTimeout(() => {
      setIsSlapAnimating(false);
    }, 3200);
  };

  const currentQuestion = activeQuestions[currentRoundIndex] || activeQuestions[0];
  const asker = INVESTORS.find((i) => i.id === currentQuestion.askerId) || INVESTORS[0];

  // Set up speech listener to sync mouth movement and subtitles
  useEffect(() => {
    sound.setSpeakingListener((id, isSpeaking, text) => {
      setSpeakingSharkId(isSpeaking ? id : null);
      setSubtitle(isSpeaking && text ? text : '');
    });
  }, []);

  // When round changes, speak the question & set initial emotions
  useEffect(() => {
    sound.playQuestionPing();
    setInvestorEmotions({
      ashneer: currentQuestion.askerId === 'ashneer' ? 'questioning' : 'listening',
      aman: currentQuestion.askerId === 'aman' ? 'questioning' : 'listening',
      vineeta: currentQuestion.askerId === 'vineeta' ? 'questioning' : 'listening',
      namita: currentQuestion.askerId === 'namita' ? 'questioning' : 'listening',
    });
    setInvestorQuotes({
      ashneer: '',
      aman: '',
      vineeta: '',
      namita: '',
    });
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setFounderBonked(false);
    setFounderSlapped(false);
    setIsSlapAnimating(false);
    setSlapPhase('idle');
    setAdvancingSharkId(null);
    setIsCustomMode(false);
    setCustomAnswerText('');
    setActiveFollowUp(null);
    setFollowUpResolved(false);
    setDoglapanAlert(null);
    setDoglapanClarified(false);

    // Speak the question in the specific shark's synthetic voice!
    sound.speak(currentQuestion.askerId, currentQuestion.hinglishText);
  }, [currentRoundIndex, currentQuestion.askerId, currentQuestion.hinglishText]);

  const handleReplayVoice = (id?: InvestorId) => {
    const targetId = id || (activeFollowUp ? activeFollowUp.challengerId : currentQuestion.askerId);
    const lineToSpeak = activeFollowUp ? activeFollowUp.hinglishText : currentQuestion.hinglishText;
    sound.speak(targetId, lineToSpeak);
  };

  const handleSelectAnswer = (ans: PitchAnswer) => {
    if (isAnswerSubmitted || isSlapAnimating) return;
    sound.playClick();
    setSelectedAnswer(ans);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer && !customAnswerText.trim()) return;

    let answerToGrade: PitchAnswer;

    if (isCustomMode && customAnswerText.trim()) {
      const lower = customAnswerText.toLowerCase();
      const hasNumbers = /\d+/.test(lower) || lower.includes('crore') || lower.includes('lakh') || lower.includes('margin') || lower.includes('repeat');
      const hasBluff = lower.includes('billion') || lower.includes('chill') || lower.includes('free') || lower.includes('reel') || lower.includes('viral');

      if (hasNumbers && !hasBluff) {
        answerToGrade = {
          id: 'custom_great',
          text: customAnswerText,
          quality: 'great',
          points: 22,
          dandaTrigger: false,
          feedback: 'Custom pitch contained concrete commercial numbers and verified margins!',
          sharkReactions: {
            ashneer: { emotion: 'impressed', quote: 'Numbers ki baat ki hai, sunke achha laga.' },
            aman: { emotion: 'impressed', quote: 'Founder confident hai, clarity hai!' },
            vineeta: { emotion: 'impressed', quote: 'Good specific context in your custom answer.' },
            namita: { emotion: 'impressed', quote: 'Thoughtful structured explanation.' },
          },
        };
      } else if (hasBluff) {
        answerToGrade = {
          id: 'custom_blunder',
          text: customAnswerText,
          quality: 'blunder',
          points: -15,
          dandaTrigger: true,
          dandaMessage: 'Custom gyan diya par dhandha zero! DANDA!',
          feedback: 'Custom answer sounded like wishful thinking without business fundamentals.',
          sharkReactions: {
            ashneer: { emotion: 'angry', quote: 'Yeh kya custom kahani bana rahe ho?! Seedha sach bolo!' },
            aman: { emotion: 'laughing', quote: 'Kahani mast hai par dhandha kahan hai?' },
            vineeta: { emotion: 'rejecting', quote: 'Lack of analytical substantiation.' },
            namita: { emotion: 'angry', quote: 'Unconvincing custom pitch.' },
          },
        };
      } else {
        answerToGrade = {
          id: 'custom_good',
          text: customAnswerText,
          quality: 'good',
          points: 12,
          dandaTrigger: false,
          feedback: 'Decent custom explanation, though sharks wanted more concrete data.',
          sharkReactions: {
            ashneer: { emotion: 'listening', quote: 'Sun liya, aage badho.' },
            aman: { emotion: 'listening', quote: 'Chalo theek hai boss.' },
            vineeta: { emotion: 'listening', quote: 'Reasonable point.' },
            namita: { emotion: 'listening', quote: 'Understood.' },
          },
        };
      }
    } else {
      answerToGrade = selectedAnswer!;
    }

    setIsAnswerSubmitted(true);

    // 1. Contradiction Detection ("Doglapan Moment")
    const contradiction = detectContradiction(storedClaims, answerToGrade.claim, currentRoundIndex + 1);
    const penalty = contradiction ? 15 : 0;

    // Store claim if present
    if (answerToGrade.claim) {
      setStoredClaims((prev) => [...prev, { round: currentRoundIndex + 1, claim: answerToGrade.claim! }]);
    }

    // Apply score points
    const newScore = Math.max(0, Math.min(100, score + answerToGrade.points - penalty));
    setScore(newScore);

    // Update shark emotions & quotes
    const newEmotions: Record<InvestorId, EmotionState> = {
      ashneer: answerToGrade.sharkReactions.ashneer.emotion,
      aman: answerToGrade.sharkReactions.aman.emotion,
      vineeta: answerToGrade.sharkReactions.vineeta.emotion,
      namita: answerToGrade.sharkReactions.namita.emotion,
    };
    const newQuotes: Record<InvestorId, string> = {
      ashneer: answerToGrade.sharkReactions.ashneer.quote,
      aman: answerToGrade.sharkReactions.aman.quote,
      vineeta: answerToGrade.sharkReactions.vineeta.quote,
      namita: answerToGrade.sharkReactions.namita.quote,
    };

    if (contradiction) {
      setDoglapanAlert(contradiction);
      setDoglapanClarified(false);
      triggerDeskSlam();
      sound.playDoglapanAlert();
      sound.speak('ashneer', contradiction.quote, () => {
        sound.playDoglapanSting();
      });
      // Cashneer leans forward angrily, eyebrows raised
      // Aman is amused/laughing
      // Win-ita is confused/shocked
      // Namita is rejecting/disturbed
      newEmotions.ashneer = 'angry';
      newEmotions.aman = 'laughing';
      newEmotions.vineeta = 'confused';
      newEmotions.namita = 'rejecting';

      newQuotes.ashneer = 'Bhai, ek minute! Pehle kuch aur bola, ab kuch aur bol rahe ho. Yeh kya doglapan hai?!';
      newQuotes.aman = 'Arre bhai pakde gaye! Pehle kuch aur bola tha!';
      newQuotes.vineeta = 'Wait, the earlier statements and current numbers directly contradict each other!';
      newQuotes.namita = 'Integrity and consistency are compromised. Highly concerning.';
    }

    setInvestorEmotions(newEmotions);
    setInvestorQuotes(newQuotes);

    // Check for extreme blunder Comedic Slap vs Danda Bonk
    const canSlap = currentRoundIndex - lastSlapRound >= 2 || lastSlapRound === -99;
    let slapHappened = false;

    if (answerToGrade.quality === 'blunder' && canSlap && !contradiction) {
      slapHappened = true;
      setLastSlapRound(currentRoundIndex);
      const defaultRoasts: Record<InvestorId, string> = {
        ashneer: 'Bhai yeh kya bakwaas gyan hai?! Pehle dhandha seekh fir valuation mang!',
        aman: 'Hero banne chale the, zero ban gaye! Thoda sense la dhandhe mein!',
        vineeta: 'Negative margins aur itni valuation?! Unit economics ka mazak bana diya!',
        namita: 'Foundational disaster! Meri expertise se bohot bahar hai yeh galti!',
      };
      const roast =
        answerToGrade.sharkReactions[currentQuestion.askerId]?.quote ||
        defaultRoasts[currentQuestion.askerId];
      runInSceneSlap(currentQuestion.askerId, roast);
    } else if (answerToGrade.dandaTrigger) {
      triggerDeskSlam();
      setDandaCount((prev) => prev + 1);
      setFounderBonked(true);
      setDandaMessage(answerToGrade.dandaMessage || 'Bhai kya kar raha hai tu?! DANDA!');
      setShowDandaModal(true);
    } else {
      sound.playCorrect();
    }

    // Record round result
    const result: PitchRoundResult = {
      questionId: currentQuestion.id,
      askerId: currentQuestion.askerId,
      chosenAnswerId: answerToGrade.id,
      customText: isCustomMode ? customAnswerText : undefined,
      quality: answerToGrade.quality,
      pointsAwarded: answerToGrade.points,
      dandaTriggered: answerToGrade.dandaTrigger,
      dandaMessage: answerToGrade.dandaMessage,
      feedback: answerToGrade.feedback,
      contradictionTriggered: !!contradiction,
      slapTriggered: slapHappened,
      slapInvestorId: slapHappened ? currentQuestion.askerId : undefined,
    };
    setRoundResults((prev) => [...prev, result]);

    // Check if there is an interactive follow-up cross-examination
    if (answerToGrade.followUp && !answerToGrade.dandaTrigger && !contradiction && !slapHappened) {
      setActiveFollowUp(answerToGrade.followUp);
      // Challenger speaks follow-up after short pause
      setTimeout(() => {
        sound.speak(answerToGrade.followUp!.challengerId, answerToGrade.followUp!.hinglishText);
      }, 1000);
    } else {
      setFollowUpResolved(true);
    }
  };

  const handleClarifyContradiction = (option: DoglapanClarificationOption) => {
    sound.playClick();
    setDoglapanClarified(true);
    setScore((prev) => Math.max(0, Math.min(100, prev + option.recoveryPoints)));

    if (!option.isHonest || option.triggersDanda) {
      triggerDeskSlam();
      setDandaCount((prev) => prev + 1);
      setFounderBonked(true);
      setDandaMessage(option.dandaMessage || 'Bluff pakda gaya! DANDA!');
      setShowDandaModal(true);
      setInvestorEmotions((prev) => ({ ...prev, ashneer: 'angry' }));
      setInvestorQuotes((prev) => ({ ...prev, ashneer: option.responseQuote }));
      sound.speak('ashneer', option.responseQuote);
    } else {
      sound.playCorrect();
      setInvestorEmotions((prev) => ({ ...prev, ashneer: 'listening' }));
      setInvestorQuotes((prev) => ({ ...prev, ashneer: option.responseQuote }));
      sound.speak('ashneer', option.responseQuote);
    }
  };

  const handleSelectFollowUpResponse = (resp: FollowUpResponseOption) => {
    sound.playClick();
    setScore((prev) => Math.max(0, Math.min(100, prev + resp.points)));
    setFollowUpResolved(true);

    if (activeFollowUp) {
      setInvestorEmotions((prev) => ({
        ...prev,
        [activeFollowUp.challengerId]: resp.reaction.emotion,
      }));
      setInvestorQuotes((prev) => ({
        ...prev,
        [activeFollowUp.challengerId]: resp.reaction.quote,
      }));
      sound.speak(activeFollowUp.challengerId, resp.reaction.quote);
    }

    if (resp.dandaTrigger) {
      setDandaCount((prev) => prev + 1);
      setFounderBonked(true);
      setDandaMessage(resp.dandaMessage || 'Cross-questioning mein clean bowled! DANDA!');
      setShowDandaModal(true);
    } else if (resp.quality === 'strong_defense') {
      sound.playCorrect();
    }
  };

  const handleNextRound = () => {
    sound.stopSpeaking();
    sound.playClick();
    if (currentRoundIndex + 1 < activeQuestions.length) {
      setCurrentRoundIndex((prev) => prev + 1);
    } else {
      onFinishPitch(roundResults, score, dandaCount);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 select-none">
      {/* Danda Slapstick Overlay */}
      <DandaOverlay
        isActive={showDandaModal}
        message={dandaMessage}
        onDismiss={() => {
          setShowDandaModal(false);
          setFounderBonked(false);
        }}
      />

      {/* Stage Backdrop & Investor Desk & Founder with Screen Shake */}
      <div className={`relative transition-transform duration-100 ${isScreenShaking ? 'animate-screen-shake' : ''}`}>
        {/* Stage Backdrop (Jumbo LED Screen) */}
        <StageBackdrop
          startup={startup}
          score={score}
          dandaCount={dandaCount}
          currentRound={currentRoundIndex + 1}
          totalRounds={activeQuestions.length}
        />

        {/* Four Animated Sharks behind the Desk */}
        <div className="my-2 sm:my-4">
          <InvestorDesk
            activeAskerId={currentQuestion.askerId}
            speakingInvestorId={speakingSharkId}
            investorEmotions={investorEmotions}
            investorQuotes={investorQuotes}
            subtitleText={subtitle}
            onReplayVoice={handleReplayVoice}
            isDeskSlamming={isDeskSlamming}
            advancingInvestorId={advancingSharkId}
          />
        </div>

        {/* Founder Podium & In-Scene Slap Actor */}
        <div className="relative flex justify-center items-end -mt-4 mb-4">
          <InSceneSlapActor
            isActive={isSlapAnimating}
            investorId={advancingSharkId || 'ashneer'}
            phase={slapPhase}
          />
          <FounderPodium
            startup={startup}
            isBonked={founderBonked}
            isSlapped={founderSlapped}
            score={score}
          />
        </div>
      </div>

      {/* Large Dramatic Doglapan Contradiction Alert Stamp */}
      {doglapanAlert && (
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-red-950/95 via-rose-950/90 to-red-950/95 border-2 border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.35)] animate-stamp-zoom text-slate-100 relative overflow-hidden">
          {/* Subtle diagonal caution lines */}
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#000,#000_15px,#ef4444_15px,#ef4444_30px)] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-red-500/30 pb-2 mb-3">
              <div className="flex items-center space-x-2 text-yellow-300 font-black text-sm uppercase tracking-wider">
                <ShieldAlert size={22} className="text-red-400 animate-bounce" />
                <span className="text-red-400 font-mono">CONTRADICTION DETECTED (-15 PTS)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg transform rotate-1 border border-yellow-300">
                  💥 DOGLAPAN! 💥
                </span>
                <button
                  onClick={() => sound.speakDoglapan()}
                  className="p-1.5 rounded-lg bg-red-800 hover:bg-red-700 text-white transition-all shadow cursor-pointer"
                  title="Play Doglapan"
                >
                  <Volume2 size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-red-800 border-2 border-amber-400 flex items-center justify-center shrink-0 font-black text-sm text-amber-300">
                CG
              </div>
              <div>
                <p className="text-base sm:text-lg font-black text-amber-200 leading-snug">
                  "{doglapanAlert.quote}"
                </p>
                <p className="text-xs text-red-300 mt-0.5 font-medium">
                  — Cashneer Grover calls out founder inconsistency!
                </p>
              </div>
            </div>

            <div className="mt-3.5 p-3 rounded-xl bg-black/70 border border-red-800 text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-2 rounded-lg bg-red-950/40 border border-red-900/50">
                <span className="text-slate-400 font-mono text-[11px] block">Earlier Claim in Round {doglapanAlert.earlierRound}:</span>
                <p className="font-bold text-emerald-400 mt-1">"{doglapanAlert.earlierStatement}"</p>
              </div>
              <div className="p-2 rounded-lg bg-red-950/40 border border-red-900/50">
                <span className="text-slate-400 font-mono text-[11px] block">Current Contradicted Statement:</span>
                <p className="font-bold text-rose-400 mt-1">"{doglapanAlert.currentStatement}"</p>
              </div>
            </div>

            {/* Founder Clarification Defense */}
            {!doglapanClarified && doglapanAlert.clarificationOptions && doglapanAlert.clarificationOptions.length > 0 && (
              <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-yellow-400/50">
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Zap size={14} className="text-yellow-400 animate-pulse" />
                  <span>Founder Defense: Choose How to Explain the Contradiction!</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {doglapanAlert.clarificationOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleClarifyContradiction(opt)}
                      className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-left transition-all cursor-pointer group"
                    >
                      <p className="text-xs font-semibold text-slate-200 group-hover:text-amber-300">
                        "{opt.text}"
                      </p>
                      <span
                        className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          opt.isHonest
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500'
                            : 'bg-red-950 text-red-400 border border-red-500'
                        }`}
                      >
                        {opt.isHonest ? '+6 Pts (Honest Reconciliation)' : '-10 Pts (Risky Bluff)'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Pitch & Cross-Questioning Interrogation Panel with 3D Question Card Transition */}
      <div
        key={`question-card-${currentRoundIndex}`}
        className="relative z-20 bg-slate-900/95 border-2 border-indigo-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md animate-3d-card-transition"
      >
        {/* Asker & Voiced Question Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{asker.name} is questioning:</span>
            </div>
            <button
              onClick={() => handleReplayVoice(currentQuestion.askerId)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 transition-colors cursor-pointer"
              title="Hear question"
            >
              <Volume2 size={13} />
            </button>
          </div>

          <h3 className="text-base sm:text-xl font-black text-white leading-snug">
            "{currentQuestion.hinglishText}"
          </h3>
          <p className="text-xs text-slate-400 mt-1 italic">
            English Translation: "{currentQuestion.questionText}"
          </p>
          <p className="text-[11px] text-amber-300/80 mt-1 font-mono">
            💡 Shark Context: {currentQuestion.contextHint}
          </p>
        </div>

        {/* Phase 1: Multiple Choice or Custom Input */}
        {!isAnswerSubmitted && (
          <div className="space-y-3">
            {!isCustomMode ? (
              <>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentQuestion.answers.map((ans: PitchAnswer, idx: number) => {
                    const isSelected = selectedAnswer?.id === ans.id;
                    return (
                      <button
                        key={ans.id}
                        type="button"
                        onClick={() => handleSelectAnswer(ans)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-[1.01]'
                            : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                          {ans.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCustomMode(true)}
                    className="text-xs text-slate-400 hover:text-amber-400 underline transition-colors cursor-pointer"
                  >
                    ✏️ Or type your own custom pitch answer...
                  </button>

                  <button
                    type="button"
                    disabled={!selectedAnswer || isSlapAnimating}
                    onClick={handleSubmitAnswer}
                    className={`px-6 py-2.5 rounded-xl font-black text-sm tracking-wide uppercase transition-all shadow-lg cursor-pointer ${
                      selectedAnswer && !isSlapAnimating
                        ? 'bg-gradient-to-r from-amber-500 to-red-500 text-slate-950 hover:scale-105 active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    Lock In Answer 🔒
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <textarea
                  rows={3}
                  value={customAnswerText}
                  onChange={(e) => setCustomAnswerText(e.target.value)}
                  placeholder="Defend your startup in your own words (include numbers, repeat rates, or margins for best results)..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-amber-400/60 focus:border-amber-400 focus:outline-none text-slate-100 text-sm"
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsCustomMode(false)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    ← Switch back to multiple choice
                  </button>

                  <button
                    type="button"
                    disabled={!customAnswerText.trim() || isSlapAnimating}
                    onClick={handleSubmitAnswer}
                    className={`px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-wide cursor-pointer transition-all ${
                      customAnswerText.trim() && !isSlapAnimating
                        ? 'bg-gradient-to-r from-amber-500 to-red-500 text-slate-950 hover:scale-105 active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    Submit Custom Pitch 🚀
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Phase 2: Interactive Follow-Up Cross-Questioning */}
        {isAnswerSubmitted && activeFollowUp && !followUpResolved && (
          <div className="my-4 p-4 rounded-xl bg-indigo-950/80 border-2 border-amber-400 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase">
                <Zap size={15} className="text-yellow-400" />
                <span>Shark Cross-Examination Challenge:</span>
              </div>
              <button
                onClick={() => handleReplayVoice(activeFollowUp.challengerId)}
                className="p-1 rounded bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-amber-300 transition-colors cursor-pointer"
                title="Hear challenge"
              >
                <Volume2 size={12} />
              </button>
            </div>

            <p className="text-sm sm:text-base font-bold text-white mb-1">
              "{activeFollowUp.hinglishText}"
            </p>
            <p className="text-xs text-slate-400 italic mb-3">
              Context: {activeFollowUp.interruptionContext}
            </p>

            <p className="text-xs font-semibold text-amber-300/90 mb-2">
              Defend your numbers and convince the shark:
            </p>

            <div className="space-y-2">
              {activeFollowUp.responses.map((resp) => (
                <button
                  key={resp.id}
                  type="button"
                  onClick={() => handleSelectFollowUpResponse(resp)}
                  className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-amber-400 text-xs sm:text-sm text-slate-200 transition-all cursor-pointer"
                >
                  {resp.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Phase 3: Post-Answer Feedback & Reaction Grid */}
        {isAnswerSubmitted && followUpResolved && (
          <div className="space-y-4 animate-fade-in">
            <div
              className={`p-4 rounded-xl border ${
                selectedAnswer?.quality === 'great'
                  ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                  : selectedAnswer?.quality === 'good'
                  ? 'bg-cyan-950/40 border-cyan-500 text-cyan-200'
                  : selectedAnswer?.quality === 'mediocre'
                  ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                  : 'bg-red-950/60 border-red-500 text-red-200'
              }`}
            >
              <div className="flex items-center space-x-2 font-black text-sm uppercase mb-1">
                {selectedAnswer?.quality === 'great' && (
                  <>
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span>Pitch Masterclass (+25 Points)</span>
                  </>
                )}
                {selectedAnswer?.quality === 'good' && (
                  <>
                    <CheckCircle2 size={18} className="text-cyan-400" />
                    <span>Solid Answer (+15 Points)</span>
                  </>
                )}
                {selectedAnswer?.quality === 'mediocre' && (
                  <>
                    <HelpCircle size={18} className="text-amber-400" />
                    <span>Skeptical Sharks (+4 Points)</span>
                  </>
                )}
                {selectedAnswer?.quality === 'blunder' && (
                  <>
                    <AlertOctagon size={18} className="text-red-500" />
                    <span>DANDA HIT! (-15 Points)</span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm">{selectedAnswer?.feedback}</p>
            </div>

            {/* Individual Shark Reactions Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {INVESTORS.map((inv) => {
                const quote = investorQuotes[inv.id];
                return (
                  <div
                    key={inv.id}
                    className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs"
                  >
                    <p className="font-bold text-amber-300 text-[11px] truncate">{inv.name}:</p>
                    <p className="text-[11px] text-slate-300 italic mt-0.5 line-clamp-3">
                      "{quote || 'Observing closely...'}"
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Next Round CTA */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleNextRound}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wide shadow-lg flex items-center space-x-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              >
                <span>
                  {currentRoundIndex + 1 < PITCH_QUESTIONS.length
                    ? 'Next Shark Question'
                    : 'Proceed to Negotiation Room 🤝'}
                </span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
