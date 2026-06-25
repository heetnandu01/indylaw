import React from 'react'
import { Check, Sparkles, ArrowRight, Layers, FileText, Database, ShieldCheck, Share2 } from 'lucide-react'

// Import all high fidelity interactive mockup components
import { ResearchAI } from '../components/mockups/ResearchAI'
import { CaseExplorer } from '../components/mockups/CaseExplorer'
import { Highlights } from '../components/mockups/Highlights'
import { Canvas } from '../components/mockups/Canvas'
import { Drafting } from '../components/mockups/Drafting'
import { Projects } from '../components/mockups/Projects'
import { Calendar } from '../components/mockups/Calendar'
import { Clients } from '../components/mockups/Clients'

export const Features: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#111827] font-sans selection:bg-[#D4AF37]/30 selection:text-[#0B132B]">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#0B132B] text-white border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Capabilities Overview
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight">
            Powerful Legal AI Features
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#FAF9F6]/80 max-w-2xl mx-auto leading-relaxed">
            Everything you need for legal research, drafting, knowledge management, and collaboration. Unified into a single secure platform.
          </p>
        </div>
      </section>

      {/* Main Features Scroll Section */}
      <section className="py-24 px-6 space-y-36 max-w-7xl mx-auto">
        
        {/* SECTION 1: AI Legal Research */}
        <div id="ai-legal-research" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 rounded-full text-[10px] font-bold text-[#AA820A] uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" /> Core Intelligence
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0B132B] tracking-tight">
              AI Legal Research
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Query Indian case law with natural language and receive grounded, citation-backed answers directly from primary authorities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Supreme Court Research',
                'High Court Research',
                'RBI Regulations',
                'NCLT Decisions',
                'NCLAT Decisions',
                'Citation-backed Responses',
                'Follow-up Questions',
                'Session History',
                'Deep Legal Analysis'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-semibold text-[#0B132B]">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#AA820A]">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 bg-white border border-[#0B132B]/10 rounded-2xl p-1.5 shadow-lg">
            <ResearchAI />
          </div>
        </div>

        <hr className="border-[#0B132B]/5" />

        {/* SECTION 2: Project-Based Research */}
        <div id="project-based-research" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 bg-white border border-[#0B132B]/10 rounded-2xl p-1.5 shadow-lg lg:order-2">
            <Projects />
          </div>
          <div className="lg:col-span-5 space-y-6 lg:order-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B132B]/5 rounded-full text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 text-[#D4AF37]" /> Matter Workspaces
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0B132B] tracking-tight">
              Create Projects Around Real Cases
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Keep your research aligned to active cases. Organise historical orders, monitor dates, and connect filings in matter-centric workspaces.
            </p>
            <div className="space-y-2.5 pt-2">
              {[
                { label: 'Create Project', desc: 'Initialize standard workspaces per client matter' },
                { label: 'Add CNR Number', desc: 'Input case tracking identifier' },
                { label: 'Auto-fetch Court Case', desc: 'Sync litigation records from court registers' },
                { label: 'Organize Research & Matter History', desc: 'Store document repositories, audit timelines' }
              ].map((item) => (
                <div key={item.label} className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#AA820A] mt-0.5 flex-shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B132B]">{item.label}</h4>
                    <p className="text-[10px] text-slate-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Case Workflow Diagram */}
            <div className="pt-4 border-t border-[#0B132B]/5">
              <span className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-3">Case Workflow Pipeline</span>
              <div className="flex flex-wrap items-center gap-2">
                {['Create Project', 'Add CNR', 'Fetch Case Data', 'Start Research'].map((step, idx) => (
                  <React.Fragment key={step}>
                    <div className="bg-[#0B132B] text-[#FAF9F6] text-[10px] font-bold px-3 py-1.5 rounded-lg border border-[#D4AF37]/20">
                      {step}
                    </div>
                    {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="border-[#0B132B]/5" />

        {/* SECTION 3: Context-Aware AI Research */}
        <div id="context-aware-research" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 rounded-full text-[10px] font-bold text-[#AA820A] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Advanced Indexing
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0B132B] tracking-tight">
              Context-Aware AI Research
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Query with referencing project contexts. Mention files, contracts, or entire cases and watch the system use them for context.
            </p>
            <div className="bg-[#0B132B] text-white p-5 rounded-2xl border border-[#D4AF37]/20 space-y-3 font-mono">
              <div className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider border-b border-white/5 pb-2">
                Reference cases easily
              </div>
              <p className="text-[11px] text-white/95 leading-relaxed">
                Users can reference projects in search queries using:
              </p>
              <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-xs font-bold text-[#D4AF37]">
                @ProjectName
              </div>
              <div className="text-[10px] text-white/50 pt-1">
                Example search:
              </div>
              <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-[11px] italic text-white/80">
                "Find precedents relevant to @ABC_vs_XYZ"
              </div>
              <p className="text-[10px] text-[#FAF9F6]/60 italic">
                AI automatically extracts records, filings, and facts from the specified project.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 bg-white border border-[#0B132B]/10 rounded-2xl p-1.5 shadow-lg">
            <Calendar />
          </div>
        </div>

        <hr className="border-[#0B132B]/5" />

        {/* SECTION 4: Notes & Highlights */}
        <div id="notes-highlights" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 bg-white border border-[#0B132B]/10 rounded-2xl p-1.5 shadow-lg lg:order-2">
            <Highlights />
          </div>
          <div className="lg:col-span-5 space-y-6 lg:order-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B132B]/5 rounded-full text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-[#D4AF37]" /> Argument Construction
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0B132B] tracking-tight">
              Notes & Highlights
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Build your customized legal library. Highlight paragraphs from judgments, map them back to primary authorities, and extract findings to structure arguments.
            </p>
            <div className="grid grid-cols-1 gap-3 pt-2">
              {[
                'Save Research Notes dynamically in your project workspace',
                'Store Evidence, orders, case schedules, and court replies',
                'Create Highlights linking back to primary case laws',
                'Build Legal Arguments for trial court and appellate structures',
                'Organize Findings with custom tags'
              ].map((item) => (
                <div key={item} className="flex gap-2 text-xs font-semibold text-[#0B132B]">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#AA820A] flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-[#0B132B]/5" />

        {/* SECTION 5: AI Drafting */}
        <div id="ai-drafting" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 rounded-full text-[10px] font-bold text-[#AA820A] uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" /> Smarter Drafting
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0B132B] tracking-tight">
              AI Drafting
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Generate first drafts instantly based on your case files, notes, and research history. Format automatically to Indian court requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Draft Petitions & Affidavits',
                'Draft Legal Notices',
                'Draft Written Statements',
                'Draft Contracts',
                'Draft Legal Opinions'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs font-semibold text-[#0B132B]">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#AA820A]">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Drafting workflow */}
            <div className="pt-4 border-t border-[#0B132B]/5">
              <span className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-3">Drafting Pipeline</span>
              <div className="flex flex-wrap items-center gap-2">
                {['Select Project', 'Add Notes', 'Reference @Project', 'Generate Draft'].map((step, idx) => (
                  <React.Fragment key={step}>
                    <div className="bg-[#FAF9F6] text-[#0B132B] text-[10px] font-bold px-3 py-1.5 rounded-lg border border-[#0B132B]/10">
                      {step}
                    </div>
                    {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 bg-white border border-[#0B132B]/10 rounded-2xl p-1.5 shadow-lg">
            <Drafting />
          </div>
        </div>

        <hr className="border-[#0B132B]/5" />

        {/* SECTION 6: Legal Case Discovery */}
        <div id="case-discovery" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 bg-white border border-[#0B132B]/10 rounded-2xl p-1.5 shadow-lg lg:order-2">
            <CaseExplorer />
          </div>
          <div className="lg:col-span-5 space-y-6 lg:order-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B132B]/5 rounded-full text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" /> Precedent Tracking
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0B132B] tracking-tight">
              Legal Case Discovery
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Explore citation pathways, trace judicial reasoning timelines, and identify precedents that either support or dispute your argument.
            </p>
            <div className="grid grid-cols-1 gap-2 pt-2">
              {[
                'Discover Similar Cases in secondary tribunals',
                'Retrieve Supporting Judgments from Supreme Court benches',
                'Review Contradicting Judgments to isolate vulnerabilities',
                'Extract Relevant Statutes and amendments',
                'Interact with citation network trees'
              ].map((item) => (
                <div key={item} className="flex gap-2 text-xs font-semibold text-[#0B132B]">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#AA820A] flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-[#0B132B]/5" />

        {/* SECTION 7: Custom RAG Workspaces */}
        <div id="custom-rag" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/10 rounded-full text-[10px] font-bold text-[#AA820A] uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Grounding
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0B132B] tracking-tight">
              Custom RAG Workspaces
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Upload files and query them privately. Generate an isolated research sandbox using your own resources without public leaks.
            </p>
            <div className="space-y-4 pt-2">
              <div>
                <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Upload Support:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Judgments', 'Contracts & Agreements', 'Case Evidence', 'Internal Documents'].map((up) => (
                    <span key={up} className="bg-white border border-[#0B132B]/10 px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#0B132B]">
                      {up}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider mb-2">Create Workspace:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Private Knowledge Bases', 'Matter-Specific AI', 'Team Research Repositories'].map((cr) => (
                    <span key={cr} className="bg-[#0B132B] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold">
                      {cr}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 bg-white border border-[#0B132B]/10 rounded-2xl p-1.5 shadow-lg">
            <Canvas />
          </div>
        </div>

        <hr className="border-[#0B132B]/5" />

        {/* SECTION 8: Team Collaboration */}
        <div id="team-collaboration" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 bg-white border border-[#0B132B]/10 rounded-2xl p-1.5 shadow-lg lg:order-2">
            <Clients />
          </div>
          <div className="lg:col-span-5 space-y-6 lg:order-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0B132B]/5 rounded-full text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">
              <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Team Alignment
            </div>
            <h2 className="text-3xl font-serif font-bold text-[#0B132B] tracking-tight">
              Team Collaboration
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              Collaborate securely across your firm. Share citations, sync timelines, delegate tasks, and edit drafts together.
            </p>
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {[
                'Shared Projects (keep partners, associates & researchers aligned)',
                'Shared Notes (co-author research insights in real-time)',
                'Shared Drafts (collaborative briefs, replies, and applications)',
                'Workspace Permissions (role-based restrictions)',
                'Team Knowledge Sharing (repository access)'
              ].map((item) => (
                <div key={item} className="flex gap-2 text-xs font-semibold text-[#0B132B]">
                  <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#AA820A] flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>
    </div>
  )
}
