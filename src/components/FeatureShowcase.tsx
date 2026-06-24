import React from 'react'
import { Check, Sparkles } from 'lucide-react'

// Import all interactive mockup components
import { ResearchAI } from './mockups/ResearchAI'
import { CaseExplorer } from './mockups/CaseExplorer'
import { Highlights } from './mockups/Highlights'
import { Canvas } from './mockups/Canvas'
import { Drafting } from './mockups/Drafting'
import { Projects } from './mockups/Projects'
import { Calendar } from './mockups/Calendar'
import { Clients } from './mockups/Clients'

interface FeatureDetail {
  id: string
  title: string
  desc: string
  capabilities: string[]
  mockup: React.FC
}

export const FeatureShowcase: React.FC = () => {
  const features: FeatureDetail[] = [
    {
      id: 'research',
      title: 'AI Legal Research',
      desc: 'Ask legal questions in natural language and receive grounded responses backed by Indian case law.',
      capabilities: [
        'Supreme Court research',
        'High Court research',
        'RBI regulations',
        'NCLT decisions',
        'NCLAT decisions',
        'Follow-up questioning',
        'Session history',
        'Citation-backed answers',
        'Deep legal analysis'
      ],
      mockup: ResearchAI
    },
    {
      id: 'explorer',
      title: 'Case Explorer',
      desc: 'Search across Indian judicial precedents with advanced legal search capabilities.',
      capabilities: [
        'Case title search',
        'Citation search',
        'Boolean search',
        'Phrase search',
        'Keyword search',
        'Jurisdiction filters',
        'Supreme Court & High Courts',
        'Tribunals & NCLT'
      ],
      mockup: CaseExplorer
    },
    {
      id: 'highlights',
      title: 'Highlights',
      desc: 'Build your personal legal knowledge repository. Save passages and link them back to primary authorities.',
      capabilities: [
        'Save judgment passages',
        'Create research notes',
        'Search highlights feed',
        'Tag legal concepts',
        'Knowledge retrieval'
      ],
      mockup: Highlights
    },
    {
      id: 'canvas',
      title: 'Canvas',
      desc: 'Map legal arguments visually to synthesize complex disputes.',
      capabilities: [
        'Argument mapping',
        'Legal reasoning chains',
        'Connect evidence',
        'Connect authorities',
        'Build case strategies'
      ],
      mockup: Canvas
    },
    {
      id: 'drafts',
      title: 'AI Drafting',
      desc: 'Turn legal research into high-quality first drafts instantly, formatted to Indian court standards.',
      capabilities: [
        'Petitions & Affidavits',
        'Written submissions',
        'Legal notices & Replies',
        'Applications',
        'Smart version history'
      ],
      mockup: Drafting
    },
    {
      id: 'projects',
      title: 'Projects',
      desc: 'Matter-centric legal workspaces to sync timelines, client records, and filings.',
      capabilities: [
        'Link existing cases & documents',
        'Link CNR numbers',
        'Track litigation schedules',
        'Store and audit documents',
        'Manage task lists'
      ],
      mockup: Projects
    },
    {
      id: 'calendar',
      title: 'Calendar',
      desc: 'Never miss hearings, deadlines, or important dates with cause-list intelligence.',
      capabilities: [
        'Court hearing dates',
        'Filing deadlines',
        'Event reminders',
        'Google Calendar integration',
        'Matter-linked events'
      ],
      mockup: Calendar
    },
    {
      id: 'clients',
      title: 'Client Management',
      desc: 'Centralized client records, entity categories, and compliance verification.',
      capabilities: [
        'Individual & Company profiles',
        'Trusts & Partnerships',
        'Government bodies compliance',
        'Matter association history',
        'KYC compliance logs'
      ],
      mockup: Clients
    }
  ]

  return (
    <section id="features-showcase" className="py-16 bg-white px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Platform capabilities</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
            A Complete Legal Suite, Integrated.
          </h3>
          <p className="text-xs sm:text-sm text-slate-muted max-w-xl mx-auto">
            Explore the core features of the IndyLaw Legal Operating System. Interact with the live mockups below.
          </p>
        </div>

        {/* Alternating Features Sections */}
        <div className="space-y-32">
          {features.map((feature, index) => {
            const MockupComponent = feature.mockup
            const isEven = index % 2 === 0

            return (
              <div
                key={feature.id}
                id={feature.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
                {/* Text Content Column */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B132B]/5 rounded-full text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Feature {index + 1}
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B132B] leading-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {feature.desc}
                  </p>

                  {/* Capability Checklist Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {feature.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-xs font-medium text-[#0B132B]">
                        <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#AA820A] flex-shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="line-clamp-1">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mockup Column */}
                <div
                  className={`lg:col-span-7 w-full ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {/* High fidelity interactive mockup component container */}
                  <div className="border border-[#0B132B]/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-[#FAF9F6] p-1.5">
                    <MockupComponent />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
