import React, { useState } from 'react';
import { 
  ShieldAlert, Activity, Server, Database, RefreshCw, Terminal, 
  Clock, ArrowUpRight, CheckCircle, AlertOctagon, TrendingUp 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function AdminView() {
  const [requestsCount, setRequestsCount] = useState(1389);
  const [cpuUsage, setCpuUsage] = useState(14.2);
  const [cacheHit, setCacheHit] = useState(91.4);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // CPU and API loads timeline chart data
  const apiLoadData = [
    { name: '10:00', Requests: 120, Cpu: 8 },
    { name: '11:00', Requests: 280, Cpu: 15 },
    { name: '12:00', Requests: 340, Cpu: 18 },
    { name: '13:00', Requests: 560, Cpu: 24 },
    { name: '14:00', Requests: 410, Cpu: 19 },
    { name: '15:00', Requests: 490, Cpu: 22 },
    { name: '16:00', Requests: 610, Cpu: 28 },
  ];

  const systemLogs = [
    { id: 'log-1', service: 'Gemini-3.5-Pro', event: 'Parsed ATS scoring weights', status: 'SUCCESS', code: 200, time: '3 mins ago' },
    { id: 'log-2', service: 'RoadmapEngine', event: 'Compiling Docker checklist step', status: 'SUCCESS', code: 200, time: '7 mins ago' },
    { id: 'log-3', service: 'TTS Synthesis', event: 'Voice payload delivered', status: 'WARNING', code: 299, time: '14 mins ago' },
    { id: 'log-4', service: 'AuthManager', event: 'JWT token generation standard', status: 'SUCCESS', code: 200, time: '21 mins ago' },
  ];

  const handleRefreshStats = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRequestsCount(Math.floor(1300 + Math.random() * 200));
      setCpuUsage(parseFloat((10 + Math.random() * 8).toFixed(1)));
      setCacheHit(parseFloat((88 + Math.random() * 5).toFixed(1)));
      setIsRefreshing(false);
    }, 700);
  };

  return (
    <div className="p-6 flex flex-col gap-6 text-left">
      
      {/* Header Banner */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-indigo-600" /> Admin system Console
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time analytics, API request rates, compiler statuses, and telemetry controls.
          </p>
        </div>
        <button
          onClick={handleRefreshStats}
          disabled={isRefreshing}
          className="px-4 py-2 bg-indigo-50 dark:bg-[#1A1C23] hover:bg-indigo-100 dark:hover:bg-slate-850 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all shrink-0"
        >
          {isRefreshing ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Refresh Telemetry
        </button>
      </div>

      {/* Numerical metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        
        {/* Metric 1 */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
            <span>Monthly API Requests</span>
            <Server className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">{requestsCount}</span>
            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5"><TrendingUp className="h-3 w-3" /> +14.2%</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">Hits dispatched through Express secure API</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
            <span>Container Memory Allocation</span>
            <Activity className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">{cpuUsage}%</span>
            <span className="text-xs text-slate-400">capacity</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">Stable sandbox runtime on Cloud Run</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider font-mono">
            <span>Response Cache Hit-Ratio</span>
            <Database className="h-4 w-4 text-[#E5801B]" />
          </div>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl font-display font-extrabold text-slate-900 dark:text-white">{cacheHit}%</span>
            <span className="text-xs text-slate-400">ratio</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-mono">Efficient pre-processed queries</p>
        </div>

      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* API load chart */}
        <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 p-5 rounded-2xl shadow-sm lg:col-span-2 text-left">
          <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mb-4">Request Rate Conversion</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={apiLoadData}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="Requests" stroke="#4f46e5" fillOpacity={1} fill="url(#colorRequests)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Console / Shell Server details */}
        <div className="bg-[#0A0B0D] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg text-left">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
              <Terminal className="h-4.5 w-4.5 text-indigo-400" />
              <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">Node.js Daemon</span>
            </div>

            <div className="flex flex-col gap-2 text-[11px] font-mono leading-relaxed">
              <div className="flex justify-between">
                <span className="text-slate-500">Express PORT:</span>
                <span className="text-indigo-400">3000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CORS Policy:</span>
                <span className="text-[#80C2FF]">Origins * Allowed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">HMR Middleware:</span>
                <span className="text-rose-400">Disabled (Platform constraint)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gemini LLM Key:</span>
                <span className="text-emerald-400">Configured secure</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-4 mt-6">
            <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 justify-center">
              <Clock className="h-3.5 w-3.5" /> Uptime: 96.2 hrs online
            </span>
          </div>
        </div>

      </div>

      {/* System Activity Logs Table */}
      <div className="bg-white dark:bg-[#111216] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm p-5">
        <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
          Node.js API Activity Stream Logs
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-850 pb-2 text-slate-400">
                <th className="py-2.5 font-bold uppercase">Time</th>
                <th className="py-2.5 font-bold uppercase">System Module</th>
                <th className="py-2.5 font-bold uppercase">Logged Event</th>
                <th className="py-2.5 font-bold uppercase">Status Status</th>
                <th className="py-2.5 font-bold uppercase">Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
              {systemLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-850/20 transition-all">
                  <td className="py-3 text-slate-400">{log.time}</td>
                  <td className="py-3 font-bold text-slate-800 dark:text-slate-200">{log.service}</td>
                  <td className="py-3 text-slate-500 dark:text-slate-400">{log.event}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      log.status === 'SUCCESS' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20' : 'text-amber-600 bg-amber-50 dark:bg-amber-950/20'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-slate-800 dark:text-slate-100">{log.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
