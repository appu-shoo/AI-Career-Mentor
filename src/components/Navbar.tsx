import React, { useState } from 'react';
import { 
  Search, Bell, Sun, Moon, MessageSquare, Sparkles, X, Send, 
  CheckCircle, AlertCircle, Bookmark, Compass, Rocket, Award 
} from 'lucide-react';
import { Theme, PlatformNotification, UserProfile } from '../types';

interface NavbarProps {
  theme: Theme;
  onThemeToggle: () => void;
  notifications: PlatformNotification[];
  onMarkNotificationRead: (id: string) => void;
  userProfile: UserProfile;
}

export default function Navbar({ 
  theme, 
  onThemeToggle, 
  notifications, 
  onMarkNotificationRead,
  userProfile
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMentorChat, setShowMentorChat] = useState(false);
  const [mentorMessage, setMentorMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: "Hello! I am Mentor AI. Ask me any tactical career question about optimizing resume points, coding milestones, or interview strategies!" }
  ]);
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendChat = async () => {
    if (!mentorMessage.trim() || isSending) return;
    const userText = mentorMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setMentorMessage('');
    setIsSending(true);

    try {
      const res = await fetch('/api/gemini/career-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { sender: 'ai', text: data.reply || "I apologize, let's explore that topic from a different angle!" }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'ai', text: "I apologize, I am temporarily resolving high-load sync threads. Ask again!" }]);
    } finally {
      setIsSending(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white dark:bg-[#0E1013] border-b border-slate-200/80 dark:border-slate-800/80 px-6 py-4 flex items-center justify-between sticky top-0 z-40 relative">
      
      {/* Global Search */}
      <div className="relative max-w-md w-full hidden md:block">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search roadmaps, mock templates, jobs, or certification checks..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#16181D] border border-slate-200 dark:border-slate-800/60 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
        />
      </div>
      <div className="md:hidden">
        <span className="font-display font-bold text-slate-800 dark:text-white text-base">Dashboard</span>
      </div>

      {/* Right control utilities */}
      <div className="flex items-center gap-4 relative">
        
        {/* Theme Conversion */}
        <button 
          onClick={onThemeToggle}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl text-slate-500 dark:text-slate-400 cursor-pointer transition-all"
        >
          {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </button>

        {/* Mentor AI Quick Drawer */}
        <button 
          onClick={() => setShowMentorChat(!showMentorChat)}
          className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl cursor-pointer transition-all flex items-center gap-2 hover:opacity-90"
          title="Mentor AI Floating Companion"
        >
          <MessageSquare className="h-4.5 w-4.5" />
          <span className="text-xs font-bold font-mono tracking-tight hidden lg:inline flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-500 inline" /> Coach Chat
          </span>
        </button>

        {/* Notifications Center */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-xl text-slate-500 dark:text-slate-400 cursor-pointer relative"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-[#0E1013]" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#111216] border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xl z-50 p-4 text-left">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2 mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">System Notifications</span>
                <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                  {unreadCount} new
                </span>
              </div>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-xs text-slate-400 text-center py-4">All clear! No alerts.</div>
                ) : (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        n.read 
                          ? 'bg-transparent border-transparent opacity-60' 
                          : 'bg-slate-50 dark:bg-[#17191E] border-slate-100 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-100">
                        {n.type === 'interview' && <CheckCircle className="h-3.5 w-3.5 text-indigo-500" />}
                        {n.type === 'challenge' && <AlertCircle className="h-3.5 w-3.5 text-amber-500" />}
                        {n.type === 'certificate' && <Award className="h-3.5 w-3.5 text-emerald-500" />}
                        <span>{n.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{n.message}</p>
                      <span className="text-[9px] font-mono text-slate-400 mt-1 block">{n.date}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown button */}
        <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3">
          <img 
            src={userProfile.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"} 
            alt={userProfile.name || "User Avatar"} 
            className="h-8 w-8 rounded-full object-cover border border-indigo-200 dark:border-indigo-900/60"
            referrerPolicy="no-referrer"
          />
          <div className="text-left hidden lg:block">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{userProfile.name}</div>
            <div className="text-[10px] text-slate-400">{userProfile.desiredCareer}</div>
          </div>
        </div>

      </div>

      {/* Floating Chat Companion overlay */}
      {showMentorChat && (
        <div className="fixed bottom-6 right-6 w-96 h-[480px] bg-white dark:bg-[#111216] border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-2xl flex flex-col justify-between z-50 overflow-hidden">
          {/* Coach Header */}
          <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-amber-400" />
              <div>
                <h4 className="text-sm font-bold font-display leading-tight">Career Coach AI</h4>
                <p className="text-[10px] text-indigo-200 font-mono">Gemini 3.5-flash Pro Companion</p>
              </div>
            </div>
            <button 
              onClick={() => setShowMentorChat(false)}
              className="p-1 hover:bg-indigo-700 rounded text-indigo-100 cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages block */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white self-end rounded-tr-none' 
                    : 'bg-slate-100 dark:bg-[#17191E] text-slate-800 dark:text-slate-200 self-start rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isSending && (
              <div className="bg-slate-100 dark:bg-[#17191E] text-slate-400 self-start p-3 rounded-2xl text-[10px] rounded-tl-none italic">
                Mentor AI is designing advice...
              </div>
            )}
          </div>

          {/* Chat form */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2 bg-slate-50 dark:bg-[#131519]">
            <input 
              type="text" 
              placeholder="Ask about resume keywords, certificates..."
              value={mentorMessage}
              onChange={(e) => setMentorMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              className="flex-1 px-3.5 py-2 bg-white dark:bg-[#181A20] border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <button 
              onClick={handleSendChat}
              className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
