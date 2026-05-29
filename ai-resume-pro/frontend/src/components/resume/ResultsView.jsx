import { useState } from 'react';
import { Copy, Download, Check, FileText, Eye, Code } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function ResultsView({ optimizedResume, originalResume }) {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('side-by-side');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimizedResume);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = optimizedResume;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (format) => {
    const blob = new Blob([optimizedResume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized-resume.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Your Optimized Resume</h3>
          <p className="text-sm text-text-secondary mt-1">
            Compare the original and optimized versions side by side.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'side-by-side'
                ? 'bg-primary-50 text-primary-700'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Eye className="w-3.5 h-3.5 inline mr-1" />
            Side by Side
          </button>
          <button
            onClick={() => setViewMode('optimized')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              viewMode === 'optimized'
                ? 'bg-primary-50 text-primary-700'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Code className="w-3.5 h-3.5 inline mr-1" />
            Optimized Only
          </button>
        </div>
      </div>

      {/* Side by side view */}
      {viewMode === 'side-by-side' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card padding={false}>
            <div className="px-4 py-3 bg-surface-alt border-b border-border rounded-t-xl">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Original Resume</p>
            </div>
            <div className="p-4 max-h-[500px] overflow-y-auto">
              <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
                {originalResume}
              </pre>
            </div>
          </Card>

          <Card padding={false} className="border-primary-200 ring-1 ring-primary-100">
            <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-accent-50 border-b border-primary-200 rounded-t-xl flex items-center justify-between">
              <p className="text-xs font-semibold text-primary-700 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Optimized Resume
              </p>
              <span className="text-[10px] bg-primary-200 text-primary-800 px-2 py-0.5 rounded-full font-medium">AI Powered</span>
            </div>
            <div className="p-4 max-h-[500px] overflow-y-auto">
              <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
                {optimizedResume}
              </pre>
            </div>
          </Card>
        </div>
      )}

      {/* Optimized only view */}
      {viewMode === 'optimized' && (
        <Card padding={false} className="border-primary-200 ring-1 ring-primary-100">
          <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-accent-50 border-b border-primary-200 rounded-t-xl flex items-center justify-between">
            <p className="text-xs font-semibold text-primary-700 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Optimized Resume
            </p>
          </div>
          <div className="p-6 max-h-[600px] overflow-y-auto">
            <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
              {optimizedResume}
            </pre>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleCopy} variant="secondary" size="md">
          {copied ? (
            <><Check className="w-4 h-4 text-green-600" /> Copied</>
          ) : (
            <><Copy className="w-4 h-4" /> Copy to Clipboard</>
          )}
        </Button>
        <Button onClick={() => handleDownload('txt')} variant="secondary" size="md">
          <Download className="w-4 h-4" />
          Download .txt
        </Button>
        <Button onClick={() => handleDownload('txt')} size="md">
          <FileText className="w-4 h-4" />
          Export Resume
        </Button>
      </div>
    </div>
  );
}

function Sparkles({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
      <path d="M19 14l-.8 2.8L21 18l-2.8.8L18 22l-1.2-3.2L14 18l2.8-.8L17 14z" />
    </svg>
  );
}