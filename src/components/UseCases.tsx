import React from 'react'
import { Landmark, Scale, ShieldAlert, Cpu, Heart, CheckCircle2 } from 'lucide-react'

export const UseCases: React.FC = () => {
  const cases = [
    {
      title: 'Litigation Teams',
      icon: Scale,
      pain: ['Fragmented case law database retrieval', 'Slipped deadlines due to manual cnr lists audits', 'Inconsistent argument structure in petitions'],
      flow: 'Research AI queries → Canvas reasoning layout → AI Drafting templates → Project tracking',
      outcome: 'Drafting speeds increased by 4x; zero missed dates via cause-list listening.'
    },
    {
      title: 'Corporate Legal Departments',
      icon: Cpu,
      pain: ['High costs on external researcher briefing', 'Slow review loops for vendor terms agreements', 'Lack of centralized repository for corporate highlights'],
      flow: 'Highlights clause library → Drafting comparisons → Collaborative editor shares',
      outcome: 'Contract execution cycle shortened from 7 days to 24 hours.'
    },
    {
      title: 'Banking Legal Teams',
      icon: Landmark,
      pain: ['Delayed audits on collateral titles', 'Violating changing daily RBI circular directives', 'Scattering of DRT recovery case files'],
      flow: 'RBI API alert listener → Highlights search alerts → Recovery projects management',
      outcome: '100% regulatory auditing coverage; 60% faster loan recovery filing.'
    },
    {
      title: 'Insurance Legal Teams',
      icon: ShieldAlert,
      pain: ['High volume of MACT claimants cases', 'Varying settlement payouts thresholds', 'Duplicated case law searches across district tribunals'],
      flow: 'Highlights motor claims templates → Case Explorer database scans',
      outcome: 'Standardized claim response briefs; 30% saving on legal fees.'
    },
    {
      title: 'Independent Advocates',
      icon: Heart,
      pain: ['Limited junior briefing capacity', 'Disorganized paper client records directories', 'Inefficient manual cause list verification'],
      flow: 'Mobile causelist alerts → Research AI brief outlines → Canvas client mappings',
      outcome: 'Solitary practitioners can manage double the active matters without burnout.'
    },
    {
      title: 'Legal Researchers',
      icon: CheckCircle2,
      pain: ['Manual parsing of long 300-page judgments', 'Inefficient copy-pasting for memos', 'Lack of citation references verification'],
      flow: 'Judgment Viewer extracts → Highlights note storage → PDF exporter summaries',
      outcome: 'Research memo briefs created in minutes instead of several working days.'
    }
  ]

  return (
    <section id="use-cases-section" className="py-20 bg-[#FAF9F6] px-6 font-sans border-t border-[#0B132B]/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans">Sectors & Value</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
            Tailored Use Cases
          </h3>
          <p className="text-xs sm:text-sm text-slate-muted max-w-xl mx-auto">
            See how different legal practitioners and departments utilize IndyLaw to streamline their specific operations.
          </p>
        </div>

        {/* Use Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                id={`use-case-card-${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="bg-white border border-[#0B132B]/5 hover:border-[#D4AF37] p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 border-b border-[#0B132B]/5 pb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF9F6] border border-[#0B132B]/5 flex items-center justify-center text-[#D4AF37]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-serif font-bold text-[#0B132B]">{item.title}</h4>
                  </div>

                  {/* Pain Points */}
                  <div className="space-y-1.5 text-xs text-[#4B5563]">
                    <span className="font-bold text-[#0B132B] text-[10px] uppercase tracking-wider block">Pain Points</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-muted">
                      {item.pain.map((p, idx) => (
                        <li key={idx} className="leading-relaxed">{p}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Workflow */}
                  <div className="space-y-1 text-xs text-[#4B5563]">
                    <span className="font-bold text-[#0B132B] text-[10px] uppercase tracking-wider block">IndyLaw Workflow</span>
                    <p className="leading-relaxed bg-[#FAF9F6] p-2 rounded-lg border border-[#0B132B]/5 font-semibold text-[#0B132B]">
                      {item.flow}
                    </p>
                  </div>
                </div>

                {/* Outcome */}
                <div className="mt-6 pt-4 border-t border-[#0B132B]/5 space-y-1 text-xs text-[#4B5563]">
                  <span className="font-bold text-[#AA820A] text-[10px] uppercase tracking-wider block">Expected Outcome</span>
                  <p className="leading-relaxed italic font-medium">{item.outcome}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
