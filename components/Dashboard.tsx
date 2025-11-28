
import React from 'react';
import { AnalysisResult } from '../types';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { 
  Users, CheckSquare, AlertTriangle, MessageSquare, 
  Target, Activity, TrendingUp, Clock, CalendarCheck, ShieldAlert,
  Download, Share2, Printer
} from 'lucide-react';

interface DashboardProps {
  data: AnalysisResult;
  onShowToast?: (msg: string) => void;
}

const COLORS = ['#4f46e5', '#818cf8', '#c7d2fe', '#312e81', '#6366f1'];
const SENTIMENT_COLORS = {
  positive: '#10b981', // Emerald 500
  neutral: '#94a3b8',  // Slate 400
  negative: '#ef4444'  // Red 500
};

const Dashboard: React.FC<DashboardProps> = ({ data, onShowToast }) => {
  // Defensive destructuring
  const dashboard = data?.dashboard || {
    participants: 0,
    talk_time_distribution: {},
    sentiment_overview: { positive: 0, neutral: 0, negative: 0 },
    meeting_summary_score: 0
  };

  const summary = data?.summary || {
    purpose: '',
    key_points: [],
    risks: [],
    action_items: [],
    decisions: []
  };

  const clean_transcript = data?.clean_transcript || '';

  const talkTimeData = dashboard.talk_time_distribution 
    ? Object.entries(dashboard.talk_time_distribution).map(([name, value]) => ({
        name,
        value: Number(value) || 0
      }))
    : [];

  const displayTalkTime = talkTimeData.length > 0 ? talkTimeData : [{ name: 'No Data', value: 1 }];

  const sentimentData = [
    { name: 'Positive', value: dashboard.sentiment_overview?.positive || 0, fill: SENTIMENT_COLORS.positive },
    { name: 'Neutral', value: dashboard.sentiment_overview?.neutral || 0, fill: SENTIMENT_COLORS.neutral },
    { name: 'Negative', value: dashboard.sentiment_overview?.negative || 0, fill: SENTIMENT_COLORS.negative },
  ];

  const handleExport = () => {
    // Create a Blob from the JSON data
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // Create a link and click it
    const link = document.createElement("a");
    link.href = url;
    link.download = `meeting_analysis_${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if(onShowToast) onShowToast("Exported analysis to JSON");
  };

  const handleShare = () => {
    // Mock share
    if (onShowToast) onShowToast("Shareable link copied to clipboard");
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Intelligence Report</h2>
          <p className="text-slate-500 text-sm">Generated on {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm"
           >
             <Download className="w-4 h-4" /> Export JSON
           </button>
           <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 border border-indigo-600 rounded-lg text-sm font-semibold text-white hover:bg-indigo-500 transition-colors shadow-sm"
           >
             <Share2 className="w-4 h-4" /> Share
           </button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200 hover:border-indigo-300 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Participants</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{dashboard.participants || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200 hover:border-emerald-300 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Topic Score</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{dashboard.meeting_summary_score || 0}<span className="text-base text-slate-400 font-normal">/100</span></p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200 hover:border-amber-300 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Risks</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{summary.risks?.length || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200 hover:border-blue-300 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <CheckSquare className="w-5 h-5" />
            </div>
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Actions</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{summary.action_items?.length || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Summary Column (Left 2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Executive Summary */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6">
              <Target className="w-5 h-5 text-indigo-600" />
              Executive Summary
            </h3>
            <div className="space-y-6">
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2 block">Meeting Purpose</span>
                <p className="text-slate-800 font-medium leading-relaxed">{summary.purpose || "No purpose extracted."}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Key Discussion Points</span>
                <ul className="space-y-3">
                  {(summary.key_points || []).map((point, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 text-sm leading-relaxed group">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                      {point}
                    </li>
                  ))}
                  {(!summary.key_points || summary.key_points.length === 0) && (
                    <li className="text-slate-400 text-sm italic">No key points detected.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Items Table */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200">
             <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                  <CalendarCheck className="w-5 h-5 text-indigo-600" />
                  Action Items
                </h3>
                <span className="text-xs font-medium text-slate-400 px-2 py-1 bg-slate-100 rounded">Auto-Extracted</span>
             </div>
            <div className="overflow-hidden rounded-lg border border-slate-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold tracking-wider">
                    <th className="py-4 px-4">Task</th>
                    <th className="py-4 px-4 w-32">Owner</th>
                    <th className="py-4 px-4 w-32">Deadline</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {(summary.action_items || []).map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-4 text-slate-800 font-medium">{item.task || "Unspecified Task"}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {item.assigned_to || "Unassigned"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500 font-medium">{item.deadline_if_any || '—'}</td>
                    </tr>
                  ))}
                  {(!summary.action_items || summary.action_items.length === 0) && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-400 italic">No action items detected.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

           {/* Transcript Viewer */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200">
            <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              Clean Transcript
            </h3>
            <div className="bg-slate-50 p-6 rounded-xl max-h-[500px] overflow-y-auto font-mono text-xs md:text-sm text-slate-600 whitespace-pre-wrap leading-relaxed border border-slate-100">
              {clean_transcript || "Transcript not available."}
            </div>
          </div>
        </div>

        {/* Analytics Column (Right 1/3) */}
        <div className="space-y-8">
          
          {/* Talk Time Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200">
            <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-6 uppercase tracking-widest">
              <Clock className="w-4 h-4 text-indigo-600" />
              Talk Time
            </h3>
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={displayTalkTime}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {displayTalkTime.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    itemStyle={{ color: '#1e293b', fontWeight: 600, fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                 <span className="text-2xl font-bold text-slate-800">{dashboard.participants || 0}</span>
                 <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Speakers</span>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {talkTimeData.length > 0 ? talkTimeData.map((entry, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-slate-600 font-medium">{entry.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{entry.value}%</span>
                </div>
              )) : (
                <div className="text-center text-slate-400 text-sm italic mt-4">
                  No speaker data available
                </div>
              )}
            </div>
          </div>

          {/* Sentiment Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200">
             <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-6 uppercase tracking-widest">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Sentiment Analysis
            </h3>
            <div className="h-48 w-full">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentData} layout="vertical" margin={{ left: 0, right: 30 }} barCategoryGap={15}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={60} tick={{fontSize: 11, fill: '#64748b', fontWeight: 500}} axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

           {/* Decisions List */}
           <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200">
             <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-6 uppercase tracking-widest">
              <CheckSquare className="w-4 h-4 text-indigo-600" />
              Key Decisions
            </h3>
            <ul className="space-y-3">
              {(summary.decisions || []).map((decision, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="mt-0.5 p-0.5 rounded-full bg-emerald-100 text-emerald-600">
                    <CheckSquare className="w-3 h-3" />
                  </div>
                  <span className="leading-snug">{decision}</span>
                </li>
              ))}
               {(!summary.decisions || summary.decisions.length === 0) && (
                 <li className="text-slate-400 text-sm italic py-2 text-center">No explicit decisions made.</li>
               )}
            </ul>
          </div>
          
          {/* Risks */}
          {summary.risks && summary.risks.length > 0 && (
             <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-slate-200">
             <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-6 uppercase tracking-widest text-red-600">
              <ShieldAlert className="w-4 h-4" />
              Risk Log
            </h3>
            <ul className="space-y-3">
              {summary.risks.map((risk, i) => (
                <li key={i} className="flex gap-3 items-start text-sm text-slate-700 bg-red-50 p-3 rounded-lg border border-red-100">
                  <div className="mt-0.5 text-red-500 font-bold">!</div>
                  <span className="leading-snug">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
