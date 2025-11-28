
export interface ActionItem {
  task: string;
  assigned_to: string;
  deadline_if_any: string | null;
}

export interface Summary {
  purpose: string;
  key_points: string[];
  decisions: string[];
  action_items: ActionItem[];
  risks: string[];
  next_steps: string[];
}

export interface Dashboard {
  participants: number;
  talk_time_distribution: Record<string, string | number>;
  sentiment_overview: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topics_discussed: string[];
  decision_points: string[];
  action_items: ActionItem[];
  keywords: string[];
  meeting_summary_score: number;
}

export interface AnalysisResult {
  id?: string; // Added ID for history tracking
  timestamp?: number; // Added timestamp
  clean_transcript: string;
  speakers: Record<string, string>;
  summary: Summary;
  dashboard: Dashboard;
}

export interface HistoryItem extends AnalysisResult {
  fileName?: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export type ProcessingStep = 
  | 'compressing'
  | 'uploading' 
  | 'cleaning' 
  | 'diarization' 
  | 'analyzing' 
  | 'generating_dashboard';

export type AppTab = 'input' | 'progress' | 'dashboard' | 'history' | 'settings';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  autoSave: boolean;
  apiKey?: string;
}
