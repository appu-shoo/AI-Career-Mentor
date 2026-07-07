import React from 'react';
import { 
  Trophy, ArrowUpRight, TrendingUp, Award, Calendar, BookOpen, 
  CheckCircle, ShieldAlert, Sparkles, AlertCircle, PlayCircle 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  LineChart, Line 
} from 'recharts';
import { MetricScores, UserProfile } from '../types';

interface DashboardViewProps {
  scores: MetricScores;
  userProfile: UserProfile;
  onNavigateTo: (view: string) => void;
}

export default function DashboardView({ scores, userProfile, onNavigateTo }: DashboardViewProps) {
  
  // Weekly Learning hours data
  const learningData = [
    { name: 'Mon', Hours: scores.weeklyHours[0] },
    { name: 'Tue', Hours: scores.weeklyHours[1] },
    { name: 'Wed', Hours: scores.weeklyHours[2] },
    { name: 'Thu', Hours: scores.weeklyHours[3] },
    { name: 'Fri', Hours: scores.weeklyHours[4] },
    { name: 'Sat', Hours: scores.weeklyHours[5] },
    { name: 'Sun', Hours: scores.weeklyHours[6] },
  ];

  // Application pipeline status trends
  const pipelineData = [
    { name: 'Wk 1', Applied: 2, Interviews: 1, Offers: 0 },
    { name: 'Wk 2', Applied: 4, Interviews: 2, Offers: 0 },
    { name: 'Wk 3', Applied: 6, Interviews: 3, Offers: 1 },
    { name: 'Wk 4', Applied: 8, Interviews: 4, Offers: 1 },
  ];

  const skillPolarData = [
    { subject: 'Coding Complexity', A: scores.skillGrowthScore, B: 80, fullMark: 100 },
    { subject: 'System Design', A: 45, B: 75, fullMark: 100 },
    { subject: 'ATS Keywords', A: scores.atsScore, B: 85, fullMark: 100 },
    { subject: 'Mock Delivery', A: scores.interviewScore, B: 82, fullMark: 100 },
    { subject: 'Resume Quality', A: scores.resumeScore, B: 90, fullMark: 100 },
    { subject: 'LinkedIn Health', A: scores.linkedInScore, B: 88, fullMark: 100 },
  ];

  const recommendations = [
    {
      id: 'rec-1',
      title: 'Optimize Resume Bullet Points',
      desc: 'Inject 4 high-impact action verbs and quantify database migration items to boost ATS from 75% to 88%.',
      action: 'Optimize Now',
      targetView: 'resume-analyzer',
      type: 'resume'
    },
    {
      id: 'rec-2',
      title: 'Take Daily Algorithmic Challenge',
      desc: 'Keep your 12-day coding streak alive. Today is a medium-difficulty Sliding Window challenge.',
      action: 'Solve Challenge',
      targetView: 'coding-challenge',
      type: 'coding'
    },
    {
      id: 'rec-3',
      title: 'Conduct AWS Deploy Roadmap Milestone',
      desc: 'Setup multi-stage Docker builds to complete your step-2 intermediate roadmap milestone.',
      action: 'Resume Steps',
      targetView: 'roadmap',
      type: 'roadmap'
    }
  ];

  const badges = [
    { name: 'Power Bullet', desc: 'Overhauled CV bullets using metrics', icon: Trophy, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    { name: 'Roadmap Captain', desc: 'Completed beginner milestones', icon: Award, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' },
    { name: 'Clean Compiler', desc: 'Solved 10 challenges with zero errors', icon: Sparkles, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' }
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md shadow-indigo-600/10 text-left">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
              Welcome back, {userProfile.name}! 👋
            </h1>
            <span className="px-2.5 py-0.5 bg-white/20 text-white rounded-full text-[10px] font-mono tracking-wider font-semibold uppercase">PRO</span>
          </div>
          <p className="text-indigo-100 text-sm mt-1 max-w-2xl">
            Your target role is <span className="font-semibold text-white">{userProfile.desiredCareer}</span> in {userProfile.preferredCountry}. Your career scorecard increased by 13% over the past 30 days!
          </p>
        </div>
        <button 
          onClick={() => onNavigateTo('profile')}
          className="px-4 py-2 bg-white text-indigo-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all shadow-sm w-fit shrink-0 cursor-pointer"
        >
          Manage Target Goals
        </button>
      </div>

      {/* Analytics Scoreboard Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        
        {/* Metric 1 */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Career Score</span>
            <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 px-2 py-0.5 rounded-full font-bold">+13%</span>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl font-display font-extrabold text-slate-800 dark:text-white">{scores.careerScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${scores.careerScore}%` }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">ATS Score</span>
            <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 px-2 py-0.5 rounded-full font-bold">+10%</span>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl font-display font-extrabold text-slate-800 dark:text-white">{scores.atsScore}%</span>
            <span className="text-xs text-slate-400">match</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${scores.atsScore}%` }} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Interview Ready</span>
            <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 px-2 py-0.5 rounded-full font-bold">Good</span>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl font-display font-extrabold text-slate-800 dark:text-white">{scores.interviewScore}%</span>
            <span className="text-xs text-slate-400">score</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${scores.interviewScore}%` }} />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Coding Streak</span>
            <span className="text-[10px] bg-amber-50 dark:bg-amber-950/40 text-amber-500 px-2 py-0.5 rounded-full font-bold">Streak</span>
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl font-display font-extrabold text-[#E5801B]">{scores.codingChallengeStreak} Days</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
            <Calendar className="h-3 w-3 text-indigo-500" /> Solved challenges daily
          </div>
        </div>

      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        
        {/* Recharts Core Competencies radar chart */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Competencies Polar Breakdown</h3>
              <p className="text-xs text-slate-400">Profile quality mapping compared against industry tier-1 engineer benchmarks</p>
            </div>
          </div>
          <div className="w-full h-64 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillPolarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 8 }} />
                <Radar name="Your Score" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} />
                <Radar name="Stripe Senior Target" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Mini-board: Progress Tracker & Certificates */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Active Achievements</h3>
              <span className="text-[10px] text-slate-400 font-mono">Count: {scores.certificateCount} Verified</span>
            </div>

            <div className="flex flex-col gap-3">
              {badges.map((bd, idx) => {
                const Icon = bd.icon;
                return (
                  <div key={idx} className="flex items-center gap-3.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#16181C]">
                    <div className={`p-2 rounded-lg ${bd.color}`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{bd.name}</div>
                      <div className="text-[10px] text-slate-400">{bd.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-4 text-center">
            <button 
              onClick={() => onNavigateTo('roadmap')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 justify-center w-full cursor-pointer"
            >
              View Detailed Roadmaps <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Secondary charts list: Weekly Learning hours & Applications tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        
        {/* Learning hours bar chart */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Weekly Learning Consistency</h3>
              <p className="text-xs text-slate-400">Total study hours spent parsing roadmaps & practicing mock loops</p>
            </div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> Solid curve
            </div>
          </div>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={learningData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} />
                <Bar dataKey="Hours" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pipeline Linechart */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <div>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Active Application Pipeline</h3>
              <p className="text-xs text-slate-400">Tracked status conversion for job posts across stages</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">Active</span>
          </div>
          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pipelineData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="Applied" stroke="#4f46e5" strokeWidth={2.5} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="Interviews" stroke="#e5801b" strokeWidth={2.5} />
                <Line type="monotone" dataKey="Offers" stroke="#10b981" strokeWidth={2.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recommended Next Actions section */}
      <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm text-left">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">AI-Prioritized Next Actions</h3>
          <p className="text-xs text-slate-400">Highly customized tactical recommendations analyzed from your profiles gaps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map(rec => (
            <div key={rec.id} className="border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#17191E] p-4 rounded-xl flex flex-col justify-between gap-3 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <PlayCircle className="h-3.5 w-3.5" /> Action Required
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1.5">{rec.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{rec.desc}</p>
              </div>
              <button 
                onClick={() => onNavigateTo(rec.targetView)}
                className="w-full py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 text-[11px] font-bold rounded-lg transition-all cursor-pointer text-center"
              >
                {rec.action}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
