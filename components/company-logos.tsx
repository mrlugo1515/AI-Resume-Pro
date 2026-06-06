'use client'

export function CompanyLogos() {
  const companies = [
    { name: 'Google', logo: 'G' },
    { name: 'Meta', logo: 'M' },
    { name: 'Amazon', logo: 'A' },
    { name: 'Microsoft', logo: 'MS' },
    { name: 'Apple', logo: 'A' },
    { name: 'Netflix', logo: 'N' },
  ]

  return (
    <div className="py-12 border-y border-zinc-800">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center text-sm text-zinc-500 mb-8">
          Trusted by professionals from leading companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {companies.map((company) => (
            <div 
              key={company.name}
              className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold">
                {company.logo}
              </div>
              <span className="text-sm font-medium">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
