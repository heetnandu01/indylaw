import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Trust } from '../components/Trust'
import { Problem } from '../components/Problem'
import { WhyIndyLaw } from '../components/WhyIndyLaw'
import { DemoShowcase } from '../components/DemoShowcase'
import { SocialProof } from '../components/SocialProof'
import { ArrowRight, Sparkles } from 'lucide-react'

export const Home: React.FC = () => {
  const navigate = useNavigate()

  const handleBookDemo = () => {
    navigate('/request-demo')
  }

  const handleScrollToDemoShowcase = () => {
    const el = document.getElementById('demo-showcase-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full">
      {/* Existing Hero Section (Exactly as it is, untouched internally) */}
      <Hero onBookDemoClick={handleBookDemo} onWatchTourClick={handleScrollToDemoShowcase} />

      {/* Problem Section (Fragmented vs Integrated) */}
      <Problem />

      {/* Short Product Overview (Demo Showcase) */}
      <DemoShowcase />

      {/* Brief Platform Benefits (WhyIndyLaw comparison grid) */}
      <WhyIndyLaw />

      {/* Customer Trust Section (Loges, Cards & Social Proof) */}
      <Trust />
      <SocialProof />

      {/* Final Action CTA Block */}
      <section
        id="final-cta-section"
        className="py-24 bg-[#0B132B] text-white px-6 text-center relative overflow-hidden border-t border-[#D4AF37]/20"
      >
        {/* Decorative Grid overlays */}
        <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Start your modernization today
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            The Future of Legal Work in India
          </h2>

          <p className="text-xs sm:text-sm text-[#FAF9F6]/80 max-w-md mx-auto">
            Research faster. Draft smarter. Manage everything. Experience the unified AI-native OS built for Indian courts.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              id="final-cta-demo"
              onClick={handleBookDemo}
              className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#FAF9F6] text-[#0B132B] font-bold rounded-xl text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Book Demo
            </button>
            <button
              id="final-cta-trial"
              onClick={handleBookDemo}
              className="px-6 py-3.5 border border-white/20 hover:border-[#D4AF37] bg-white/5 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
