import React from 'react';
import { X, HelpCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 relative shadow-2xl animate-fade-in text-slate-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center space-x-3 mb-4 text-amber-400">
          <HelpCircle size={28} />
          <h2 className="text-xl font-black tracking-wide text-white m-0">
            How to Play Deal or Danda
          </h2>
        </div>

        <div className="space-y-4 text-sm text-slate-300">
          {/* Step 1 */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start space-x-3">
            <span className="p-2 rounded-lg bg-amber-500/20 text-amber-400 font-black">1</span>
            <div>
              <h3 className="font-bold text-white text-base">Build or Pick a Startup</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose an innovative startup (or click <em>Surprise Me</em>) and set your funding ask and equity. Notice the live valuation multiple!
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start space-x-3">
            <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 font-black">2</span>
            <div>
              <h3 className="font-bold text-white text-base">Face the 4 Sharks in the Tank</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cashneer Grover, Demand Gupta, Win-ita Singh, and Namita Tappar grill you with distinct synthetic voice lines on margins, CAC, and valuation.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start space-x-3">
            <span className="p-2 rounded-lg bg-purple-500/20 text-purple-400 font-black">3</span>
            <div>
              <h3 className="font-bold text-white text-base">Interactive Cross-Questioning & Doglapan Alert</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Sharks challenge your answers and ask follow-ups. If you contradict earlier numbers, Cashneer will trigger the <strong>Doglapan Moment</strong>!
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start space-x-3">
            <span className="p-2 rounded-lg bg-red-500/20 text-red-400 font-black">4</span>
            <div>
              <h3 className="font-bold text-white text-base">Avoid the Cartoon DANDA 🏏</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Answer with real logic. If you give wild bluffs or zero-preparation answers, the comedic wind-up and cartoon Danda bonk will swing!
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 flex items-start space-x-3">
            <span className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 font-black">5</span>
            <div>
              <h3 className="font-bold text-white text-base">Negotiate Real Term Sheets</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Survive the interrogation to receive solo or joint offers. Watch out for dramatic "I'm OUT" moments and negotiate counter-offers!
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200">
            <strong>Golden Fairness Rule:</strong> Getting "No Deal" does not mean a danda! Well-prepared founders who simply don't fit still get high scores and respect. The Danda is reserved for hilarious bluffs and zero preparation!
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black rounded-xl transition-all cursor-pointer uppercase tracking-wider text-sm"
        >
          Got It, Take Me to the Tank!
        </button>
      </div>
    </div>
  );
};
