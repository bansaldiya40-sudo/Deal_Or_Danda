import React, { useState } from 'react';
import { StartupData } from '../../types/game';
import { SAMPLE_STARTUPS } from '../../data/sampleStartups';
import { formatRupees, calculateValuation, getValuationSanity } from '../../utils/valuation';
import { sound } from '../../utils/audio';
import {
  Dices,
  Sparkles,
  ArrowRight,
  DollarSign,
  PieChart,
  TrendingUp,
  AlertCircle,
  Camera,
  Upload,
  Trash2,
  ZoomIn,
  Move,
  Lock,
} from 'lucide-react';

interface Props {
  initialStartup: StartupData;
  onSubmit: (startup: StartupData) => void;
  onBack: () => void;
}

export const StartupFormScreen: React.FC<Props> = ({
  initialStartup,
  onSubmit,
  onBack,
}) => {
  const [formData, setFormData] = useState<StartupData>(initialStartup);
  const [error, setError] = useState<string | null>(null);

  const { postMoney, preMoney } = calculateValuation(formData.askAmount, formData.askEquity);
  const sanity = getValuationSanity(formData.monthlyRevenue, postMoney);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Please select a JPG, PNG, or WebP photo.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Photo size should be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        founderPhoto: dataUrl,
        founderPhotoCrop: prev.founderPhotoCrop || { zoom: 1, x: 0, y: 0 },
      }));
      sound.playClick();
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    sound.playClick();
    setFormData((prev) => ({
      ...prev,
      founderPhoto: undefined,
      founderPhotoCrop: undefined,
    }));
  };

  const handleCropChange = (field: 'zoom' | 'x' | 'y', val: number) => {
    setFormData((prev) => ({
      ...prev,
      founderPhotoCrop: {
        zoom: field === 'zoom' ? val : prev.founderPhotoCrop?.zoom ?? 1,
        x: field === 'x' ? val : prev.founderPhotoCrop?.x ?? 0,
        y: field === 'y' ? val : prev.founderPhotoCrop?.y ?? 0,
      },
    }));
  };

  const handleSelectSample = (sample: StartupData) => {
    sound.playClick();
    setFormData(sample);
    setError(null);
  };

  const handleSurpriseMe = () => {
    sound.playClick();
    const randomIndex = Math.floor(Math.random() * SAMPLE_STARTUPS.length);
    setFormData(SAMPLE_STARTUPS[randomIndex]);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please provide a startup name.');
      return;
    }
    if (formData.askAmount <= 0) {
      setError('Investment ask must be greater than ₹0.');
      return;
    }
    if (formData.askEquity <= 0 || formData.askEquity > 90) {
      setError('Equity offered must be between 1% and 90%.');
      return;
    }

    sound.playCorrect();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white m-0 flex items-center space-x-2">
            <span>Prepare Your Pitch</span>
            <span className="text-amber-400">📝</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build your venture or choose a curated sample to enter the tank immediately.
          </p>
        </div>

        {/* Surprise Me Button */}
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-bold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
        >
          <Dices size={18} className="text-amber-400" />
          <span>Surprise Me! 🎲</span>
        </button>
      </div>

      {/* Quick-Play Sample Startups Bar */}
      <div className="mb-6 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
        <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center space-x-1">
          <Sparkles size={14} className="text-amber-400" />
          <span>Quick-Play Sample Startups:</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_STARTUPS.map((sample) => (
            <button
              key={sample.name}
              type="button"
              onClick={() => handleSelectSample(sample)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                formData.name === sample.name
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md scale-102'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {sample.name}
            </button>
          ))}
        </div>
      </div>

      {/* Live Implied Valuation Banner Card */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-2 border-indigo-500/30 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Your Ask</p>
            <p className="text-xl sm:text-2xl font-black text-amber-400">
              {formatRupees(formData.askAmount)} for {formData.askEquity}%
            </p>
          </div>
          <div>
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Implied Post-Money Valuation</p>
            <p className="text-xl sm:text-2xl font-black text-cyan-400">
              {formatRupees(postMoney)}
            </p>
            <p className="text-[10px] text-slate-400">Pre-Money: {formatRupees(preMoney)}</p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-[11px] text-slate-400 uppercase font-semibold">Valuation Multiple</p>
            <p
              className={`text-xs sm:text-sm font-bold ${
                sanity.rating === 'insane'
                  ? 'text-red-400'
                  : sanity.rating === 'aggressive'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {sanity.message}
            </p>
          </div>
        </div>
      </div>

      {/* Main Pitch Details Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-950/60 border border-red-500 text-red-300 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Custom Founder Photo Upload Card */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Circular Preview of the Suited Founder Body with Photo */}
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-28 bg-slate-950 rounded-2xl border-2 border-amber-400/40 p-1 flex items-center justify-center overflow-hidden shadow-inner">
                <svg viewBox="0 0 160 200" className="w-full h-full">
                  <defs>
                    <clipPath id="formFounderPreviewClip">
                      <path d="M 56 75 Q 54 112 66 122 Q 81 130 96 122 Q 108 112 106 75 Q 106 48 81 48 Q 56 48 56 75 Z" />
                    </clipPath>
                    <linearGradient id="previewHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#1E40AF" />
                    </linearGradient>
                  </defs>
                  {/* Hoodie Body */}
                  <path d="M 30 200 L 36 145 Q 50 135 75 135 Q 85 135 105 135 Q 120 135 130 145 L 136 200 Z" fill="url(#previewHoodie)" />
                  <polygon points="72,135 90,135 81,160" fill="#FFFFFF" />
                  <rect x="73" y="118" width="16" height="20" fill="#CC8B58" />
                  <path d="M 56 75 Q 54 112 66 122 Q 81 130 96 122 Q 108 112 106 75 Q 106 48 81 48 Q 56 48 56 75 Z" fill="#E2A97B" />
                  {formData.founderPhoto ? (
                    <g clipPath="url(#formFounderPreviewClip)">
                      <image
                        href={formData.founderPhoto}
                        x={81 - (56 * (formData.founderPhotoCrop?.zoom || 1)) / 2 + (formData.founderPhotoCrop?.x || 0)}
                        y={85 - (80 * (formData.founderPhotoCrop?.zoom || 1)) / 2 + (formData.founderPhotoCrop?.y || 0)}
                        width={56 * (formData.founderPhotoCrop?.zoom || 1)}
                        height={80 * (formData.founderPhotoCrop?.zoom || 1)}
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </g>
                  ) : (
                    <>
                      <path d="M 53 70 C 50 40 70 34 82 34 C 100 34 112 42 109 70 C 103 55 94 50 81 50 C 67 50 58 58 53 70 Z" fill="#1E293B" />
                      <circle cx="68" cy="82" r="2.5" fill="#0F172A" />
                      <circle cx="92" cy="82" r="2.5" fill="#0F172A" />
                      <rect x="59" y="76" width="18" height="12" rx="2" fill="none" stroke="#2563EB" strokeWidth="1.8" />
                      <rect x="83" y="76" width="18" height="12" rx="2" fill="none" stroke="#2563EB" strokeWidth="1.8" />
                      <line x1="77" y1="81" x2="83" y2="81" stroke="#2563EB" strokeWidth="1.8" />
                      <path d="M 72 104 Q 80 114 88 104" stroke="#0F172A" strokeWidth="2.5" fill="none" />
                    </>
                  )}
                </svg>
              </div>
              <span className="text-[10px] text-amber-300/80 mt-1 font-mono">Stage Avatar</span>
            </div>

            {/* Upload & Crop Controls */}
            <div className="flex-1 w-full space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-200 flex items-center space-x-1.5">
                    <Camera size={14} className="text-amber-400" />
                    <span>Custom Founder Face (Optional)</span>
                  </label>
                  <p className="text-[11px] text-slate-400">
                    Upload your own photo (JPG, PNG, WebP) to put your face in the tank!
                  </p>
                </div>
                {formData.founderPhoto && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-800 text-red-300 hover:bg-red-900 text-xs transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>

              {!formData.founderPhoto ? (
                <div>
                  <label className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 hover:border-amber-400 text-amber-300 text-xs font-bold cursor-pointer transition-all hover:scale-102">
                    <Upload size={14} />
                    <span>Choose Founder Photo (JPG, PNG, WebP)</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  {/* Zoom Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="flex items-center space-x-1"><ZoomIn size={12} /><span>Zoom</span></span>
                      <span>{(formData.founderPhotoCrop?.zoom ?? 1).toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={2.5}
                      step={0.1}
                      value={formData.founderPhotoCrop?.zoom ?? 1}
                      onChange={(e) => handleCropChange('zoom', Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Pan X Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="flex items-center space-x-1"><Move size={12} /><span>Pan X</span></span>
                      <span>{formData.founderPhotoCrop?.x ?? 0}px</span>
                    </div>
                    <input
                      type="range"
                      min={-40}
                      max={40}
                      step={1}
                      value={formData.founderPhotoCrop?.x ?? 0}
                      onChange={(e) => handleCropChange('x', Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Pan Y Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="flex items-center space-x-1"><Move size={12} /><span>Pan Y</span></span>
                      <span>{formData.founderPhotoCrop?.y ?? 0}px</span>
                    </div>
                    <input
                      type="range"
                      min={-40}
                      max={40}
                      step={1}
                      value={formData.founderPhotoCrop?.y ?? 0}
                      onChange={(e) => handleCropChange('y', Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Privacy Guarantee Note */}
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 font-mono">
                <Lock size={11} className="text-emerald-500" />
                <span>100% Client-Side Privacy: Photo stays in your browser and is never uploaded to any server.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Startup Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Startup Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-sm"
              placeholder="e.g. KadakChai Co."
            />
          </div>

          {/* Industry */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Industry / Sector
            </label>
            <select
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-sm"
            >
              <option value="Food & Beverage">Food & Beverage (FMCG)</option>
              <option value="Consumer Tech & AI">Consumer Tech & AI</option>
              <option value="EdTech & Skill Development">EdTech & Skill Development</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="E-commerce & D2C">E-commerce & D2C</option>
              <option value="Hardware & Robotics">Hardware & Robotics</option>
              <option value="Pet Care">Pet Care</option>
            </select>
          </div>

          {/* Tagline */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-semibold text-slate-300">
              Elevator Pitch / Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-sm"
              placeholder="A one-sentence hook that wows the sharks"
            />
          </div>

          {/* Detailed Description */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-semibold text-slate-300">
              Product & Problem Solved
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-sm"
              placeholder="Describe what you sell and why customers love it"
            />
          </div>

          {/* Target Customer */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Target Customer
            </label>
            <input
              type="text"
              value={formData.targetCustomer}
              onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-sm"
              placeholder="e.g. Urban millennials, college students"
            />
          </div>

          {/* Revenue Model */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Revenue Model
            </label>
            <input
              type="text"
              value={formData.revenueModel}
              onChange={(e) => setFormData({ ...formData, revenueModel: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-amber-400 focus:outline-none text-slate-100 text-sm"
              placeholder="e.g. D2C subscriptions, Retail margin"
            />
          </div>
        </div>

        {/* Financial Numbers Grid */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-amber-300 flex items-center space-x-1.5">
            <TrendingUp size={16} />
            <span>Financials & The Ask</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Monthly Revenue */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">
                Monthly Revenue (₹)
              </label>
              <input
                type="number"
                min={0}
                step={50000}
                value={formData.monthlyRevenue}
                onChange={(e) =>
                  setFormData({ ...formData, monthlyRevenue: Math.max(0, Number(e.target.value)) })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400 font-mono text-sm"
              />
              <p className="text-[10px] text-slate-400">{formatRupees(formData.monthlyRevenue)} / mo</p>
            </div>

            {/* Monthly Expenses */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">
                Monthly Expenses / Burn (₹)
              </label>
              <input
                type="number"
                min={0}
                step={50000}
                value={formData.monthlyExpenses}
                onChange={(e) =>
                  setFormData({ ...formData, monthlyExpenses: Math.max(0, Number(e.target.value)) })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-rose-400 font-mono text-sm"
              />
              <p className="text-[10px] text-slate-400">{formatRupees(formData.monthlyExpenses)} / mo</p>
            </div>

            {/* Total Prior Funding */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">
                Total Prior Raised (₹)
              </label>
              <input
                type="number"
                min={0}
                step={100000}
                value={formData.totalRaised}
                onChange={(e) =>
                  setFormData({ ...formData, totalRaised: Math.max(0, Number(e.target.value)) })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 font-mono text-sm"
              />
              <p className="text-[10px] text-slate-400">{formatRupees(formData.totalRaised)}</p>
            </div>
          </div>

          {/* The Pitch Ask: Amount & Equity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
            <div className="space-y-1">
              <label className="text-[11px] text-amber-300 font-bold">
                Funding Request Amount (₹) *
              </label>
              <input
                type="number"
                min={500000}
                step={500000}
                required
                value={formData.askAmount}
                onChange={(e) =>
                  setFormData({ ...formData, askAmount: Math.max(0, Number(e.target.value)) })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-amber-500/50 text-amber-400 font-mono text-base font-bold"
              />
              <p className="text-[10px] text-amber-400/80">{formatRupees(formData.askAmount)}</p>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-amber-300 font-bold">
                Equity Offered (%) *
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min={1}
                  max={50}
                  step={0.5}
                  value={formData.askEquity}
                  onChange={(e) =>
                    setFormData({ ...formData, askEquity: Number(e.target.value) })
                  }
                  className="flex-1 accent-amber-500 cursor-pointer"
                />
                <span className="font-mono text-base font-bold text-amber-400 w-12 text-right">
                  {formData.askEquity}%
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Typically 2% - 15% in the Tank</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors cursor-pointer"
          >
            ← Back
          </button>

          <button
            type="submit"
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 text-slate-950 text-base font-black tracking-wide shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2 cursor-pointer uppercase"
          >
            <span>Enter the Tank</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};
