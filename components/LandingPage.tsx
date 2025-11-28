
import React from 'react';
import { 
  Bot, BarChart3, Zap, Shield, Globe, CheckCircle2, 
  ArrowRight, Code2, Users, Layout, MessageSquare, 
  Activity, Play
} from 'lucide-react';

interface LandingPageProps {
  onStartTrial: () => void;
  onScrollToSection: (id: string) => void;
  onShowToast: (msg: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartTrial, onScrollToSection, onShowToast }) => {
  
  const handleSalesClick = () => {
    onShowToast("Sales inquiry sent! We will contact you shortly.");
  };

  const handleDocsClick = () => {
    onShowToast("Opening API Documentation...");
  };

  return (
    <div className="bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-8 backdrop-blur-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            v2.0 Now Available: Real-time Diarization
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in-up delay-100">
            AI That <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Understands</span> <br />
            Your Meetings
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            SpeakXYZ transforms raw conversation into structured insights. 
            Automated summaries, risk detection, and action items—delivered in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <button 
              onClick={onStartTrial}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onScrollToSection('copilot')}
              className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600 rounded-lg font-semibold transition-all backdrop-blur-sm flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Watch Demo
            </button>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative mx-auto max-w-5xl animate-fade-in-up delay-500">
            <div className="rounded-xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
              <div className="p-1 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2 px-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700" />
                </div>
                <div className="flex-1 text-center text-xs text-slate-500 font-mono">live_analysis_engine.tsx</div>
              </div>
              <div className="grid grid-cols-12 h-[400px] bg-slate-950">
                {/* Sidebar */}
                <div className="col-span-3 border-r border-slate-800 p-4 hidden md:block">
                  <div className="space-y-3">
                    <div className="h-2 w-20 bg-slate-800 rounded animate-pulse" />
                    <div className="h-2 w-16 bg-slate-800 rounded animate-pulse delay-75" />
                    <div className="h-2 w-24 bg-slate-800 rounded animate-pulse delay-150" />
                  </div>
                  <div className="mt-8 space-y-4">
                     {[1,2,3].map(i => (
                       <div key={i} className="flex items-center gap-3 opacity-50">
                         <div className="w-8 h-8 rounded-full bg-slate-800" />
                         <div className="h-2 w-16 bg-slate-800 rounded" />
                       </div>
                     ))}
                  </div>
                </div>
                {/* Main Content */}
                <div className="col-span-12 md:col-span-9 p-6 relative">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">JD</div>
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-tr-2xl rounded-b-2xl max-w-lg">
                        <p className="text-slate-300 text-sm">We need to finalize the Q3 budget by Friday. The marketing spend is currently 15% over.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 flex-row-reverse">
                      <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold border border-cyan-500/30">AL</div>
                      <div className="bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-tl-2xl rounded-b-2xl max-w-lg">
                        <p className="text-indigo-200 text-sm">I can reallocate the LinkedIn budget. That should balance it out without cutting total spend.</p>
                      </div>
                    </div>
                     {/* AI Insight Overlay */}
                    <div className="absolute top-1/2 right-6 -translate-y-1/2 w-64 bg-slate-900/90 backdrop-blur-md border border-indigo-500/50 p-4 rounded-xl shadow-2xl transform translate-x-4 group-hover:translate-x-0 transition-transform duration-500 cursor-pointer" onClick={() => onShowToast("Added to Jira: Reallocate Budget")}>
                      <div className="flex items-center gap-2 mb-2 text-indigo-400">
                        <Zap className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Insight Detected</span>
                      </div>
                      <p className="text-xs text-slate-300 mb-2">Decision made to reallocate LinkedIn budget.</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>Confidence: 98%</span>
                        <span className="text-indigo-400 hover:underline">Add to Jira</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE ENGINE FEATURES */}
      <section id="features" className="py-20 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Intelligence Engine</h2>
            <p className="text-slate-400">Built for enterprise scale. Our model processes audio streams to extract meaning, not just words.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: <MessageSquare className="w-6 h-6 text-blue-400" />, 
                title: "Speech-to-Meaning", 
                desc: "Removes filler words, structures dialogue, and corrects context in real-time." 
              },
              { 
                icon: <Users className="w-6 h-6 text-purple-400" />, 
                title: "Speaker Diarization", 
                desc: "Identifies unique voices and assigns consistent labels across long sessions." 
              },
              { 
                icon: <Layout className="w-6 h-6 text-indigo-400" />, 
                title: "Structured Summaries", 
                desc: "Auto-extracts decisions, risks, and action items into clean JSON." 
              },
              { 
                icon: <BarChart3 className="w-6 h-6 text-emerald-400" />, 
                title: "Deep Analytics", 
                desc: "Sentiment tracking, talk-time distribution, and topic drift detection." 
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group cursor-default">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROGRESS TAB (NEW FEATURE) */}
      <section id="progress" className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                <CheckCircle2 className="w-3 h-3" /> New: Project Pulse
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Track Progress Beyond the Meeting</h2>
              <p className="text-slate-400 text-lg">
                Meetings aren't isolated events. SpeakXYZ connects decisions to delivery. Track action item completion rates and team alignment over time.
              </p>
              
              <ul className="space-y-4 mt-4">
                {[
                  "Visual Team Alignment Meter",
                  "Historic Task Completion Rates",
                  "Auto-sync status with Jira & Linear"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-6 shadow-2xl relative">
                {/* Mockup UI for Progress */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-white">Q3 Product Launch</h3>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Project View</span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>Overall Completion</span>
                      <span>68%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[68%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-xs text-slate-500 mb-1">Pending Actions</div>
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-[10px] text-emerald-400 mt-1">↓ 2 from last week</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-xs text-slate-500 mb-1">Team Alignment</div>
                      <div className="text-2xl font-bold text-white">94%</div>
                      <div className="text-[10px] text-emerald-400 mt-1">↑ High consensus</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded bg-slate-900/50 border border-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm text-slate-300">Update API Docs</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE COPILOT SECTION */}
      <section id="copilot" className="py-20 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Meeting Copilot</h2>
           <p className="text-slate-400">Contextual intelligence that lives in the sidebar.</p>
        </div>
        <div className="max-w-5xl mx-auto relative">
           <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] pointer-events-none" />
           <div className="relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[500px]">
              {/* Transcript Side */}
              <div className="flex-1 p-8 border-r border-slate-800 overflow-hidden relative">
                 <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-900 to-transparent z-10" />
                 <div className="space-y-6 opacity-60">
                    <p className="text-slate-400 text-sm">[00:12:05] <strong className="text-indigo-400">Sarah:</strong> I think we should delay the release.</p>
                    <p className="text-slate-400 text-sm">[00:12:15] <strong className="text-cyan-400">David:</strong> Why? The backend is ready.</p>
                    <p className="text-slate-400 text-sm">[00:12:20] <strong className="text-indigo-400">Sarah:</strong> The frontend needs another week of QA.</p>
                    <p className="text-slate-300 text-sm border-l-2 border-indigo-500 pl-4">[00:12:35] <strong className="text-white">Mark (CEO):</strong> Okay, let's push the date to the 15th. David, can you update the stakeholders?</p>
                 </div>
              </div>
              
              {/* Copilot Side */}
              <div className="w-full md:w-80 bg-slate-950 flex flex-col">
                 <div className="p-4 border-b border-slate-800 font-semibold text-white flex items-center gap-2">
                    <Bot className="w-4 h-4 text-indigo-400" /> Copilot
                 </div>
                 <div className="flex-1 p-4 space-y-4">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                       <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1">
                          <Activity className="w-3 h-3" /> Risk Detected
                       </div>
                       <p className="text-xs text-slate-400">Release delay might impact the marketing campaign scheduled for the 10th.</p>
                    </div>
                    
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                       <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-1">
                          <CheckCircle2 className="w-3 h-3" /> Suggested Action
                       </div>
                       <p className="text-xs text-slate-400">Assign task to David: Update stakeholders about date shift.</p>
                       <button onClick={() => onShowToast("Task assigned to David")} className="mt-2 w-full py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] rounded transition-colors">Assign</button>
                    </div>
                 </div>
                 <div className="p-4 border-t border-slate-800">
                    <div className="h-8 bg-slate-900 rounded border border-slate-800 flex items-center px-3 text-xs text-slate-500 cursor-text">Ask Copilot...</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. JSON OUTPUT / DEV SECTION */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-6 text-indigo-400">
              <Code2 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Structured Insights <br /> You Can Build On</h2>
            <p className="text-slate-400 mb-8">
              Don't just get text. Get a queryable database of every conversation. Our engine outputs strict schema JSON compatible with your data warehouse.
            </p>
            <div className="flex gap-4">
              <button onClick={handleDocsClick} className="text-white border-b border-indigo-500 pb-1 text-sm font-medium hover:text-indigo-400 transition-colors">Read Documentation</button>
              <button onClick={handleDocsClick} className="text-slate-500 hover:text-white pb-1 text-sm font-medium transition-colors">View API Reference</button>
            </div>
          </div>
          
          <div className="relative">
             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur opacity-20"></div>
             <div className="relative rounded-xl bg-[#0d1117] border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-hidden shadow-2xl">
                <div className="flex gap-1.5 mb-4 border-b border-slate-800 pb-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                </div>
                <pre className="overflow-x-auto custom-scrollbar">
{`{
  "summary": {
    "purpose": "Q3 Budget Review",
    "decisions": [
      "Reallocate LinkedIn budget to Instagram",
      "Stick with current print vendor"
    ],
    "action_items": [
      {
        "task": "Draft reallocation plan",
        "assigned_to": "Sarah",
        "deadline": "2023-10-20"
      }
    ]
  },
  "dashboard": {
    "sentiment_score": 0.85,
    "talk_time": {
      "Sarah": 45,
      "David": 35,
      "Mark": 20
    }
  }
}`}
                </pre>
             </div>
          </div>
        </div>
      </section>

      {/* 6. INTEGRATIONS */}
      <section id="integrations" className="py-20 bg-slate-950 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-2xl font-bold text-white mb-12 opacity-80">Seamlessly Integrated With</h2>
           <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {['Slack', 'Notion', 'Jira', 'Zoom', 'Google Meet', 'Teams'].map((name) => (
               <span key={name} className="text-xl font-bold text-slate-300 flex items-center gap-2 cursor-pointer hover:text-white transition-colors" onClick={() => onShowToast(`Integration with ${name} coming soon`)}>
                 <Globe className="w-5 h-5" /> {name}
               </span>
             ))}
           </div>
        </div>
      </section>

      {/* 7. PRICING */}
      <section id="pricing" className="py-20 bg-slate-900 border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Transparent Pricing</h2>
            <p className="text-slate-400 mb-12">Start for free, scale with your team.</p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
               {/* Starter */}
               <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-start hover:border-slate-600 transition-colors">
                  <div className="text-lg font-semibold text-white mb-2">Starter</div>
                  <div className="text-4xl font-bold text-white mb-4">$0 <span className="text-sm font-normal text-slate-500">/mo</span></div>
                  <p className="text-sm text-slate-400 mb-6 text-left">Perfect for individuals and freelancers.</p>
                  <button onClick={onStartTrial} className="w-full py-3 rounded-lg border border-slate-700 text-white font-medium hover:bg-slate-900 transition-colors mb-6">Get Started</button>
                  <ul className="space-y-3 text-sm text-slate-300 text-left">
                     <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> 5 hours/month</li>
                     <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Basic Summary</li>
                     <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> 1 User</li>
                  </ul>
               </div>

               {/* Pro */}
               <div className="p-8 rounded-2xl bg-slate-900 border border-indigo-500/30 relative flex flex-col items-start shadow-2xl">
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                  <div className="text-lg font-semibold text-white mb-2">Pro</div>
                  <div className="text-4xl font-bold text-white mb-4">$29 <span className="text-sm font-normal text-slate-500">/mo</span></div>
                  <p className="text-sm text-slate-400 mb-6 text-left">For growing teams and professionals.</p>
                  <button onClick={onStartTrial} className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-colors mb-6">Start Free Trial</button>
                  <ul className="space-y-3 text-sm text-slate-300 text-left">
                     <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Unlimited hours</li>
                     <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Advanced Analytics</li>
                     <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Jira/Notion Sync</li>
                     <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> 5 Users</li>
                  </ul>
               </div>

               {/* Enterprise */}
               <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-start hover:border-slate-600 transition-colors">
                  <div className="text-lg font-semibold text-white mb-2">Enterprise</div>
                  <div className="text-4xl font-bold text-white mb-4">Custom</div>
                  <p className="text-sm text-slate-400 mb-6 text-left">Security and control for large orgs.</p>
                  <button onClick={handleSalesClick} className="w-full py-3 rounded-lg border border-slate-700 text-white font-medium hover:bg-slate-900 transition-colors mb-6">Contact Sales</button>
                  <ul className="space-y-3 text-sm text-slate-300 text-left">
                     <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-500" /> SSO & Audit Logs</li>
                     <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-500" /> Dedicated Support</li>
                     <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-slate-500" /> Custom Retention</li>
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
               <div>
                  <div className="flex items-center gap-2 mb-4">
                     <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <Bot className="w-5 h-5 text-white" />
                     </div>
                     <span className="font-bold text-white">SpeakXYZ</span>
                  </div>
                  <p className="text-sm text-slate-500">The meeting intelligence engine for modern teams.</p>
               </div>
               <div>
                  <h4 className="font-semibold text-white mb-4">Product</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                     <li><button onClick={() => onScrollToSection('features')} className="hover:text-indigo-400">Features</button></li>
                     <li><button onClick={() => onScrollToSection('integrations')} className="hover:text-indigo-400">Integrations</button></li>
                     <li><button onClick={() => onScrollToSection('pricing')} className="hover:text-indigo-400">Pricing</button></li>
                     <li><button onClick={handleDocsClick} className="hover:text-indigo-400">Changelog</button></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-semibold text-white mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                     <li><button onClick={handleDocsClick} className="hover:text-indigo-400">Documentation</button></li>
                     <li><button onClick={handleDocsClick} className="hover:text-indigo-400">API Reference</button></li>
                     <li><button onClick={() => onShowToast("Joining Community...")} className="hover:text-indigo-400">Community</button></li>
                     <li><button onClick={() => onShowToast("Opening Blog...")} className="hover:text-indigo-400">Blog</button></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-semibold text-white mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                     <li><button onClick={() => onShowToast("Opening About page...")} className="hover:text-indigo-400">About</button></li>
                     <li><button onClick={() => onShowToast("Opening Careers page...")} className="hover:text-indigo-400">Careers</button></li>
                     <li><button onClick={() => onShowToast("Opening Legal page...")} className="hover:text-indigo-400">Legal</button></li>
                     <li><button onClick={handleSalesClick} className="hover:text-indigo-400">Contact</button></li>
                  </ul>
               </div>
            </div>
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
               <p className="text-sm text-slate-600">© 2025 SpeakXYZ Inc. All rights reserved.</p>
               <div className="flex gap-4">
                  <Globe onClick={() => onShowToast("Region: US-East")} className="w-5 h-5 text-slate-600 hover:text-white cursor-pointer transition-colors" />
                  <Shield onClick={() => onShowToast("Security Status: Audited")} className="w-5 h-5 text-slate-600 hover:text-white cursor-pointer transition-colors" />
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
