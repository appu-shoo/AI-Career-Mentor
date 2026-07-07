import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Sparkles, BookOpen, GraduationCap, Code2, 
  MapPin, DollarSign, Award, Briefcase, FileText, Globe 
} from 'lucide-react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onOnboardingComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onOnboardingComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<UserProfile>({
    name: '',
    email: '',
    education: '',
    university: '',
    gradYear: '',
    experienceLevel: 'student',
    currentSkills: [],
    preferredLanguages: [],
    desiredCareer: '',
    desiredSalary: '',
    preferredCountry: '',
    certifications: [],
    projects: [],
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    resumeFileName: '',
    onboarded: true
  });

  const [newSkill, setNewSkill] = useState('');
  const [newLang, setNewLang] = useState('');
  const [newCert, setNewCert] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !form.currentSkills.includes(newSkill.trim())) {
      setForm({ ...form, currentSkills: [...form.currentSkills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const addLang = () => {
    if (newLang.trim() && !form.preferredLanguages.includes(newLang.trim())) {
      setForm({ ...form, preferredLanguages: [...form.preferredLanguages, newLang.trim()] });
      setNewLang('');
    }
  };

  const addCert = () => {
    if (newCert.trim() && !form.certifications.includes(newCert.trim())) {
      setForm({ ...form, certifications: [...form.certifications, newCert.trim()] });
      setNewCert('');
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    // Simulate generation latency slightly
    setTimeout(() => {
      onOnboardingComplete({ ...form, onboarded: true });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0B0D] flex items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-2xl bg-white dark:bg-[#111216] border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xl overflow-hidden p-8">
        
        {/* Header indicator */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-5 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-md">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="font-display font-bold text-slate-800 dark:text-slate-100">Setup AI Career Profile</span>
          </div>
          <span className="text-xs font-mono text-slate-400">Step {step} of 3</span>
        </div>

        {/* Form Body */}
        {step === 1 && (
          <div className="flex flex-col gap-5 text-left">
            <div className="text-center mb-2">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Let's start with your basics</h2>
              <p className="text-xs text-slate-500 mt-1">This helps us customize your resume scores and career target checklists.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Full Name</label>
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Email Address</label>
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Degree & Specialization</label>
                <input 
                  type="text" 
                  value={form.education} 
                  onChange={(e) => setForm({ ...form, education: e.target.value })}
                  className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">University/Institution</label>
                <input 
                  type="text" 
                  value={form.university} 
                  onChange={(e) => setForm({ ...form, university: e.target.value })}
                  className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Graduation Year</label>
                <input 
                  type="text" 
                  value={form.gradYear} 
                  onChange={(e) => setForm({ ...form, gradYear: e.target.value })}
                  className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Experience Level</label>
                <select 
                  value={form.experienceLevel} 
                  onChange={(e) => setForm({ ...form, experienceLevel: e.target.value as any })}
                  className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
                >
                  <option value="student">Student/Graduate</option>
                  <option value="entry">Entry-Level Pro</option>
                  <option value="mid">Mid-Level Pro</option>
                  <option value="senior">Senior Pro</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue to Career Target <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5 text-left">
            <div className="text-center mb-2">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Your Desired Path & Target</h2>
              <p className="text-xs text-slate-500 mt-1">We utilize these targets to tailor ATS keyword evaluations and interview mocks.</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Target Role Title (e.g. Frontend Engineer, Product Manager)</label>
              <input 
                type="text" 
                value={form.desiredCareer} 
                onChange={(e) => setForm({ ...form, desiredCareer: e.target.value })}
                className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Salary Expectation (e.g. $120k)</label>
                <input 
                  type="text" 
                  value={form.desiredSalary} 
                  onChange={(e) => setForm({ ...form, desiredSalary: e.target.value })}
                  className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Preferred Work Country</label>
                <input 
                  type="text" 
                  value={form.preferredCountry} 
                  onChange={(e) => setForm({ ...form, preferredCountry: e.target.value })}
                  className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800/60 pt-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">LinkedIn URL</label>
                <input 
                  type="text" 
                  value={form.linkedinUrl} 
                  onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                  className="px-3 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">GitHub URL</label>
                <input 
                  type="text" 
                  value={form.githubUrl} 
                  onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                  className="px-3 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Portfolio Website</label>
                <input 
                  type="text" 
                  value={form.portfolioUrl} 
                  onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                  className="px-3 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button 
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold cursor-pointer text-center"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Skills & Upload <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5 text-left">
            <div className="text-center mb-2">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Competencies & Verification</h2>
              <p className="text-xs text-slate-500 mt-1">Add your skills and upload your resume to compile your career scorecard.</p>
            </div>

            {/* Resume Upload Box */}
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#17191E] p-6 rounded-2xl flex flex-col items-center justify-center gap-2 text-center cursor-pointer">
              <FileText className="h-10 w-10 text-indigo-500" />
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{form.resumeFileName || 'Select or Drag CV file'}</div>
              <div className="text-xs text-slate-400">PDF, DOCX up to 10MB verified</div>
            </div>

            {/* Skills & Lang Input tags */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Current Competencies & Tools (e.g. React, SQL, GCP)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Add a skill"
                    value={newSkill} 
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-indigo-500"
                  />
                  <button onClick={addSkill} className="px-4 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {form.currentSkills.map((sk, index) => (
                    <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-[#1A1C23] text-slate-600 dark:text-slate-300 text-[11px] rounded-lg border border-slate-200/50 dark:border-slate-800/50 flex items-center gap-1">
                      {sk}
                      <button 
                        onClick={() => setForm({ ...form, currentSkills: form.currentSkills.filter(s => s !== sk) })}
                        className="text-red-500 font-bold hover:text-red-700 ml-1"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Languages</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. C++"
                      value={newLang} 
                      onChange={(e) => setNewLang(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                    />
                    <button onClick={addLang} className="px-3 bg-indigo-600 text-white rounded-xl text-xs hover:bg-indigo-700">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {form.preferredLanguages.map((la, index) => (
                      <span key={index} className="px-1.5 py-0.5 bg-slate-100 dark:bg-[#1A1C23] text-slate-500 text-[10px] rounded flex items-center gap-1">
                        {la}
                        <button onClick={() => setForm({ ...form, preferredLanguages: form.preferredLanguages.filter(l => l !== la) })} className="text-red-400 hover:text-red-600">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Certifications</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. AWS Solution"
                      value={newCert} 
                      onChange={(e) => setNewCert(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                    />
                    <button onClick={addCert} className="px-3 bg-indigo-600 text-white rounded-xl text-xs hover:bg-indigo-700">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {form.certifications.map((ce, index) => (
                      <span key={index} className="px-1.5 py-0.5 bg-slate-100 dark:bg-[#1A1C23] text-slate-500 text-[10px] rounded flex items-center gap-1">
                        {ce}
                        <button onClick={() => setForm({ ...form, certifications: form.certifications.filter(c => c !== ce) })} className="text-red-400 hover:text-red-600">&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button 
                onClick={() => setStep(2)}
                disabled={isGenerating}
                className="flex-1 py-3 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold cursor-pointer text-center"
              >
                Back
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isGenerating}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGenerating ? 'Compiling Profile...' : 'Complete Profile & Build Dashboard'} <Sparkles className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
