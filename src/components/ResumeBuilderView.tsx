import React, { useState } from 'react';
import { 
  FilePlus, Sparkles, RefreshCw, Printer, Copy, CheckCircle, 
  Trash2, Plus, ArrowLeft, Download, Eye 
} from 'lucide-react';

interface Experience {
  company: string;
  role: string;
  duration: string;
  bullet: string;
}

export default function ResumeBuilderView() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState('');
  
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const [isSummarizing, setIsSummarizing] = useState(false);
  const [activeExpIndex, setActiveExpIndex] = useState<number | null>(null);

  const handleAISummaryOptimize = async () => {
    setIsSummarizing(true);
    try {
      const res = await fetch('/api/gemini/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: `Summary: ${summary}`,
          jobDescription: `Full-Stack Engineer with TypeScript, high-throughput metrics and systems architectures`
        })
      });
      const data = await res.json();
      if (data.optimizedBulletPoints && data.optimizedBulletPoints[0]) {
        setSummary(data.optimizedBulletPoints[0].optimized);
      }
    } catch (err) {
      console.error("Failed to optimize resume summary via AI:", err);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleAIExperienceOptimize = async (idx: number) => {
    setActiveExpIndex(idx);
    try {
      const targetExp = experiences[idx];
      const res = await fetch('/api/gemini/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: `Experience: ${targetExp.bullet}`,
          jobDescription: `Metrics-driven senior full-stack developer, high accountability`
        })
      });
      const data = await res.json();
      if (data.optimizedBulletPoints && data.optimizedBulletPoints[0]) {
        const updated = [...experiences];
        updated[idx].bullet = data.optimizedBulletPoints[0].optimized;
        setExperiences(updated);
      }
    } catch (err) {
      console.error("Failed to optimize experience bullet point via AI:", err);
    } finally {
      setActiveExpIndex(null);
    }
  };

  const addExperience = () => {
    setExperiences([...experiences, { company: '', role: '', duration: '', bullet: '' }]);
  };

  const removeExperience = (idx: number) => {
    setExperiences(experiences.filter((_, i) => i !== idx));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 flex flex-col gap-6 text-left">
      
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FilePlus className="h-6 w-6 text-indigo-600" /> AI Resume Builder
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build clean, standard, and ATS-friendly PDF profiles equipped with instant metric-driven AI phrasing suggestions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
          >
            <Printer className="h-4 w-4" /> Export / Print PDF
          </button>
        </div>
      </div>

      {/* Main split dashboard: left for inputs, right for printable format preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left column: Resume Builder Inputs Form */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm flex flex-col gap-5">
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            Interactive Profile Editor
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Rivera"
                className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Target Role Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Contact Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. alex@example.com"
                className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Contact Phone</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 (555) 019-9922"
                className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Core Summary with AI optimizer */}
          <div className="flex flex-col gap-1.5 relative">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500">Professional Summary</label>
              <button 
                onClick={handleAISummaryOptimize}
                disabled={isSummarizing}
                className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {isSummarizing ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                AI Phrasing Optimizer
              </button>
            </div>
            <textarea 
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="e.g. Highly motivated Software Engineer with experience in React, TypeScript and Node.js..."
              className="w-full p-3 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Skill lists */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">Key Competencies (Comma Separated)</label>
            <input 
              type="text" 
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, TypeScript, Node.js, Express, SQL, AWS, Docker"
              className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-indigo-500"
            />
          </div>

          {/* Experience list */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
              <label className="text-xs font-bold text-slate-500">Work Experience Achievements</label>
              <button 
                onClick={addExperience}
                className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded hover:opacity-90 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="h-3 w-3" /> Add Role
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="border border-slate-100 dark:border-slate-800/80 p-4 rounded-xl flex flex-col gap-3 relative bg-slate-50/40 dark:bg-[#15171D]">
                  
                  <button 
                    onClick={() => removeExperience(idx)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 cursor-pointer"
                    title="Remove experience"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].company = e.target.value;
                        setExperiences(updated);
                      }}
                      className="px-3 py-1.5 bg-white dark:bg-[#1B1D24] border border-slate-200 dark:border-slate-800/60 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-indigo-500"
                    />
                    <input 
                      type="text" 
                      placeholder="Role Title"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].role = e.target.value;
                        setExperiences(updated);
                      }}
                      className="px-3 py-1.5 bg-white dark:bg-[#1B1D24] border border-slate-200 dark:border-slate-800/60 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-indigo-500"
                    />
                    <input 
                      type="text" 
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].duration = e.target.value;
                        setExperiences(updated);
                      }}
                      className="px-3 py-1.5 bg-white dark:bg-[#1B1D24] border border-slate-200 dark:border-slate-800/60 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-indigo-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400">Describe achievement details (metrics)</span>
                      <button 
                        onClick={() => handleAIExperienceOptimize(idx)}
                        disabled={activeExpIndex === idx}
                        className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {activeExpIndex === idx ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                        Metrics Optimizer
                      </button>
                    </div>
                    <textarea 
                      rows={2}
                      value={exp.bullet}
                      onChange={(e) => {
                        const updated = [...experiences];
                        updated[idx].bullet = e.target.value;
                        setExperiences(updated);
                      }}
                      className="w-full p-2.5 bg-white dark:bg-[#1B1D24] border border-slate-200 dark:border-slate-800/60 rounded-lg text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 leading-relaxed"
                    />
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: Formatted printable preview panel */}
        <div className="flex flex-col gap-4">
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1.5 pl-2">
            <Eye className="h-4 w-4" /> Live Standard Print Preview
          </div>

          <div 
            id="printable-resume-paper"
            className="bg-white text-slate-900 border border-slate-200 p-8 rounded-2xl shadow-md font-sans text-left min-h-[640px] flex flex-col justify-between"
            style={{ contentVisibility: 'auto' }}
          >
            <div>
              {/* Header Title contact details */}
              <div className="border-b-2 border-slate-800 pb-4 mb-4 text-center md:text-left">
                <h2 className="text-2xl font-bold font-display uppercase tracking-tight text-slate-900">{name || 'Your Full Name'}</h2>
                <div className="text-sm text-indigo-600 font-semibold mt-0.5">{title || 'Your Professional Title'}</div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-500 mt-2 font-mono">
                  <span>{email}</span>
                  <span>&middot;</span>
                  <span>{phone}</span>
                </div>
              </div>

              {/* Summary */}
              {summary && (
                <div className="mb-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 font-mono">Professional Summary</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{summary}</p>
                </div>
              )}

              {/* Skills */}
              {skills && (
                <div className="mb-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 font-mono">Technical Competencies</h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">{skills}</p>
                </div>
              )}

              {/* Experience list */}
              {experiences.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 font-mono">Professional Experience</h4>
                  <div className="flex flex-col gap-4">
                    {experiences.map((exp, i) => (
                      <div key={i} className="text-left">
                        <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                          <span>{exp.role || 'Role'} &middot; <span className="font-semibold text-slate-600">{exp.company || 'Company'}</span></span>
                          <span className="font-mono text-slate-400 font-medium">{exp.duration}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 pl-3 border-l border-slate-200 leading-relaxed font-sans">{exp.bullet || 'Work experience bullet point achievements...'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            <div className="text-[10px] text-slate-400 text-center font-mono border-t border-slate-100 pt-4 mt-8">
              Formatted using CareerHero AI print-engine
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
