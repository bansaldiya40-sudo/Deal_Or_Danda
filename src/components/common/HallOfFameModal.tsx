import React, { useState, useEffect } from 'react';
import { X, Trophy, TrendingUp, AlertTriangle, RefreshCw, Clock } from 'lucide-react';
import { formatRupees } from '../../utils/valuation';
import { sound } from '../../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const HallOfFameModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'topDeals' | 'topScores' | 'hallOfShame' | 'recent'>('topDeals');
  const [leaderboard, setLeaderboard] = useState<{
    topDeals: any[];
    topScores: any[];
    hallOfShame: any[];
  } | null>(null);
  const [recentGames, setRecentGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [lbRes, recentRes] = await Promise.all([
        fetch('/api/leaderboard'),
        fetch('/api/games?limit=15'),
      ]);

      if (!lbRes.ok || !recentRes.ok) {
        throw new Error('Failed to load pitch records from server');
      }

      const lbData = await lbRes.json();
      const recentData = await recentRes.json();

      setLeaderboard(lbData);
      setRecentGames(recentData.games || []);
    } catch (err: any) {
      console.warn('[HallOfFame] Failed to fetch:', err);
      setError('Unable to load leaderboard. Server may be starting or offline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 select-none animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] text-slate-200 max-h-[88vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div className="flex items-center justify-between mb-4 pr-10">
          <div className="flex items-center space-x-3 text-amber-400">
            <Trophy size={26} />
            <div>
              <h2 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-red-500 m-0 uppercase">
                Hall of Fame & Past Pitches
              </h2>
              <p className="text-[11px] text-slate-400 m-0">
                Official Pitch Registry from the Tank
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              fetchData();
            }}
            disabled={loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center space-x-1 cursor-pointer transition-colors"
            title="Refresh Records"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-4 gap-1.5 bg-slate-950 p-1.5 rounded-2xl mb-4 border border-slate-800">
          <button
            onClick={() => { sound.playClick(); setActiveTab('topDeals'); }}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer ${
              activeTab === 'topDeals'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🤝 Deals</span>
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('topScores'); }}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer ${
              activeTab === 'topScores'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>⭐ Top Score</span>
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('hallOfShame'); }}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer ${
              activeTab === 'hallOfShame'
                ? 'bg-red-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🏏 Danda</span>
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('recent'); }}
            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer ${
              activeTab === 'recent'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📜 Recent</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {loading && (
            <div className="text-center py-12 text-slate-400 text-xs">
              <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-amber-400" />
              Loading tank records from server...
            </div>
          )}

          {error && !loading && (
            <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800 text-red-300 text-xs text-center">
              <AlertTriangle size={20} className="mx-auto mb-1 text-red-400" />
              <p>{error}</p>
              <button
                onClick={fetchData}
                className="mt-2 px-3 py-1 bg-red-600/30 hover:bg-red-600/50 rounded-lg text-red-200 text-xs cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* Top Deals */}
          {!loading && !error && activeTab === 'topDeals' && (
            <>
              {(!leaderboard?.topDeals || leaderboard.topDeals.length === 0) ? (
                <p className="text-center py-10 text-slate-400 text-xs">No deals secured yet. Pitch your startup and close an investor!</p>
              ) : (
                leaderboard.topDeals.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between hover:border-amber-400/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                        index === 0 ? 'bg-amber-400 text-black' : index === 1 ? 'bg-slate-300 text-black' : index === 2 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        #{index + 1}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-white flex items-center space-x-2">
                          <span>{item.startup_name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                            {item.industry}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Partnered with <strong className="text-amber-300">{item.accepted_deal_investor || 'Sharks'}</strong> • Score: {item.score}/100
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-amber-400 font-mono">
                        {formatRupees(item.valuation || 0)}
                      </p>
                      <p className="text-[10px] text-slate-400">Valuation</p>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* Top Scores */}
          {!loading && !error && activeTab === 'topScores' && (
            <>
              {(!leaderboard?.topScores || leaderboard.topScores.length === 0) ? (
                <p className="text-center py-10 text-slate-400 text-xs">No pitches logged yet.</p>
              ) : (
                leaderboard.topScores.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between hover:border-emerald-400/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center text-xs font-black shrink-0">
                        #{index + 1}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-white flex items-center space-x-2">
                          <span>{item.startup_name}</span>
                          <span className="text-[10px] text-slate-400">by {item.player_name}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Verdict: <span className="capitalize text-slate-300">{item.final_verdict}</span> • Dandas: {item.danda_count}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-emerald-400 font-mono">
                        {item.score}<span className="text-[10px] text-slate-400 font-normal">/100</span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* Hall of Shame / Danda */}
          {!loading && !error && activeTab === 'hallOfShame' && (
            <>
              {(!leaderboard?.hallOfShame || leaderboard.hallOfShame.length === 0) ? (
                <p className="text-center py-10 text-slate-400 text-xs">No danda strikes yet. Everyone pitched safely!</p>
              ) : (
                leaderboard.hallOfShame.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-slate-800/60 border border-red-900/40 flex items-center justify-between hover:border-red-500/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-7 h-7 rounded-full bg-red-950/60 text-red-400 flex items-center justify-center text-xs font-black shrink-0 border border-red-800">
                        🏏
                      </span>
                      <div>
                        <div className="font-bold text-sm text-white flex items-center space-x-2">
                          <span>{item.startup_name}</span>
                          <span className="text-[10px] text-slate-400">by {item.player_name}</span>
                        </div>
                        <p className="text-[11px] text-red-300 mt-0.5">
                          Received {item.danda_count} Danda bonks • Score: {item.score}/100
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-bold uppercase">
                        {item.final_verdict === 'danda' ? 'Danda Ending' : 'High Blunders'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* Recent Pitches */}
          {!loading && !error && activeTab === 'recent' && (
            <>
              {recentGames.length === 0 ? (
                <p className="text-center py-10 text-slate-400 text-xs">No recent pitches found.</p>
              ) : (
                recentGames.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-center justify-between hover:border-cyan-400/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {item.final_verdict === 'deal' ? '🤝' : item.final_verdict === 'danda' ? '🏏' : '⚖️'}
                      </span>
                      <div>
                        <div className="font-bold text-sm text-white flex items-center space-x-2">
                          <span>{item.startup_name}</span>
                          <span className="text-[10px] text-slate-400">({item.industry})</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center space-x-2">
                          <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}</span>
                          <span>•</span>
                          <span className="capitalize">{item.final_verdict}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono font-bold text-cyan-300">
                        {item.score}/100
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {item.final_verdict === 'deal' ? formatRupees(item.valuation || 0) : 'Bootstrapped'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
