import React, { useState } from 'react';
import { 
  Briefcase, Bookmark, Star, ChevronRight, CheckCircle, Clock, 
  MapPin, DollarSign, Calendar, Sparkles, Filter, Plus 
} from 'lucide-react';
import { JobListing } from '../types';

export default function JobEngineView() {
  const [jobs, setJobs] = useState<JobListing[]>([
    {
      id: 'job-1',
      title: 'Full-Stack Software Engineer',
      company: 'Linear Corp',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
      location: 'San Francisco, CA (Hybrid)',
      type: 'Full-Time',
      salary: '$140,000 - $170,000 / year',
      skillsRequired: ['TypeScript', 'React', 'NodeJS', 'PostgreSQL'],
      description: 'Join the product engineering squad building pristine, world-class project planning tools with high concurrent renders.',
      matchScore: 94,
      bookmarked: true,
      status: 'interview'
    },
    {
      id: 'job-2',
      title: 'Backend Systems Developer',
      company: 'Stripe',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
      location: 'New York, NY (Hybrid)',
      type: 'Full-Time',
      salary: '$165,000 - $195,000 / year',
      skillsRequired: ['Ruby on Rails', 'Go', 'AWS S3', 'PostgreSQL'],
      description: 'Scale financial data processing networks, design robust relational transaction rules and minimize packet transfer delays.',
      matchScore: 82,
      bookmarked: false,
      status: 'applied'
    },
    {
      id: 'job-3',
      title: 'UI Developer & Performance Specialist',
      company: 'Vercel Inc',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
      location: 'Remote (Global)',
      type: 'Contract',
      salary: '$110,000 - $130,000 / year',
      skillsRequired: ['TypeScript', 'NextJS', 'TailwindCSS', 'Vite'],
      description: 'Build fast edge assets, optimize asset loading speeds, and construct responsive visual design layouts with Framer Motion.',
      matchScore: 89,
      bookmarked: false,
      status: 'none'
    },
    {
      id: 'job-4',
      title: 'Graduate Tech Consultant',
      company: 'Hays Technology Solutions',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
      location: 'Austin, TX (On-Site)',
      type: 'Full-Time',
      salary: '$85,000 - $105,000 / year',
      skillsRequired: ['TypeScript', 'React', 'SQL', 'Python'],
      description: 'Collaborate with corporate partners to implement scalable full-stack databases, draft dashboard charts, and optimize metrics pipelines.',
      matchScore: 78,
      bookmarked: true,
      status: 'applied'
    }
  ]);

  const toggleBookmark = (id: string) => {
    setJobs(prev => prev.map(jb => {
      if (jb.id === id) return { ...jb, bookmarked: !jb.bookmarked };
      return jb;
    }));
  };

  const updateStatus = (id: string, nextStatus: JobListing['status']) => {
    setJobs(prev => prev.map(jb => {
      if (jb.id === id) return { ...jb, status: nextStatus };
      return jb;
    }));
  };

  // Status boards lists
  const boardStages: { id: JobListing['status']; title: string; color: string }[] = [
    { id: 'applied', title: 'Applied / In Review', color: 'bg-indigo-500' },
    { id: 'interview', title: 'Interview Scheduled', color: 'bg-amber-500' },
    { id: 'offer', title: 'Offer Received', color: 'bg-emerald-500' },
    { id: 'rejected', title: 'Rejected / Archived', color: 'bg-slate-400' },
  ];

  const matchedJobs = jobs.filter(j => j.status === 'none');

  return (
    <div className="p-6 flex flex-col gap-6 text-left">
      
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-indigo-600" /> Job board & Application Tracker
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore job matches tailored to your verified skills. Monitor hiring pipelines with the Kanban board.
        </p>
      </div>

      {/* Main Split grid layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col: Recommendation Stream list */}
        <div className="xl:col-span-1 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">Target Matches Stream</h3>
            <span className="text-[10px] font-mono text-slate-400">{matchedJobs.length} matches</span>
          </div>

          <div className="flex flex-col gap-4">
            {matchedJobs.length === 0 ? (
              <div className="bg-white dark:bg-[#111216] border border-slate-200/80 p-6 rounded-xl text-center text-xs text-slate-400">
                All matches moved to the pipeline board!
              </div>
            ) : (
              matchedJobs.map(job => (
                <div key={job.id} className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm flex flex-col gap-3 relative text-left">
                  
                  {/* Bookmark ribbon */}
                  <button 
                    onClick={() => toggleBookmark(job.id)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 cursor-pointer"
                  >
                    <Bookmark className={`h-4.5 w-4.5 ${job.bookmarked ? 'fill-indigo-500 text-indigo-500' : ''}`} />
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-500" /> {job.matchScore}% Match Score
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-extrabold text-sm text-slate-900 dark:text-white leading-tight">{job.title}</h4>
                    <span className="text-xs text-slate-500 dark:text-indigo-400 font-semibold">{job.company}</span>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{job.description}</p>

                  <div className="flex flex-col gap-1 text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-100 dark:border-slate-850">
                    <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</div>
                    <div className="flex items-center gap-1.5 mt-1"><DollarSign className="h-3.5 w-3.5" /> {job.salary}</div>
                  </div>

                  {/* Move to pipeline button */}
                  <button
                    onClick={() => updateStatus(job.id, 'applied')}
                    className="w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-bold cursor-pointer text-center"
                  >
                    Send Application & Track
                  </button>

                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col: Interactive Kanban application Board */}
        <div className="xl:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">Application Kanban Pipeline</h3>
            <span className="text-[10px] font-mono text-slate-400">Applied jobs tracker</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {boardStages.map(stage => {
              const stageJobs = jobs.filter(j => j.status === stage.id);
              return (
                <div key={stage.id} className="flex flex-col gap-3">
                  
                  {/* Column header */}
                  <div className="flex items-center justify-between p-2.5 bg-slate-100 dark:bg-[#131418] rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                      <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-[100px]">{stage.title}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded font-bold">
                      {stageJobs.length}
                    </span>
                  </div>

                  {/* Cards inside column */}
                  <div className="flex flex-col gap-2 min-h-[350px] bg-slate-50/50 dark:bg-[#111216]/20 p-2 rounded-2xl border border-dashed border-slate-150 dark:border-slate-850">
                    {stageJobs.length === 0 ? (
                      <div className="text-[10px] text-slate-400 text-center py-10">Empty column</div>
                    ) : (
                      stageJobs.map(job => (
                        <div key={job.id} className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-3.5 rounded-xl shadow-sm flex flex-col gap-2 relative text-left">
                          
                          <div>
                            <h5 className="font-display font-bold text-xs text-slate-900 dark:text-white leading-tight line-clamp-1">{job.title}</h5>
                            <span className="text-[10px] text-slate-400">{job.company}</span>
                          </div>

                          <div className="text-[9px] text-slate-400 font-mono flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {job.location.split(' ')[0]}
                          </div>

                          {/* Quick stage cycle dropdown selection */}
                          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-850 flex flex-col gap-1">
                            <span className="text-[8px] font-bold text-slate-400 font-mono uppercase">Change Stage</span>
                            <select 
                              value={job.status}
                              onChange={(e) => updateStatus(job.id, e.target.value as any)}
                              className="w-full px-1.5 py-1 bg-slate-50 dark:bg-[#181A20] border border-slate-200 dark:border-slate-800 rounded text-[9px] text-slate-600 dark:text-slate-300"
                            >
                              <option value="none">Matched (In stream)</option>
                              <option value="applied">Applied</option>
                              <option value="interview">Interview</option>
                              <option value="offer">Offer</option>
                              <option value="rejected">Rejected/Archive</option>
                            </select>
                          </div>

                        </div>
                      ))
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
