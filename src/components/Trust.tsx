import React from 'react'
import { Building2, Briefcase, Landmark, ShieldCheck, Search, ShieldAlert } from 'lucide-react'

export const Trust: React.FC = () => {
  const teams = [
    {
      title: 'Law Firms',
      icon: Building2,
      desc: 'Supercharge litigation drafting and case strategy with instant access to precedents and interactive argument mapping.',
      uses: ['Precedent research', 'Causelist sync', 'AI drafts']
    },
    {
      title: 'In-House Legal Teams',
      icon: Briefcase,
      desc: 'Accelerate commercial contract reviews, compliance tracking, and litigation matter monitoring internally.',
      uses: ['Contract compliance', 'Matter analytics', 'Document search']
    },
    {
      title: 'Banks & Financial Institutions',
      icon: Landmark,
      desc: 'Audit title clearance reports, verify security documents, and keep pace with daily RBI regulation updates.',
      uses: ['RBI circular tracking', 'Title search', 'Security auditing']
    },
    {
      title: 'Insurance Companies',
      icon: ShieldCheck,
      desc: 'Streamline claims litigation research, motor accident claims tribunal (MACT) precedents, and consumer dispute strategy.',
      uses: ['Consumer court tracking', 'MACT search', 'Claims audit']
    },
    {
      title: 'Legal Researchers',
      icon: Search,
      desc: 'Dig deep into judicial historical doctrines, track legislative alterations, and compile detailed research briefs.',
      uses: ['Doctrine indexing', 'Article referencing', 'Judgment briefs']
    },
    {
      title: 'Compliance Teams',
      icon: ShieldAlert,
      desc: 'Keep audits clean and monitor evolving statutory regulations from SEBI, MCA, and state regulatory tribunals.',
      uses: ['MCA updates', 'Audit compliance logs', 'Compliance alerts']
    }
  ]

  return (
    <section id="trust-section" className="py-20 bg-white px-6 font-sans border-t border-[#0B132B]/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Enterprise Trust</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
            Built for Modern Indian Legal Teams
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] max-w-xl mx-auto">
            From independent practitioners to top tier-1 law firms and nationalized banking cells, IndyLaw powers precise legal workflows.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => {
            const Icon = team.icon
            return (
              <div
                key={team.title}
                id={`trust-card-${team.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="p-6 bg-[#FAF9F6] border border-[#0B132B]/5 hover:border-[#D4AF37] rounded-3xl transition-all duration-300 group hover:shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#0B132B]/5 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B132B] group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-[#0B132B] font-serif">{team.title}</h4>
                  <p className="text-xs text-[#4B5563] leading-relaxed">{team.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#0B132B]/5 flex flex-wrap gap-1.5">
                  {team.uses.map((use) => (
                    <span
                      key={use}
                      className="text-[9px] font-bold text-[#0B132B] bg-[#0B132B]/5 px-2.5 py-0.5 rounded-full"
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
