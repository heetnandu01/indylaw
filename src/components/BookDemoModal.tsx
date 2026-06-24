import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X, Calendar, Check, ArrowRight, ShieldCheck, Sparkles, Building, Phone, User, Mail, RefreshCw } from 'lucide-react'

// Define validation schema with Zod
const formSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid business email address.' }),
  firmName: z.string().min(2, { message: 'Law firm or company name is required.' }),
  phone: z.string().regex(/^[0-9\s+-]{10,15}$/, { message: 'Please enter a valid phone number (10-15 digits).' }),
  role: z.enum(['Law Firm Partner', 'General Counsel', 'Senior Advocate', 'Legal Associate', 'In-house Counsel', 'Other']),
  interests: z.array(z.string()).min(1, { message: 'Select at least one workspace feature.' })
})

type FormData = z.infer<typeof formSchema>

interface BookDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      firmName: '',
      phone: '',
      role: 'Law Firm Partner',
      interests: []
    }
  })

  const watchInterests = watch('interests')

  const onSubmit = (data: FormData) => {
    setSubmitting(true)
    console.log('Demo request submitted:', data)
    // Simulate API call to backend
    setTimeout(() => {
      setSubmitting(false)
      setIsSuccess(true)
    }, 1500)
  }


  const handleInterestToggle = (value: string) => {
    const current = watchInterests || []
    if (current.includes(value)) {
      setValue('interests', current.filter((item) => item !== value), { shouldValidate: true })
    } else {
      setValue('interests', [...current, value], { shouldValidate: true })
    }
  }

  if (!isOpen) return null

  const interestOptions = [
    'AI Legal Research',
    'Case Explorer Search',
    'highlights Workspace',
    'Canvas Argument Mapping',
    'AI Draft Generation',
    'Practice Management'
  ]

  return (
    <div className="fixed inset-0 bg-[#0B132B]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans animate-fadeIn">
      {/* Modal Card container */}
      <div className="bg-[#FAF9F6] border border-[#D4AF37] rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Left Column: Premium Branding */}
        <div className="w-full md:w-[35%] bg-[#0B132B] p-6 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D4AF37]/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FAF9F6] flex items-center justify-center text-[#0B132B] font-bold text-sm">IL</div>
              <span className="font-bold tracking-widest text-[#FAF9F6] uppercase text-xs">IndyLaw</span>
            </div>
            <h3 className="text-xl font-serif text-[#D4AF37] font-bold leading-tight">Elevate Your Legal Practice</h3>
            <p className="text-[11px] text-[#FAF9F6]/75 leading-relaxed">
              Join leading Indian law firms, GCs, and banks using AI-native workflows built for Indian jurisprudence.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#FAF9F6]/10 text-[10px] text-[#FAF9F6]/90">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>SOC2 Type II Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Grounded in Supreme Court</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form Panel */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative bg-white">
          {/* Close button */}
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-[#FAF9F6] rounded-full text-slate-muted hover:text-[#0B132B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-bold text-[#0B132B]">Schedule a Private Demo</h4>
                <p className="text-[11px] text-slate-muted">Configure your team workspace and trial access.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Full name input */}
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-3 text-[#4B5563]" />
                  <input
                    id="demo-fullName"
                    type="text"
                    {...register('fullName')}
                    placeholder="Full Name"
                    className={`w-full bg-[#FAF9F6] text-xs border ${errors.fullName ? 'border-red-500' : 'border-[#0B132B]/10'} rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#D4AF37]`}
                  />
                  {errors.fullName && <p className="text-[9px] text-red-500 mt-0.5 font-semibold">{errors.fullName.message}</p>}
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-[#4B5563]" />
                    <input
                      id="demo-email"
                      type="email"
                      {...register('email')}
                      placeholder="Business Email"
                      className={`w-full bg-[#FAF9F6] text-xs border ${errors.email ? 'border-red-500' : 'border-[#0B132B]/10'} rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#D4AF37]`}
                    />
                    {errors.email && <p className="text-[9px] text-red-500 mt-0.5 font-semibold">{errors.email.message}</p>}
                  </div>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-[#4B5563]" />
                    <input
                      id="demo-phone"
                      type="text"
                      {...register('phone')}
                      placeholder="Phone (e.g. +91 98...)"
                      className={`w-full bg-[#FAF9F6] text-xs border ${errors.phone ? 'border-red-500' : 'border-[#0B132B]/10'} rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#D4AF37]`}
                    />
                    {errors.phone && <p className="text-[9px] text-red-500 mt-0.5 font-semibold">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Firm Name and Role grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 absolute left-3 top-3 text-[#4B5563]" />
                    <input
                      id="demo-firmName"
                      type="text"
                      {...register('firmName')}
                      placeholder="Firm / Organization"
                      className={`w-full bg-[#FAF9F6] text-xs border ${errors.firmName ? 'border-red-500' : 'border-[#0B132B]/10'} rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#D4AF37]`}
                    />
                    {errors.firmName && <p className="text-[9px] text-red-500 mt-0.5 font-semibold">{errors.firmName.message}</p>}
                  </div>
                  <div>
                    <select
                      id="demo-role"
                      {...register('role')}
                      className={`w-full bg-[#FAF9F6] text-xs border ${errors.role ? 'border-red-500' : 'border-[#0B132B]/10'} rounded-lg px-3 py-2.5 focus:outline-none focus:border-[#D4AF37] text-slate-dark font-medium`}
                    >
                      <option value="Law Firm Partner">Law Firm Partner</option>
                      <option value="General Counsel">General Counsel</option>
                      <option value="Senior Advocate">Senior Advocate</option>
                      <option value="Legal Associate">Legal Associate</option>
                      <option value="In-house Counsel">In-house Counsel</option>
                      <option value="Other">Other Role</option>
                    </select>
                    {errors.role && <p className="text-[9px] text-red-500 mt-0.5 font-semibold">{errors.role.message}</p>}
                  </div>
                </div>

                {/* Interest checkboxes */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-[#0B132B] uppercase tracking-wider block">Areas of Interest</span>
                  <div className="grid grid-cols-2 gap-2">
                    {interestOptions.map((opt) => {
                      const isChecked = (watchInterests || []).includes(opt)
                      return (
                        <button
                          key={opt}
                          id={`interest-${opt.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                          type="button"
                          onClick={() => handleInterestToggle(opt)}
                          className={`px-3 py-2 rounded-lg border text-[9px] font-semibold text-left transition-all flex justify-between items-center cursor-pointer ${
                            isChecked
                              ? 'bg-[#0B132B]/5 border-[#D4AF37] text-[#0B132B]'
                              : 'bg-[#FAF9F6] border-[#0B132B]/5 text-slate-muted hover:border-[#D4AF37]/50'
                          }`}
                        >
                          <span>{opt}</span>
                          {isChecked && <Check className="w-3 h-3 text-[#D4AF37]" />}
                        </button>
                      )
                    })}
                  </div>
                  {errors.interests && <p className="text-[9px] text-red-500 mt-0.5 font-semibold">{errors.interests.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  id="submit-demo-form"
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all mt-4 cursor-pointer"
                >
                  {submitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Schedule Workspace Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center space-y-5 py-6 animate-fadeIn">
              <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-6 h-6" />
              </div>
              
              <div className="space-y-2">
                <h4 className="text-xl font-serif text-[#0B132B] font-bold">Demo Request Received</h4>
                <p className="text-xs text-slate-muted max-w-sm mx-auto">
                  Thank you! An IndyLaw account executive will contact you shortly to coordinate your private trial environment.
                </p>
              </div>

              {/* Booking slot simulator */}
              <div className="border border-[#D4AF37]/30 bg-[#FAF9F6] p-4 rounded-2xl max-w-sm mx-auto space-y-3">
                <div className="flex gap-2 items-center text-xs font-bold text-[#0B132B] justify-center">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" /> Select Instant Slot
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="slot-1"
                    type="button"
                    onClick={() => onClose()}
                    className="p-2 bg-white border border-[#0B132B]/10 hover:border-[#D4AF37] rounded-lg text-[10px] font-bold text-[#0B132B] hover:shadow-sm cursor-pointer text-center"
                  >
                    Tomorrow 11:00 AM IST
                  </button>
                  <button
                    id="slot-2"
                    type="button"
                    onClick={() => onClose()}
                    className="p-2 bg-white border border-[#0B132B]/10 hover:border-[#D4AF37] rounded-lg text-[10px] font-bold text-[#0B132B] hover:shadow-sm cursor-pointer text-center"
                  >
                    Tomorrow 03:00 PM IST
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
