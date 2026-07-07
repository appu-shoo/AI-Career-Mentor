import React, { useState } from 'react';
import { 
  HelpCircle, Sparkles, RefreshCw, Play, Send, ChevronRight, 
  Award, CheckCircle, AlertCircle, Volume2, Mic, FileText 
} from 'lucide-react';

interface QuestionAnswer {
  question: string;
  answer: string;
  feedback?: string;
  score?: number;
}

interface EvaluationResult {
  overallScore: number;
  detailedFeedback: string;
  individualRatings: {
    question: string;
    answer: string;
    feedback: string;
    score: number;
  }[];
}

export default function MockInterviewView() {
  const [role, setRole] = useState('Software Engineer');
  const [type, setType] = useState<'technical' | 'behavioral' | 'system-design' | 'hr'>('technical');
  
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  
  const [qaPairs, setQaPairs] = useState<QuestionAnswer[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const maxSteps = 3; // 3-question loop for perfect size

  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  const startSession = async () => {
    setSessionActive(true);
    setQaPairs([]);
    setStepIndex(0);
    setEvaluation(null);
    setAnswer('');
    await fetchNextQuestion([]);
  };

  const fetchNextQuestion = async (history: any[]) => {
    setIsLoadingQuestion(true);
    try {
      const res = await fetch('/api/gemini/mock-interview/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, type, history })
      });
      const data = await res.json();
      setCurrentQuestion(data.question || "Could you describe how you configure high-throughput transactions in database tables?");
    } catch (err) {
      console.error("Failed to load interview question:", err);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim()) return;

    const newPair: QuestionAnswer = { question: currentQuestion, answer };
    const updatedPairs = [...qaPairs, newPair];
    setQaPairs(updatedPairs);
    setAnswer('');

    const nextIdx = stepIndex + 1;
    setStepIndex(nextIdx);

    if (nextIdx >= maxSteps) {
      // Loop complete, evaluate results
      setSessionActive(false);
      await evaluateInterview(updatedPairs);
    } else {
      // Fetch next question with history
      const history = updatedPairs.flatMap(p => [
        { role: 'user', parts: [{ text: p.answer }] },
        { role: 'model', parts: [{ text: p.question }] }
      ]);
      await fetchNextQuestion(history);
    }
  };

  const evaluateInterview = async (pairs: QuestionAnswer[]) => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/gemini/mock-interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          qaPairs: pairs.map(p => ({ question: p.question, answer: p.answer }))
        })
      });
      const data = await res.json();
      setEvaluation(data);
    } catch (err) {
      console.error("Interview evaluation request failed:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const triggerTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-6 text-left">
      
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-indigo-600" /> AI Mock Interview
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Simulate standard technical and architectural interview loops. Get immediate scannable scorecards.
        </p>
      </div>

      {!sessionActive && !evaluation && !isEvaluating && (
        <div className="max-w-xl mx-auto w-full bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm text-left flex flex-col gap-5">
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-amber-400" /> Configure Simulated Interview Loop
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">Target Career Role</label>
            <input 
              type="text" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">Interview Module Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['technical', 'behavioral', 'system-design', 'hr'] as const).map(tp => (
                <button
                  key={tp}
                  onClick={() => setType(tp)}
                  className={`px-4 py-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer text-center ${
                    type === tp 
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400' 
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {tp.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={startSession}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Play className="h-4.5 w-4.5 fill-white" /> Start AI Interview Loop
          </button>
        </div>
      )}

      {/* Active Session Chat Loop UI */}
      {sessionActive && (
        <div className="max-w-2xl mx-auto w-full bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm flex flex-col gap-5 text-left">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider font-mono">Live Session</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Question {stepIndex + 1} of {maxSteps}</span>
          </div>

          {/* AI Question Box */}
          <div className="p-5 bg-indigo-50/40 dark:bg-[#15171D] border border-indigo-100/50 dark:border-slate-800/60 rounded-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-mono">AI Interviewer Coach</span>
              <button 
                onClick={() => triggerTTS(currentQuestion)}
                className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                title="Synthesize Speech output"
              >
                <Volume2 className="h-4.5 w-4.5" />
              </button>
            </div>
            {isLoadingQuestion ? (
              <div className="text-xs text-slate-400 flex items-center gap-2 mt-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Drafting customized interview prompt...
              </div>
            ) : (
              <p className="text-sm font-semibold text-slate-800 dark:text-white leading-relaxed mt-2">
                "{currentQuestion}"
              </p>
            )}
          </div>

          {/* User Answer Area */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold text-slate-500">Provide Your Response</label>
            <textarea 
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-2xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed"
              placeholder="Structure your answer clearly, explaining context, exact technical decisions, and measurable outcomes..."
            />
          </div>

          <div className="flex items-center gap-3 justify-end mt-2">
            <button 
              onClick={submitAnswer}
              disabled={isLoadingQuestion || !answer.trim()}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-850 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Submit Answer & Continue <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Evaluating loading screen */}
      {isEvaluating && (
        <div className="max-w-xl mx-auto w-full bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-12 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center gap-4 min-h-[350px]">
          <RefreshCw className="h-10 w-10 text-indigo-500 animate-spin" />
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Evaluating Transcript Loop...</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            Our recruiter models are scanning accuracy coefficients, structural STAR formats, and vocabulary depth metrics.
          </p>
        </div>
      )}

      {/* Evaluation Result Dashboard */}
      {evaluation && !isEvaluating && (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 text-left">
          
          {/* Executive scorecard */}
          <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Loop Evaluation Scorecard</span>
              <h2 className="text-3xl font-display font-extrabold text-slate-900 dark:text-white mt-1">Recruiter Audit Completed</h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-md">{evaluation.detailedFeedback}</p>
            </div>
            <div className="p-6 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl text-center shrink-0 border border-indigo-100/40 dark:border-indigo-950/60">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-mono">Overall Ready Score</span>
              <div className="text-5xl font-display font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{evaluation.overallScore}%</div>
            </div>
          </div>

          {/* Individual detailed responses audits */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white pl-2">Individual Question Audits</h3>
            {evaluation.individualRatings.map((rate, i) => (
              <div key={i} className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm flex flex-col gap-4 text-left">
                
                {/* Question bar */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">Question {i + 1}</span>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed mt-0.5">"{rate.question}"</h4>
                </div>

                {/* Answer block */}
                <div className="p-3 bg-slate-50 dark:bg-[#17191E] border border-slate-100 dark:border-slate-800/60 rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Your transcript</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">"{rate.answer}"</p>
                </div>

                {/* Evaluation rating and feedback */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200 col-span-2">
                    <CheckCircle className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                    <span>{rate.feedback}</span>
                  </div>
                  <div className="flex items-center justify-end text-xs font-bold text-slate-800 dark:text-white">
                    <span className="mr-1.5 font-normal text-slate-400">Score:</span> {rate.score} / 100
                  </div>
                </div>

              </div>
            ))}
          </div>

          <button 
            onClick={startSession}
            className="py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-all text-center cursor-pointer"
          >
            Practice Another Interview Loop
          </button>
        </div>
      )}

    </div>
  );
}
