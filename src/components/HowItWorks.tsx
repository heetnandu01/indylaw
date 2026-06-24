import React from 'react'
import { HelpCircle, BookOpen, Highlighter, Share2, FileEdit, FolderHeart, CalendarRange } from 'lucide-react'

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Ask a legal question',
      desc: 'Ask your queries in conversational natural language grounded in Indian laws.',
      icon: HelpCircle
    },
    {
      num: '02',
      title: 'Review grounded authorities',
      desc: 'Inspect source citations and verify links to Supreme Court and High Court precedents.',
      icon: BookOpen
    },
    {
      num: '03',
      title: 'Highlight key passages',
      desc: 'Pinpoint crucial judgments or RBI circular holdings and append notes for context.',
      icon: Highlighter
    },
    {
      num: '04',
      title: 'Map arguments in Canvas',
      desc: 'Drag, drop, and link evidence nodes to visualize the case pleading framework.',
      icon: Share2
    },
    {
      num: '05',
      title: 'Generate drafts',
      desc: 'Inject the arguments from Canvas into legal templates (notices, petitions, replies) via AI.',
      icon: FileEdit
    },
    {
      num: '06',
      title: 'Attach to Projects',
      desc: 'Save all drafts, highlighted sources, and client structures within the matter container.',
      icon: FolderHeart
    },
    {
      num: '07',
      title: 'Track deadlines',
      desc: 'Listen to automated cause-lists matching CNR numbers to trigger deadline reminders.',
      icon: CalendarRange
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-[#FAF9F6] px-6 font-sans border-t border-[#0B132B]/5">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans">Workflow roadmap</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
            From Research to Resolution
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] max-w-xl mx-auto">
            IndyLaw connects every step of the legal lifecycle into a single pipeline. See how data flows from initial query to court hearings.
          </p>
        </div>

        {/* Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 relative">
          {/* Connecting Line Overlay (Desktop only) */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-[#0B132B]/5 z-0" />

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                id={`step-${step.num}`}
                className="relative z-10 flex flex-col items-center text-center space-y-4 group"
              >
                {/* Step Circle Icon container */}
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#0B132B]/5 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B132B] group-hover:text-white transition-all shadow-md group-hover:scale-105 duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Step Text Info */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{`Step ${step.num}`}</div>
                  <h4 className="text-xs font-bold text-[#0B132B] leading-tight">{step.title}</h4>
                  <p className="text-[10px] text-slate-muted leading-relaxed max-w-[150px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
