import React, { useState } from 'react';
import { 
  Home, FileSearch, Compass, LineChart, Briefcase, 
  HelpCircle, MessageSquare, Terminal, Award, FilePlus, Settings,
  LogOut, ShieldAlert, ChevronLeft, ChevronRight, Sparkles 
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ currentView, onViewChange, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'resume-analyzer', label: 'Resume Analyzer', icon: FileSearch, group: 'Tools' },
    { id: 'resume-builder', label: 'Resume Builder', icon: FilePlus, group: 'Tools' },
    { id: 'roadmap', label: 'Career Roadmap', icon: Compass, group: 'Career Growth' },
    { id: 'skill-gap', label: 'Skill Gap Radar', icon: LineChart, group: 'Career Growth' },
    { id: 'interview', label: 'AI Mock Interview', icon: HelpCircle, group: 'Career Growth' },
    { id: 'coding-challenge', label: 'Coding Challenge', icon: Terminal, group: 'Career Growth' },
    { id: 'job-engine', label: 'Job Board & Kanban', icon: Briefcase, group: 'Jobs' },
    { id: 'community', label: 'Community Hub', icon: MessageSquare },
    { id: 'profile', label: 'My Profile', icon: Settings },
    { id: 'admin', label: 'Admin Terminal', icon: ShieldAlert, group: 'Management' },
  ];

  // Group menus
  const generalItems = menuItems.filter(item => !item.group);
  const toolItems = menuItems.filter(item => item.group === 'Tools');
  const careerItems = menuItems.filter(item => item.group === 'Career Growth');
  const jobItems = menuItems.filter(item => item.group === 'Jobs');
  const mgmtItems = menuItems.filter(item => item.group === 'Management');

  const renderItem = (item: typeof menuItems[0]) => {
    const Icon = item.icon;
    const isActive = currentView === item.id;
    return (
      <button
        key={item.id}
        onClick={() => onViewChange(item.id)}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${
          isActive 
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
        }`}
      >
        <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </button>
    );
  };

  return (
    <aside 
      className={`bg-white dark:bg-[#0E1013] border-r border-slate-200/80 dark:border-slate-800/80 min-h-screen flex flex-col justify-between transition-all duration-300 relative ${
        collapsed ? 'w-18' : 'w-64'
      }`}
    >
      {/* Top Brand Logo */}
      <div>
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="p-2 bg-indigo-600 rounded-lg text-white flex-shrink-0">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            {!collapsed && (
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                CareerHero
              </span>
            )}
          </div>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded text-slate-400 cursor-pointer hidden md:block"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Scrollable Items list */}
        <div className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-140px)]">
          
          {/* General Items */}
          <div className="flex flex-col gap-1">
            {generalItems.map(renderItem)}
          </div>

          {/* Tools items */}
          <div className="flex flex-col gap-1">
            {!collapsed && (
              <div className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-mono px-3 mb-1.5 mt-2">
                Tools
              </div>
            )}
            {toolItems.map(renderItem)}
          </div>

          {/* Career Growth Items */}
          <div className="flex flex-col gap-1">
            {!collapsed && (
              <div className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-mono px-3 mb-1.5 mt-2">
                Career Growth
              </div>
            )}
            {careerItems.map(renderItem)}
          </div>

          {/* Jobs items */}
          <div className="flex flex-col gap-1">
            {!collapsed && (
              <div className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-mono px-3 mb-1.5 mt-2">
                Jobs Finder
              </div>
            )}
            {jobItems.map(renderItem)}
          </div>

          {/* Management Items */}
          <div className="flex flex-col gap-1">
            {!collapsed && (
              <div className="text-[10px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-mono px-3 mb-1.5 mt-2">
                System admin
              </div>
            )}
            {mgmtItems.map(renderItem)}
          </div>

        </div>
      </div>

      {/* Logout / User Indicator */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/60">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5 text-rose-500" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>

    </aside>
  );
}
