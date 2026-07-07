import React, { useState } from 'react';
import { 
  Terminal, Sparkles, RefreshCw, CheckCircle, AlertCircle, 
  HelpCircle, ChevronRight, Play, BookOpen, Award, Flame 
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  templateCode: string;
}

interface Evaluation {
  passed: boolean;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  hints: string[];
  optimizedSolution: string;
}

export default function CodingChallengeView() {
  const challenges: Challenge[] = [
    {
      id: 'ch-1',
      title: 'Maximum Subarray (Kadane)',
      difficulty: 'Medium',
      category: 'Dynamic Programming',
      description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum. Try to implement an O(N) linear scan.',
      templateCode: `function maxSubArray(nums) {
  // Write your linear scan logic here
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  return maxSum;
}`
    },
    {
      id: 'ch-2',
      title: 'Valid Parentheses Check',
      difficulty: 'Easy',
      category: 'Data Structures (Stack)',
      description: 'Given a string containing characters (,),[,],{,}, determine if the input string is valid. Open brackets must be closed by the same type.',
      templateCode: `function isValid(s) {
  // Use a stack data structure here
  let stack = [];
  
  return true;
}`
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const activeChallenge = challenges[activeIdx];
  const [code, setCode] = useState(activeChallenge.templateCode);
  const [streak, setStreak] = useState(12);

  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  const selectChallenge = (idx: number) => {
    setActiveIdx(idx);
    setCode(challenges[idx].templateCode);
    setEvaluation(null);
  };

  const handleSubmitCode = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/gemini/coding-challenge/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          challengeTitle: activeChallenge.title,
          challengeDescription: activeChallenge.description
        })
      });
      const data = await res.json();
      setEvaluation(data);
      if (data.passed) {
        setStreak(prev => prev + 1);
      }
    } catch (err) {
      console.error("Failed to compile coding solution:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 text-left">
      
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Terminal className="h-6 w-6 text-indigo-600" /> Algorithmic Sandbox
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Solve curated tech coding challenges. Evaluate performance time and space complexities.
          </p>
        </div>
        
        {/* Flame Streak Indicator */}
        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 px-4 py-2 border border-amber-100 dark:border-amber-900/40 rounded-xl w-fit">
          <Flame className="h-5 w-5 text-amber-500 fill-amber-500 animate-pulse" />
          <div>
            <div className="text-xs font-bold text-amber-700 dark:text-amber-400 font-display">Daily Challenge Streak</div>
            <p className="text-[10px] text-amber-600 font-mono font-bold">{streak} Days Consistent</p>
          </div>
        </div>
      </div>

      {/* Grid: Challenges list, editor, results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Challenge Selector & instructions */}
        <div className="flex flex-col gap-5">
          <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm text-left">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 mb-3 font-mono">Curated Algorithmic Problems</h3>
            <div className="flex flex-col gap-2">
              {challenges.map((ch, i) => (
                <button
                  key={ch.id}
                  onClick={() => selectChallenge(i)}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    activeIdx === i 
                      ? 'border-indigo-600 bg-indigo-50/20 text-slate-900 dark:text-white' 
                      : 'border-slate-150 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-display">{ch.title}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                      ch.difficulty === 'Easy' ? 'text-emerald-500 bg-emerald-50' : 'text-amber-500 bg-amber-50'
                    }`}>{ch.difficulty}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{ch.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm text-left flex flex-col gap-3">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
              <BookOpen className="h-4.5 w-4.5 text-indigo-500" /> Challenge Scope Description
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">{activeChallenge.description}</p>
            <div className="mt-2 text-[10px] text-slate-400 bg-slate-50 dark:bg-[#15171D] p-2.5 rounded-lg font-mono border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-indigo-500">Focus Category:</span> {activeChallenge.category}
            </div>
          </div>
        </div>

        {/* Center: Editor Code sandbox */}
        <div className="lg:col-span-2 flex flex-col gap-5 text-left">
          <div className="bg-[#101115] border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col flex-1 min-h-[420px]">
            <div className="bg-[#181A1F] border-b border-slate-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-slate-400 font-mono ml-3 font-semibold">sandbox_editor.ts</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 font-semibold bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900">TypeScript</span>
            </div>

            <textarea 
              rows={15}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full flex-1 p-5 bg-[#0A0B0D] text-slate-300 font-mono text-xs leading-relaxed focus:outline-none resize-none border-0"
              spellCheck="false"
            />

            <div className="bg-[#181A1F] border-t border-slate-800 p-4 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-mono">Status: Awaiting Compilation</span>
              <button
                onClick={handleSubmitCode}
                disabled={isLoading}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-850 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Compiling sandbox...
                  </>
                ) : (
                  <>
                    Run Solution <Play className="h-3.5 w-3.5 fill-white" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Solution Analysis evaluation */}
          {evaluation && (
            <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm text-left flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">Sandbox compilation succeeded</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono font-bold text-slate-500">
                  <span>Time: <span className="text-indigo-600 dark:text-indigo-400">{evaluation.timeComplexity}</span></span>
                  <span>&middot;</span>
                  <span>Space: <span className="text-indigo-600 dark:text-indigo-400">{evaluation.spaceComplexity}</span></span>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans pl-2 border-l-2 border-indigo-500">
                {evaluation.explanation}
              </div>

              {/* Hints list */}
              <div className="mt-2">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Review Hints for Next Runs</span>
                <ul className="flex flex-col gap-1.5 mt-2 text-xs text-slate-500">
                  {evaluation.hints.map((hn, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{hn}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optimized solution preview code */}
              <div className="mt-4 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 border-b border-slate-150 dark:border-slate-800 text-[10px] font-mono text-slate-400 font-bold">
                  AI-Proposed Optimized Linear Sample
                </div>
                <pre className="p-4 bg-[#0A0B0D] text-[#80C2FF] font-mono text-[11px] leading-relaxed overflow-x-auto text-left">
                  {evaluation.optimizedSolution}
                </pre>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
