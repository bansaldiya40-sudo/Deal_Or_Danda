import React, { useState } from 'react';
import { GameScreen, StartupData, PitchRoundResult, InvestorOffer, PitchQuestion } from './types/game';
import { SAMPLE_STARTUPS } from './data/sampleStartups';
import { selectDynamicQuestionsForPlaythrough } from './data/pitchQuestions';
import { Header } from './components/common/Header';
import { DisclaimerModal } from './components/common/DisclaimerModal';
import { HowToPlayModal } from './components/common/HowToPlayModal';
import { AudioSettingsModal } from './components/common/AudioSettingsModal';
import { HallOfFameModal } from './components/common/HallOfFameModal';
import { StartScreen } from './components/screens/StartScreen';
import { StartupFormScreen } from './components/screens/StartupFormScreen';
import { PitchScreen } from './components/screens/PitchScreen';
import { VerdictsScreen } from './components/screens/VerdictsScreen';
import { NegotiationScreen } from './components/screens/NegotiationScreen';
import { ScorecardScreen } from './components/screens/ScorecardScreen';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('start');
  const [startup, setStartup] = useState<StartupData>(SAMPLE_STARTUPS[0]);
  const [pitchScore, setPitchScore] = useState(50);
  const [totalDandas, setTotalDandas] = useState(0);
  const [pitchResults, setPitchResults] = useState<PitchRoundResult[]>([]);
  const [acceptedDeal, setAcceptedDeal] = useState<InvestorOffer | null>(null);

  // Dynamic session question tracking to ensure no repeat questions across playthroughs
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<PitchQuestion[]>(() =>
    selectDynamicQuestionsForPlaythrough(SAMPLE_STARTUPS[0], 5, [])
  );

  // Modal dialog states
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);
  const [isHallOfFameOpen, setIsHallOfFameOpen] = useState(false);

  const handleStartGame = () => {
    setCurrentScreen('create');
  };

  const handleStartupSubmit = (newStartup: StartupData) => {
    setStartup(newStartup);
    // Dynamically select a fresh 5-question arc from the 68-question bank
    const selected = selectDynamicQuestionsForPlaythrough(newStartup, 5, usedQuestionIds);
    setCurrentQuestions(selected);
    setUsedQuestionIds((prev: string[]) => {
      const updated = [...prev, ...selected.map((q) => q.id)];
      // If pool exhausted (>55 questions used), cycle fresh
      return updated.length > 55 ? selected.map((q) => q.id) : updated;
    });
    setCurrentScreen('pitch');
  };

  const handleFinishPitch = (
    results: PitchRoundResult[],
    finalScore: number,
    dandas: number
  ) => {
    setPitchResults(results);
    setPitchScore(finalScore);
    setTotalDandas(dandas);
    setCurrentScreen('verdicts');
  };

  const handleProceedToNegotiation = (_activeOffers: InvestorOffer[]) => {
    setCurrentScreen('negotiation');
  };

  const handleSpecialDandaEnding = () => {
    setAcceptedDeal(null);
    setCurrentScreen('scorecard');
  };

  const handleDealAccepted = (deal: InvestorOffer) => {
    setAcceptedDeal(deal);
    setCurrentScreen('scorecard');
  };

  const handleNoDealAccepted = () => {
    setAcceptedDeal(null);
    setCurrentScreen('scorecard');
  };

  const handlePlayAgain = () => {
    setAcceptedDeal(null);
    setPitchResults([]);
    setPitchScore(50);
    setTotalDandas(0);
    setCurrentScreen('create');
  };

  const handleResetToStart = () => {
    setAcceptedDeal(null);
    setPitchResults([]);
    setPitchScore(50);
    setTotalDandas(0);
    setCurrentScreen('start');
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Persistent Navigation Header */}
      <Header
        onHowToPlayClick={() => setIsHowToPlayOpen(true)}
        onDisclaimerClick={() => setIsDisclaimerOpen(true)}
        onAudioSettingsClick={() => setIsAudioSettingsOpen(true)}
        onHallOfFameClick={() => setIsHallOfFameOpen(true)}
        onResetGame={handleResetToStart}
      />

      {/* Main Game Screen Router */}
      <main className="flex-1 flex flex-col justify-center">
        {currentScreen === 'start' && (
          <StartScreen
            onStartGame={handleStartGame}
            onHowToPlay={() => setIsHowToPlayOpen(true)}
            onDisclaimer={() => setIsDisclaimerOpen(true)}
          />
        )}

        {currentScreen === 'create' && (
          <StartupFormScreen
            initialStartup={startup}
            onSubmit={handleStartupSubmit}
            onBack={handleResetToStart}
          />
        )}

        {currentScreen === 'pitch' && (
          <PitchScreen
            startup={startup}
            questions={currentQuestions}
            onFinishPitch={handleFinishPitch}
          />
        )}

        {currentScreen === 'verdicts' && (
          <VerdictsScreen
            startup={startup}
            score={pitchScore}
            dandaCount={totalDandas}
            pitchResults={pitchResults}
            onProceedToNegotiation={handleProceedToNegotiation}
            onSpecialDandaEnding={handleSpecialDandaEnding}
          />
        )}

        {currentScreen === 'negotiation' && (
          <NegotiationScreen
            startup={startup}
            score={pitchScore}
            dandaCount={totalDandas}
            pitchResults={pitchResults}
            onDealAccepted={handleDealAccepted}
            onNoDealAccepted={handleNoDealAccepted}
          />
        )}

        {currentScreen === 'scorecard' && (
          <ScorecardScreen
            startup={startup}
            score={pitchScore}
            dandaCount={totalDandas}
            pitchResults={pitchResults}
            acceptedDeal={acceptedDeal}
            onPlayAgain={handlePlayAgain}
            onViewHallOfFame={() => setIsHallOfFameOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
      />
      <AudioSettingsModal
        isOpen={isAudioSettingsOpen}
        onClose={() => setIsAudioSettingsOpen(false)}
      />
      <HallOfFameModal
        isOpen={isHallOfFameOpen}
        onClose={() => setIsHallOfFameOpen(false)}
      />
    </div>
  );
}

export default App;
