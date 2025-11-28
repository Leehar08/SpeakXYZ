
import React, { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { ProcessingStep } from '../types';

interface ProgressTrackerProps {
  currentStep: ProcessingStep;
}

const steps: { id: ProcessingStep; label: string; description: string }[] = [
  { id: 'compressing', label: 'Optimizing', description: 'Compressing audio...' },
  { id: 'uploading', label: 'Uploading', description: 'Secure transfer...' },
  { id: 'cleaning', label: 'Transcribing', description: 'Speech-to-text...' },
  { id: 'diarization', label: 'Diarization', description: 'Identifying speakers...' },
  { id: 'analyzing', label: 'Intelligence', description: 'Extracting insights...' },
  { id: 'generating_dashboard', label: 'Finalizing', description: 'Building dashboard...' },
];

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep }) => {
  const [completedSteps, setCompletedSteps] = useState<ProcessingStep[]>([]);

  useEffect(() => {
    // Determine which steps are complete based on the current step index
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    const completed = steps.filter((_, index) => index < currentIndex).map(s => s.id);
    setCompletedSteps(completed);
  }, [currentStep]);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-10 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] border border-slate-200 animate-fade-in">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900">Processing Meeting</h2>
        <p className="text-slate-500 mt-2">The engine is currently analyzing your audio stream.</p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-100" />
        
        <div className="space-y-8 relative z-10">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = step.id === currentStep;
            const isPending = !isCompleted && !isCurrent;

            return (
              <div key={step.id} className="flex items-start gap-6 transition-all duration-500">
                {/* Icon */}
                <div className={`
                  w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 shadow-sm
                  ${isCompleted ? 'bg-indigo-600 text-white shadow-indigo-200' : ''}
                  ${isCurrent ? 'bg-white text-indigo-600 ring-2 ring-indigo-600 ring-offset-2' : ''}
                  ${isPending ? 'bg-slate-50 text-slate-300 border border-slate-100' : ''}
                `}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : isCurrent ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>

                {/* Text */}
                <div className={`pt-1 flex-1 ${isCurrent ? 'opacity-100' : isPending ? 'opacity-40' : 'opacity-80'}`}>
                  <h3 className={`font-bold text-lg ${isCurrent ? 'text-indigo-600' : 'text-slate-900'}`}>
                    {step.label}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {step.description}
                  </p>
                  
                  {isCurrent && (
                    <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 animate-progress-indeterminate origin-left" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
