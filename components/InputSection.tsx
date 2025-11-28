
import React, { useState, useRef } from 'react';
import { FileText, Play, Upload, Wand2, BarChart3, Bot, Music, Mic, FileAudio, ArrowRight } from 'lucide-react';
import { SAMPLE_TRANSCRIPT } from '../constants';

interface InputSectionProps {
  onAnalyzeText: (text: string) => void;
  onAnalyzeAudio: (file: File) => void;
  isProcessing: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyzeText, onAnalyzeAudio, isProcessing }) => {
  const [mode, setMode] = useState<'audio' | 'text'>('audio');
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSample = () => {
    if (mode === 'text') {
      setText(SAMPLE_TRANSCRIPT.trim());
    }
  };

  const handleSubmit = () => {
    if (mode === 'audio' && selectedFile) {
      onAnalyzeAudio(selectedFile);
    } else if (mode === 'text' && text.trim()) {
      onAnalyzeText(text);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden">
        
        {/* Header with Mode Toggle */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">New Session</h2>
            <p className="text-sm text-slate-500 font-medium">Select your input source to begin analysis</p>
          </div>
          
          <div className="flex bg-slate-200/60 p-1.5 rounded-xl shadow-inner">
            <button
              onClick={() => setMode('audio')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                mode === 'audio' 
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Music className="w-4 h-4" /> Audio File
            </button>
            <button
              onClick={() => setMode('text')}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                mode === 'text' 
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <FileText className="w-4 h-4" /> Transcript
            </button>
          </div>
        </div>

        <div className="p-8">
          {mode === 'audio' ? (
            <div className="group h-72 border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-2xl bg-slate-50 hover:bg-indigo-50/30 flex flex-col items-center justify-center p-6 text-center transition-all duration-300">
              {selectedFile ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
                    <FileAudio className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-slate-900">{selectedFile.name}</p>
                    <p className="text-sm text-slate-500 font-medium">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                  <button 
                    onClick={() => setSelectedFile(null)}
                    className="text-sm text-red-500 hover:text-red-600 font-medium hover:underline"
                    disabled={isProcessing}
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pointer-events-none">
                   <div className="w-20 h-20 bg-white border border-slate-200 text-slate-400 group-hover:text-indigo-500 group-hover:border-indigo-200 rounded-2xl flex items-center justify-center mx-auto shadow-sm transition-colors">
                    <Upload className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-slate-900">Drag & Drop or Click to Upload</p>
                    <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">Supports MP3, WAV, M4A. Audio files larger than 20MB are automatically optimized.</p>
                  </div>
                  <div className="pointer-events-auto">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      accept="audio/*" 
                      className="hidden" 
                      onChange={handleAudioFileUpload} 
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 px-6 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 shadow-sm transition-all"
                    >
                      Browse Files
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <textarea
                className="w-full h-72 p-6 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none font-mono text-sm text-slate-700 placeholder-slate-400 leading-relaxed shadow-inner"
                placeholder="Paste your meeting transcript here...&#10;&#10;[00:00:00] Speaker 1: Hello everyone..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isProcessing}
              ></textarea>
               <button 
                onClick={handleSample}
                className="absolute top-4 right-4 text-indigo-600 text-xs font-semibold hover:text-indigo-700 flex items-center gap-1 bg-white border border-indigo-100 px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition-all"
              >
                <Wand2 className="w-3 h-3" /> Use Sample Data
              </button>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              {mode === 'text' && (
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Upload .txt</span>
                  <input type="file" accept=".txt" className="hidden" onChange={handleTextFileUpload} />
                </label>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={(mode === 'text' && !text.trim()) || (mode === 'audio' && !selectedFile) || isProcessing}
              className={`
                inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all text-sm tracking-wide
                ${((mode === 'text' && !text.trim()) || (mode === 'audio' && !selectedFile) || isProcessing)
                  ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98]'
                }
              `}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  INITIALIZING ENGINE...
                </>
              ) : (
                <>
                  RUN ANALYSIS <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Speaker ID</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Advanced diarization identifies distinct voices automatically.</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Deep Analytics</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Talk time distribution, sentiment trends, and topic heatmaps.</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Smart Summary</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Auto-extraction of decisions, risks, and action items.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
