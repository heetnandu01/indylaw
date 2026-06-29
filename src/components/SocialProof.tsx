import React from 'react'
import { Star, MessageSquare } from 'lucide-react'

export const SocialProof: React.FC = () => {
  const testimonials = [
    {
      name: 'Rohan Sharma',
      role: 'Law Firm Partner',
      firm: 'Shardul & Co. Advocates',
      quote: 'IndyLaw changed how we brief senior counsel. Canvas argument mapping ensures our strategy is fully visual before drafts begin. The citation accuracy matches our manual library team.'
    },
    {
      name: 'Priyanka Sen',
      role: 'General Counsel',
      firm: 'Apex Tech India',
      quote: 'Contract turnarounds dropped by 70%. We keep all our highlights and regulatory notices in a single workspace. Excellent for Indian corporate statutory MCA compliance.'
    },

    {
      name: 'Sandip Adhikari',
      role: 'Bank Legal Head',
      firm: 'State Bank of India Corporate Cell',
      quote: 'We track recovery notices and RBI circulars in one unified place. Cause-list syncing ensures we never miss a hearing date at NCLT or DRT, reducing portfolio risk.'
    },
    {
      name: 'Meenakshi Iyer',
      role: 'Insurance Legal Head',
      firm: 'National Insurance Corp.',
      quote: 'Claims dispute briefs are now standardized. MACT and Consumer Court precedent search is incredibly precise, allowing our panels to manage thousands of active claims at once.'
    }
  ]

  return (
    <section id="social-proof" className="py-20 bg-[#FAF9F6] px-6 font-sans border-t border-[#0B132B]/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans">Legal Validation</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
            Built with Legal Professionals
          </h3>
          <p className="text-xs sm:text-sm text-slate-muted max-w-xl mx-auto">
            Read how legal general counsels, law firm partners, senior advocates, and financial compliance heads transform their daily legal practice with IndyLaw.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <div
              key={test.name}
              id={`testimonial-${idx}`}
              className="bg-white border border-[#0B132B]/5 hover:border-[#D4AF37] p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-xs text-[#4B5563] leading-relaxed italic font-serif">
                  "{test.quote}"
                </p>
              </div>

              {/* Profile info */}
              <div className="mt-6 pt-4 border-t border-[#0B132B]/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#0B132B]/10 flex items-center justify-center text-[#D4AF37]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0B132B]">{test.name}</h4>
                  <div className="text-[10px] text-slate-muted font-medium">
                    {test.role} • <span className="text-[#AA820A]">{test.firm}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
