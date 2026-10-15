import React from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 relative shadow-2xl animate-fade-in text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center space-x-3 mb-4 text-amber-400">
          <ShieldAlert size={28} />
          <h2 className="text-xl font-black tracking-wide text-white m-0">
            Fictional Fan Prototype Disclaimer
          </h2>
        </div>

        <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
          <p>
            <strong>Deal or Danda</strong> is an independent, fictional parody game created for educational, entertainment, and portfolio demonstration purposes.
          </p>
          <p>
            This project is <strong>not</strong> an official Shark Tank India product, nor is it affiliated with, endorsed by, or sponsored by Sony Pictures Networks India, StudioNEXT, Sony LIV, or any official franchise rights holders.
          </p>
          <p>
            All investor depictions, quotes, and comedic reactions are original stylized caricatures and satirical parody, and do not represent actual real-world statements, endorsements, or financial advice from the portrayed entrepreneurs.
          </p>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
            No real trademarks, official broadcast footage, or proprietary commercial logos are used in this application.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all cursor-pointer"
        >
          I Understand, Let's Play!
        </button>
      </div>
    </div>
  );
};
