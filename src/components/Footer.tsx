import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'

export const Footer: React.FC = () => {
  const platformLinks = [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Security', path: '/security' },
    { label: 'Request Demo', path: '/request-demo' }
  ]

  const companyLinks = [
    { label: 'About', path: '/about' },
    { label: 'Team', path: '/team' },
    { label: 'Contact', path: '/contact' }
  ]

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms & Conditions', path: '/terms' }
  ]

  return (
    <footer id="main-footer" className="bg-[#0B132B] text-white py-16 px-6 font-sans border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="w-fit hover:opacity-80 transition-opacity">
            <Logo variant="light" iconSize={32} />
          </Link>
          <p className="text-[11px] text-[#FAF9F6]/60 leading-relaxed max-w-xs">
            India's AI-Native Legal Operating System. Grounded in Indian jurisprudence. Built for precision, privacy, and performance.
          </p>

          {/* Social Links */}
          <div className="flex gap-3 pt-2">
            <a
              href="https://linkedin.com/company/indylaw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IndyLaw LinkedIn"
              className="text-[#FAF9F6]/60 hover:text-[#D4AF37] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75.784 1.75 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Platform Column */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Platform</h4>
          <ul className="space-y-2 text-[11px] text-[#FAF9F6]/60">
            {platformLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Company</h4>
          <ul className="space-y-2 text-[11px] text-[#FAF9F6]/60">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Column */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Legal</h4>
          <ul className="space-y-2 text-[11px] text-[#FAF9F6]/60">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.path} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto border-t border-[#FAF9F6]/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#FAF9F6]/40 gap-4">
        <span>© 2026 IndyLaw Technologies Private Limited. All rights reserved.</span>
        <span>India Data Residency Guaranteed · SOC2 Compliant</span>
      </div>
    </footer>
  )
}
