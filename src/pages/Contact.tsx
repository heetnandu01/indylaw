import React, { useState } from 'react'
import { Mail, ExternalLink, Building2, Send, CheckCircle, Sparkles } from 'lucide-react'

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim() || form.name.trim().length < 2) newErrors.name = 'Full name is required.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Valid email is required.'
    if (!form.subject.trim()) newErrors.subject = 'Subject is required.'
    if (!form.message.trim() || form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters.'
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitting(true)
    // Simulate API submission
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1400)
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#111827] font-sans selection:bg-[#D4AF37]/30 selection:text-[#0B132B]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-[#0B132B] text-white border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 bg-grid-dots opacity-[0.03] pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Contact IndyLaw
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF9F6]/80 max-w-lg mx-auto">
            Have a question, partnership proposal, or press inquiry? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left: Company Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#0B132B] font-serif">IndyLaw Technologies</h2>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                India's AI-Native Legal Operating System. Grounded in Indian jurisprudence. Secure by design.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">Email</p>
                  <a href="mailto:hello@indylaw.in" className="text-xs text-[#4B5563] hover:text-[#D4AF37] transition-colors">
                    hello@indylaw.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">LinkedIn</p>
                  <a
                    href="https://linkedin.com/company/indylaw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#4B5563] hover:text-[#D4AF37] transition-colors"
                  >
                    linkedin.com/company/indylaw
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0B132B] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider">Registered Office</p>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    IndyLaw Technologies Pvt. Ltd.<br />
                    New Delhi, India — 110001
                  </p>
                </div>
              </div>
            </div>

            {/* Highlight Card */}
            <div className="bg-[#0B132B] text-white rounded-2xl p-6 space-y-2 border border-[#D4AF37]/20">
              <h4 className="text-sm font-bold font-serif text-[#D4AF37]">Looking to book a demo?</h4>
              <p className="text-[11px] text-[#FAF9F6]/75 leading-relaxed">
                For personalized product tours, use our dedicated Request Demo page for faster scheduling.
              </p>
              <a
                href="/request-demo"
                className="inline-block mt-3 px-4 py-2 bg-[#D4AF37] hover:bg-white text-[#0B132B] font-bold text-xs rounded-xl transition-all"
              >
                Request a Demo →
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#0B132B]/10 rounded-3xl p-8 shadow-sm">
              {!submitted ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#0B132B] font-serif">Send a Message</h3>
                    <p className="text-[11px] text-[#4B5563] mt-1">We typically respond within 1–2 business days.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">Full Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className={`w-full bg-[#FAF9F6] text-xs border ${errors.name ? 'border-red-400' : 'border-[#0B132B]/10'} rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37] transition-colors`}
                        />
                        {errors.name && <p className="text-[9px] text-red-500 mt-1 font-semibold">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">Email Address</label>
                        <input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          className={`w-full bg-[#FAF9F6] text-xs border ${errors.email ? 'border-red-400' : 'border-[#0B132B]/10'} rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37] transition-colors`}
                        />
                        {errors.email && <p className="text-[9px] text-red-500 mt-1 font-semibold">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="What is this about?"
                        className={`w-full bg-[#FAF9F6] text-xs border ${errors.subject ? 'border-red-400' : 'border-[#0B132B]/10'} rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37] transition-colors`}
                      />
                      {errors.subject && <p className="text-[9px] text-red-500 mt-1 font-semibold">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">Message</label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us what's on your mind..."
                        className={`w-full bg-[#FAF9F6] text-xs border ${errors.message ? 'border-red-400' : 'border-[#0B132B]/10'} rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none`}
                      />
                      {errors.message && <p className="text-[9px] text-red-500 mt-1 font-semibold">{errors.message}</p>}
                    </div>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B132B] font-serif">Message Sent!</h3>
                  <p className="text-xs text-[#4B5563] max-w-xs">
                    Thank you for reaching out. We'll respond to your message within 1–2 business days.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
