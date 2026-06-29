import React, { useState } from 'react'
import { useStore } from '../../hooks/useStore'
import { ShieldCheck, Lock, Building, Scale, HeartOff, EyeOff, Search, Sparkles, BookOpen, Calendar, ChevronRight, Gavel, FileText } from 'lucide-react'

interface JudgmentDetail {
  id: string
  title: string
  citation: string
  court: string
  date: string
  bench: string
  summary: string
  holdings: string[]
  extract: string
}

interface ComprehensiveAnswer {
  executiveSummary: string
  statutoryFramework: string
  judicialPrinciples: string[]
  caseLaws: JudgmentDetail[]
}

const DETAILED_MOCK_ANSWERS: Record<string, ComprehensiveAnswer> = {
  'Grounds for anticipatory bail': {
    executiveSummary: 'Under Section 438 of the Code of Criminal Procedure, 1973 (now Section 482 of the Bharatiya Nagarik Suraksha Sanhita, 2023 - BNSS), Anticipatory Bail is a statutory direction granting conditional immunity from arrest to an individual apprehending arrest in a non-bailable offense. The Supreme Court of India has consistently affirmed that the grant of anticipatory bail is an exercise of judicial discretion under Article 21, balancing personal liberty against public interest and unhindered investigation.',
    statutoryFramework: 'The statutory matrix requires courts to evaluate specific statutory parameters rather than applying a mechanical formula. The power is co-extensive between the High Court and Sessions Court. Under BNSS Sec 482, interim protection can be granted pending final disposal of the application, subject to conditions such as joining investigation under Sec 175 BNSS.',
    judicialPrinciples: [
      'Nature and gravity of accusation: Courts must examine the preliminary role ascribed to the applicant without conducting a mini-trial.',
      'Antecedents and flight risk: Past criminal history and likelihood of evading process of law or tampering with witnesses/evidence.',
      'Humiliation and malice: Whether the accusation is made with object of injuring or humiliating the applicant by having them arrested.',
      'No blanket immunity: Conditions must be imposed requiring presence for interrogation, prohibition of inducement/threats, and restriction on foreign travel without prior permission.'
    ],
    caseLaws: [
      {
        id: 'ab-1',
        title: 'Sushila Aggarwal v. State (NCT of Delhi)',
        citation: '(2020) 5 SCC 1',
        court: 'Supreme Court of India (5-Judge Bench)',
        date: '29 January 2020',
        bench: 'M.R. Shah J., Arun Mishra J., Indira Banerjee J., Vineet Saran J., S. Ravindra Bhat J.',
        summary: 'Constitution Bench ruling clarifying that anticipatory bail under Sec 438 CrPC does not automatically expire upon filing of chargesheet or summoning by court, but can continue till trial conclusion unless special circumstances warrant revocation.',
        holdings: [
          'Anticipatory bail protection should ordinarily not be restricted to a fixed period of time.',
          'Filing of chargesheet does not automatically terminate anticipatory bail granted earlier.',
          'Courts retain full discretion to impose context-specific conditions based on nature of offense.'
        ],
        extract: '"The court must strike a balance between the individual\'s right to personal liberty under Article 21 and the societal interest in investigating heinous crimes. Imposing time limits on anticipatory bail by judicial interpretation reads in restrictions not intended by the Legislature."'
      },
      {
        id: 'ab-2',
        title: 'Gurbaksh Singh Sibbia v. State of Punjab',
        citation: '(1980) 2 SCC 565',
        court: 'Supreme Court of India (5-Judge Bench)',
        date: '09 April 1980',
        bench: 'Y.V. Chandrachud C.J., P.N. Bhagwati J., V.R. Krishna Iyer J., R.S. Sarkaria J., O. Chinnappa Reddy J.',
        summary: 'The locus classicus on anticipatory bail holding that Section 438 is a procedural provision protecting human liberty and must be interpreted broadly without rigid judicial straitjackets.',
        holdings: [
          'Discretion under Section 438 is wide and untrammelled by statutory conditions not expressed in the section.',
          'Blanket orders of anticipatory bail without specific offense details ought not to be passed.',
          'Reasonable apprehension of arrest based on tangible materials is mandatory.'
        ],
        extract: '"The power under Section 438 is extraordinary and must be exercised with circumspection, but courts should refrain from creating artificial limitations that curtail judicial discretion intended by Parliament to protect citizens from arbitrary arrest."'
      }
    ]
  },
  'Rights under Consumer Protection Act': {
    executiveSummary: 'The Consumer Protection Act, 2019 revolutionized consumer jurisprudence in India by replacing the 1986 framework. It introduced statutory remedies against unfair trade practices, misleading advertisements, and product liability. Crucially, it established the Central Consumer Protection Authority (CCPA) with executive powers to recall unsafe products, enforce class action refunds, and penalize false endorsements.',
    statutoryFramework: 'Under Section 2(7) of the 2019 Act, consumers include e-commerce buyers and offline purchasers. Statutory rights under Section 2(9) comprise protection against hazardous goods, right to be informed of product purity/standard, right to competitive pricing access, and right to seek consumer dispute redressal in District, State, and National Commissions.',
    judicialPrinciples: [
      'Product Liability: Manufacturers, service providers, and sellers are strictly liable for harm caused by defective products or deficient services.',
      'Pecuniary Jurisdiction Revision: Jurisdiction is determined by actual consideration paid rather than total claim value, streamlining forum selection.',
      'Mediation Mechanism: Mandatory alternate dispute resolution (ADR) cells attached to consumer commissions to expedite pre-litigation settlements.'
    ],
    caseLaws: [
      {
        id: 'cp-1',
        title: 'Lucknow Development Authority v. M.K. Gupta',
        citation: '(1994) 1 SCC 243',
        court: 'Supreme Court of India',
        date: '05 November 1993',
        bench: 'R.M. Sahai J., B.L. Hansaria J.',
        summary: 'Landmark ruling bringing statutory bodies and housing development authorities under the ambit of "service" under Consumer Protection laws.',
        holdings: [
          'Housing construction and allotment by public authorities falls squarely under "service".',
          'Delay in handing over possession amounts to actionable deficiency in service.',
          'Consumer commissions have statutory authority to award exemplary damages for harassment.'
        ],
        extract: '"The statutory power conferred upon public officers is for the public benefit. Where public statutory bodies act arbitrarily or negligently causing injury to consumers, consumer courts possess wide powers to grant restitution and compensation."'
      }
    ]
  },
  'Builder delay — homebuyer remedies': {
    executiveSummary: 'When real estate developers fail to deliver possession within contractual timelines, Indian jurisprudence provides homebuyers with comprehensive concurrent remedies under RERA 2016, the Consumer Protection Act 2019, and the Insolvency & Bankruptcy Code (IBC) 2016.',
    statutoryFramework: 'Under Section 18 of RERA (Real Estate Regulation and Development Act, 2016), an allottee can withdraw from the project and claim full refund with statutory interest, or remain in the project and claim monthly delayed compensation until handover.',
    judicialPrinciples: [
      'Right to Refund: Homebuyers cannot be compelled to take possession after unreasonable delay beyond agreed agreement terms.',
      'Unfair Contract Terms: One-sided builder-buyer agreements containing punitive penalty clauses for buyers but nominal penalties for builders are legally void.',
      'Financial Creditor Status: Homebuyers enjoy financial creditor status under IBC to initiate corporate insolvency against defaulting builders.'
    ],
    caseLaws: [
      {
        id: 'bd-1',
        title: 'Pioneer Urban Land & Infrastructure v. Govindan Raghavan',
        citation: '(2019) 5 SCC 416',
        court: 'Supreme Court of India',
        date: '02 April 2019',
        bench: 'U.U. Lalit J., Indu Malhotra J.',
        summary: 'Ruling holding that incorporation of one-sided clauses in builder-buyer agreements constitutes unfair trade practice under consumer laws.',
        holdings: [
          'A builder cannot compel a buyer to accept delay or alternative property.',
          'Homebuyers are entitled to full refund with interest upon failure to deliver within contractual timeframe.'
        ],
        extract: '"A term of a contract will not be final and binding if it is shown that the flat purchaser had no option but to sign on the dotted line drawn by the builder."'
      }
    ]
  }
}

// Fallback comprehensive answer structure
const DEFAULT_FALLBACK_ANSWER: ComprehensiveAnswer = {
  executiveSummary: 'The legal query presents questions regarding statutory interpretation, procedural compliance, and constitutional guarantees under Indian jurisprudence. Based on precedents from the Supreme Court of India and respective High Courts, judicial review balances statutory mandates against equitable principles.',
  statutoryFramework: 'Relevant provisions require adherence to natural justice (audi alteram partem), burden of proof under the Bharatiya Sakshya Adhiniyam / Indian Evidence Act, and procedural compliance in filing original pleadings before appropriate jurisdictional benches.',
  judicialPrinciples: [
    'Rule of Precedent: Lower courts and tribunals are bound by decisions of the Supreme Court under Article 141 of the Constitution.',
    'Proportionality Test: Administrative and state actions restricting statutory rights must meet legality, legitimate aim, and proportionality parameters.',
    'Substantive Justice: Procedural technicalities should not override substantive legal rights when genuine cause is shown.'
  ],
  caseLaws: [
    {
      id: 'gen-1',
      title: 'Kesavananda Bharati v. State of Kerala',
      citation: '(1973) 4 SCC 225',
      court: 'Supreme Court of India (13-Judge Bench)',
      date: '24 April 1973',
      bench: 'Sikri C.J., et al.',
      summary: 'Locus classicus establishing the Basic Structure Doctrine under Constitutional Law.',
      holdings: [
        'Parliament cannot alter or abridge the basic structure of the Constitution.',
        'Judicial review is an indispensable feature of rule of law.'
      ],
      extract: '"The Constitution is a living document, but its fundamental framework and basic structure remain inviolable against ordinary statutory alterations."'
    }
  ]
}

export const ResearchAI: React.FC = () => {
  const {
    researchPrompt,
    setResearchPrompt,
    researchResponse,
    setResearchResponse,
    isGeneratingResearch,
    setIsGeneratingResearch
  } = useStore()

  const [activeMode, setActiveMode] = useState<'basic' | 'standard' | 'deep'>('standard')

  // Load initial active answer (defaults to anticipatory bail for instant rich standard search preview)
  const initialData = DETAILED_MOCK_ANSWERS['Grounds for anticipatory bail']
  const [selectedJudgment, setSelectedJudgment] = useState<JudgmentDetail | null>(initialData.caseLaws[0])

  const templates = [
    { label: 'Grounds for anticipatory bail', icon: Lock },
    { label: 'Rights under Consumer Protection Act', icon: ShieldCheck },
    { label: 'Builder delay — homebuyer remedies', icon: Building },
    { label: 'Arbitration clause enforceability', icon: Scale },
    { label: 'Grounds for divorce Hindu Marriage Act', icon: HeartOff },
    { label: 'Article 21 right to privacy scope', icon: EyeOff }
  ]

  const handleTemplateClick = (text: string) => {
    if (isGeneratingResearch) return
    setIsGeneratingResearch(true)
    setResearchResponse(null)
    
    let currentText = ''
    let charIndex = 0
    const interval = setInterval(() => {
      if (charIndex < text.length) {
        currentText += text[charIndex]
        setResearchPrompt(currentText)
        charIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          const ans = DETAILED_MOCK_ANSWERS[text] || DEFAULT_FALLBACK_ANSWER
          setResearchResponse(JSON.stringify(ans))
          if (ans.caseLaws && ans.caseLaws.length > 0) {
            setSelectedJudgment(ans.caseLaws[0])
          }
          setIsGeneratingResearch(false)
        }, 1000)
      }
    }, 15)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!researchPrompt.trim() || isGeneratingResearch) return
    setIsGeneratingResearch(true)
    setResearchResponse(null)

    setTimeout(() => {
      const ans = DETAILED_MOCK_ANSWERS[researchPrompt] || DEFAULT_FALLBACK_ANSWER
      setResearchResponse(JSON.stringify(ans))
      if (ans.caseLaws && ans.caseLaws.length > 0) {
        setSelectedJudgment(ans.caseLaws[0])
      }
      setIsGeneratingResearch(false)
    }, 1200)
  }

  // Active dataset
  const activeAnswer: ComprehensiveAnswer = researchResponse 
    ? JSON.parse(researchResponse)
    : initialData

  const activeQueryText = researchPrompt || 'Grounds for anticipatory bail'

  return (
    <div id="research-ai-mockup" className="w-full min-h-[600px] flex flex-col justify-between bg-[#FAF9F6] border border-[#0B132B]/10 rounded-2xl shadow-xl overflow-hidden text-left p-5 font-sans">
      {/* Top Banner / Navigation */}
      <div className="flex justify-between items-center border-b border-[#0B132B]/5 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0B132B] flex items-center justify-center text-[#D4AF37] font-semibold text-xs">IL</div>
          <span className="font-semibold text-[#0B132B] text-xs tracking-wider uppercase">IndyLaw AI Research Desk</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-white p-1 rounded-lg border border-[#0B132B]/5">
            {(['basic', 'standard', 'deep'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                id={`research-mode-${mode}`}
                onClick={() => setActiveMode(mode)}
                className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded transition-all cursor-pointer ${
                  activeMode === mode
                    ? 'bg-[#0B132B] text-[#D4AF37]'
                    : 'text-[#4B5563] hover:text-[#0B132B]'
                }`}
              >
                {mode === 'basic' ? 'Basic' : mode === 'standard' ? 'Standard Search' : 'Deep Analysis'}
              </button>
            ))}
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </div>

      {/* Main Content Split Area: Left Answer Pane (65%) | Right Judgment Sidebar (35%) */}
      <div className="flex-1 flex gap-4 overflow-hidden max-h-[440px]">
        {/* Left / Center Main Standard Search Answer Pane */}
        <div className="flex-1 flex flex-col bg-white border border-[#0B132B]/5 rounded-xl p-4 overflow-y-auto space-y-4 shadow-sm">
          {isGeneratingResearch ? (
            <div className="h-full flex flex-col justify-center items-center text-center p-8 space-y-3">
              <Sparkles className="w-8 h-8 text-[#D4AF37] animate-spin" />
              <span className="text-xs font-semibold text-[#0B132B] uppercase tracking-wider">Synthesizing Standard Legal Answer & Cases...</span>
              <p className="text-[11px] text-[#4B5563] max-w-xs">Indexing Supreme Court precedent databases, verifying citations, and structuring ratios.</p>
            </div>
          ) : (
            <>
              {/* Header / Query tag */}
              <div className="border-b border-[#0B132B]/5 pb-3 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#AA820A] uppercase tracking-wider mb-1">
                    <Gavel className="w-3.5 h-3.5" /> Standard Search Answer
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#0B132B] leading-snug">
                    Query: "{activeQueryText}"
                  </h3>
                </div>
              </div>

              {/* SECTION 1: Executive Opinion / Long Answer */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#D4AF37]" /> Executive Legal Synthesis
                </h4>
                <p className="text-xs text-[#374151] leading-relaxed text-justify font-sans">
                  {activeAnswer.executiveSummary}
                </p>
              </div>

              {/* SECTION 2: Statutory Framework */}
              <div className="space-y-2 bg-[#FAF9F6] p-3 rounded-lg border border-[#0B132B]/5">
                <h4 className="text-[11px] font-bold text-[#0B132B] uppercase tracking-wider">Statutory Matrix & Procedure</h4>
                <p className="text-xs text-[#4B5563] leading-relaxed font-sans">{activeAnswer.statutoryFramework}</p>
              </div>

              {/* SECTION 3: Judicial Rationale */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">Core Judicial Principles</h4>
                <ul className="space-y-1.5 pl-1">
                  {activeAnswer.judicialPrinciples.map((principle, idx) => (
                    <li key={idx} className="text-xs text-[#4B5563] leading-relaxed flex items-start gap-2">
                      <span className="text-[#D4AF37] font-bold text-xs">•</span>
                      <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SECTION 4: Relevant Case Laws List */}
              <div className="space-y-2 pt-2 border-t border-[#0B132B]/5">
                <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" /> Relevant Case Laws & Precedents
                </h4>
                <div className="space-y-2">
                  {activeAnswer.caseLaws.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      onClick={() => setSelectedJudgment(caseItem)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all flex justify-between items-center ${
                        selectedJudgment?.id === caseItem.id
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                          : 'bg-[#FAF9F6] border-[#0B132B]/5 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-[#0B132B]">{caseItem.title}</div>
                        <div className="text-[10px] text-[#AA820A] font-semibold">{caseItem.citation} • <span className="text-[#4B5563] font-normal">{caseItem.court}</span></div>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${selectedJudgment?.id === caseItem.id ? 'translate-x-0.5 text-[#D4AF37]' : 'text-[#4B5563]'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Sidebar of Judgment (35% Width) */}
        <div className="w-[35%] bg-white border border-[#0B132B]/5 rounded-xl p-4 flex flex-col justify-between overflow-y-auto shadow-sm">
          {selectedJudgment ? (
            <div className="space-y-3">
              <div className="border-b border-[#0B132B]/5 pb-2.5">
                <span className="text-[9px] font-bold text-[#0B132B] bg-[#0B132B]/5 px-2 py-0.5 rounded-full uppercase tracking-wider">Sidebar of Judgment</span>
                <h4 className="text-xs font-serif font-bold text-[#0B132B] mt-2 leading-snug">{selectedJudgment.title}</h4>
                <div className="text-[10px] text-[#D4AF37] font-bold mt-0.5">{selectedJudgment.citation}</div>
              </div>

              <div className="space-y-2 text-[10px] text-[#4B5563]">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{selectedJudgment.date}</span>
                </div>
                <div className="flex items-start gap-1.5 font-medium">
                  <Gavel className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{selectedJudgment.bench}</span>
                </div>
              </div>

              <div className="space-y-1 pt-1 border-t border-[#0B132B]/5">
                <span className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">Key Holdings</span>
                <ul className="list-disc pl-3.5 space-y-1 text-[10px] text-[#4B5563] leading-relaxed">
                  {selectedJudgment.holdings.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 pt-2 border-t border-[#0B132B]/5">
                <span className="text-[10px] font-bold text-[#AA820A] uppercase tracking-wider">Ratio Decidendi Extract</span>
                <p className="text-[10px] text-[#374151] italic bg-[#FAF9F6] p-2 rounded border border-[#0B132B]/5 leading-relaxed font-serif">
                  {selectedJudgment.extract}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center text-center text-slate-muted">
              <BookOpen className="w-8 h-8 text-[#0B132B]/20 mb-2" />
              <span className="text-xs font-bold text-[#0B132B]">Sidebar of Judgment</span>
              <span className="text-[10px] text-[#4B5563] mt-1">Select a case law from the standard answer list to view judgment holdings.</span>
            </div>
          )}

          <div className="pt-3 border-t border-[#0B132B]/5">
            <span className="text-[9px] text-[#4B5563] block text-center font-mono">100% Grounded SC & HC Citation Engine</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Templates Pill Grid & Input Bar */}
      <div className="border-t border-[#0B132B]/5 pt-3 mt-3 space-y-2.5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[10px] font-bold text-[#0B132B]/60 uppercase tracking-widest shrink-0">Sample Queries:</span>
          {templates.map((tpl) => (
            <button
              key={tpl.label}
              id={`tpl-${tpl.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => handleTemplateClick(tpl.label)}
              className="text-[10px] bg-white border border-[#0B132B]/10 hover:border-[#D4AF37] px-2.5 py-1 rounded-full text-[#111827] font-medium shrink-0 transition-colors cursor-pointer"
            >
              {tpl.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
          <input
            id="research-query-input"
            type="text"
            value={researchPrompt}
            onChange={(e) => setResearchPrompt(e.target.value)}
            disabled={isGeneratingResearch}
            placeholder="Type your legal search query... (e.g., 'Grounds for anticipatory bail under BNSS')"
            className="w-full bg-white text-xs border border-[#0B132B]/10 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-[#111827]"
          />
          <button
            id="research-query-submit"
            type="submit"
            disabled={isGeneratingResearch || !researchPrompt.trim()}
            className="absolute right-2 top-1.5 p-2 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] rounded-lg transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  )
}
