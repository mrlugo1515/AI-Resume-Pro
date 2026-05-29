import { Briefcase } from 'lucide-react';

export default function JobDescriptionInput({ jobDescription, setJobDescription }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">Job Description</h3>
        <p className="text-sm text-text-secondary mt-1">
          Paste the full job description to tailor your resume for the role.
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-4 left-4 text-text-muted">
          <Briefcase className="w-5 h-5" />
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here... Include responsibilities, requirements, and any specific keywords you notice."
          className="w-full rounded-lg border border-border bg-white pl-12 pr-4 py-4 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-y min-h-[250px] hover:border-primary-300 transition-colors"
        />
      </div>
      {jobDescription && (
        <p className="text-xs text-text-muted text-right">{jobDescription.length} characters</p>
      )}
    </div>
  );
}