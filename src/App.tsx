import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import ResumeAnalyzerView from './components/ResumeAnalyzerView';
import ResumeBuilderView from './components/ResumeBuilderView';
import RoadmapView from './components/RoadmapView';
import SkillGapView from './components/SkillGapView';
import MockInterviewView from './components/MockInterviewView';
import CodingChallengeView from './components/CodingChallengeView';
import JobEngineView from './components/JobEngineView';
import CommunityView from './components/CommunityView';
import AdminView from './components/AdminView';
import UserProfileView from './components/UserProfileView';
import { UserProfile, MetricScores, PlatformNotification, Theme } from './types';

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  // Load default metrics
  const [scores, setScores] = useState<MetricScores>({
    careerScore: 78,
    atsScore: 75,
    interviewScore: 80,
    skillGrowthScore: 68,
    linkedInScore: 72,
    resumeScore: 74,
    certificateCount: 3,
    codingChallengeStreak: 12,
    weeklyHours: [2.5, 4.0, 3.5, 5.0, 1.5, 0, 0]
  });

  // Mock initial system alerts
  const [notifications, setNotifications] = useState<PlatformNotification[]>([
    {
      id: 'notif-1',
      title: 'Interview Loop Ready',
      message: 'Practice Stripe Senior Full-Stack loops now to raise scores!',
      type: 'interview',
      date: '10 mins ago',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Coding Streak Active',
      message: '12 days active. Keep streak alive with Dynamic Programming.',
      type: 'challenge',
      date: '2 hrs ago',
      read: false
    }
  ]);

  // Synchronize theme state with DOM document body class List
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
    // Recalculate slightly higher scores when updated profile
    setScores(prev => ({
      ...prev,
      careerScore: Math.min(prev.careerScore + 3, 100),
      atsScore: Math.min(prev.atsScore + 4, 100),
      interviewScore: Math.min(prev.interviewScore + 2, 100)
    }));
  };

  const handleLogout = () => {
    setUserProfile(null);
    setShowOnboarding(false);
    setCurrentView('dashboard');
  };

  // If user is not logged in / has not set profile, show Landing page or Onboarding wizard
  if (!userProfile) {
    if (showOnboarding) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#07080A] text-slate-800 dark:text-slate-100 flex items-center justify-center py-10 px-4">
          <Onboarding 
            onOnboardingComplete={(profile) => {
              setUserProfile(profile);
              setShowOnboarding(false);
            }} 
          />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#07080A] text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <LandingPage 
          onGetStarted={() => setShowOnboarding(true)} 
        />
      </div>
    );
  }

  // Master Dashboard view selector
  const renderMainViewContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView scores={scores} userProfile={userProfile} onNavigateTo={setCurrentView} />;
      case 'resume-analyzer':
        return <ResumeAnalyzerView />;
      case 'resume-builder':
        return <ResumeBuilderView />;
      case 'roadmap':
        return <RoadmapView userProfile={userProfile} />;
      case 'skill-gap':
        return <SkillGapView userProfile={userProfile} />;
      case 'interview':
        return <MockInterviewView />;
      case 'coding-challenge':
        return <CodingChallengeView />;
      case 'job-engine':
        return <JobEngineView />;
      case 'community':
        return <CommunityView />;
      case 'admin':
        return <AdminView />;
      case 'profile':
        return <UserProfileView userProfile={userProfile} onSaveProfile={handleSaveProfile} />;
      default:
        return <DashboardView scores={scores} userProfile={userProfile} onNavigateTo={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#07080A] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Collapsible Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        onLogout={handleLogout} 
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Navigation bar with Theme conversion & Coach chat */}
        <Navbar 
          theme={theme} 
          onThemeToggle={handleThemeToggle} 
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          userProfile={userProfile}
        />

        {/* Core view viewport */}
        <main className="flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderMainViewContent()}
        </main>

      </div>

    </div>
  );
}
