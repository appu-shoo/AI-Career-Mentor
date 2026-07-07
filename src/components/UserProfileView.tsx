import React, { useState, useRef } from 'react';
import { Settings, Sparkles, RefreshCw, CheckCircle, User, Compass, Lock, MapPin, Camera, Upload, Trash } from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileViewProps {
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export default function UserProfileView({ userProfile, onSaveProfile }: UserProfileViewProps) {
  const [name, setName] = useState(userProfile.name);
  const [desiredCareer, setDesiredCareer] = useState(userProfile.desiredCareer);
  const [experienceLevel, setExperienceLevel] = useState(userProfile.experienceLevel);
  const [preferredLanguages, setPreferredLanguages] = useState(userProfile.preferredLanguages.join(', '));
  const [currentSkills, setCurrentSkills] = useState(userProfile.currentSkills.join(', '));
  const [preferredCountry, setPreferredCountry] = useState(userProfile.preferredCountry);
  const [avatarUrl, setAvatarUrl] = useState(userProfile.avatarUrl);

  const [isSaving, setIsSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image exceeds 2MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const updated: UserProfile = {
      ...userProfile,
      name,
      desiredCareer,
      experienceLevel: experienceLevel as any,
      preferredLanguages: preferredLanguages.split(',').map(s => s.trim()).filter(Boolean),
      currentSkills: currentSkills.split(',').map(s => s.trim()).filter(Boolean),
      preferredCountry,
      avatarUrl
    };

    setTimeout(() => {
      onSaveProfile(updated);
      setIsSaving(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }, 600);
  };

  return (
    <div className="p-6 flex flex-col gap-6 text-left max-w-3xl mx-auto w-full">
      
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="h-6 w-6 text-indigo-600" /> Account Settings & Targets
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize your career roadmap targets, preferred languages, country benchmarks, and credential profiles.
        </p>
      </div>

      {showNotification && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-emerald-650 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="h-4 w-4" /> Career targets successfully updated! Roadmaps and sandbox challenges are re-benchmarked.
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm text-left">
        <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 mb-5">
          <User className="h-4.5 w-4.5 text-indigo-500" /> Demographics & Targeting Matrix
        </h3>

        {/* Circular Profile Avatar Upload Container */}
        <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-50 dark:bg-[#16181D]/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl mb-5">
          <div className="relative group w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500/30 flex-shrink-0 bg-slate-200 dark:bg-slate-800">
            <img 
              src={avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"} 
              alt="Profile avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div 
              onClick={() => photoInputRef.current?.click()}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white"
            >
              <Camera className="h-5 w-5" />
            </div>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Personal Profile Image</span>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
              Upload your own photo or customize the URL directly. Max size 2MB (formats: JPG, PNG, WEBP).
            </p>
            
            <div className="flex flex-wrap items-center gap-2 mt-3 justify-center sm:justify-start">
              <input 
                type="file" 
                ref={photoInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Upload className="h-3.5 w-3.5" /> Upload Photo
              </button>
              {avatarUrl && (
                <button
                  type="button"
                  onClick={() => setAvatarUrl('')}
                  className="px-3 py-1.5 border border-slate-200 dark:border-slate-800 text-slate-450 hover:text-rose-500 dark:hover:text-rose-400 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash className="h-3.5 w-3.5" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Your Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-850 dark:text-slate-100 focus:outline-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Avatar Image Link / Data String</label>
              <input 
                type="text" 
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-850 dark:text-slate-100 focus:outline-indigo-500 truncate"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Target Career Role</label>
              <input 
                type="text" 
                value={desiredCareer}
                onChange={(e) => setDesiredCareer(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-850 dark:text-slate-100 focus:outline-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Experience Tier</label>
              <select 
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-850 dark:text-slate-100 focus:outline-indigo-500"
              >
                <option value="Student">Student (0-1 year)</option>
                <option value="Junior">Junior Engineer (1-3 years)</option>
                <option value="Mid-Level">Mid-Level Associate (3-5 years)</option>
                <option value="Senior">Senior Lead (5+ years)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Preferred Coding Languages (Comma Separated)</label>
              <input 
                type="text" 
                value={preferredLanguages}
                onChange={(e) => setPreferredLanguages(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-850 dark:text-slate-100 focus:outline-indigo-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500">Target Country Benchmarks</label>
              <input 
                type="text" 
                value={preferredCountry}
                onChange={(e) => setPreferredCountry(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-850 dark:text-slate-100 focus:outline-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-500">Current technical competencies (Comma Separated)</label>
            <textarea 
              rows={3}
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              className="w-full p-3.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-850 dark:text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-850 text-white font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Save & Reprovision Target Scorecards
          </button>

        </form>
      </div>

    </div>
  );
}
