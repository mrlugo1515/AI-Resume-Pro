import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Plus, MoreVertical, Clock, Download, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import DashboardHeader from '../components/layout/DashboardHeader';

const savedResumes = [
  {
    id: 1,
    title: 'Software Engineer - Google',
    tier: 'Full Rewrite',
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Product Manager - Stripe',
    tier: 'Keyword',
    date: '2024-01-14',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Data Scientist - Airbnb',
    tier: 'Basic',
    date: '2024-01-12',
    status: 'completed',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(null);

  const stats = [
    { label: 'Resumes Created', value: '12', icon: FileText, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Interviews This Month', value: '5', icon: Clock, color: 'text-accent-600', bg: 'bg-accent-50' },
    { label: 'Downloaded', value: '28', icon: Download, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Welcome back!</h1>
          <p className="text-text-secondary mt-1">Here&apos;s an overview of your resume activity.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-secondary">{stat.label}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Action card */}
        <Card className="bg-gradient-card text-white mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Create New Optimized Resume</h3>
              <p className="text-white/80 text-sm">Tailor your resume to a specific job description in minutes.</p>
            </div>
            <Link to="/dashboard/new">
              <Button variant="accent" size="lg">
                <Plus className="w-4 h-4" />
                New Resume
              </Button>
            </Link>
          </div>
        </Card>

        {/* Saved resumes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Recent Resumes</h2>
            <span className="text-xs text-text-muted">{savedResumes.length} total</span>
          </div>

          {savedResumes.length === 0 ? (
            <Card className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-alt flex items-center justify-center">
                <FileText className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No resumes yet</h3>
              <p className="text-sm text-text-secondary mb-6">Create your first optimized resume to get started.</p>
              <Link to="/dashboard/new">
                <Button>
                  <Plus className="w-4 h-4" />
                  Create Resume
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-3">
              {savedResumes.map((resume) => (
                <Card key={resume.id} hover className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{resume.title}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-text-muted">{resume.date}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 font-medium">
                            {resume.tier}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => setMenuOpen(menuOpen === resume.id ? null : resume.id)}
                        className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-alt"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuOpen === resume.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-border py-1 z-10">
                          <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:bg-surface-alt w-full">
                            <Download className="w-3.5 h-3.5" /> Download
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}