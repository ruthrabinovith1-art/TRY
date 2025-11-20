import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { VoteCard } from './components/VoteCard';
import { ResetButton } from './components/ResetButton';
import { VoteOption, VoteState } from './types';
import { getVotes, saveVote, getUserVoteStatus, setUserVoteStatus, resetAllData } from './services/storageService';
import { Coffee, Bug, Laptop2 } from 'lucide-react';

const App: React.FC = () => {
  const [votes, setVotes] = useState<VoteState>({ [VoteOption.ELEVEN]: 0, [VoteOption.TWELVE]: 0 });
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<VoteOption | null>(null);
  const [totalVotes, setTotalVotes] = useState<number>(0);

  // Initial data load
  useEffect(() => {
    loadData();
  }, []);

  // Calculate totals whenever votes change
  useEffect(() => {
    const total = (votes[VoteOption.ELEVEN] || 0) + (votes[VoteOption.TWELVE] || 0);
    setTotalVotes(total);
  }, [votes]);

  const loadData = () => {
    const storedVotes = getVotes();
    const userStatus = getUserVoteStatus();
    
    setVotes(storedVotes);
    setHasVoted(userStatus.hasVoted);
    setSelectedOption(userStatus.selectedOption);
  };

  const handleVote = (option: VoteOption) => {
    if (hasVoted) return;

    const newVotes = saveVote(option);
    setUserVoteStatus(option);
    
    setVotes(newVotes);
    setHasVoted(true);
    setSelectedOption(option);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset local storage? > sudo rm -rf votes')) {
      resetAllData();
      loadData();
    }
  };

  const getPercentage = (option: VoteOption) => {
    if (totalVotes === 0) return 0;
    return ((votes[option] || 0) / totalVotes) * 100;
  };

  return (
    // Main Background - Dark Theme IDE Style
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#0f172a] overflow-x-hidden font-sans">
      
      {/* Background ambient code glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full mix-blend-screen blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full mix-blend-screen blur-[120px] animate-blob"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <Header />

        <main className="mt-4 flex flex-col items-center">
          {!hasVoted ? (
             <div className="relative text-center mb-12 animate-in slide-in-from-bottom-4 fade-in duration-500 group">
                <div className="inline-block px-4 py-1.5 rounded-md bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono text-sm mb-4">
                  ⚠ Warning: Blocking Issue
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-slate-200 drop-shadow-lg">
                  Select Start Time
                </h2>
             </div>
          ) : (
            <div className="relative text-center mb-12 animate-in zoom-in-95 fade-in duration-500">
               <h2 className="text-4xl font-mono font-bold text-green-400 mb-2 drop-shadow-md">
                 Success!
               </h2>
               <p className="text-slate-400 text-lg font-mono">
                 {`{ status: "vote_registered" }`}
               </p>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full">
            
            <VoteCard
              option={VoteOption.ELEVEN}
              theme="cyan"
              icon={<Coffee />}
              subLabel="Coffee.then(Code)"
              onClick={() => handleVote(VoteOption.ELEVEN)}
              selected={selectedOption === VoteOption.ELEVEN}
              disabled={hasVoted}
              isResultMode={hasVoted}
              votes={votes[VoteOption.ELEVEN]}
              percentage={getPercentage(VoteOption.ELEVEN)}
            />

            {/* VS Badge */}
            <div className="relative z-20 shrink-0">
               <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center shadow-2xl border border-slate-600 transform rotate-45">
                 <span className="font-black text-slate-400 text-sm -rotate-45 font-mono">OR</span>
               </div>
            </div>

            <VoteCard
              option={VoteOption.TWELVE}
              theme="orange"
              icon={<Bug />} // Changed to Bug or Laptop
              subLabel="Fix_Bugs_First"
              onClick={() => handleVote(VoteOption.TWELVE)}
              selected={selectedOption === VoteOption.TWELVE}
              disabled={hasVoted}
              isResultMode={hasVoted}
              votes={votes[VoteOption.TWELVE]}
              percentage={getPercentage(VoteOption.TWELVE)}
            />
          </div>
          
          {hasVoted && (
            <div className="mt-16 text-center relative z-10">
               <div className="inline-flex items-center gap-4 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 text-slate-200 px-8 py-4 rounded-xl text-lg font-mono shadow-2xl">
                 <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                 <span>total_commits: <span className="text-white font-bold">{totalVotes}</span></span>
               </div>
            </div>
          )}

        </main>

        <div className="flex justify-center pt-20 pb-10">
          <ResetButton onReset={handleReset} />
        </div>
      </div>
    </div>
  );
};

export default App;
