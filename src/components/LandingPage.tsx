import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, Sparkles, Shield, Rocket, Target, Users, Trophy, 
  ChevronRight, Brain, Zap, Terminal, FileText, CheckCircle2, HelpCircle 
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const trustedLogos = ['Stripe', 'Linear', 'Vercel', 'Airbnb', 'GitHub', 'OpenAI'];

  const features = [
    {
      icon: Sparkles,
      title: 'AI Resume Optimizer',
      desc: 'Scan resumes against target ATS benchmarks. Correct structural issues, missing keywords, and inject power verbs in real time.',
    },
    {
      icon: Target,
      title: 'Interactive Learning Roadmaps',
      desc: 'Get highly personalized step-by-step career timelines based on your preferred tech stack, skill level, and market demand.',
    },
    {
      icon: Brain,
      title: 'Interactive Mock Interviews',
      desc: 'Practice technical, system design, and behavioral interviews with actual voice & text coaching that rates performance instantenously.',
    },
    {
      icon: Zap,
      title: 'Dynamic Skill Gap Radar',
      desc: 'Visualize your existing technical competencies against market-demanded skills. Target priorities to maximize job search ROI.',
    },
    {
      icon: Terminal,
      title: 'Coding Sandbox Challenges',
      desc: 'Challenge yourself with daily code patterns. AI explains errors, optimizes complexity, and boosts algorithmic streaks.',
    },
    {
      icon: FileText,
      title: 'SaaS Resume Builder',
      desc: 'Generate stunning, clean, PDF-ready professional resumes from scratch, optimized with AI suggestions.',
    }
  ];

  const testimonials = [
    {
      quote: "AI Career Mentor entirely transformed my application workflow. Within 3 weeks of optimize-building my CV, I secured 4 interviews at tier-1 tech firms and accepted an offer at Stripe!",
      author: "Alex Rivera",
      role: "Graduate Software Engineer",
      company: "Stripe",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    },
    {
      quote: "The mock interview module is an absolute game-changer. It simulates the precise system design questions I faced during my senior developer loops. Highly recommended!",
      author: "Robert Chen",
      role: "Senior Full-Stack Lead",
      company: "Vercel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    }
  ];

  const faqs = [
    {
      q: "How does the ATS score calculation work?",
      a: "Our system parses your resume text structure, formatting patterns, and checks keyword densities against standard enterprise Applicant Tracking Systems (ATS) used by top tech recruiters, giving you actionable edits."
    },
    {
      q: "Can I connect my GitHub profile to build my portfolio?",
      a: "Yes! Our Portfolio Analyzer parses your repositories, README documentation, and commit patterns to deliver optimization tips that increase recruiter trust."
    },
    {
      q: "Is there a limit on the Gemini AI usage?",
      a: "Free tiers include 15 daily AI tokens which covers resumes and mocks. Pro tier gets unlimited queries, advanced mock levels, and live system design coaching."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0B0D] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Navigation */}
      <nav className="border-b border-slate-200/80 dark:border-slate-800/60 bg-white/70 dark:bg-[#0A0B0D]/70 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Rocket className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
              CareerHero
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</a>
            <button 
              onClick={onGetStarted}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all shadow-sm flex items-center gap-2"
            >
              Launch Platform <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold mb-6 border border-indigo-100 dark:border-indigo-900/50"
          >
            <Sparkles className="h-3.5 w-3.5" /> Next-Gen Enterprise AI Career Mentorship
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight"
          >
            Your Personal AI Career Mentor for a <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-400 bg-clip-text text-transparent">Successful Future</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Analyze resumes instantly, visualize skill gaps, generate custom interactive roadmap checkpoints, and practice realistic mock interview loops with elite AI coach feedback.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all transform hover:-translate-y-0.5 shadow-md shadow-indigo-500/10 flex items-center gap-2 text-base cursor-pointer"
            >
              Get Started Free <ArrowRight className="h-5 w-5" />
            </button>
            <button 
              onClick={onGetStarted}
              className="px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl font-medium transition-all transform hover:-translate-y-0.5 text-base cursor-pointer"
            >
              Explore AI Mocks
            </button>
          </motion.div>

          {/* Simulated Premium Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto bg-white dark:bg-[#111216] p-4 flex flex-col gap-4 aspect-video"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono ml-3">CareerHero // Dashboard Preview</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-500">
                <Zap className="h-3 w-3 text-amber-500" /> Standard User: Demo User
              </div>
            </div>
            
            {/* Simulated UI interior */}
            <div className="grid grid-cols-3 gap-4 flex-1 text-left text-xs">
              <div className="bg-slate-50 dark:bg-[#17191E] p-4 rounded-xl flex flex-col gap-3">
                <div className="text-slate-500 dark:text-slate-400 font-bold tracking-tight">Career Quality Score</div>
                <div className="text-3xl font-display font-extrabold text-indigo-600 dark:text-indigo-400">85%</div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '85%' }} />
                </div>
                <div className="text-[10px] text-slate-400">Increased by 13% over past 30 days</div>
              </div>

              <div className="bg-slate-50 dark:bg-[#17191E] p-4 rounded-xl flex flex-col gap-3">
                <div className="text-slate-500 dark:text-slate-400 font-bold tracking-tight">ATS Resume Compatibility</div>
                <div className="text-3xl font-display font-extrabold text-emerald-500">75%</div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }} />
                </div>
                <div className="text-[10px] text-slate-400">Keyword densities optimized nicely</div>
              </div>

              <div className="bg-slate-50 dark:bg-[#17191E] p-4 rounded-xl flex flex-col gap-3">
                <div className="text-slate-500 dark:text-slate-400 font-bold tracking-tight">Competency Gaps Map</div>
                <div className="text-3xl font-display font-extrabold text-amber-500">12</div>
                <div className="text-slate-400 font-mono text-[10px]">Mastered: 4 | Missing: 2 | Total: 12</div>
                <div className="text-[10px] text-amber-500 font-medium">Docker & Cloud deploy prioritized high</div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Trusted By Company Logos */}
      <section className="bg-white dark:bg-[#0E0F12] border-y border-slate-200/60 dark:border-slate-800/60 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase font-mono">
            TRUSTED BY STUDENTS & LEADERS FROM
          </div>
          <div className="flex flex-wrap items-center gap-8 md:gap-16 opacity-50 dark:opacity-40">
            {trustedLogos.map((logo, idx) => (
              <span key={idx} className="font-display font-bold text-xl text-slate-800 dark:text-slate-300">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Engineered as a Complete SaaS Ecosystem
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive pipeline of tools crafted to optimize every aspect of your professional profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#111216] border border-slate-200 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm transition-all flex flex-col gap-4 text-left"
              >
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl text-indigo-600 dark:text-indigo-400 w-fit">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="bg-indigo-600 dark:bg-indigo-950/40 text-white dark:text-slate-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-display font-extrabold text-white">45,000+</div>
            <div className="mt-2 text-sm text-indigo-100 dark:text-slate-300">Resumes Analyzed</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-display font-extrabold text-white">92%</div>
            <div className="mt-2 text-sm text-indigo-100 dark:text-slate-300">Interview Success Rate</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-display font-extrabold text-white">8,200+</div>
            <div className="mt-2 text-sm text-indigo-100 dark:text-slate-300">Mock Sessions Completed</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-display font-extrabold text-white">12.5k</div>
            <div className="mt-2 text-sm text-indigo-100 dark:text-slate-300">Dream Roles Secured</div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Pricing Plans That Grow With You
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Choose the perfect plan to boost your coding, resume writing, and interview career progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white dark:bg-[#111216] border border-slate-200 dark:border-slate-800 p-8 rounded-2xl flex flex-col justify-between text-left relative">
            <div>
              <span className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase font-mono">Starter Pack</span>
              <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-2">Get Started Free</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Perfect for students and entry level engineers exploring roles.</p>
              
              <div className="mt-6 flex items-baseline gap-1 text-slate-900 dark:text-white">
                <span className="text-4xl font-display font-extrabold">$0</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">/ forever</span>
              </div>

              <ul className="mt-8 flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" /> Standard ATS resume check</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" /> 1-Step standard Roadmap</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" /> Basic text mock interview loops</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 flex-shrink-0" /> Core Skill gap dashboard</li>
              </ul>
            </div>

            <button 
              onClick={onGetStarted}
              className="mt-8 w-full py-3 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 font-semibold text-sm transition-all cursor-pointer text-center"
            >
              Get Started Now
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-white dark:bg-[#111216] border-2 border-indigo-600 p-8 rounded-2xl flex flex-col justify-between text-left relative">
            <div className="absolute -top-3 right-6 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono shadow-sm">
              Most Popular
            </div>
            
            <div>
              <span className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase font-mono">Professional Tier</span>
              <h3 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-2">Unlimited Mentor Pro</h3>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Engineered for professionals, career changers, and aggressive job seekers.</p>
              
              <div className="mt-6 flex items-baseline gap-1 text-slate-900 dark:text-white">
                <span className="text-4xl font-display font-extrabold">$18</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">/ month</span>
              </div>

              <ul className="mt-8 flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 flex-shrink-0" /> Side-by-side AI CV rewriting & optimizer</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 flex-shrink-0" /> Step-by-step detailed interactive timelines</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 flex-shrink-0" /> AI voice interview drills with scorecards</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 flex-shrink-0" /> Full portfolio review & commit analysis</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="h-4.5 w-4.5 text-indigo-500 flex-shrink-0" /> Premium Kanban job listings engine</li>
              </ul>
            </div>

            <button 
              onClick={onGetStarted}
              className="mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm transition-all cursor-pointer text-center"
            >
              Start 14-Day Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-200 dark:border-slate-800">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-[#111216] p-6 rounded-xl border border-slate-200/80 dark:border-slate-800/80 text-left">
              <h4 className="font-display font-semibold text-slate-950 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-indigo-500 flex-shrink-0" /> {faq.q}
              </h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 pl-7 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-[#08090B] border-t border-slate-200/60 dark:border-slate-800/60 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded text-white">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="font-display font-bold text-slate-900 dark:text-white">
              CareerHero
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; 2026 CareerHero AI Platforms. Crafted lovingly according to SaaS guidelines.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>&middot;</span>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
