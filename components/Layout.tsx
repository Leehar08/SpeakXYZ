
import React from 'react';
import { Bot, Settings, Menu, X, ArrowRight, History, LayoutDashboard } from 'lucide-react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  isLanding?: boolean;
  activeTab?: AppTab;
  onNavigate?: (tab: AppTab) => void;
  onGoHome?: () => void;
  onLaunchApp?: () => void;
  onScrollToSection?: (id: string) => void;
  onShowToast?: (msg: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  isLanding = false, 
  activeTab,
  onNavigate,
  onGoHome, 
  onLaunchApp,
  onScrollToSection,
  onShowToast
}) => {
  // Theme classes based on landing or app mode
  const bgClass = isLanding ? "bg-slate-950" : "bg-slate-50";
  const navClass = isLanding 
    ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800" 
    : "bg-white border-b border-slate-200 shadow-sm";
  const textClass = isLanding ? "text-slate-200" : "text-slate-900";
  const logoTextClass = isLanding ? "text-white" : "text-slate-900";
  
  const handleLandingLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onScrollToSection) {
      onScrollToSection(id);
    }
  };

  const handleDocsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onShowToast) onShowToast("Opening documentation portal...");
  };

  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-colors duration-300 ${navClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={onGoHome}
            >
              <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-xl tracking-tight ${logoTextClass}`}>Speak XYZ</span>
                {!isLanding && (
                   <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Intelligence Engine</span>
                )}
              </div>
            </div>
            
            {/* Nav Links (Desktop) */}
            <nav className="hidden md:flex space-x-8">
              {isLanding ? (
                <>
                  <a href="#features" onClick={(e) => handleLandingLinkClick(e, 'features')} className="text-slate-300 font-medium hover:text-white transition-colors">Product</a>
                  <a href="#integrations" onClick={(e) => handleLandingLinkClick(e, 'integrations')} className="text-slate-300 font-medium hover:text-white transition-colors">Integrations</a>
                  <a href="#pricing" onClick={(e) => handleLandingLinkClick(e, 'pricing')} className="text-slate-300 font-medium hover:text-white transition-colors">Pricing</a>
                  <a href="#" onClick={handleDocsClick} className="text-slate-300 font-medium hover:text-white transition-colors">Docs</a>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => onNavigate?.('input')}
                    className={`font-medium transition-colors flex items-center gap-1.5 ${activeTab === 'input' || activeTab === 'progress' || activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <LayoutDashboard className="w-4 h-4" /> Analysis
                  </button>
                  <button 
                    onClick={() => onNavigate?.('history')}
                    className={`font-medium transition-colors flex items-center gap-1.5 ${activeTab === 'history' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <History className="w-4 h-4" /> History
                  </button>
                  <button 
                    onClick={() => onNavigate?.('settings')}
                    className={`font-medium transition-colors flex items-center gap-1.5 ${activeTab === 'settings' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                </>
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {isLanding ? (
                <>
                   <button 
                    onClick={onLaunchApp}
                    className="hidden md:flex text-sm font-semibold text-slate-300 hover:text-white mr-2"
                   >
                     Log In
                   </button>
                   <button 
                    onClick={onLaunchApp}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-indigo-900/20"
                   >
                     Start Trial <ArrowRight className="w-3 h-3" />
                   </button>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-semibold text-sm border border-indigo-200 cursor-pointer hover:bg-indigo-200 transition-colors">
                    JD
                  </div>
                </>
              )}
              
              <button className={`md:hidden p-2 ${isLanding ? 'text-slate-400' : 'text-slate-500'}`}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {isLanding ? (
          children
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        )}
      </main>

      {/* Simple Footer for App View Only */}
      {!isLanding && (
        <footer className="bg-white border-t border-slate-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center text-slate-400 text-sm">
              © 2025 Speak XYZ. Powered by Gemini 2.5.
            </p>
            <div className="flex gap-4 text-sm text-slate-400">
               <a href="#" className="hover:text-indigo-600">Privacy</a>
               <a href="#" className="hover:text-indigo-600">Terms</a>
               <a href="#" className="hover:text-indigo-600">Help</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
