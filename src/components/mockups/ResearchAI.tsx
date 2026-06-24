import React, { useState } from 'react'
import { useStore } from '../../hooks/useStore'
import { ShieldCheck, Lock, Building, Scale, HeartOff, EyeOff, Search, Sparkles, AlertCircle } from 'lucide-react'

const MOCK_ANSWERS: Record<string, { summary: string; reasoning: string[]; citations: string[] }> = {
  'Rights under Consumer Protection Act': {
    summary: 'Under the Consumer Protection Act, 2019, consumer rights have been strengthened significantly with the introduction of the Central Consumer Protection Authority (CCPA) to prevent unfair trade practices.',
    reasoning: [
      'Right to be protected against marketing of goods which are hazardous to life and property.',
      'Right to be informed about the quality, quantity, potency, purity, standard and price of goods or services.',
      'Right to seek redressal against unfair trade practices or unscrupulous exploitation of consumers.'
    ],
    citations: ['NCDRC - Vodafone Idea Ltd. v. Ramdev (2022)', 'SC - Lucknow Development Authority v. M.K. Gupta (1994)']
  },
  'Grounds for anticipatory bail': {
    summary: 'Section 438 of the CrPC (now Section 482 of BNSS) governs anticipatory bail. The courts evaluate multiple crucial factors rather than applying a mechanical formula.',
    reasoning: [
      'The nature and gravity of the accusation and the exact role of the accused.',
      'The antecedents of the applicant, including whether they have previously undergone imprisonment on conviction by a Court.',
      'The possibility of the applicant fleeing from justice or tampering with prosecution witnesses.'
    ],
    citations: ['SC - Sushila Aggarwal v. State of Delhi (2020) 5-judge bench', 'SC - Gurbaksh Singh Sibbia v. State of Punjab (1980)']
  },
  'Builder delay — homebuyer remedies': {
    summary: 'Homebuyers have multiple concurrent remedies under Indian jurisprudence when developers delay project delivery.',
    reasoning: [
      'RERA Refund & Interest: Under Section 18 of the RERA Act, 2016, if the promoter fails to give possession, the buyer can seek refund with interest.',
      'Consumer Protection: Approach the NCDRC/SCDRC for refund and compensation for mental agony.',
      'Insolvency Proceedings: Initiate Corporate Insolvency Resolution Process (CIRP) under the IBC as financial creditors.'
    ],
    citations: ['SC - Pioneer Urban Land & Infrastructure v. Govindan Raghavan (2019)', 'SC - M/s Imperial Structures v. Anil Patni (2020)', 'SC - Chitra Sharma v. Union of India (2018)']
  },
  'Arbitration clause enforceability': {
    summary: 'The arbitration clause enforceability hinges heavily on the separability doctrine and the Kompetenz-Kompetenz principle under Section 16 of the Arbitration Act.',
    reasoning: [
      'The arbitration agreement survives even if the main contract is declared null and void.',
      'An unstamped main agreement does not invalidate the arbitration clause, as ruled recently by the 7-judge SC bench, resolving previous contradictions.',
      'Court intervention is minimized strictly to prima facie review under Section 8 or 11.'
    ],
    citations: ['SC - In Re: Interplay Between Arbitration Act and Stamp Act (2023)', 'SC - NN Global Mercantile v. Indo Unique Flame (2023) Overruled']
  },
  'Grounds for divorce Hindu Marriage Act': {
    summary: 'Section 13 of the Hindu Marriage Act, 1955 prescribes statutory grounds for dissolution of marriage, alongside irretrievable breakdown recognized under Article 142.',
    reasoning: [
      'Cruelty (both physical and mental) that makes it impossible to live together.',
      'Desertion for a continuous period of not less than two years immediately preceding the petition.',
      'Adultery, conversion to another religion, unsoundness of mind, or virulent leprosy.'
    ],
    citations: ['SC - Samar Ghosh v. Jaya Ghosh (2007) regarding mental cruelty guidelines', 'SC - Shilpa Sailesh v. Varun Sreenivasan (2023) regarding Article 142 divorce']
  },
  'Article 21 right to privacy scope': {
    summary: 'The Right to Privacy is declared a fundamental right under Article 21, protecting informational privacy, bodily integrity, and spatial privacy.',
    reasoning: [
      'Informational Privacy: The state must respect personal data boundaries unless restriction is backed by law and proportionate.',
      'Bodily Privacy: Decisions on medical termination, sexual orientation, and reproduction fall under the core privacy domain.',
      'Three-fold Test: Any state encroachment must satisfy legality, legitimate state aim, and proportionality.'
    ],
    citations: ['SC - Justice K.S. Puttaswamy v. Union of India (2017) 9-judge bench', 'SC - Navtej Singh Johar v. Union of India (2018)']
  }
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

  const templates = [
    { label: 'Rights under Consumer Protection Act', icon: ShieldCheck },
    { label: 'Grounds for anticipatory bail', icon: Lock },
    { label: 'Builder delay — homebuyer remedies', icon: Building },
    { label: 'Arbitration clause enforceability', icon: Scale },
    { label: 'Grounds for divorce Hindu Marriage Act', icon: HeartOff },
    { label: 'Article 21 right to privacy scope', icon: EyeOff }
  ]

  const handleTemplateClick = (text: string) => {
    if (isGeneratingResearch) return
    setIsGeneratingResearch(true)
    setResearchResponse(null)
    
    // Animate typing into the text input
    let currentText = ''
    let charIndex = 0
    const interval = setInterval(() => {
      if (charIndex < text.length) {
        currentText += text[charIndex]
        setResearchPrompt(currentText)
        charIndex++
      } else {
        clearInterval(interval)
        // Simulate thinking and generating response
        setTimeout(() => {
          setResearchResponse(JSON.stringify(MOCK_ANSWERS[text] || { summary: 'Answer not configured.', reasoning: [], citations: [] }))
          setIsGeneratingResearch(false)
        }, 1200)
      }
    }, 15)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!researchPrompt.trim() || isGeneratingResearch) return
    setIsGeneratingResearch(true)
    setResearchResponse(null)

    setTimeout(() => {
      // Return a general reply if not matching template
      setResearchResponse(JSON.stringify({
        summary: `Analysis generated for legal query: "${researchPrompt}" using Indian case law databases.`,
        reasoning: [
          'Searched across 50,000+ precedents in Supreme Court and High Courts.',
          'Identified relevant statutory provisions under the Civil Procedure Code and Indian Evidence Act.',
          'Formulated legal reasoning based on judicial doctrine of precedent (Article 141).'
        ],
        citations: ['SC - State of Bombay v. F.N. Balsara (1951)', 'SC - Kesavananda Bharati v. State of Kerala (1973)']
      }))
      setIsGeneratingResearch(false)
    }, 1500)
  }

  const responseData = researchResponse ? JSON.parse(researchResponse) : null

  return (
    <div id="research-ai-mockup" className="w-full min-h-[550px] flex flex-col justify-between bg-[#FAF9F6] border border-[#0B132B]/10 rounded-2xl shadow-xl overflow-hidden text-left p-6 font-sans">
      {/* Top Banner / Logo */}
      <div className="flex justify-between items-center border-b border-[#0B132B]/5 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0B132B] flex items-center justify-center text-[#D4AF37] font-semibold text-sm">IL</div>
          <span className="font-semibold text-[#0B132B] text-sm tracking-wider uppercase">IndyLaw AI</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs text-[#0B132B]/60 font-medium">Grounded in Supreme & High Courts</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center overflow-y-auto max-h-[380px] pr-2">
        {!researchResponse && !isGeneratingResearch ? (
          <div className="text-center my-auto space-y-6">
            <div className="space-y-2">
              <h3 className="text-3xl font-serif text-[#0B132B] font-bold tracking-tight">Hello, I'm IndyLaw.</h3>
              <p className="text-sm text-[#4B5563] max-w-md mx-auto">
                Your legal research assistant — grounded in Supreme Court and High Court judgments.
              </p>
            </div>

            {/* Template Buttons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {templates.map((tpl) => {
                const Icon = tpl.icon
                return (
                  <button
                    key={tpl.label}
                    id={`tpl-${tpl.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => handleTemplateClick(tpl.label)}
                    className="flex items-center gap-3 p-3 bg-white hover:bg-[#FAF9F6] border border-[#0B132B]/5 hover:border-[#D4AF37]/50 rounded-xl transition-all duration-300 group text-left cursor-pointer hover:shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] group-hover:bg-[#0B132B]/5 flex items-center justify-center text-[#D4AF37] group-hover:text-[#0B132B] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-[#111827] font-medium leading-snug line-clamp-2">{tpl.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            {/* Prompt Render */}
            <div className="flex gap-3 items-start justify-end">
              <div className="bg-[#0B132B] text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[80%] text-sm font-medium">
                {researchPrompt}
              </div>
            </div>

            {/* Generating Response state */}
            {isGeneratingResearch && !responseData && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#0B132B]/10 flex items-center justify-center text-[#0B132B]">
                  <Sparkles className="w-4 h-4 animate-spin text-[#D4AF37]" />
                </div>
                <div className="bg-[#F3ECE0]/40 border border-[#0B132B]/5 rounded-2xl rounded-tl-none p-4 max-w-[85%] space-y-2">
                  <div className="flex items-center gap-2 text-[#0B132B] font-semibold text-xs uppercase tracking-wider">
                    <span>Synthesizing Legal Authorities...</span>
                  </div>
                  <div className="space-y-2 w-48">
                    <div className="h-3 bg-slate-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-slate-200 rounded animate-pulse w-5/6"></div>
                    <div className="h-3 bg-slate-200 rounded animate-pulse w-2/3"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Response Content Render */}
            {responseData && (
              <div className="flex gap-3 items-start animate-fadeIn">
                <div className="w-8 h-8 rounded-lg bg-[#0B132B] flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-white border border-[#0B132B]/5 rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-sm space-y-4">
                  <div className="text-sm font-semibold text-[#0B132B] border-b border-[#0B132B]/5 pb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Grounded Summary
                  </div>
                  <p className="text-xs text-[#111827] leading-relaxed font-sans">{responseData.summary}</p>
                  
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-[#0B132B] uppercase tracking-wider">Key Rationales:</div>
                    <ul className="list-disc pl-4 space-y-1">
                      {responseData.reasoning.map((reason: string, idx: number) => (
                        <li key={idx} className="text-xs text-[#4B5563] leading-relaxed">{reason}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[#0B132B]/5 space-y-1.5">
                    <div className="text-[10px] font-semibold text-[#AA820A] uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Grounded Citations (Click to view highlights)
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {responseData.citations.map((citation: string, idx: number) => (
                        <span key={idx} className="inline-flex items-center text-[10px] bg-[#0B132B]/5 text-[#0B132B] hover:text-[#D4AF37] hover:bg-[#0B132B] px-2 py-0.5 rounded-full border border-[#0B132B]/10 cursor-pointer font-semibold transition-colors duration-200">
                          {citation}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Field / Buttons */}
      <div className="border-t border-[#0B132B]/5 pt-4 mt-2">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
          <input
            id="research-query-input"
            type="text"
            value={researchPrompt}
            onChange={(e) => setResearchPrompt(e.target.value)}
            disabled={isGeneratingResearch}
            placeholder="Ask a legal question in natural language... (e.g., 'What are the grounds for anticipatory bail?')"
            className="w-full bg-white text-xs border border-[#0B132B]/10 rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-[#111827]"
          />
          <button
            id="research-query-submit"
            type="submit"
            disabled={isGeneratingResearch || !researchPrompt.trim()}
            className="absolute right-2 top-2 p-2 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] rounded-lg transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        <div className="flex gap-2 mt-3 items-center justify-between">
          <div className="flex gap-1.5">
            {(['basic', 'standard', 'deep'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                id={`research-mode-${mode}`}
                onClick={() => setActiveMode(mode)}
                className={`text-[10px] uppercase font-semibold tracking-wider px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeMode === mode
                    ? 'bg-[#0B132B] border-[#0B132B] text-white font-bold'
                    : 'bg-white border-[#0B132B]/10 text-[#4B5563] hover:border-[#D4AF37]/50'
                }`}
              >
                {mode === 'basic' ? 'Basic' : mode === 'standard' ? 'Standard Search' : 'Deep Analysis'}
              </button>
            ))}
          </div>
          {researchResponse && (
            <button
              id="reset-research-button"
              type="button"
              onClick={() => {
                setResearchPrompt('')
                setResearchResponse(null)
              }}
              className="text-[10px] text-[#0B132B] font-semibold hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              Reset Session
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
