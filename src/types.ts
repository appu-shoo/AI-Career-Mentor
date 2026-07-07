export type Theme = 'light' | 'dark';

export interface UserProfile {
  name: string;
  email: string;
  education: string;
  university: string;
  gradYear: string;
  experienceLevel: 'student' | 'entry' | 'mid' | 'senior';
  currentSkills: string[];
  preferredLanguages: string[];
  desiredCareer: string;
  desiredSalary: string;
  preferredCountry: string;
  certifications: string[];
  projects: string[];
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  resumeFileName: string;
  onboarded: boolean;
  avatarUrl?: string;
}

export interface MetricScores {
  careerScore: number;
  resumeScore: number;
  atsScore: number;
  skillGrowthScore: number;
  interviewScore: number;
  linkedInScore: number;
  projectCompletionScore: number;
  certificateCount: number;
  codingChallengeStreak: number;
  totalApplications: number;
  weeklyHours: number[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  completed: boolean;
  resources: {
    type: 'Course' | 'Book' | 'YouTube' | 'Doc' | 'Project';
    title: string;
    url: string;
    duration?: string;
  }[];
}

export interface SkillItem {
  name: string;
  level: 'mastered' | 'intermediate' | 'beginner' | 'missing';
  priority: 'high' | 'medium' | 'low';
  category: string;
  recommendation: string;
}

export interface MockInterviewSession {
  id: string;
  role: string;
  type: 'technical' | 'behavioral' | 'system-design' | 'hr';
  currentQuestionIndex: number;
  questions: {
    question: string;
    type: string;
    answer?: string;
    feedback?: string;
    score?: number;
  }[];
  isCompleted: boolean;
  overallScore?: number;
  detailedFeedback?: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  templateCode: string;
  testCases: { input: string; expected: string }[];
  streak: number;
  solved: boolean;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: string;
  salary: string;
  skillsRequired: string[];
  description: string;
  matchScore: number;
  bookmarked: boolean;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'accepted' | 'none';
}

export interface ForumPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  title: string;
  content: string;
  category: 'Career Advice' | 'Interview Prep' | 'Resume Review' | 'Coding Help' | 'Showcase';
  likes: number;
  comments: {
    id: string;
    author: string;
    avatar: string;
    content: string;
    date: string;
  }[];
  date: string;
  likedByCurrentUser?: boolean;
}

export interface PlatformNotification {
  id: string;
  title: string;
  message: string;
  type: 'interview' | 'challenge' | 'certificate' | 'roadmap' | 'general';
  date: string;
  read: boolean;
}

export interface AdminAnalytics {
  totalUsers: number;
  activeSubscriptions: number;
  aiTokensUsed: number;
  totalRevenue: number;
  systemStatus: 'healthy' | 'warning' | 'critical';
  userGrowth: { month: string; count: number }[];
  revenueTimeline: { month: string; amount: number }[];
}
