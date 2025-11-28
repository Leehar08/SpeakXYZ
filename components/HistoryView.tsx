
import React from 'react';
import { HistoryItem } from '../types';
import { Clock, Calendar, ArrowRight, FileText, Trash2, Search, Database } from 'lucide-react';

interface HistoryViewProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  onDelete?: (id: string) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onSelect, onClear, onDelete }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analysis History</h2>
          <p className="text-slate-500">Access your past meeting insights stored in the local database.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 border-dashed shadow-sm">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
            <Database className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">No Saved Meetings</h3>
          <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
            Your analyzed meetings will appear here automatically. Enable "Auto-Save" in settings to persist them to the database.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search past meetings..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>

          {history.map((item) => (
            <div 
              key={item.id}
              className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex items-center gap-6 relative"
            >
              <div 
                onClick={() => onSelect(item)}
                className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors cursor-pointer"
              >
                <FileText className="w-6 h-6" />
              </div>
              
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelect(item)}>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-slate-900 truncate">
                    {item.summary.purpose || "Untitled Meeting"}
                  </h3>
                  {item.fileName && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium truncate max-w-[150px]">
                      {item.fileName}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Unknown Date'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Unknown Time'}
                  </span>
                  <span className="text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded text-xs">
                    {item.dashboard.participants} Speakers
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onSelect(item)}
                  className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"
                  title="View Analysis"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                {onDelete && item.id && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(item.id!); }}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete from Database"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
