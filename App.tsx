
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import InputSection from './components/InputSection';
import ProgressTracker from './components/ProgressTracker';
import Dashboard from './components/Dashboard';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';
import Toast from './components/Toast';
import { AnalysisResult, AppStatus, ProcessingStep, AppTab, HistoryItem, ToastMessage, AppSettings } from './types';
import { EMPTY_RESULT } from './constants';
import { analyzeMeeting } from './services/geminiService';
import { compressAudio, fileToBase64 } from './utils/audioUtils';
import { saveMeetingToDB, getHistoryFromDB, deleteMeetingFromDB, clearHistoryDB } from './services/dbService';

const App: React.FC = () => {
  // View State
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<AppTab>('input');

  // Data State
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('uploading');
  const [result, setResult] = useState<AnalysisResult>(EMPTY_RESULT);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'light',
    notifications: true,
    autoSave: true
  });
  
  // UI State
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load History from DB on Mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedHistory = await getHistoryFromDB();
        setHistory(storedHistory);
      } catch (e) {
        console.error("Failed to load history from DB", e);
      }
    };
    loadData();
  }, []);

  // Navigation Handlers
  const startApp = () => {
    setView('app');
    setActiveTab('input');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (tab: AppTab) => {
    setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toast Handlers
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto dismiss
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Logic Handlers
  const addToHistory = async (data: AnalysisResult, fileName?: string) => {
    const newItem: HistoryItem = {
      ...data,
      id: Date.now().toString(),
      timestamp: Date.now(),
      fileName
    };

    // Update state first for immediate UI feedback
    setHistory(prev => [newItem, ...prev]);

    // Persist to DB if auto-save is on
    if (settings.autoSave) {
      try {
        await saveMeetingToDB(newItem);
        showToast("Saved to database", "success");
      } catch (error) {
        console.error(error);
        showToast("Failed to save to database", "error");
      }
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearHistoryDB();
      setHistory([]);
      showToast("Database cleared", "success");
    } catch (error) {
      showToast("Failed to clear database", "error");
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteMeetingFromDB(id);
      setHistory(prev => prev.filter(item => item.id !== id));
      showToast("Meeting deleted", "info");
    } catch (error) {
      showToast("Failed to delete item", "error");
    }
  };

  const simulateProgress = (startStep: ProcessingStep = 'cleaning') => {
    // Fake progress steps for UX while waiting for API
    const steps: ProcessingStep[] = ['cleaning', 'diarization', 'analyzing', 'generating_dashboard'];
    
    // Find where to start in the steps array
    let startIndex = steps.indexOf(startStep);
    if (startIndex === -1) startIndex = 0;
    
    let index = startIndex;
    
    const interval = setInterval(() => {
      index++;
      if (index < steps.length) {
        setCurrentStep(steps[index]);
      } else {
        clearInterval(interval);
      }
    }, 2500); 
    return interval;
  };

  const handleAnalyzeText = async (text: string) => {
    setStatus(AppStatus.PROCESSING);
    setActiveTab('progress');
    setCurrentStep('uploading');
    setErrorMsg(null);

    const progressInterval = simulateProgress('cleaning');

    try {
      const data = await analyzeMeeting({ text });
      
      clearInterval(progressInterval);
      setResult(data);
      setCurrentStep('generating_dashboard');
      
      setTimeout(() => {
        setStatus(AppStatus.COMPLETED);
        setActiveTab('dashboard');
        addToHistory(data, "Text Transcript");
      }, 800);

    } catch (err: any) {
      clearInterval(progressInterval);
      setStatus(AppStatus.ERROR);
      setErrorMsg(err.message || "An unexpected error occurred.");
      setActiveTab('input');
      showToast("Analysis failed", "error");
    }
  };

  const handleAnalyzeAudio = async (file: File) => {
    setStatus(AppStatus.PROCESSING);
    setActiveTab('progress');
    setErrorMsg(null);
    
    let base64Data: string;
    let mimeType = 'audio/wav';

    try {
      const SIZE_LIMIT = 20 * 1024 * 1024;
      
      if (file.size > SIZE_LIMIT) {
        setCurrentStep('compressing');
        await new Promise(r => setTimeout(r, 100)); // UI paint
        base64Data = await compressAudio(file);
        mimeType = 'audio/wav'; 
      } else {
        setCurrentStep('uploading');
        base64Data = await fileToBase64(file);
        mimeType = file.type || 'audio/mp3';
      }

      setCurrentStep('cleaning'); 
      const progressInterval = simulateProgress('cleaning');

      const data = await analyzeMeeting({ audioData: base64Data, mimeType });

      clearInterval(progressInterval);
      setResult(data);
      setCurrentStep('generating_dashboard');
      
      setTimeout(() => {
        setStatus(AppStatus.COMPLETED);
        setActiveTab('dashboard');
        addToHistory(data, file.name);
      }, 800);

    } catch (err: any) {
      setStatus(AppStatus.ERROR);
      setErrorMsg(err.message || "An unexpected error occurred during audio processing.");
      setActiveTab('input');
      showToast("Audio analysis failed", "error");
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setResult(item);
    setActiveTab('dashboard');
    window.scrollTo(0, 0);
  };

  // If in Landing View, render Landing Page
  if (view === 'landing') {
    return (
      <Layout 
        isLanding={true} 
        onLaunchApp={startApp} 
        onGoHome={goHome}
        onScrollToSection={handleScrollToSection}
        onShowToast={showToast}
      >
        <LandingPage 
          onStartTrial={startApp} 
          onScrollToSection={handleScrollToSection}
          onShowToast={showToast}
        />
        <Toast toasts={toasts} onDismiss={dismissToast} />
      </Layout>
    );
  }

  // Application View
  return (
    <Layout 
      isLanding={false} 
      activeTab={activeTab}
      onNavigate={handleNavigate}
      onGoHome={goHome}
    >
      {/* Toast Overlay */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Sub-Navigation for Analysis Flow (Only show when in Analysis mode) */}
      {(activeTab === 'input' || activeTab === 'progress' || activeTab === 'dashboard') && (
        <div className="flex justify-center mb-8 animate-fade-in-down">
          <div className="bg-slate-100/50 p-1.5 rounded-xl border border-slate-200 inline-flex shadow-inner">
            <button
              onClick={() => status === AppStatus.IDLE && setActiveTab('input')}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'input' 
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Input
            </button>
            <button
              onClick={() => (status === AppStatus.PROCESSING || status === AppStatus.COMPLETED) && setActiveTab('progress')}
              disabled={status === AppStatus.IDLE}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'progress' 
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              Progress
            </button>
            <button
              onClick={() => status === AppStatus.COMPLETED && setActiveTab('dashboard')}
              disabled={status !== AppStatus.COMPLETED}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              Intelligence
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center font-medium shadow-sm animate-shake">
          Error: {errorMsg}
        </div>
      )}

      {/* Views */}
      <div className="transition-all duration-300 min-h-[60vh]">
        {activeTab === 'input' && (
          <InputSection 
            onAnalyzeText={handleAnalyzeText} 
            onAnalyzeAudio={handleAnalyzeAudio}
            isProcessing={status === AppStatus.PROCESSING} 
          />
        )}

        {activeTab === 'progress' && (
          <ProgressTracker currentStep={currentStep} />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard data={result} onShowToast={showToast} />
        )}

        {activeTab === 'history' && (
          <HistoryView 
            history={history} 
            onSelect={handleHistorySelect}
            onClear={handleClearHistory}
            onDelete={handleDeleteItem}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView 
            settings={settings}
            onSave={(newSettings) => {
              setSettings(newSettings);
              showToast("Settings saved", "success");
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default App;
