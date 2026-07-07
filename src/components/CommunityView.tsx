import React, { useState } from 'react';
import { 
  MessageSquare, Sparkles, MessageCircle, Heart, Share2, Plus, 
  Send, Compass, RefreshCw, Star 
} from 'lucide-react';

interface Comment {
  author: string;
  avatar: string;
  text: string;
  date: string;
  ai?: boolean;
}

interface Thread {
  id: string;
  title: string;
  author: string;
  avatar: string;
  channel: string;
  text: string;
  likes: number;
  comments: Comment[];
  hasLiked?: boolean;
}

export default function CommunityView() {
  const [channels] = useState(['#resume-critique', '#system-architects', '#interview-debriefs', '#fyi-referrals']);
  const [activeChannel, setActiveChannel] = useState('#resume-critique');

  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 'th-1',
      title: 'Is specifying AWS Lambda durations on resume standard?',
      author: 'Aisha Al-Mansoor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      channel: '#resume-critique',
      text: 'Drafted: "Created 12 custom serverless microservices". Is adding execution timers or millisecond response enhancements over-engineered?',
      likes: 14,
      comments: [
        {
          author: 'Sanjay Kumar',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          text: 'Definitely include it! Specific metrics showing latency reduction (e.g. from 240ms to 45ms) show deep ownership.',
          date: 'Yesterday'
        }
      ]
    },
    {
      id: 'th-2',
      title: 'Valid parenthetical match challenges on Stripe loops?',
      author: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      channel: '#interview-debriefs',
      text: 'Just finished coding rounds. Standard double stack parenthesis matching was asked. Be sure to address edge strings!',
      likes: 8,
      comments: []
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [activeReplyThreadId, setActiveReplyThreadId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isLoadingAI, setIsLoadingAI] = useState<string | null>(null);

  const handleCreatePost = async () => {
    if (!newTitle.trim() || !newText.trim()) return;

    const newPost: Thread = {
      id: `th-${Date.now()}`,
      title: newTitle,
      author: 'Robert Chen (You)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      channel: activeChannel,
      text: newText,
      likes: 0,
      comments: []
    };

    setThreads([newPost, ...threads]);
    setNewTitle('');
    setNewText('');

    // Trigger AI advisor reply automatically to make the community active!
    setIsLoadingAI(newPost.id);
    try {
      const res = await fetch('/api/gemini/career-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `A user posted a thread in our student forum on channel ${activeChannel}. Title: "${newPost.title}". Text: "${newPost.text}". Provide a short helpful response.` })
      });
      const data = await res.json();
      
      const aiReply: Comment = {
        author: 'Advisor Coach AI',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
        text: data.reply || "I highly recommend examining your structural objectives under this framework!",
        date: 'Just now',
        ai: true
      };

      setThreads(current => current.map(th => {
        if (th.id === newPost.id) {
          return { ...th, comments: [...th.comments, aiReply] };
        }
        return th;
      }));

    } catch (err) {
      console.error("Failed to generate AI moderator reply:", err);
    } finally {
      setIsLoadingAI(null);
    }
  };

  const handleLike = (id: string) => {
    setThreads(prev => prev.map(th => {
      if (th.id === id) {
        const isL = th.hasLiked;
        return {
          ...th,
          likes: isL ? th.likes - 1 : th.likes + 1,
          hasLiked: !isL
        };
      }
      return th;
    }));
  };

  const submitReply = (threadId: string) => {
    if (!replyText.trim()) return;

    const newReply: Comment = {
      author: 'Robert Chen (You)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      text: replyText,
      date: 'Just now'
    };

    setThreads(prev => prev.map(th => {
      if (th.id === threadId) {
        return { ...th, comments: [...th.comments, newReply] };
      }
      return th;
    }));

    setReplyText('');
    setActiveReplyThreadId(null);
  };

  const activeThreads = threads.filter(th => th.channel === activeChannel);

  return (
    <div className="p-6 flex flex-col gap-6 text-left">
      
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h1 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-indigo-600" /> Community Discussion Hub
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Discuss keywords, application responses, and technical challenges with peers and AI career moderators.
        </p>
      </div>

      {/* Main Split Layout: left sidebar for channels, right stream */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side Channels */}
        <div className="flex flex-col gap-4 text-left">
          <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-4 rounded-2xl shadow-sm">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400 mb-3 pl-1 font-mono">Forum Channels</h3>
            <div className="flex flex-col gap-1">
              {channels.map(chan => (
                <button
                  key={chan}
                  onClick={() => setActiveChannel(chan)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer ${
                    activeChannel === chan 
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {chan}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Post creator form + Stream of threads */}
        <div className="lg:col-span-3 flex flex-col gap-5">
          
          {/* Create new post block */}
          <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm text-left flex flex-col gap-4">
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Plus className="h-4.5 w-4.5 text-indigo-600" /> Start a New Discussion Thread
            </h3>

            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Thread Title (e.g. AWS Caching metrics optimization)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-4 py-2 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
              />
              <textarea 
                rows={3}
                placeholder="What topic or career question are you evaluating? Peers and AI Advisors participate dynamically."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="w-full p-3.5 bg-slate-50 dark:bg-[#17191E] border border-slate-200 dark:border-slate-800/60 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div className="flex justify-between items-center mt-1">
              <span className="text-[10px] text-slate-400 font-mono">Posting inside <span className="font-bold text-indigo-500">{activeChannel}</span></span>
              <button 
                onClick={handleCreatePost}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Publish Thread
              </button>
            </div>
          </div>

          {/* Threads list stream */}
          <div className="flex flex-col gap-4">
            {activeThreads.length === 0 ? (
              <div className="bg-white dark:bg-[#111216] border border-slate-200/80 p-8 rounded-xl text-center text-xs text-slate-400">
                No active threads inside this channel. Publish the first post above!
              </div>
            ) : (
              activeThreads.map(th => (
                <div key={th.id} className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm text-left flex flex-col gap-3">
                  
                  {/* User profile header */}
                  <div className="flex items-center gap-3">
                    <img src={th.avatar} alt={th.author} className="h-8 w-8 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{th.author}</div>
                      <div className="text-[9px] text-slate-400 font-mono">Posted inside {th.channel}</div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div>
                    <h4 className="font-display font-extrabold text-sm text-slate-900 dark:text-white leading-snug mt-1">{th.title}</h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{th.text}</p>
                  </div>

                  {/* Actions bar (Likes, comments indicators) */}
                  <div className="flex items-center gap-5 border-t border-b border-slate-100 dark:border-slate-850 py-2.5 mt-2 text-xs">
                    <button 
                      onClick={() => handleLike(th.id)}
                      className={`flex items-center gap-1.5 cursor-pointer hover:text-rose-500 ${th.hasLiked ? 'text-rose-500 font-bold' : 'text-slate-400'}`}
                    >
                      <Heart className={`h-4 w-4 ${th.hasLiked ? 'fill-rose-500' : ''}`} />
                      <span>{th.likes} likes</span>
                    </button>
                    <button 
                      onClick={() => setActiveReplyThreadId(activeReplyThreadId === th.id ? null : th.id)}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-600 cursor-pointer"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{th.comments.length} replies</span>
                    </button>
                  </div>

                  {/* Reply Input block */}
                  {activeReplyThreadId === th.id && (
                    <div className="flex gap-2.5 pt-2 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <input 
                        type="text" 
                        placeholder="Write your advice or feedback..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-white dark:bg-[#181A20] border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs text-slate-800 dark:text-slate-100"
                      />
                      <button 
                        onClick={() => submitReply(th.id)}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-[10px] font-bold cursor-pointer hover:bg-indigo-700"
                      >
                        Reply
                      </button>
                    </div>
                  )}

                  {/* Comments lists */}
                  {th.comments.length > 0 && (
                    <div className="flex flex-col gap-3.5 pl-4 border-l border-slate-100 dark:border-slate-800/80 mt-2">
                      {th.comments.map((comm, idx) => (
                        <div key={idx} className="flex flex-col gap-1 text-xs">
                          <div className="flex items-center gap-2">
                            <img src={comm.avatar} alt={comm.author} className="h-5 w-5 rounded-full object-cover" />
                            <span className="font-bold text-slate-850 dark:text-slate-200">{comm.author}</span>
                            {comm.ai && (
                              <span className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded text-[8px] font-bold font-mono uppercase flex items-center gap-1">
                                <Sparkles className="h-2 w-2 text-amber-500" /> Career AI Coach
                              </span>
                            )}
                            <span className="text-[9px] text-slate-400 font-mono ml-auto">{comm.date}</span>
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5 pl-7">{comm.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {isLoadingAI === th.id && (
                    <div className="text-xs text-slate-400 italic flex items-center gap-1.5 pl-4 border-l mt-2">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> AI Coach Moderator is drafting response...
                    </div>
                  )}

                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
