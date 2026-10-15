import React, { useState, useEffect } from 'react';
import { InvestorDesk } from '../investors/InvestorDesk';
import { InvestorId, EmotionState } from '../../types/game';
import { sound } from '../../utils/audio';
import { Play, HelpCircle, Shield, Sparkles, RotateCcw, Volume2, Mic } from 'lucide-react';

interface Props {
  onStartGame: () => void;
  onHowToPlay: () => void;
  onDisclaimer: () => void;
}

export const StartScreen: React.FC<Props> = ({
  onStartGame,
  onHowToPlay,
  onDisclaimer,
}) => {
  // Intro synchronization steps:
  // 0 = Dark / Stage lights turning on
  // 1 = Game title appearing dramatically
  // 2 = Cashneer & Demand revealed
  // 3 = Win-ita & Namita revealed
  // 4 = Final dramatic musical sting & ENTER THE TANK button appears
  const [introStep, setIntroStep] = useState<number>(4);
  const [isIntroRunning, setIsIntroRunning] = useState<boolean>(false);
  const [speakingShark, setSpeakingShark] = useState<InvestorId | null>(null);
  const [subtitle, setSubtitle] = useState<string>('');

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

  const [audioReady, setAudioReady] = useState<boolean>(false);

  // Resume audio context and play intro
  const playSynchronizedIntro = async (thenProceedToGame: boolean = false) => {
    try {
      await sound.resumeContext();
      setAudioReady(true);
    } catch (e) {
      console.warn('Audio context resume failed:', e);
    }

    setIsIntroRunning(true);
    setIntroStep(0);
    sound.playDramaticIntro(
      (step) => setIntroStep(step),
      () => {
        setIsIntroRunning(false);
        setIntroStep(4);
        if (thenProceedToGame) {
          onStartGame();
        }
      }
    );
  };

  useEffect(() => {
    // Check if audio context is already running
    sound.resumeContext().then((resumed) => {
      if (resumed) setAudioReady(true);
    });

    return () => {
      sound.stopIntroMusic();
      sound.stopSpeaking();
    };
  }, []);

  // Set up voice speaking synchronization listener
  useEffect(() => {
    sound.setSpeakingListener((id, isSpeaking, text) => {
      setSpeakingShark(isSpeaking ? id : null);
      setSubtitle(isSpeaking && text ? text : '');
    });
  }, []);

  const handleSharkClick = (id: InvestorId) => {
    sound.playClick();
    const sharkLines: Record<InvestorId, { quote: string; emotion: EmotionState }> = {
      ashneer: {
        quote: 'Bhai, numbers dikha! Sapne baad mein bechna! Valuation dhandhe se aati hai!',
        emotion: 'angry',
      },
      aman: {
        quote: 'Product mast hai, par brand ka dhamaka kahan hai? Chill maro, hero bano!',
        emotion: 'impressed',
      },
      vineeta: {
        quote: 'Idea achha hai. Ab unit economics aur repeat customer retention samjhao.',
        emotion: 'questioning',
      },
      namita: {
        quote: 'Foundation scalable honi chahiye, ethical governance ke saath!',
        emotion: 'impressed',
      },
    };

    const target = sharkLines[id];
    setEmotions((prev) => ({ ...prev, [id]: target.emotion }));
    setQuotes((prev) => ({ ...prev, [id]: target.quote }));

    // Speak using synthetic character voice!
    sound.speak(id, target.quote, () => {
      setEmotions((prev) => ({ ...prev, [id]: 'idle' }));
      setQuotes((prev) => ({ ...prev, [id]: '' }));
    });
  };

  const handleEnterTank = async () => {
    sound.playClick();
    // Directly start intro music inside click handler to satisfy browser autoplay policy
    playSynchronizedIntro(true);
  };

  const handleSkipIntro = () => {
    sound.stopIntroMusic();
    sound.stopSpeaking();
    sound.playClick();
    setIsIntroRunning(false);
    onStartGame();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-70px)] px-4 py-6 select-none overflow-hidden">
      {/* Stage Lights Transition Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          introStep === 0 ? 'bg-black/80' : 'bg-transparent'
        }`}
      />

      {/* Hero Badge */}
      <div
        className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold mb-3 shadow-sm transition-all duration-700 ${
          introStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <Sparkles size={16} />
        <span>Indian Startup Pitching & Cross-Questioning Simulator</span>
      </div>

      {/* Main Dramatic Title (Synchronized Step 1) */}
      <div
        className={`text-center mb-4 transition-all duration-700 transform ${
          introStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-red-500 drop-shadow-[0_4px_16px_rgba(245,158,11,0.5)] m-0">
          DEAL OR DANDA
        </h1>
        <p className="text-base sm:text-2xl font-bold text-slate-200 mt-2 tracking-wide">
          “Pitch sahi, toh paisa. Pitch galat, toh danda!” 🏏
        </p>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
          Face Cashneer Grover, Demand Gupta, Win-ita Singh, and Namita Tappar. Defend your margins, withstand cross-questioning, and avoid the cartoon danda!
        </p>
      </div>

      {/* Animated Investor Desk Lineup Preview (Synchronized Step 2 & 3) */}
      <div
        className={`w-full max-w-4xl my-2 transition-all duration-700 transform ${
          introStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-6'
        }`}
      >
        <div className="flex items-center justify-center space-x-2 text-xs text-amber-400/90 mb-2 font-mono">
          <Mic size={14} className="text-emerald-400 animate-pulse" />
          <span>👇 Click any shark to hear their distinct voice & catchphrase!</span>
        </div>

        <InvestorDesk
          investorEmotions={emotions}
          investorQuotes={quotes}
          speakingInvestorId={speakingShark}
          subtitleText={subtitle}
          onInvestorClick={handleSharkClick}
          onReplayVoice={handleSharkClick}
        />
      </div>

      {/* Action CTA Buttons (Synchronized Step 4 with Musical Sting) */}
      <div className="flex flex-col items-center mt-6 w-full max-w-md">
        {isIntroRunning ? (
          <div className="w-full flex justify-center">
            <button
              onClick={handleSkipIntro}
              className="py-3 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer flex items-center space-x-2 shadow-lg"
            >
              <span>Skip Intro ➔</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full">
            <button
              onClick={handleEnterTank}
              className="w-full sm:flex-1 py-4 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-red-500 hover:from-amber-400 hover:to-red-400 text-slate-950 font-black text-lg sm:text-xl rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 cursor-pointer uppercase tracking-wider"
            >
              <Play size={22} fill="currentColor" />
              <span>ENTER THE TANK</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onHowToPlay();
              }}
              className="w-full sm:w-auto py-4 px-5 bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <HelpCircle size={18} className="text-amber-400" />
              <span>How to Play</span>
            </button>
          </div>
        )}
      </div>

      {/* Replay Intro Music & Sound Enable Controls Row */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs text-slate-400">
        <button
          onClick={() => playSynchronizedIntro(false)}
          disabled={isIntroRunning}
          className="flex items-center space-x-1.5 text-amber-400/90 hover:text-amber-300 underline cursor-pointer disabled:opacity-50"
        >
          <RotateCcw size={13} />
          <span>Replay Intro</span>
        </button>

        {!audioReady && (
          <button
            onClick={async () => {
              const ok = await sound.resumeContext();
              if (ok) {
                setAudioReady(true);
                sound.playCorrect();
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 transition-colors cursor-pointer"
          >
            <Volume2 size={13} className="text-amber-400" />
            <span>Sound</span>
          </button>
        )}
      </div>

      {/* Fictional Parody Disclaimer Footnote */}
      <div className="mt-6 max-w-lg text-center text-[11px] text-slate-500 border-t border-slate-800/80 pt-3 flex flex-col items-center">
        <div className="flex items-center space-x-1.5 text-slate-400 mb-0.5">
          <Shield size={12} />
          <span className="font-semibold">Fictional Parody Fan Game</span>
        </div>
        <p>
          Satirical prototype featuring fictionalized characters (Cashneer, Demand, Win-ita, Namita). Not affiliated with Shark Tank India or Sony LIV.
        </p>
      </div>
    </div>
  );
};
