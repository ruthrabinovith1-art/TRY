import React from 'react';
import { Terminal, Code2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-10 pt-4 relative z-10">
      <div className="inline-flex items-center justify-center p-5 bg-slate-800/50 backdrop-blur-md border border-slate-600/50 rounded-2xl text-cyan-400 mb-6 shadow-2xl shadow-cyan-500/10 transform hover:scale-105 transition-transform duration-300 ring-4 ring-slate-700/30">
        <Terminal className="w-12 h-12 stroke-[2] drop-shadow-lg" />
      </div>
      <h1 className="font-mono text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 tracking-tight mb-4 drop-shadow-sm">
        &lt;DailySync /&gt;
      </h1>
      <div className="flex items-center justify-center gap-2 text-slate-400 font-mono text-sm md:text-lg bg-black/20 inline-block px-4 py-1 rounded-lg backdrop-blur-sm border border-white/5">
        <Code2 className="w-4 h-4" />
        <span>git checkout -b daily-time-vote</span>
      </div>
    </header>
  );
};