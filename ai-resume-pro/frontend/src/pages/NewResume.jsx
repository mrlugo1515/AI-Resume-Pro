import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import ResumeUpload from '../components/resume/ResumeUpload';
import JobDescriptionInput from '../components/resume/JobDescriptionInput';
import TierSelector from '../components/resume/TierSelector';
import ProcessingScreen from '../components/resume/ProcessingScreen';
import ResultsView from '../components/resume/ResultsView';
import CoverLetterTab from '../components/resume/CoverLetterTab';
import DashboardHeader from '../components/layout/DashboardHeader';
import { optimizeResume, generateCoverLetter } from '../api';

const STEPS = [
  { id: 1, label: 'Resume' },
  { id: 2, label: 'Job Description' },
  { id: 3, label: 'Tier' },
  { id: 4, label: 'Results' },
];

export default function NewResume() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [selectedTier, setSelectedTier] = useState('keyword');
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState('analyzing');
  const [optimizedResume, setOptimizedResume] = useState('');
  const [error, setError] = useState('');
  const [showCoverLetter, setShowCoverLetter] = useState(false);

  // Cover letter state
  const [coverLetter, setCoverLetter] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [generatingCL, setGeneratingCL] = useState(false);

  const canProceed = () => {
    if (step === 1) return resumeText.trim().length > 0;
    if (step === 2) return jobDescription.trim().length > 0;
    if (step === 3) return !!selectedTier;
    return true;
  };

  const handleNext = () => {
    if (step === 3) {
      handleOptimize();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleOptimize = async () => {
    setLoading(true);
    setError('');
    setProcessingStep('analyzing');

    // Simulate progress steps
    const progressInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev === 'analyzing') return 'parsing';
        if (prev === 'parsing') return 'optimizing';
        if (prev === 'optimizing') return 'finalizing';
        return prev;
      });
    }, 2500);

    try {
      const data = await optimizeResume(resumeText, jobDescription, selectedTier);
      clearInterval(progressInterval);
      setOptimizedResume(data.optimizedResume);
      setStep(4);
    } catch (err) {
      clearInterval(progressInterval);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!resumeText || !companyName) return;
    setGeneratingCL(true);
    try {
      const data = await generateCoverLetter(resumeText, jobDescription, companyName);
      setCoverLetter(data.coverLetter);
    } catch (err) {
      setError(err.message || 'Failed to generate cover letter');
    } finally {
      setGeneratingCL(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => step > 1 ? setStep((s) => s - 1) : navigate('/dashboard')}
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {step > 1 ? 'Back' : 'Back to Dashboard'}
        </button>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      s.id < step
                        ? 'bg-primary-600 text-white'
                        : s.id === step
                        ? 'bg-primary-600 text-white ring-4 ring-primary-100'
                        : 'bg-surface-alt text-text-muted'
                    }`}
                  >
                    {s.id < step ? <Check className="w-4 h-4" /> : s.id}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:inline ${
                      s.id === step ? 'text-text-primary' : s.id < step ? 'text-primary-600' : 'text-text-muted'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 ${
                      s.id < step ? 'bg-primary-600' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
            <button onClick={() => setError('')} className="ml-2 text-red-500 hover:text-red-700">Dismiss</button>
          </div>
        )}

        {/* Step content */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-6 sm:p-8">
          {step === 1 && (
            <ResumeUpload
              resumeText={resumeText}
              setResumeText={setResumeText}
              setResumeFile={setResumeFile}
            />
          )}

          {step === 2 && (
            <JobDescriptionInput
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
            />
          )}

          {step === 3 && (
            <TierSelector
              selectedTier={selectedTier}
              setSelectedTier={setSelectedTier}
            />
          )}

          {step === 4 && optimizedResume && (
            <ResultsView
              optimizedResume={optimizedResume}
              originalResume={resumeText}
            />
          )}

          {step === 4 && !optimizedResume && loading && (
            <ProcessingScreen tier={selectedTier} currentStep={processingStep} />
          )}
        </div>

        {/* Step 4 actions - Cover letter toggle and actions */}
        {step === 4 && optimizedResume && (
          <div className="mt-6 space-y-4">
            {/* Toggle cover letter section */}
            <button
              onClick={() => setShowCoverLetter(!showCoverLetter)}
              className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Check className={`w-4 h-4 ${showCoverLetter ? 'rotate-0' : '-rotate-90'} transition-transform`} />
              {showCoverLetter ? 'Hide Cover Letter' : 'Generate a Cover Letter'}
            </button>

            {showCoverLetter && (
              <div className="animate-fade-in-up">
                <CoverLetterTab
                  coverLetter={coverLetter}
                  setCoverLetter={setCoverLetter}
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                  onGenerate={handleGenerateCoverLetter}
                  generating={generatingCL}
                  hasResume={!!resumeText}
                />
              </div>
            )}

            {/* New resume button */}
            <div className="pt-4 border-t border-border">
              <Button onClick={() => {
                setStep(1);
                setResumeText('');
                setResumeFile(null);
                setJobDescription('');
                setOptimizedResume('');
                setCoverLetter('');
                setCompanyName('');
              }} variant="secondary">
                Create Another Resume
              </Button>
            </div>
          </div>
        )}

        {/* Navigation buttons for steps 1-3 */}
        {step < 4 && (
          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!canProceed() || loading}
              loading={loading}
              size="lg"
            >
              {step === 3 ? (
                loading ? 'Optimizing...' : 'Optimize Resume'
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}