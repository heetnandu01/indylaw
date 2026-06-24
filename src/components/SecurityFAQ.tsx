import React, { useState } from 'react'
import { ShieldCheck, Key, Database, FileCheck, Lock, Cloud, ChevronDown, HelpCircle } from 'lucide-react'

interface FAQItem {
  q: string
  a: string
}

export const SecurityFAQ: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const securityCards = [
    {
      title: 'Role Based Access Control',
      desc: 'Enforce granular workspace permissions. Control draft edits, client structures, and matter access per associate.',
      icon: Key
    },
    {
      title: 'Secure Authentication',
      desc: 'SAML SSO, Active Directory integration, and forced multi-factor authentication (MFA) protects logins.',
      icon: Lock
    },
    {
      title: 'Encrypted Storage',
      desc: 'All drafts, highlights, and matter files are encrypted in-transit (TLS 1.3) and at-rest (AES-256).',
      icon: Database
    },
    {
      title: 'Audit Logs',
      desc: 'Track every query, highlight creation, draft download, and matter status edit with comprehensive audit logging.',
      icon: FileCheck
    },
    {
      title: 'Data Isolation',
      desc: 'We enforce logical tenant data isolation, preventing LLM weights sharing across corporate environments.',
      icon: ShieldCheck
    },
    {
      title: 'Cloud Infrastructure',
      desc: 'Hosted in secure local Indian AWS regions to satisfy strict data sovereignty requirements.',
      icon: Cloud
    }
  ]

  const faqs: FAQItem[] = [
    {
      q: 'What courts are covered?',
      a: 'IndyLaw indexes and updates precedents from the Supreme Court of India, all 25 High Courts, the National Company Law Tribunal (NCLT) across benches, NCLAT, and key financial regulatory bodies including the Reserve Bank of India (RBI) notifications database.'
    },
    {
      q: 'How accurate are responses?',
      a: 'Unlike generic models, IndyLaw uses Retrieval-Augmented Generation (RAG). Every answer generated is directly citation-grounded in validated court PDFs. If the system cannot find a judicial precedent, it states so rather than hallucinating.'
    },
    {
      q: 'Can I upload my own documents?',
      a: 'Yes. In your Project workspace, you can upload client pleadings, evidence files, contracts, or draft submissions. IndyLaw parses them privately, allowing you to run cross-document searches or ask case-specific questions.'
    },
    {
      q: 'Does IndyLaw replace legal advice?',
      a: 'No. IndyLaw is designed as a co-pilot for qualified legal professionals. It accelerates citation search, visual argument mapping, and draft structuring, but all outputs must be validated by practicing advocates.'
    },
    {
      q: 'Can teams collaborate?',
      a: 'Absolutely. Projects let law partners, general counsels, and researchers edit drafts, review Canvas graphs, and coordinate calendar court dates together in real-time.'
    },
    {
      q: 'Do you support enterprise deployments?',
      a: 'Yes. We offer virtual private cloud (VPC) deployments and dedicated local instances for large banks, NBFCs, insurance companies, and tier-1 law firms requiring strict compliance parameters.'
    },
    {
      q: 'How does billing work?',
      a: 'We offer flexible per-license monthly or annual billing for legal departments, alongside volume usage options for larger financial enterprises. Contact us during product tour requests to customize your pricing structure.'
    }
  ]

  return (
    <section id="security-faq" className="py-20 bg-white px-6 font-sans border-t border-[#0B132B]/5">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Security Grid */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans">Compliance & Trust</h2>
            <h3 className="text-3xl font-serif font-bold text-[#0B132B]">
              Enterprise-Grade Security
            </h3>
            <p className="text-xs text-slate-muted max-w-lg mx-auto">
              Your cases are private. We build compliance architectures to safeguard proprietary case files and firm communications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityCards.map((sec, idx) => {
              const Icon = sec.icon
              return (
                <div
                  key={sec.title}
                  id={`sec-${idx}`}
                  className="p-6 bg-[#FAF9F6] border border-[#0B132B]/5 hover:border-[#D4AF37] rounded-3xl transition-all duration-300 group hover:shadow-sm"
                >
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#0B132B]/5 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B132B] group-hover:text-white transition-all flex-shrink-0 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <h4 className="text-sm font-serif font-bold text-[#0B132B]">{sec.title}</h4>
                      <p className="text-xs text-[#4B5563] leading-relaxed">{sec.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans">Common Inquiries</h2>
            <h3 className="text-3xl font-serif font-bold text-[#0B132B]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-muted max-w-lg mx-auto">
              Have questions about court coverage, citation accuracy, or pricing? Find rapid answers below.
            </p>
          </div>

          <div className="space-y-3 bg-[#FAF9F6] border border-[#0B132B]/5 p-6 rounded-3xl shadow-sm">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div
                  key={index}
                  id={`faq-${index}`}
                  className="border-b border-[#0B132B]/5 last:border-b-0 pb-3 last:pb-0"
                >
                  <button
                    id={`faq-question-btn-${index}`}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-3 flex justify-between items-center text-left text-xs font-bold text-[#0B132B] hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#D4AF37]" /> {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#0B132B] transition-transform ${isOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="pl-6 pb-3 text-xs text-[#4B5563] leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
