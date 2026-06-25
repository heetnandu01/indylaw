import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { User, Mail, Phone, Building, CheckCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'

const formSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().regex(/^[0-9\s+\-()]{10,15}$/, { message: 'Enter a valid phone number (10-15 digits).' }),
  organization: z.string().min(2, { message: 'Organization name is required.' })
})

type FormData = z.infer<typeof formSchema>

const ADMIN_EMAIL = 'admin@indylaw.in'

async function sendViaResend(data: FormData): Promise<void> {
  // Access the API key using Vite's typed env object
  const apiKey: string | undefined = typeof import.meta.env !== 'undefined'
    ? (import.meta.env as Record<string, string | undefined>)['VITE_RESEND_API_KEY']
    : undefined

  if (!apiKey) {
    // Graceful fallback: log and simulate success
    console.log('[IndyLaw Demo Request — Resend not configured. Would have sent:]', {
      admin: { to: ADMIN_EMAIL, subject: `New Demo Request from ${data.fullName}`, ...data },
      user: { to: data.email, subject: 'Your IndyLaw Demo Request is Confirmed' }
    })
    return new Promise((res) => setTimeout(res, 1200))
  }

  // Send admin notification
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'IndyLaw <noreply@indylaw.in>',
      to: [ADMIN_EMAIL],
      subject: `New Demo Request from ${data.fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
          <div style="background: #0B132B; color: white; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h2 style="margin:0; font-size: 20px; color: #D4AF37;">New Demo Request</h2>
          </div>
          <div style="padding: 32px; background: #FAF9F6; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <table width="100%" cellpadding="6" style="font-size: 13px; border-collapse: collapse;">
              <tr><td style="color:#6B7280; width: 140px; vertical-align:top; font-weight:bold;">Name</td><td style="color:#111827;">${data.fullName}</td></tr>
              <tr><td style="color:#6B7280; font-weight:bold;">Email</td><td style="color:#111827;">${data.email}</td></tr>
              <tr><td style="color:#6B7280; font-weight:bold;">Phone</td><td style="color:#111827;">${data.phone}</td></tr>
              <tr><td style="color:#6B7280; font-weight:bold;">Organization</td><td style="color:#111827;">${data.organization}</td></tr>
            </table>
          </div>
        </div>
      `
    })
  })

  // Send user confirmation
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      from: 'IndyLaw <noreply@indylaw.in>',
      to: [data.email],
      subject: 'Your IndyLaw Demo Request is Confirmed',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111827;">
          <div style="background: #0B132B; color: white; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h2 style="margin:0; font-size: 20px; color: #D4AF37;">Demo Request Confirmed</h2>
          </div>
          <div style="padding: 32px; background: #FAF9F6; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p>Hi <strong>${data.fullName}</strong>,</p>
            <p style="color:#4B5563; font-size: 13px; line-height: 1.6;">
              Thank you for requesting a demo of IndyLaw. Our team will review your details and reach out within <strong>1–2 business days</strong> to schedule a personalized walkthrough.
            </p>
            <p style="color:#4B5563; font-size: 13px;">We look forward to showing you India's AI-Native Legal Operating System.</p>
            <p style="margin-top: 24px; color:#AA820A; font-weight: bold; font-size: 13px;">— The IndyLaw Team</p>
          </div>
        </div>
      `
    })
  })
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
      await sendViaResend(data)
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

                <div className="flex flex-wrap gap-4 pt-3 text-[10px] text-[#FAF9F6]/70">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>SOC2 Compliant</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>India Data Residency</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Grounded in Supreme Court</span>
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
