import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { User, Mail, Phone, Building, CheckCircle, Sparkles, ShieldCheck, ArrowRight, Briefcase, Users, Scale } from 'lucide-react'

const formSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^[0-9\s+\-()]{10,15}$/, { message: 'Enter a valid phone number (10-15 digits).' }),
  organization: z.string().min(2, { message: 'Organization name is required.' }),
  role: z.string().optional(),
  teamSize: z.string().optional(),
  practiceArea: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

// Send demo request to the secure Express backend.
// The Vite proxy forwards /api → http://localhost:3000 during development.
// The Resend API key lives only in server/.env — never in the browser bundle.
async function submitDemoRequest(data: FormData): Promise<void> {
  const res = await fetch('/api/request-demo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.fullName,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      role: data.role,
      teamSize: data.teamSize,
      practiceArea: data.practiceArea,
    }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(
      (body as { message?: string }).message ||
        `Server error (${res.status}). Please try again.`
    )
  }
}

export const RequestDemo: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      await submitDemoRequest(data)
      setIsSuccess(true)
    } catch (err) {
      console.error('Demo form submission error:', err)
      setSubmitError('Something went wrong. Please email us directly at hello@indylaw.in')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#0B132B]">
      {/* Main centered content */}
      <div className="flex-1 flex items-center justify-center px-6 py-32">
        <div className="w-full max-w-2xl">

          {/* Card */}
          <div className="bg-white border border-[#0B132B]/10 rounded-3xl shadow-2xl overflow-hidden">

            {/* Card Header Banner */}
            <div className="bg-[#0B132B] px-8 py-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-dots opacity-[0.04] pointer-events-none" />
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#D4AF37]/5 blur-2xl" />
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Private Demo
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Request Your IndyLaw Demo
                </h1>
                <p className="text-xs text-[#FAF9F6]/75 max-w-md leading-relaxed">
                  Fill in your details below and our team will personally schedule a guided walkthrough of the platform tailored to your practice.
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 text-[10.5px] text-[#FAF9F6]/80">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span>SOC2 Compliant</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span>India Data Residency</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span>Grounded in Supreme Court</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span>Zero LLM Data Training</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span>AES-256 Encryption</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span>99.9% Uptime SLA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Body */}
            <div className="px-8 py-10">
              {!isSuccess ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B5563]" />
                      <input
                        id="demo-fullName"
                        type="text"
                        {...register('fullName')}
                        placeholder="e.g. Priya Kapoor"
                        className={`w-full bg-[#FAF9F6] text-xs border ${
                          errors.fullName ? 'border-red-400' : 'border-[#0B132B]/10'
                        } rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors`}
                      />
                    </div>
                    {errors.fullName && <p className="text-[9px] text-red-500 mt-1 font-semibold">{errors.fullName.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B5563]" />
                      <input
                        id="demo-email"
                        type="email"
                        {...register('email')}
                        placeholder="yourname@firm.com"
                        className={`w-full bg-[#FAF9F6] text-xs border ${
                          errors.email ? 'border-red-400' : 'border-[#0B132B]/10'
                        } rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors`}
                      />
                    </div>
                    {errors.email && <p className="text-[9px] text-red-500 mt-1 font-semibold">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">
                      Phone Number <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B5563]" />
                      <input
                        id="demo-phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="+91 98765 43210"
                        className={`w-full bg-[#FAF9F6] text-xs border ${
                          errors.phone ? 'border-red-400' : 'border-[#0B132B]/10'
                        } rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors`}
                      />
                    </div>
                    {errors.phone && <p className="text-[9px] text-red-500 mt-1 font-semibold">{errors.phone.message}</p>}
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">
                      Organization <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B5563]" />
                      <input
                        id="demo-organization"
                        type="text"
                        {...register('organization')}
                        placeholder="Law Firm / Company / Bank"
                        className={`w-full bg-[#FAF9F6] text-xs border ${
                          errors.organization ? 'border-red-400' : 'border-[#0B132B]/10'
                        } rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors`}
                      />
                    </div>
                    {errors.organization && <p className="text-[9px] text-red-500 mt-1 font-semibold">{errors.organization.message}</p>}
                  </div>

                  {/* Role and Team Size Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Role */}
                    <div>
                      <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">
                        Role / Designation
                      </label>
                      <div className="relative">
                        <Briefcase className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B5563]" />
                        <input
                          id="demo-role"
                          type="text"
                          {...register('role')}
                          placeholder="e.g. Partner / GC"
                          className="w-full bg-[#FAF9F6] text-xs border border-[#0B132B]/10 rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Team Size */}
                    <div>
                      <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">
                        Team Size
                      </label>
                      <div className="relative">
                        <Users className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B5563]" />
                        <input
                          id="demo-teamSize"
                          type="text"
                          {...register('teamSize')}
                          placeholder="e.g. 5, 25, 100+"
                          className="w-full bg-[#FAF9F6] text-xs border border-[#0B132B]/10 rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Practice Area */}
                  <div>
                    <label className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block mb-1.5">
                      Practice Area
                    </label>
                    <div className="relative">
                      <Scale className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B5563]" />
                      <input
                        id="demo-practiceArea"
                        type="text"
                        {...register('practiceArea')}
                        placeholder="e.g. Litigation, Corporate, Arbitration"
                        className="w-full bg-[#FAF9F6] text-xs border border-[#0B132B]/10 rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  {submitError && (
                    <p className="text-[10px] text-red-500 font-semibold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                      {submitError}
                    </p>
                  )}

                  <button
                    id="demo-submit-btn"
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {submitting ? (
                      <span className="animate-pulse tracking-wider">Submitting Request…</span>
                    ) : (
                      <>
                        <span>Request Demo</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[9px] text-[#4B5563]/60 text-center pt-1">
                    By submitting, you agree to our Privacy Policy. We will never share your details.
                  </p>
                </form>
              ) : (
                /* Success State */
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-5">
                  <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-[#D4AF37]" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-[#0B132B] font-serif">Request Received!</h2>
                    <p className="text-xs text-[#4B5563] max-w-sm leading-relaxed">
                      Thank you for reaching out. Our team will review your details and reach out within{' '}
                      <strong>1–2 business days</strong> to schedule your private walkthrough.
                    </p>
                  </div>
                  <div className="w-full max-w-xs bg-[#FAF9F6] border border-[#0B132B]/10 rounded-2xl p-4 space-y-2 text-xs text-[#4B5563]">
                    <p className="font-bold text-[#0B132B] text-[10px] uppercase tracking-wider">What happens next</p>
                    {[
                      'Check your inbox for a confirmation email.',
                      'Our team reviews your organization profile.',
                      'We schedule a personalized live demo session.'
                    ].map((step, i) => (
                      <div key={step} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 text-[#AA820A] flex items-center justify-center text-[8px] font-black flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
