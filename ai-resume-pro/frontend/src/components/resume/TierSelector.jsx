import { Sparkles, Search, RefreshCw, Check } from 'lucide-react';

const tiers = [
  {
    id: 'basic',
    name: 'Basic',
    price: 'Free',
    icon: Sparkles,
    description: 'Grammar fixes & formatting',
    features: [
      'Grammar and spelling corrections',
      'Consistent formatting',
      'Professional styling',
      'Preserves your content',
    ],
    color: 'from-blue-400 to-blue-500',
  },
  {
    id: 'keyword',
    name: 'Keyword',
    price: '$15',
    period: '/mo',
    icon: Search,
    description: 'ATS keyword optimization',
    popular: true,
    features: [
      'All Basic features',
      'ATS keyword analysis',
      'Smart keyword integration',
      'Job description matching',
      'Higher ranking in filters',
    ],
    color: 'from-primary-500 to-primary-700',
  },
  {
    id: 'rewrite',
    name: 'Full Rewrite',
    price: '$35',
    period: '/mo',
    icon: RefreshCw,
    description: 'Complete transformation',
    features: [
      'All Keyword features',
      'Complete content rewrite',
      'Achievement-focused bullets',
      'Company culture alignment',
      'Priority processing',
      'Cover letter included',
    ],
    color: 'from-accent-500 to-accent-600',
  },
];

export default function TierSelector({ selectedTier, setSelectedTier }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary">Choose Your Optimization Tier</h3>
        <p className="text-sm text-text-secondary mt-1">
          Select how much AI optimization you need for your resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          const isSelected = selectedTier === tier.id;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative text-left rounded-xl border-2 p-5 transition-all duration-200 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-border bg-white hover:border-primary-200 hover:shadow-sm'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-gradient-card text-white text-xs font-semibold px-3 py-0.5 rounded-full">
                  Most Popular
                </span>
              )}
              {isSelected && (
                <span className="absolute top-3 right-3 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </span>
              )}

              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-xl font-bold text-text-primary">{tier.price}</span>
                {tier.period && (
                  <span className="text-sm text-text-muted">{tier.period}</span>
                )}
              </div>

              <h4 className="text-base font-semibold text-text-primary mb-1">{tier.name}</h4>
              <p className="text-xs text-text-secondary mb-3">{tier.description}</p>

              <ul className="space-y-1.5">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                    <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                      isSelected ? 'text-primary-600' : 'text-text-muted'
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
}