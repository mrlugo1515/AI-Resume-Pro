import { useState } from 'react';
import { Copy, Download, Check, FileText } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

export default function CoverLetterTab({
  coverLetter,
  setCoverLetter,
  companyName,
  setCompanyName,
  onGenerate,
  generating,
  hasResume,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = coverLetter;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${companyName || 'company'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">Cover Letter</h3>
        <p className="text-sm text-text-secondary mt-1">
          Generate a tailored cover letter based on your resume and the job description.
        </p>
      </div>

      {/* Company name input */}
      <Input
        label="Company Name"
        placeholder="e.g. Acme Corp"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

      {/* Generate button */}
      <Button
        onClick={onGenerate}
        loading={generating}
        disabled={!hasResume || !companyName}
        size="lg"
      >
        <FileText className="w-4 h-4" />
        {generating ? 'Generating...' : 'Generate Cover Letter'}
      </Button>

      {/* Cover letter result */}
      {coverLetter && (
        <div className="space-y-4 animate-fade-in-up">
          <Card padding={false} className="border-accent-200 ring-1 ring-accent-100">
            <div className="px-4 py-3 bg-gradient-to-r from-accent-50 to-blue-50 border-b border-accent-200 rounded-t-xl flex items-center justify-between">
              <p className="text-xs font-semibold text-accent-700 uppercase tracking-wider">
                Cover Letter — {companyName}
              </p>
            </div>
            <div className="p-6 max-h-[500px] overflow-y-auto">
              <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">
                {coverLetter}
              </pre>
            </div>
          </Card>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleCopy} variant="secondary">
              {copied ? (
                <><Check className="w-4 h-4 text-green-600" /> Copied</>
              ) : (
                <><Copy className="w-4 h-4" /> Copy to Clipboard</>
              )}
            </Button>
            <Button onClick={handleDownload} variant="secondary">
              <Download className="w-4 h-4" />
              Download .txt
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}