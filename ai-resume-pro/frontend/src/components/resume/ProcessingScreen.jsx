import { Sparkles, Search, RefreshCw, FileText, Check } from 'lucide-react';

const steps = [
  { id: 'analyzing', label: 'Analyzing your resume', icon: FileText },
  { id: 'parsing', label: 'Parsing job description', icon: Search },
  { id: 'optimizing', label: 'Optimizing content', icon: Sparkles },
  { id: 'finalizing', label: 'Finalizing document', icon: RefreshCw },
];

const tierLabels = {
  basic: 'Basic Optimization',
  keyword: 'Keyword Optimization',
  rewrite: 'Full Rewrite',
};

export default function ProcessingScreen({ tier, currentStep = 'analyzing' }) {
  const stepIndex = steps.findIndex((s) => s.id === currentStep);
  const activeStep = Math.max(0, stepIndex);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Animated icon */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-card flex items-center justify-center shadow-lg">
          <RefreshCw className="w-10 h-10 text-white animate-spin" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-text-primary mb-2">
        {tierLabels[tier] || 'Optimizing Your Resume'}
      </h3>
      <p className="text-sm text-text-secondary mb-10 text-center max-w-md">
        Our AI is carefully analyzing your resume against the job description to create the perfect match.
      </p>

      {/* Progress steps */}
      <div className="w-full max-w-md space-y-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isCompleted = i < activeStep;
          const isCurrent = i === activeStep;
          const isPending = i > activeStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                isCurrent
                  ? 'bg-primary-50 border border-primary-200'
                  : isCompleted
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-white border border-border'
              }`}
            >
              {/* Status icon */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                isCompleted
                  ? 'bg-green-500'
                  : isCurrent
                  ? 'bg-primary-600'
                  : 'bg-surface-alt'
              }`}>
                {isCompleted ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-text-muted'}`} />
                )}
              </div>

              {/* Label */}
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  isCompleted
                    ? 'text-green-700'
                    : isCurrent
                    ? 'text-primary-700'
                    : 'text-text-muted'
                }`}>
                  {step.label}
                </p>
              </div>

              {/* Status indicator */}
              {isCurrent && (
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse-dot" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse-dot" style={{ animationDelay: '0.3s' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse-dot" style={{ animationDelay: '0.6s' }} />
                </div>
              )}
              {isCompleted && (
                <span className="text-xs text-green-600 font-medium">Done</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Shimmer loading bar */}
      <div className="w-full max-w-md mt-8">
        <div className="h-1.5 bg-surface-alt rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500 rounded-full animate-shimmer"
            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-text-muted text-center mt-2">
          Please wait while we process your document...
        </p>
      </div>
    </div>
  );
}