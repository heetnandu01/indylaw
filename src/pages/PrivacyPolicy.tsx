import React from 'react'
import { Sparkles } from 'lucide-react'

interface PolicySection {
  id: string
  title: string
  content: string[]
}

export const PrivacyPolicy: React.FC = () => {
  const sections: PolicySection[] = [
    {
      id: 'data-collect',
      title: 'Data We Collect',
      content: [
        'Account information: When you register, we collect your name, email address, and organization name to create your secure account.',
        'Usage data: We collect anonymized telemetry data on feature interactions to improve platform reliability. This does not include the content of your legal queries or documents.',
        'Uploaded documents: Files you upload to Project workspaces (judgments, contracts, evidence) are stored in isolated encrypted containers tied to your account.',
        'Payment data: Billing information is processed entirely by our PCI-DSS compliant payment provider and is never stored on IndyLaw servers.'
      ]
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Data',
      content: [
        'Service delivery: To power the AI research, drafting, and matter-management features you access on the platform.',
        'Communication: To send you product updates, security alerts, and demo scheduling confirmations. You may unsubscribe from marketing communications at any time.',
        'Platform improvement: Anonymized, aggregated usage patterns help us improve performance, fix errors, and develop new features.',
        'We will never sell, rent, or share your personally identifiable data or legal work product with third parties for commercial or advertising purposes.'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      content: [
        'All data is encrypted at rest using AES-256 encryption and all communications are protected with TLS 1.3 in transit.',
        'Your workspace data is stored in logically isolated tenants — no query or document from your account is ever exposed to another organization\'s workspace.',
        'We maintain comprehensive access audit logs. Our infrastructure complies with SOC 2 Type II security standards.',
        'In the event of a data breach that affects your personal information, we will notify affected users within 72 hours of discovery, in accordance with applicable laws.'
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights',
      content: [
        'Access: You have the right to request a copy of all personal data we hold about you.',
        'Correction: You can update your personal information at any time from your account settings.',
        'Deletion: You may request deletion of your account and all associated data. Deletion requests are processed within 30 days.',
        'Portability: You can request an export of your data in a machine-readable format.',
        'To exercise any of these rights, contact us at privacy@indylaw.in.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking',
      content: [
        'We use strictly necessary cookies to maintain your authenticated session on the platform.',
        'With your consent, we use analytics cookies to understand how features are used. These cookies can be disabled from your browser settings at any time.',
        'We do not use advertising cookies or sell behavioral data to any advertising network.'
      ]
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      content: [
        'We may update this Privacy Policy from time to time. Material changes will be communicated via email and a notification within the platform at least 30 days before taking effect.',
        'Continued use of IndyLaw after the effective date of any change constitutes your acceptance of the revised policy.'
      ]
    }
  ]

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#111827] font-sans selection:bg-[#D4AF37]/30 selection:text-[#0B132B]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-[#0B132B] text-white border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-[#FAF9F6]/70">Last updated: June 2026 · IndyLaw Technologies Private Limited</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Table of Contents */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-3">Contents</p>
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block text-[11px] text-[#4B5563] hover:text-[#0B132B] font-medium py-0.5 transition-colors border-l-2 border-transparent hover:border-[#D4AF37] pl-3"
                >
                  {sec.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Policy Body */}
          <div className="lg:col-span-3 space-y-12">
            <p className="text-xs text-[#4B5563] leading-relaxed border-l-4 border-[#D4AF37] pl-4 italic bg-white rounded-r-xl py-3 pr-4">
              IndyLaw Technologies Private Limited ("IndyLaw," "we," or "us") respects the privacy and confidentiality of your legal work. This Privacy Policy explains how we collect, use, protect, and share information when you use our platform.
            </p>

            {sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="space-y-4 scroll-mt-28">
                <h2 className="text-xl font-bold text-[#0B132B] font-serif border-b border-[#0B132B]/10 pb-3">
                  {sec.title}
                </h2>
                <ul className="space-y-3">
                  {sec.content.map((para, i) => (
                    <li key={i} className="flex gap-3 text-xs text-[#4B5563] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                      <span>{para}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-[#0B132B] text-white rounded-2xl p-6 space-y-2 border border-[#D4AF37]/20">
              <h3 className="text-sm font-bold font-serif text-[#D4AF37]">Contact Our Privacy Team</h3>
              <p className="text-[11px] text-[#FAF9F6]/75">For privacy-related inquiries, data access requests, or to report a concern:</p>
              <a href="mailto:privacy@indylaw.in" className="text-xs font-bold text-[#D4AF37] hover:text-white transition-colors">
                privacy@indylaw.in
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
