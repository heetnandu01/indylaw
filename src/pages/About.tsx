import React from 'react';
import { Compass, Eye } from 'lucide-react';
import PageHero from '../components/PageHero';

export const About: React.FC = () => {
  const timeline = [
    {
      year: 'Q3 2024',
      title: 'Founding & Vector Indexing Prototype',
      desc: 'Formed IndyLaw with the core mission to map Indian judicial precedents. Built the first custom semantic indexing engine specialized in Indian Supreme Court judgments.'
    },
    {
      year: 'Q1 2025',
      title: 'Beta Launch with Tier-1 Law Chambers',
      desc: 'Launched closed beta trials with over 50 advocate chambers. Added support for High Court datasets and introduced interactive Canvas argument mapping.'
    },
    {
      year: 'Q3 2025',
      title: 'Unified OS Release',
      desc: 'Released the integrated operating system combining Research AI, Highlights feeds, AI Drafting, and court cause-list calendars in a secure SOC2-compliant sandbox.'
    },
    {
      year: 'Present (2026)',
      title: 'Enterprise Scaled Platform',
      desc: 'Powering litigation strategy, contract auditing, and compliance tracking for legal cells, insurance providers, and banking institutions across India.'
    }
  ]

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#111827] font-sans selection:bg-[#D4AF37]/30 selection:text-[#0B132B]">
      {/* Hero Section */}
      <PageHero
        title="About IndyLaw"
        subtitle="We are building the intelligence layer for Indian legal practitioners, unifying research, drafting, and management."
        backgroundClass="bg-[#0B132B]"
      />

      {/* Story & Why IndyLaw Exists */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#0B132B] border-b border-[#0B132B]/10 pb-3">
            Company Story
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            IndyLaw was founded by a team of legal practitioners and AI researchers who grew frustrated with the fragmented, sluggish state of legal operations. Lawyers in India spend countless hours scouring disorganized databases, manually tracking court listings, copy-pasting precedent texts, and coordinating filings across scattered spreadsheets.
          </p>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            We realized that legal practice deserves a dedicated, AI-native operating system. Not a generic LLM wrapper, but a system custom-grounded in Indian case laws, SEBI circulars, MCA regulations, and NCLT directories. IndyLaw was born to modernize advocacy, bringing structure, precision, and collaboration back to Indian legal teams.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#0B132B] border-b border-[#0B132B]/10 pb-3">
            Why INDYLAW Exists
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            Indian jurisprudence is rich, complex, and fast-evolving. Practitioners require a platform that not only indexes billions of data points but respects the nuances of Indian courts—from regional benches to distinct regulatory frameworks. IndyLaw exists to solve the discovery bottleneck, enabling lawyers to craft strategies, verify references, and auto-compose pleadings with absolute compliance and complete isolation.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="bg-white border border-[#0B132B]/10 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B] font-serif">Our Mission</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              To empower advocates, banks, and legal groups with secure, citation-grounded cognitive pipelines, reducing research overheads and litigation errors.
            </p>
          </div>

          <div className="bg-white border border-[#0B132B]/10 rounded-3xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#0B132B] font-serif">Our Vision</h3>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              To serve as the primary cognitive backend for Indian law chambers, driving automated case lifecycle management from filings to appellate resolutions.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white border-t border-[#0B132B]/5 py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Platform Evolution</h2>
            <h3 className="text-3xl font-serif font-bold text-[#0B132B]">Development Milestones</h3>
          </div>

          {/* Vertical Timeline */}
          <div className="relative border-l border-[#0B132B]/15 ml-4 sm:ml-32 space-y-12 py-4">
            {timeline.map((node) => (
              <div key={node.year} className="relative pl-8 sm:pl-10">
                {/* Timeline node marker */}
                <div className="w-4 h-4 rounded-full bg-[#FAF9F6] border-2 border-[#D4AF37] absolute -left-2 top-1.5 z-10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0B132B]" />
                </div>

                {/* Left floating year on desktop */}
                <div className="hidden sm:block absolute -left-36 top-1.5 w-24 text-right text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  {node.year}
                </div>

                <div className="space-y-2 max-w-2xl bg-[#FAF9F6] border border-[#0B132B]/5 hover:border-[#D4AF37]/50 p-6 rounded-2xl shadow-sm transition-all duration-300">
                  <span className="inline-block sm:hidden text-[9px] font-black text-[#D4AF37] uppercase tracking-wider mb-1">
                    {node.year}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B132B] font-serif">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-[#4B5563] leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
