import React, { useState, useEffect } from 'react';
import { 
  Compass, Sparkles, CheckCircle2, Circle, ArrowRight, BookOpen, 
  PlayCircle, Award, Terminal, RefreshCw, Layers 
} from 'lucide-react';
import { RoadmapStep, UserProfile } from '../types';

interface RoadmapViewProps {
  userProfile: UserProfile;
}

export default function RoadmapView({ userProfile }: RoadmapViewProps) {
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoadmap = async (regenerate = false) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/gemini/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSkills: userProfile.currentSkills,
          preferredLanguages: userProfile.preferredLanguages,
          desiredCareer: userProfile.desiredCareer,
          experienceLevel: userProfile.experienceLevel
        })
      });
      const data = await res.json();
      setSteps(data);
    } catch (err) {
      console.error("Failed to generate career roadmap:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, [userProfile]);

  const toggleStep = (id: string) => {
    setSteps(prev => prev.map(st => {
      if (st.id === id) {
        return { ...st, completed: !st.completed };
      }
      return st;
    }));
  };

  const completedCount = steps.filter(s => s.completed).length;
  const totalCount = steps.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="p-6 flex flex-col gap-6 text-left">
      
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="h-6 w-6 text-indigo-600" /> Career Roadmap Generator
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual interactive timelines mapped dynamically to target professional requirements.
          </p>
        </div>
        <button
          onClick={() => fetchRoadmap(true)}
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-50 dark:bg-[#1A1C23] hover:bg-indigo-100 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          {isLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Regenerate Roadmap
        </button>
      </div>

      {/* Progress tracker bar */}
      {steps.length > 0 && (
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Milestone Progression</div>
              <p className="text-[10px] text-slate-400 mt-0.5">Completed {completedCount} out of {totalCount} total checks</p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
            </div>
            <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400">{percent}%</span>
          </div>
        </div>
      )}

      {/* Main Roadmap Steps Panel */}
      {isLoading ? (
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-12 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center gap-4 min-h-[350px]">
          <RefreshCw className="h-10 w-10 text-indigo-500 animate-spin" />
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Generating Interactive Career Roadmap...</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Our AI engine is compiling standard checklists, learning resources, and books customized for "{userProfile.desiredCareer}".
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 relative pl-4 border-l border-slate-200 dark:border-slate-800/80 ml-4">
          {steps.map((st, idx) => (
            <div key={st.id} className="relative group text-left">
              
              {/* Timeline dot marker */}
              <div className="absolute -left-[27px] top-1 bg-white dark:bg-[#0A0B0D] p-1 rounded-full z-10">
                <button 
                  onClick={() => toggleStep(st.id)}
                  className="cursor-pointer transition-transform duration-200 hover:scale-110"
                >
                  {st.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-indigo-600 fill-indigo-100 dark:fill-indigo-950" />
                  ) : (
                    <Circle className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                  )}
                </button>
              </div>

              {/* Step Card body */}
              <div className={`bg-white dark:bg-[#111216] border rounded-2xl p-6 shadow-sm transition-all flex flex-col md:flex-row justify-between gap-6 ${
                st.completed 
                  ? 'border-indigo-100 dark:border-indigo-950 bg-indigo-50/10' 
                  : 'border-slate-200/80 dark:border-slate-800/80'
              }`}>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500">
                      Step {idx + 1} &middot; {st.duration}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase font-mono ${
                      st.difficulty === 'Beginner' ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' :
                      st.difficulty === 'Intermediate' ? 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20' :
                      'text-rose-500 bg-rose-50 dark:bg-rose-950/20'
                    }`}>
                      {st.difficulty}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
                    {st.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {st.description}
                  </p>

                  {/* Resource Recommendation Sub-Section */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-850">
                    <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono mb-3">
                      Recommended Learning Resources
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {st.resources.map((res, rid) => (
                        <a 
                          key={rid}
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#16181C] hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all cursor-pointer text-left"
                        >
                          <div className={`p-1.5 rounded-lg text-slate-500 dark:text-slate-400 ${
                            res.type === 'Course' ? 'bg-indigo-50 text-indigo-500 dark:bg-indigo-950/20' :
                            res.type === 'Book' ? 'bg-amber-50 text-amber-500 dark:bg-amber-950/20' :
                            res.type === 'YouTube' ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/20' :
                            'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/20'
                          }`}>
                            {res.type === 'Course' && <Award className="h-4 w-4" />}
                            {res.type === 'Book' && <BookOpen className="h-4 w-4" />}
                            {res.type === 'YouTube' && <PlayCircle className="h-4 w-4" />}
                            {res.type === 'Doc' && <Compass className="h-4 w-4" />}
                            {res.type === 'Project' && <Terminal className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{res.title}</div>
                            <div className="text-[9px] text-slate-400 mt-0.5 capitalize">{res.type} Reference</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
