import React, { useState, useEffect } from 'react';
import { 
  LineChart as LineIcon, Sparkles, TrendingUp, AlertCircle, CheckCircle, 
  RefreshCw, Terminal, Target 
} from 'lucide-react';
import { 
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, Tooltip, BarChart, Bar, XAxis, YAxis 
} from 'recharts';
import { SkillItem, UserProfile } from '../types';

interface SkillGapViewProps {
  userProfile: UserProfile;
}

export default function SkillGapView({ userProfile }: SkillGapViewProps) {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGapAnalysis = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/gemini/analyze-gap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSkills: userProfile.currentSkills,
          desiredCareer: userProfile.desiredCareer
        })
      });
      const data = await res.json();
      setSkills(data);
    } catch (err) {
      console.error("Failed to fetch skill gap analysis:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGapAnalysis();
  }, [userProfile]);

  // Map levels to numeric scores for Recharts representation
  const levelToScore = (level: string) => {
    switch (level) {
      case 'mastered': return 95;
      case 'intermediate': return 75;
      case 'beginner': return 45;
      case 'missing': return 10;
      default: return 0;
    }
  };

  const chartData = skills.map(sk => ({
    subject: sk.name,
    Score: levelToScore(sk.level),
    Target: 90
  }));

  const mastered = skills.filter(s => s.level === 'mastered');
  const intermediate = skills.filter(s => s.level === 'intermediate');
  const beginner = skills.filter(s => s.level === 'beginner');
  const missing = skills.filter(s => s.level === 'missing');

  return (
    <div className="p-6 flex flex-col gap-6 text-left">
      
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <LineIcon className="h-6 w-6 text-indigo-600" /> Skill Gap Radar
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Audit your technical and soft skill proficiency scores compared directly to standard market listings.
          </p>
        </div>
        <button
          onClick={fetchGapAnalysis}
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-50 dark:bg-[#1A1C23] hover:bg-indigo-100 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          {isLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Refresh Gap Analysis
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-12 rounded-2xl shadow-sm text-center flex flex-col items-center justify-center gap-4 min-h-[350px]">
          <RefreshCw className="h-10 w-10 text-indigo-500 animate-spin" />
          <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Analyzing Competency Delta...</div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Comparing your existing skillset to requirements for "{userProfile.desiredCareer}" using Gemini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Radar Chart Display */}
          <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm lg:col-span-2">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-indigo-500" /> Competency Mismatch Visualization
            </h3>
            <div className="w-full h-80 flex justify-center items-center">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                    <Radar name="Your Score" dataKey="Score" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.25} />
                    <Radar name="Target Score" dataKey="Target" stroke="#10b981" fill="#10b981" fillOpacity={0.08} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <span className="text-xs text-slate-400">No skill mappings returned.</span>
              )}
            </div>
          </div>

          {/* Quick Stats sidebar summary */}
          <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                Gap Classifications
              </h3>

              <div className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 bg-emerald-500 rounded-full" /> Mastered Competencies
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{mastered.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-indigo-500 font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 bg-indigo-500 rounded-full" /> Intermediate Skills
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{intermediate.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-500 font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 bg-amber-500 rounded-full" /> Beginner Mechanics
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{beginner.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-rose-500 font-bold flex items-center gap-1.5">
                    <span className="h-2 w-2 bg-rose-500 rounded-full" /> Missing & Prioritized
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{missing.length}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-6">
              <div className="flex items-start gap-2 text-left bg-indigo-50 dark:bg-indigo-950/20 p-3 rounded-xl border border-indigo-100/50 dark:border-indigo-950/20">
                <AlertCircle className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
                <div className="text-[10px] text-indigo-900 dark:text-indigo-300 leading-relaxed">
                  <strong>Priority Action Plan:</strong> We recommend dedicating 4 hours weekly to containerization and architecture systems to bridge high-priority missing modules quickly.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Table view of all detailed recommendations */}
          <div className="lg:col-span-3 bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm p-5">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              Detailed Skills Roadmap Recommendations
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 pb-2 text-slate-400">
                    <th className="py-2.5 font-bold uppercase tracking-wider">Skill Name</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider">Proficiency Level</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider">Priority Priority</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider">Strategic Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {skills.map((sk, i) => (
                    <tr key={i} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-all">
                      <td className="py-3.5 font-bold text-slate-800 dark:text-slate-200">{sk.name}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          sk.level === 'mastered' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' :
                          sk.level === 'intermediate' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20' :
                          sk.level === 'beginner' ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/20' :
                          'text-rose-600 bg-rose-50 dark:bg-rose-950/20'
                        }`}>
                          {sk.level}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          sk.priority === 'high' ? 'text-rose-500' :
                          sk.priority === 'medium' ? 'text-amber-500' :
                          'text-slate-400'
                        }`}>
                          {sk.priority}
                        </span>
                      </td>
                      <td className="py-3.5 text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">{sk.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
