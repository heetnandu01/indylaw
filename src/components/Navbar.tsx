import React, { useState, useEffect } from 'react'
import { Scale, Menu, X, ArrowRight } from 'lucide-react'

interface NavbarProps {
  onBookDemoClick: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onBookDemoClick }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Scroll listener for sticky blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine active section based on scroll position
      const sections = ['research', 'explorer', 'highlights', 'canvas', 'drafts', 'projects', 'calendar', 'clients']
      const scrollPos = window.scrollY + 100

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Research', target: 'research' },
    { label: 'Case Explorer', target: 'explorer' },
    { label: 'Highlights', target: 'highlights' },
    { label: 'Canvas', target: 'canvas' },
    { label: 'Drafting', target: 'drafts' },
    { label: 'Projects', target: 'projects' },
    { label: 'Calendar', target: 'calendar' },
    { label: 'Clients', target: 'clients' }
  ]

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(target)
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav border-b border-[#0B132B]/5 shadow-sm py-3'
          : 'bg-[#FAF9F6] border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          id="logo-container"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#0B132B] flex items-center justify-center text-[#D4AF37] shadow-md group-hover:scale-105 transition-transform">
            <Scale className="w-5 h-5" />
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-[#0B132B]">
            IndyLaw
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.label}
              id={`nav-link-${link.target}`}
              onClick={() => handleLinkClick(link.target)}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeSection === link.target
                  ? 'text-[#D4AF37] font-bold'
                  : 'text-[#0B132B]/75 hover:text-[#0B132B]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            id="nav-demo-btn"
            onClick={onBookDemoClick}
            className="px-4 py-2 border border-[#0B132B]/10 hover:border-[#D4AF37] text-xs font-bold text-[#0B132B] rounded-xl transition-all cursor-pointer bg-white/50"
          >
            Book Demo
          </button>
          <button
            id="nav-trial-btn"
            onClick={onBookDemoClick}
            className="px-4 py-2 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1 text-[#0B132B] hover:bg-[#0B132B]/5 rounded-lg transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FAF9F6] border-b border-[#0B132B]/5 shadow-lg flex flex-col p-6 gap-4 lg:hidden animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.label}
              id={`mobile-nav-link-${link.target}`}
              onClick={() => handleLinkClick(link.target)}
              className="text-sm font-bold text-left text-[#0B132B]/85 hover:text-[#D4AF37] py-1"
            >
              {link.label}
            </button>
          ))}
          <div className="border-t border-[#0B132B]/5 pt-4 flex flex-col gap-2">
            <button
              id="mobile-nav-demo-btn"
              onClick={onBookDemoClick}
              className="w-full py-2.5 text-center border border-[#0B132B]/10 rounded-xl text-xs font-bold text-[#0B132B] cursor-pointer"
            >
              Book Demo
            </button>
            <button
              id="mobile-nav-trial-btn"
              onClick={onBookDemoClick}
              className="w-full py-2.5 text-center bg-[#0B132B] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
