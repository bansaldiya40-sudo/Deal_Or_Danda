import React, { useState } from 'react';
import { X, Volume2, VolumeX, Music, Mic, Zap, Settings } from 'lucide-react';
import { sound } from '../../utils/audio';
import { AudioSettings } from '../../types/game';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioSettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<AudioSettings>(sound.getSettings());

  if (!isOpen) return null;

  const handleChange = (partial: Partial<AudioSettings>) => {
    sound.updateSettings(partial);
    setSettings(sound.getSettings());
  };

  const handleTestSound = (type: 'sfx' | 'music' | 'voice') => {
    if (type === 'sfx') sound.playClick();
    if (type === 'music') sound.playDramaticIntro();
    if (type === 'voice') sound.speak('ashneer', 'Bhai, numbers dikha! Voice acting test pass ho gaya!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 select-none animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 relative shadow-2xl text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center space-x-3 mb-4 text-amber-400">
          <Settings size={24} />
          <h2 className="text-xl font-black tracking-wide text-white m-0">
            Audio & Voice Settings
          </h2>
        </div>

        <div className="space-y-4 text-sm">
          {/* Master Mute Toggle */}
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {settings.masterMuted ? <VolumeX className="text-red-400" /> : <Volume2 className="text-emerald-400" />}
              <div>
                <p className="font-bold text-white text-sm">Master Sound</p>
                <p className="text-[11px] text-slate-400">Toggle all game audio</p>
              </div>
            </div>
            <button
              onClick={() => handleChange({ masterMuted: !settings.masterMuted })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                settings.masterMuted
                  ? 'bg-red-950 text-red-300 border border-red-700'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {settings.masterMuted ? 'Muted' : 'Enabled'}
            </button>
          </div>

          {/* Intro Music Channel */}
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Music size={18} className="text-indigo-400" />
                <span className="font-semibold text-xs text-white">Dramatic Intro Music</span>
              </div>
              <button
                onClick={() => handleChange({ musicMuted: !settings.musicMuted })}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer ${
                  settings.musicMuted ? 'bg-slate-700 text-slate-400' : 'bg-indigo-600 text-white'
                }`}
              >
                {settings.musicMuted ? 'Off' : 'On'}
              </button>
            </div>
            {!settings.musicMuted && (
              <div className="flex items-center space-x-3 pt-1">
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={settings.musicVolume}
                  onChange={(e) => handleChange({ musicVolume: Number(e.target.value) })}
                  className="flex-1 accent-indigo-500 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleTestSound('music')}
                  className="text-[10px] text-indigo-300 underline cursor-pointer"
                >
                  Test Intro
                </button>
              </div>
            )}
          </div>

          {/* Voice Acting Channel */}
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mic size={18} className="text-amber-400" />
                <div>
                  <span className="font-semibold text-xs text-white">Shark Voice Acting</span>
                  <p className="text-[10px] text-slate-400">Cashneer, Demand, Win-ita & Namita</p>
                </div>
              </div>
              <button
                onClick={() => handleChange({ voiceMuted: !settings.voiceMuted })}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer ${
                  settings.voiceMuted ? 'bg-slate-700 text-slate-400' : 'bg-amber-600 text-white'
                }`}
              >
                {settings.voiceMuted ? 'Off' : 'On'}
              </button>
            </div>
            {!settings.voiceMuted && (
              <div className="flex items-center space-x-3 pt-1">
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={settings.voiceVolume}
                  onChange={(e) => handleChange({ voiceVolume: Number(e.target.value) })}
                  className="flex-1 accent-amber-500 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleTestSound('voice')}
                  className="text-[10px] text-amber-300 underline cursor-pointer"
                >
                  Test Voice
                </button>
              </div>
            )}
          </div>

          {/* SFX / Danda Channel */}
          <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap size={18} className="text-red-400" />
                <span className="font-semibold text-xs text-white">Danda Bonk & SFX</span>
              </div>
              <button
                onClick={() => handleChange({ sfxMuted: !settings.sfxMuted })}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer ${
                  settings.sfxMuted ? 'bg-slate-700 text-slate-400' : 'bg-red-600 text-white'
                }`}
              >
                {settings.sfxMuted ? 'Off' : 'On'}
              </button>
            </div>
            {!settings.sfxMuted && (
              <div className="flex items-center space-x-3 pt-1">
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={settings.sfxVolume}
                  onChange={(e) => handleChange({ sfxVolume: Number(e.target.value) })}
                  className="flex-1 accent-red-500 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => handleTestSound('sfx')}
                  className="text-[10px] text-red-300 underline cursor-pointer"
                >
                  Test Bonk
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black rounded-xl transition-all cursor-pointer text-xs uppercase tracking-wide"
        >
          Save & Return to Tank
        </button>
      </div>
    </div>
  );
};
