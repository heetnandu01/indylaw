import React from 'react'
import { ShieldCheck, Database, FileCheck, Lock, Cloud, Shield, EyeOff, Server, Sparkles } from 'lucide-react'

export const Security: React.FC = () => {
  const securitySections = [
    {
      id: 'data-security',
      title: 'Data Security',
      badge: 'Infrastructure',
      icon: Database,
      items: [
        { label: 'Encryption at Rest', value: 'All customer files, data records, search logs, and drafts are fully encrypted at rest using industry-standard AES-256 encryption. Master keys are securely rotated and kept in isolated key vaults.' },
        { label: 'Encryption in Transit', value: 'Communication between client browsers, APIs, and databases is forced over secure TLS 1.3 tunnels, preventing any packet sniffing or intermediate data inspection.' }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy Protocols',
      badge: 'Confidentiality',
      icon: EyeOff,
      items: [
        { label: 'Confidential Legal Data Handling', value: 'We enforce clean data-handling structures. No customer data or uploaded materials are ever used to train public or foundational model weights.' },
        { label: 'Secure Storage Isolation', value: 'Files uploaded inside projects are stored in isolated document containers with unique system keys to guarantee clean tenant segregation.' }
      ]
    },
    {
      id: 'compliance',
      title: 'Compliance & Governance',
      badge: 'Auditing',
      icon: FileCheck,
      items: [
        { label: 'Role-Based Access Control', value: 'Configure detailed folder, note, draft, and client records permissions. Ensure associates only access authorized files.' },
        { label: 'Audit Logging', value: 'Every query submitted, citation saved, draft created, or download request is logged with comprehensive audit metrics containing active timestamps.' }
      ]
    },
    {
      id: 'ai-security',
      title: 'AI Sandbox Security',
      badge: 'Model Privacy',
      icon: ShieldCheck,
      items: [
        { label: 'Isolated Workspaces', value: 'Context vectors and RAG indexing are scoped dynamically per case workspace. A query inside case A never fetches evidence uploaded for case B.' },
        { label: 'Private Knowledge Bases', value: 'Create custom knowledge repositories that remain exclusively yours. Accessible only by authorized workspace licenses.' }
      ]
    }
  ]

  const credentials = [
    { title: 'SAML SSO Logins', desc: 'Secure SSO support including Active Directory, Okta, and forced multi-factor authorization (MFA).', icon: Lock },
    { title: 'SOC2 Type II Assured', desc: 'Regular external testing verifies our processing safety and data isolation rules.', icon: Shield },
    { title: 'Indian AWS Hosting', desc: 'All data residency is preserved locally in secure Indian AWS cloud zones.', icon: Server },
    { title: 'Secure VPC Option', desc: 'Enterprise teams can deploy isolated virtual private clouds for fully custom containment.', icon: Cloud }
  ]

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#111827] font-sans selection:bg-[#D4AF37]/30 selection:text-[#0B132B]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-[#0B132B] text-white border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Security & Trust
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Enterprise-Grade Protection
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF9F6]/80 max-w-lg mx-auto">
            Your case files and briefs are confidential. We build robust security systems to protect every action you take.
          </p>
        </div>
      </section>

      {/* Main Core Security Areas */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securitySections.map((sec) => {
            const Icon = sec.icon
            return (
              <div
                key={sec.id}
                className="bg-white border border-[#0B132B]/10 hover:border-[#D4AF37]/30 p-8 rounded-3xl shadow-sm transition-all duration-300 space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#AA820A] uppercase tracking-wider block">
                      {sec.badge}
                    </span>
                    <h3 className="text-lg font-bold text-[#0B132B] font-serif">{sec.title}</h3>
                  </div>
                </div>

                <hr className="border-[#0B132B]/5" />

                <div className="space-y-4">
                  {sec.items.map((item) => (
                    <div key={item.label} className="space-y-1">
                      <h4 className="text-xs font-bold text-[#0B132B] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                        {item.label}
                      </h4>
                      <p className="text-[11px] text-[#4B5563] leading-relaxed pl-3">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Security Credentials/Badges Section */}
      <section className="bg-white border-t border-[#0B132B]/5 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Compliance Credentials</h2>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B132B]">Rigorous Verification Protocols</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((cred) => {
              const Icon = cred.icon
              return (
                <div
                  key={cred.title}
                  className="bg-[#FAF9F6] border border-[#0B132B]/5 hover:border-[#D4AF37] p-6 rounded-2xl transition-all duration-300 flex flex-col items-center text-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#0B132B]/5 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#0B132B] group-hover:text-white transition-all shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#0B132B]">{cred.title}</h4>
                    <p className="text-[10px] text-slate-muted leading-relaxed">
                      {cred.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
