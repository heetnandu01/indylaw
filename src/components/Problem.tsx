import React from 'react'
import { ArrowRight, XCircle, CheckCircle, Database, Search, FileText, FileSpreadsheet, Mail, Calendar, FolderGit, Users } from 'lucide-react'

export const Problem: React.FC = () => {
  const fragmentedWorkflow = [
    { label: 'Case Database', icon: Database, bg: 'bg-rose-50 border-rose-200 text-rose-700' },
    { label: 'Google Search', icon: Search, bg: 'bg-rose-50 border-rose-200 text-rose-700' },
    { label: 'Word Documents', icon: FileText, bg: 'bg-rose-50 border-rose-200 text-rose-700' },
    { label: 'Notes', icon: FileSpreadsheet, bg: 'bg-rose-50 border-rose-200 text-rose-700' },
    { label: 'Email', icon: Mail, bg: 'bg-rose-50 border-rose-200 text-rose-700' },
    { label: 'Calendar', icon: Calendar, bg: 'bg-rose-50 border-rose-200 text-rose-700' },
    { label: 'Matter Tracker', icon: FolderGit, bg: 'bg-rose-50 border-rose-200 text-rose-700' }
  ]

  const indylawWorkflow = [
    { label: 'Research', icon: Search, bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { label: 'Cases', icon: Database, bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { label: 'Highlights', icon: FileSpreadsheet, bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { label: 'Canvas', icon: FileText, bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { label: 'Drafts', icon: FileText, bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { label: 'Projects', icon: FolderGit, bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { label: 'Calendar', icon: Calendar, bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { label: 'Clients', icon: Users, bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' }
  ]

  return (
    <section id="problem-section" className="py-20 bg-[#FAF9F6] px-6 font-sans border-t border-[#0B132B]/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">The Core Challenge</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
            Legal Work Is Fragmented
          </h3>
          <p className="text-xs sm:text-sm text-[#4B5563] max-w-xl mx-auto">
            Traditional legal work involves copying data across dozens of isolated tabs. Here is how IndyLaw solves context switching.
          </p>
        </div>

        {/* Side-by-side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Fragmented Status Quo */}
          <div className="bg-white border border-rose-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2 border-b border-[#0B132B]/5 pb-4">
              <XCircle className="w-5 h-5 text-rose-500" />
              <span className="font-bold text-[#0B132B] text-sm">Status Quo (Context Switching)</span>
            </div>

            <p className="text-xs text-[#4B5563] leading-relaxed">
              Information leaks when moving between legal databases, desktop file folders, notes files, and scheduling tools.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              {fragmentedWorkflow.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between p-3 rounded-xl border ${item.bg} text-xs font-semibold`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {idx < fragmentedWorkflow.length - 1 && (
                      <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Manual Copy</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Integrated IndyLaw Way */}
          <div className="bg-white border border-[#D4AF37] rounded-3xl p-6 md:p-8 space-y-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-2 border-b border-[#0B132B]/5 pb-4">
              <CheckCircle className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]/15" />
              <span className="font-bold text-[#0B132B] text-sm">The IndyLaw Way (Unified Core)</span>
            </div>

            <p className="text-xs text-[#4B5563] leading-relaxed">
              Everything works as a single database. Highlights link back to judgments; Canvas connects evidence to drafts; court cause lists schedule events automatically.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {indylawWorkflow.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2.5 p-3 rounded-xl border border-[#0B132B]/5 hover:border-[#D4AF37] bg-[#FAF9F6] text-xs font-bold text-[#0B132B] hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#0B132B]/5 flex items-center justify-center text-[#D4AF37]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </div>

            <div className="pt-4 border-t border-[#0B132B]/5 flex justify-between items-center text-[10px] text-slate-muted">
              <span>Data models share common workspace tables</span>
              <span className="font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-0.5">
                Zero Copy Workflows <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
