import { useState } from 'react';
import { User, Mail, CreditCard, Zap, Check, Shield, Bell } from 'lucide-react';
import DashboardHeader from '../components/layout/DashboardHeader';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { user } = useAuth();
  const [currentPlan, setCurrentPlan] = useState(user?.tier || 'free');

  const plans = [
    {
      id: 'free',
      name: 'Basic',
      price: '$0',
      features: ['3 Resumes / month', 'Basic AI optimization', 'Standard templates'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$19',
      period: '/mo',
      features: ['Unlimited Resumes', 'Advanced AI rewrite', 'Cover letter generator', 'Priority support'],
    },
    {
      id: 'business',
      name: 'Business',
      price: '$49',
      period: '/mo',
      features: ['Everything in Pro', 'Custom branding', 'Team collaboration', 'API Access'],
    },
  ];

  const usage = {
    resumesCreated: 2,
    resumesLimit: currentPlan === 'free' ? 3 : Infinity,
    coverLettersCreated: 5,
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Account Settings</h1>
          <p className="text-text-secondary">Manage your profile, subscription, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-primary-600" />
                Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    disabled
                    className="w-full rounded-lg border border-border bg-surface-alt px-3 py-2.5 text-sm text-text-muted cursor-not-allowed"
                  />
                </div>
              </div>
              <Button>Update Profile</Button>
            </Card>

            {/* Usage stats */}
            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary-600" />
                Usage This Month
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-text-secondary">Resumes Created</span>
                    <span className="text-text-primary font-medium">
                      {usage.resumesCreated} / {usage.resumesLimit === Infinity ? '∞' : usage.resumesLimit}
                    </span>
                  </div>
                  <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all"
                      style={{ width: `${Math.min((usage.resumesCreated / (usage.resumesLimit || 1)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-text-secondary">Cover Letters</span>
                    <span className="text-text-primary font-medium">{usage.coverLettersCreated}</span>
                  </div>
                  <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-500 rounded-full transition-all"
                      style={{ width: `${Math.min(usage.coverLettersCreated * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right - Subscription */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary-600" />
                Current Plan
              </h3>
              <div className="text-center py-4 mb-4">
                <div className="text-3xl font-bold text-text-primary mb-1">
                  {plans.find(p => p.id === currentPlan)?.price || '$0'}
                </div>
                <p className="text-sm text-text-secondary capitalize">{currentPlan} Plan</p>
              </div>
              <ul className="space-y-2 mb-6">
                {(plans.find(p => p.id === currentPlan)?.features || []).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant="secondary" className="w-full" size="sm">
                Upgrade Plan
              </Button>
            </Card>

            {/* Other plans for upgrade */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Available Plans</p>
              {plans.filter(p => p.id !== currentPlan).map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setCurrentPlan(plan.id)}
                  className="w-full text-left rounded-lg border border-border p-4 hover:border-primary-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-text-primary">{plan.name}</span>
                    <span className="text-sm font-bold text-text-primary">
                      {plan.price}{plan.period && <span className="text-xs text-text-muted">{plan.period}</span>}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">{plan.features.slice(0, 3).join(', ')}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
