import { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import Button from '../ui/Button';

export default function ResumeUpload({ resumeText, setResumeText, setResumeFile }) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    setResumeFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setResumeText(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'text/plain' || file.name.endsWith('.txt'))) {
      handleFile(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const clearResume = () => {
    setResumeText('');
    setFileName('');
    setResumeFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">Upload Your Resume</h3>
        <p className="text-sm text-text-secondary mt-1">
          Upload a .txt, .pdf, or .docx file, or paste your resume text directly.
        </p>
      </div>

      {/* File upload area */}
      {!resumeText && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-150 ${
            dragOver
              ? 'border-primary-400 bg-primary-50'
              : 'border-border hover:border-primary-300 hover:bg-surface-alt'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.pdf,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                Drop your resume here, or <span className="text-primary-600">browse</span>
              </p>
              <p className="text-xs text-text-muted mt-1">
                Supports .txt, .pdf, and .docx files
              </p>
            </div>
          </div>
        </div>
      )}

      {/* File selected indicator */}
      {fileName && (
        <div className="flex items-center justify-between bg-primary-50 rounded-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{fileName}</p>
              <p className="text-xs text-text-muted">Uploaded successfully</p>
            </div>
          </div>
          <button onClick={clearResume} className="p-1 text-text-muted hover:text-red-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Or divider */}
      {!resumeText && (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-text-muted font-medium">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>
      )}

      {/* Paste text area */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          {resumeText ? 'Resume Text' : 'Paste your resume text'}
        </label>
        <textarea
          value={resumeText}
          onChange={(e) => {
            setResumeText(e.target.value);
            if (e.target.value) setFileName('');
          }}
          placeholder="Paste your resume content here..."
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-y min-h-[200px] hover:border-primary-300 transition-colors"
        />
        {resumeText && (
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-text-muted">{resumeText.length} characters</p>
            <button
              onClick={clearResume}
              className="text-xs text-red-500 hover:text-red-600 font-medium"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}