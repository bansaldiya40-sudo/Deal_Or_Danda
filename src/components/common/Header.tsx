import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Info, HelpCircle, Sliders } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  onHowToPlayClick: () => void;
  onDisclaimerClick: () => void;
  onAudioSettingsClick: () => void;
  onResetGame?: () => void;
}

export const Header: React.FC<Props> = ({
  onHowToPlayClick,
  onDisclaimerClick,
  onAudioSettingsClick,
  onResetGame,
}) => {
  const [audioSettings, setAudioSettings] = useState(sound.getSettings());

  useEffect(() => {
    const update = () => setAudioSettings(sound.getSettings());
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMasterMute = () => {
    sound.updateSettings({ masterMuted: !audioSettings.masterMuted });
    setAudioSettings(sound.getSettings());
    if (audioSettings.masterMuted) {
      sound.playClick();
    }
  };

  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 sticky top-0 z-40 select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Title with 3D Depth & Entrance */}
        <div
          onClick={onResetGame}
          className="flex items-center space-x-2.5 cursor-pointer group animate-3d-logo"
          style={{ perspective: '600px' }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center shadow-[0_4px_12px_rgba(245,158,11,0.35)] border-t border-amber-300/40 group-hover:scale-105 group-hover:rotate-3 transition-transform">
            <span className="text-xl filter drop-shadow">🏏</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-red-500 m-0 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              DEAL OR DANDA
            </h1>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Pitch sahi, toh paisa. Pitch galat, toh danda!
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Audio Settings (Music, Voice, SFX channels) */}
          <button
            onClick={() => {
              sound.playClick();
              onAudioSettingsClick();
            }}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs text-slate-300 transition-colors cursor-pointer"
            title="Audio Channels & Voice Settings"
          >
            <Sliders size={14} className="text-amber-400" />
            <span className="hidden sm:inline">Audio</span>
          </button>

          {/* How to Play */}
          <button
            onClick={() => {
              sound.playClick();
              onHowToPlayClick();
            }}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs text-slate-300 transition-colors cursor-pointer"
            title="How to Play"
          >
            <HelpCircle size={14} className="text-amber-400" />
            <span className="hidden sm:inline">Rules</span>
          </button>

          {/* Disclaimer */}
          <button
            onClick={() => {
              sound.playClick();
              onDisclaimerClick();
            }}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs text-slate-400 transition-colors cursor-pointer"
            title="Disclaimer"
          >
            <Info size={14} />
            <span className="hidden md:inline">Disclaimer</span>
          </button>

          {/* Quick Master Mute / Unmute */}
          <button
            onClick={handleToggleMasterMute}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              audioSettings.masterMuted
                ? 'bg-red-950/40 border-red-800 text-red-400'
                : 'bg-emerald-950/40 border-emerald-700 text-emerald-400 hover:bg-emerald-900/50'
            }`}
            title={audioSettings.masterMuted ? 'Unmute All Audio' : 'Mute All Audio'}
          >
            {audioSettings.masterMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
};
