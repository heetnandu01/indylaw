import React, { useState } from 'react'
import { useStore } from '../../hooks/useStore'
import { Search, SlidersHorizontal, BookOpen, Calendar, Scale, ChevronRight } from 'lucide-react'

interface Judgment {
  id: string
  title: string
  citation: string
  court: string
  date: string
  bench: string
  summary: string
  keyHoldings: string[]
}

const MOCK_JUDGMENTS: Judgment[] = [
  {
    id: 'case-1',
    title: 'Kesavananda Bharati v. State of Kerala',
    citation: '(1973) 4 SCC 225',
    court: 'Supreme Court of India',
    date: '24 April 1973',
    bench: '13-Judge Bench (Sikri CJ, et al.)',
    summary: 'The landmark judgment that established the Basic Structure Doctrine under Indian Constitutional Law. It held that while Parliament has wide powers to amend the Constitution under Article 368, it cannot alter or destroy the core elements or basic framework of the Constitution.',
    keyHoldings: [
      'Basic Structure Doctrine formulated.',
      'Article 368 does not enable Parliament to alter the basic framework.',
      'Judicial Review declared a core component of the Basic Structure.'
    ]
  },
  {
    id: 'case-2',
    title: 'Justice K.S. Puttaswamy v. Union of India',
    citation: '(2017) 10 SCC 1',
    court: 'Supreme Court of India',
    date: '24 August 2017',
    bench: '9-Judge Bench (Khehar CJ, Chelameswar J, Bobde J, Chandrachud J, et al.)',
    summary: 'Declared that the Right to Privacy is a Fundamental Right guaranteed under Articles 14, 19, and 21 of the Constitution of India. It overruled Kharak Singh (1962) and M.P. Sharma (1954) to the extent that they held privacy was not a fundamental right.',
    keyHoldings: [
      'Privacy is an intrinsic part of right to life and liberty under Article 21.',
      'Three-fold test for state action: Legality, Need, Proportionality.',
      'Informational privacy recognized as a subset of privacy.'
    ]
  },
  {
    id: 'case-3',
    title: 'NN Global Mercantile Pvt. Ltd. v. Indo Unique Flame Ltd.',
    citation: '2023 SCC OnLine SC 495',
    court: 'Supreme Court of India',
    date: '25 April 2023',
    bench: '5-Judge Bench (Joseph J, Bose J, Hrishikesh Roy J, CT Ravikumar J, Nagarathna J)',
    summary: 'An arbitration landmark addressing unstamped commercial contracts. The court initially held that an arbitration clause contained in an unstamped contract is unenforceable until the contract is stamped. This was later reconsidered and overruled by a larger 7-judge bench in Dec 2023.',
    keyHoldings: [
      'Unstamped agreements cannot be admitted in evidence.',
      'Separability doctrine cannot validate the arbitration agreement for enforcement until stamped.',
      'Subsequently overruled by 7-judge bench in December 2023.'
    ]
  },
  {
    id: 'case-4',
    title: 'Delhi Development Authority v. Skipper Construction Co.',
    citation: '(1996) 4 SCC 622',
    court: 'Supreme Court of India',
    date: '10 May 1996',
    bench: 'Division Bench (Jeevan Reddy J, Sen J)',
    summary: 'A crucial judgment regarding lifting the corporate veil in real estate transactions and invoking Article 142 to direct restoration of homebuyers property and assets. It establishes strict rules against abusing corporate personality to defraud clients.',
    keyHoldings: [
      'Corporate veil can be pierced where corporate character is used to defeat public interest.',
      'Article 142 powers can be used to achieve complete justice in restitution.',
      'High courts can direct attachment of assets to secure homebuyers refunds.'
    ]
  },
  {
    id: 'case-5',
    title: 'State of Maharashtra v. Bharat Shanti Lal Shah',
    citation: '(2008) 13 SCC 5',
    court: 'High Courts', // Filter category matching 'High Courts'
    date: '01 September 2008',
    bench: 'Bombay High Court (Full Bench)',
    summary: 'A major case validating the constitutionality of the Maharashtra Control of Organised Crime Act (MCOCA), clarifying provisions around interception of wire, electronic or oral communications, and admissibility of confessions.',
    keyHoldings: [
      'Constitutional validity of Sections 3, 4, and 21 of MCOCA upheld.',
      'Interception authorization procedures are aligned with Central statutes.',
      'Confessions made to senior police officers admissible under safeguards.'
    ]
  },
  {
    id: 'case-6',
    title: 'Union of India v. Krafters Engineering & Leasing Pvt. Ltd.',
    citation: '(2011) 7 SCC 279',
    court: 'Supreme Court of India',
    date: '13 July 2011',
    bench: 'Division Bench (Radhakrishnan J, Raveendran J)',
    summary: 'Clarified the scope of an arbitrator\'s power to award interest. Held that the arbitrator can award pendente lite interest unless the agreement between the parties specifically prohibits the grant of interest.',
    keyHoldings: [
      'Pendente lite interest can be awarded if there is no express contractual bar.',
      'Reconciliation of Section 31(7) of the Arbitration and Conciliation Act, 1996.',
      'Interest Act, 1978 does not restrict arbitral interest powers.'
    ]
  },
  {
    id: 'case-7',
    title: 'In Re: Essar Steel India Ltd. (CIRP)',
    citation: '2019 SCC OnLine NCLT 1242',
    court: 'Tribunals & NCLT', // Matching category 'Tribunals & NCLT'
    date: '08 March 2019',
    bench: 'NCLT Ahmedabad Bench',
    summary: 'A landmark corporate insolvency ruling. Addressed the distribution of resolution plan proceeds between financial creditors and operational creditors. Affirmed that the Committee of Creditors (CoC) has commercial wisdom in allocation decisions.',
    keyHoldings: [
      'Commercial wisdom of the CoC is supreme and non-justiciable.',
      'Operational creditors are entitled to equitable, not necessarily equal, treatment.',
      'Resolution professional duties clarified regarding claim admission.'
    ]
  }
]

export const CaseExplorer: React.FC = () => {
  const { explorerQuery, setExplorerQuery, explorerJurisdiction, setExplorerJurisdiction } = useStore()
  const [searchMode, setSearchMode] = useState<'All Words' | 'Any Words' | 'Phrase' | 'Boolean'>('All Words')
  const [selectedCase, setSelectedCase] = useState<Judgment | null>(null)

  const jurisdictions = [
    'All Jurisdictions',
    'Supreme Court',
    'High Courts',
    'Tribunals & NCLT'
  ]

  // Filter cases based on jurisdiction and query
  const filteredJudgments = MOCK_JUDGMENTS.filter((item) => {
    // Jurisdiction Filter
    if (explorerJurisdiction !== 'All Jurisdictions') {
      if (explorerJurisdiction === 'Supreme Court' && item.court !== 'Supreme Court of India') return false
      if (explorerJurisdiction === 'High Courts' && item.court !== 'High Courts') return false
      if (explorerJurisdiction === 'Tribunals & NCLT' && item.court !== 'Tribunals & NCLT') return false
    }

    // Search Query Filter
    if (explorerQuery.trim()) {
      const q = explorerQuery.toLowerCase()
      const titleMatch = item.title.toLowerCase().includes(q)
      const citationMatch = item.citation.toLowerCase().includes(q)
      const summaryMatch = item.summary.toLowerCase().includes(q)
      return titleMatch || citationMatch || summaryMatch
    }

    return true
  })

  return (
    <div id="case-explorer-mockup" className="w-full min-h-[550px] flex bg-[#FAF9F6] border border-[#0B132B]/10 rounded-2xl shadow-xl overflow-hidden text-left font-sans">
      {/* Search Sidebar */}
      <div className="w-[30%] border-r border-[#0B132B]/5 bg-white p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">Search History</div>
          <div className="text-[11px] text-[#4B5563] italic">No recent searches in this session.</div>
          
          <div className="border-t border-[#0B132B]/5 pt-4 space-y-2">
            <span className="text-[10px] font-bold text-[#0B132B]/60 uppercase tracking-widest">Active Filters</span>
            <div className="text-xs text-[#0B132B] font-medium space-y-1">
              <div className="flex justify-between">
                <span className="text-[#4B5563]">Mode:</span>
                <span className="font-semibold text-[#D4AF37]">{searchMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4B5563]">Court:</span>
                <span className="font-semibold text-[#D4AF37]">{explorerJurisdiction}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          id="new-search-btn"
          type="button"
          onClick={() => {
            setExplorerQuery('')
            setExplorerJurisdiction('All Jurisdictions')
            setSelectedCase(null)
          }}
          className="w-full py-2 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] rounded-lg text-xs font-bold transition-all cursor-pointer text-center"
        >
          Clear & Search New
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#0B132B]">Case Explorer</h3>
          <p className="text-xs text-[#4B5563]">
            Explore over 50,000 precedents across India's highest courts. Analyze judgments, citations, and legal principles with precision.
          </p>
        </div>

        {/* Query Controls */}
        <div className="space-y-3 bg-white p-4 rounded-xl border border-[#0B132B]/5 shadow-sm mb-4">
          {/* Search Mode Radio Items */}
          <div className="flex gap-4">
            {(['All Words', 'Any Words', 'Phrase', 'Boolean'] as const).map((mode) => (
              <label key={mode} className="flex items-center gap-1.5 text-[11px] text-[#4B5563] cursor-pointer">
                <input
                  type="radio"
                  id={`mode-${mode.toLowerCase().replace(' ', '-')}`}
                  name="searchMode"
                  checked={searchMode === mode}
                  onChange={() => setSearchMode(mode)}
                  className="accent-[#D4AF37]"
                />
                <span className={searchMode === mode ? 'font-semibold text-[#0B132B]' : ''}>{mode}</span>
              </label>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <input
                id="explorer-search-input"
                type="text"
                value={explorerQuery}
                onChange={(e) => setExplorerQuery(e.target.value)}
                placeholder="Search by case name, citation, or key terms (e.g., 'Anticipatory Bail', 'Stamp Act')..."
                className="w-full bg-[#FAF9F6] border border-[#0B132B]/10 rounded-lg pl-3 pr-10 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#D4AF37]"
              />
              <SlidersHorizontal className="w-3.5 h-3.5 absolute right-3 top-3.5 text-[#4B5563]" />
            </div>
            <button
              id="explorer-search-submit"
              type="button"
              className="px-4 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Jurisdiction Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#0B132B]/5">
            {jurisdictions.map((juris) => (
              <button
                key={juris}
                id={`juris-${juris.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setExplorerJurisdiction(juris)}
                className={`text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer font-medium ${
                  explorerJurisdiction === juris
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#AA820A] font-semibold'
                    : 'bg-white border-[#0B132B]/10 text-[#4B5563] hover:border-[#D4AF37]/50'
                }`}
              >
                {juris}
              </button>
            ))}
          </div>
        </div>

        {/* Results / Selected Details Split */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Results List */}
          <div className="w-[55%] overflow-y-auto space-y-2 pr-1">
            {filteredJudgments.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-[#0B132B]/5 rounded-xl bg-white">
                <Search className="w-8 h-8 text-[#0B132B]/20 mb-2" />
                <span className="text-xs font-semibold text-[#0B132B]">No results found</span>
                <span className="text-[10px] text-[#4B5563] mt-1">Try expanding your search query or selecting "All Jurisdictions".</span>
              </div>
            ) : (
              filteredJudgments.map((item) => (
                <div
                  key={item.id}
                  id={`result-${item.id}`}
                  onClick={() => setSelectedCase(item)}
                  className={`p-3 bg-white border rounded-xl cursor-pointer transition-all hover:shadow-sm flex justify-between items-start ${
                    selectedCase?.id === item.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-sm'
                      : 'border-[#0B132B]/5 hover:border-[#0B132B]/25'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[#0B132B] line-clamp-1">{item.title}</div>
                    <div className="flex items-center gap-2 text-[10px] text-[#4B5563]">
                      <span className="font-semibold text-[#AA820A]">{item.citation}</span>
                      <span>•</span>
                      <span>{item.court}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[#4B5563] mt-1 transition-transform ${selectedCase?.id === item.id ? 'translate-x-0.5 text-[#D4AF37]' : ''}`} />
                </div>
              ))
            )}
          </div>

          {/* Details Pane */}
          <div className="flex-1 bg-white border border-[#0B132B]/5 rounded-xl p-4 overflow-y-auto">
            {selectedCase ? (
              <div className="space-y-4">
                <div className="border-b border-[#0B132B]/5 pb-3">
                  <span className="text-[9px] font-bold text-[#AA820A] bg-[#D4AF37]/15 px-2 py-0.5 rounded-full uppercase tracking-wider">{selectedCase.court}</span>
                  <h4 className="text-sm font-serif font-bold text-[#0B132B] mt-2 leading-snug">{selectedCase.title}</h4>
                  <div className="text-[10px] text-[#4B5563] mt-1 font-medium">{selectedCase.citation}</div>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-2 items-center text-[10px] text-[#4B5563] font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Decided: {selectedCase.date}</span>
                  </div>
                  <div className="flex gap-2 items-center text-[10px] text-[#4B5563] font-medium">
                    <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Bench: {selectedCase.bench}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">Judicial Summary</span>
                    <p className="text-[11px] text-[#4B5563] leading-relaxed">{selectedCase.summary}</p>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">Key Holdings</span>
                    <ul className="list-disc pl-4 space-y-1">
                      {selectedCase.keyHoldings.map((hold, index) => (
                        <li key={index} className="text-[10px] text-[#4B5563] leading-relaxed font-sans">{hold}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center text-slate-muted">
                <BookOpen className="w-10 h-10 text-[#0B132B]/15 mb-3" />
                <span className="text-xs font-semibold text-[#0B132B]">Select a Judgment</span>
                <span className="text-[10px] text-[#4B5563] mt-1 max-w-[180px]">
                  Click on any case on the left to read court summary and holdings.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
