import React from 'react'
import { Check, X, ShieldCheck } from 'lucide-react'

export const WhyIndyLaw: React.FC = () => {
  const comparisons = [
    { feature: 'Indian legal focus', traditional: 'Yes', generic: 'Partial', indylaw: 'Full' },
    { feature: 'Citation grounding', traditional: 'Yes', generic: 'No', indylaw: 'Full' },
    { feature: 'Judgment search', traditional: 'Yes', generic: 'No', indylaw: 'Full' },
    { feature: 'RBI coverage', traditional: 'Partial', generic: 'No', indylaw: 'Full' },
    { feature: 'NCLT coverage', traditional: 'Partial', generic: 'No', indylaw: 'Full' },
    { feature: 'Argument mapping', traditional: 'No', generic: 'No', indylaw: 'Full' },
    { feature: 'Draft generation', traditional: 'No', generic: 'Yes', indylaw: 'Full' },
    { feature: 'Matter management', traditional: 'No', generic: 'No', indylaw: 'Full' },
    { feature: 'Calendar integration', traditional: 'No', generic: 'No', indylaw: 'Full' },
    { feature: 'Client management', traditional: 'No', generic: 'No', indylaw: 'Full' },
    { feature: 'Single platform workflow', traditional: 'No', generic: 'No', indylaw: 'Full' }
  ]

  const renderCell = (val: string, isIndyLaw = false) => {
    if (val === 'Full' || val === 'Yes') {
      return (
        <span className={`inline-flex items-center gap-1 text-xs font-bold ${isIndyLaw ? 'text-[#0B132B]' : 'text-emerald-700'}`}>
          <Check className="w-4 h-4 text-[#D4AF37] stroke-[3]" /> {val}
        </span>
      )
    }
    if (val === 'Partial') {
      return <span className="text-xs font-bold text-amber-700">Partial</span>
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs text-slate-light font-medium">
        <X className="w-3.5 h-3.5 text-slate-light" /> {val}
      </span>
    )
  }

  return (
    <section id="why-indylaw" className="py-20 bg-white px-6 font-sans border-t border-[#0B132B]/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans">Market positioning</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
            Why Choose IndyLaw
          </h3>
          <p className="text-xs sm:text-sm text-slate-muted max-w-xl mx-auto">
            A side-by-side breakdown of features compared with legacy legal research databases and generic AI platforms.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto bg-[#FAF9F6] border border-[#0B132B]/5 rounded-3xl p-6 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#0B132B]/5 text-[#0B132B] font-bold text-xs uppercase tracking-wider">
                <th className="py-4 px-4 w-[40%]">Feature / Capability</th>
                <th className="py-4 px-4 w-[20%]">Traditional Tools</th>
                <th className="py-4 px-4 w-[20%]">Generic AI</th>
                <th className="py-4 px-4 w-[20%] bg-[#D4AF37]/5 border-x border-[#D4AF37]/20 rounded-t-2xl">IndyLaw</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row) => (
                <tr
                  key={row.feature}
                  id={`comp-row-${row.feature.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  className="border-b border-[#0B132B]/5 hover:bg-white/40 transition-colors"
                >
                  <td className="py-3.5 px-4 text-xs font-bold text-[#0B132B]">{row.feature}</td>
                  <td className="py-3.5 px-4">{renderCell(row.traditional)}</td>
                  <td className="py-3.5 px-4">{renderCell(row.generic)}</td>
                  <td className="py-3.5 px-4 bg-[#D4AF37]/5 border-x border-[#D4AF37]/20 font-bold">
                    {renderCell(row.indylaw, true)}
                  </td>
                </tr>
              ))}
              {/* Table Footer row for highlighting column card border-radius */}
              <tr className="bg-[#D4AF37]/5 border-x border-b border-[#D4AF37]/20 rounded-b-2xl">
                <td colSpan={3} className="py-4 px-4 text-[10px] text-slate-muted italic">
                  *Based on evaluation against Indian judicial standards, RBI notifications, and NCLT cause lists.
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center gap-1.5 justify-center text-[10px] font-bold text-[#0B132B]">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> SOC2 Insured
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
