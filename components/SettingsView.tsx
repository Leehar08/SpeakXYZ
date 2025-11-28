
import React, { useState } from 'react';
import { AppSettings } from '../types';
import { Moon, Sun, Bell, Save, Key, Shield } from 'lucide-react';

interface SettingsViewProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);

  const handleChange = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    // Auto save for better UX
    onSave(newSettings);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500">Manage your preferences and API keys.</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-indigo-500" /> Appearance
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {['light', 'dark', 'system'].map((theme) => (
              <button
                key={theme}
                onClick={() => handleChange('theme', theme)}
                className={`
                  px-4 py-3 rounded-xl border text-sm font-medium transition-all capitalize
                  ${localSettings.theme === theme 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                  }
                `}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications & Auto-Save */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-500" /> Preferences
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-slate-400" />
                <div>
                  <div className="font-medium text-slate-900">Enable Notifications</div>
                  <div className="text-xs text-slate-500">Get alerts when analysis completes</div>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={localSettings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" 
              />
            </label>
            
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <Save className="w-5 h-5 text-slate-400" />
                <div>
                  <div className="font-medium text-slate-900">Auto-Save History</div>
                  <div className="text-xs text-slate-500">Automatically save insights to local database (IndexedDB)</div>
                </div>
              </div>
              <input 
                type="checkbox" 
                checked={localSettings.autoSave}
                onChange={(e) => handleChange('autoSave', e.target.checked)}
                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" 
              />
            </label>
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-500" /> API Configuration
          </h3>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">Custom Gemini API Key (Optional)</label>
            <div className="relative">
              <input 
                type="password" 
                value={localSettings.apiKey || ''}
                onChange={(e) => handleChange('apiKey', e.target.value)}
                placeholder="Ex: AIzaSy..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
              />
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500">
              Leave empty to use the system default key. Your key is stored locally in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
