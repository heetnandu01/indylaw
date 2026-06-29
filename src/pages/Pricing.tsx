import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronDown, HelpCircle, Sparkles } from 'lucide-react'

interface PricingPlan {
  name: string
  desc: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  ctaText: string
  popular: boolean
}

export const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const navigate = useNavigate()

  const plans: PricingPlan[] = [
    {
      name: 'Starter',
      desc: 'Essential AI research and workflows for individual practitioners.',
      monthlyPrice: 2999,
      yearlyPrice: 2399,
      features: [
        'Individual Lawyers allocation',
        'Basic AI Case Research',
        'Limited Draft generations (50 / month)',
        'Supreme Court & High Court filters',
        'Standard customer support'
      ],
      ctaText: 'Start Starter Trial',
      popular: false
    },
    {
      name: 'Professional',
      desc: 'Complete litigation OS for growing chambers and boutique firms.',
      monthlyPrice: 5999,
      yearlyPrice: 4799,
      features: [
        'Unlimited AI Research searches',
        'Unlimited Draft generations',
        'Project Workspaces integration',
        'Notes & Highlights repository',
        'CNR Case automatic updates',
        'Priority email support'
      ],
      ctaText: 'Upgrade to Professional',
      popular: true
    },
    {
      name: 'Enterprise',
      desc: 'Robust customized security and RAG workspaces for large firms and banks.',
      monthlyPrice: 14999,
      yearlyPrice: 9599,
      features: [
        'Team Collaboration features',
        'Custom RAG Spaces & file uploads',
        'API Access for internal tools',
        'SAML SSO & Audit log exports',
        'Dedicated account manager',
        'VPC cloud hosting option'
      ],
      ctaText: 'Contact Enterprise',
      popular: false
    }
  ]

  const faqs = [
    {
      q: 'Is there a free trial option?',
      a: 'Yes, we offer a 14-day free trial on our Starter and Professional plans. No credit card is required to sign up and test the platform capabilities.'
    },
    {
      q: 'Can we switch between plans or cancel at any time?',
      a: 'Absolutely. You can upgrade, downgrade, or cancel your active subscription directly from your account billing dashboard at any time. If you cancel, your access remains valid until the end of the billing period.'
    },
    {
      q: 'How does the yearly subscription discount work?',
      a: 'When you choose yearly billing, you receive a 20% discount on the equivalent monthly pricing. This is billed upfront as a single annual charge.'
    },
    {
      q: 'Do you offer onboarding assistance for teams?',
      a: 'Yes, for Professional and Enterprise teams, we provide tailored onboarding workshops, custom database preparation, and direct integration setup to ensure smooth transition of case history records.'
    },
    {
      q: 'Is our corporate legal data safe on IndyLaw?',
      a: 'Security is our core priority. All user uploads, notes, drafts, and queries are encrypted at-rest and in-transit. Enterprise workspaces operate in isolated tenants, ensuring zero data leakage.'
    }
  ]

  const handleCtaClick = (planName: string) => {
    if (planName === 'Enterprise') {
      navigate('/request-demo')
    } else {
      navigate('/request-demo') // Redirect all actions to Request Demo per prompt instruction
    }
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#111827] font-sans selection:bg-[#D4AF37]/30 selection:text-[#0B132B]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-[#0B132B] text-white border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Pricing Tiers
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Transparent, Value-Driven Plans
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF9F6]/80 max-w-lg mx-auto">
            Choose the plan that fits your practice. Upgrade, downgrade, or cancel whenever you need.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center items-center gap-3 pt-4">
            <span className={`text-xs font-semibold uppercase tracking-wider ${!isYearly ? 'text-[#D4AF37]' : 'text-white/60'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6.5 rounded-full bg-white/10 border border-white/20 p-1 flex items-center transition-all cursor-pointer relative"
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-[#D4AF37] transition-all absolute ${
                  isYearly ? 'right-1' : 'left-1'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${isYearly ? 'text-[#D4AF37]' : 'text-white/60'}`}>
              Yearly
              <span className="bg-[#D4AF37] text-[#0B132B] text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Plan Cards Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
            return (
              <div
                key={plan.name}
                className={`border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-[#0B132B] text-white border-[#D4AF37] shadow-xl md:-translate-y-4'
                    : 'bg-white text-[#0B132B] border-[#0B132B]/10 hover:border-[#D4AF37]/50 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0B132B] text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full border border-white/20 shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-serif">{plan.name}</h3>
                    <p className={`text-xs mt-2 leading-relaxed ${plan.popular ? 'text-[#FAF9F6]/75' : 'text-[#4B5563]'}`}>
                      {plan.desc}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold font-serif text-[#D4AF37]">₹</span>
                    <span className="text-4xl font-serif font-bold tracking-tight">
                      {price.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${plan.popular ? 'text-[#FAF9F6]/50' : 'text-slate-muted'}`}>
                      / month
                    </span>
                  </div>

                  <hr className={`border-t ${plan.popular ? 'border-white/10' : 'border-[#0B132B]/5'}`} />

                  <div className="space-y-3.5">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className={`text-xs font-medium leading-tight ${plan.popular ? 'text-white/95' : 'text-[#0B132B]/85'}`}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleCtaClick(plan.name)}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      plan.popular
                        ? 'bg-[#D4AF37] hover:bg-[#FAF9F6] text-[#0B132B] hover:shadow-lg'
                        : 'bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B]'
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Enterprise CTA block */}
      <section className="bg-white border-t border-b border-[#0B132B]/5 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#0B132B]">Need Custom Firm Infrastructure?</h2>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            We provide private tenant integrations, custom API endpoints, localized on-premise solutions, and tailored data compliance guidelines for nationalized financial institutions and large legal cells.
          </p>
          <div>
            <button
              onClick={() => navigate('/request-demo')}
              className="px-6 py-3.5 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] font-bold rounded-xl text-xs transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Common Inquiries</h2>
          <h3 className="text-3xl font-serif font-bold text-[#0B132B]">Pricing & Billing FAQs</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index
            return (
              <div
                key={index}
                className="bg-white border border-[#0B132B]/5 hover:border-[#D4AF37]/30 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-sans cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-[#0B132B]">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-muted transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#4B5563] leading-relaxed border-t border-[#0B132B]/5 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
