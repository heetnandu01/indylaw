import React from 'react'
import { Scale } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-[#0B132B] text-white py-16 px-6 font-sans border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#0B132B] font-bold text-sm">
              <Scale className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-base tracking-tight text-white">IndyLaw</span>
          </div>
          <p className="text-[11px] text-[#FAF9F6]/60 leading-relaxed max-w-xs">
            IndyLaw — India's AI-Native Legal Operating System. Grounded in Indian jurisprudence. Built for precision.
          </p>
          <div className="flex gap-3 pt-2 text-[#FAF9F6]/60">
            <a href="#" aria-label="LinkedIn" className="hover:text-[#D4AF37] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75.784 1.75 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#D4AF37] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
        </div>


        {/* Product Column */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Product</h4>
          <ul className="space-y-2 text-[11px] text-[#FAF9F6]/60">
            <li><a href="#research" className="hover:text-white transition-colors">Research AI</a></li>
            <li><a href="#explorer" className="hover:text-white transition-colors">Case Explorer</a></li>
            <li><a href="#highlights" className="hover:text-white transition-colors">Highlights Workspace</a></li>
            <li><a href="#canvas" className="hover:text-white transition-colors">Canvas Argument Map</a></li>
            <li><a href="#drafts" className="hover:text-white transition-colors">Drafts Editor</a></li>
          </ul>
        </div>

        {/* Practice Management Column */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Practice Management</h4>
          <ul className="space-y-2 text-[11px] text-[#FAF9F6]/60">
            <li><a href="#projects" className="hover:text-white transition-colors">Litigation Projects</a></li>
            <li><a href="#calendar" className="hover:text-white transition-colors">Cause-list Calendar</a></li>
            <li><a href="#clients" className="hover:text-white transition-colors">Client CRM</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Company</h4>
          <ul className="space-y-2 text-[11px] text-[#FAF9F6]/60">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers (We're hiring)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Press</a></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Legal</h4>
          <ul className="space-y-2 text-[11px] text-[#FAF9F6]/60">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">SOC2 Security Assurance</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto border-t border-[#FAF9F6]/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#FAF9F6]/40 gap-4">
        <span>© 2026 IndyLaw Technologies Private Limited. All rights reserved.</span>
        <span>India Data Residency Guaranteed.</span>
      </div>
    </footer>
  )
}
