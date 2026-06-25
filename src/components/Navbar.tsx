import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from './Logo'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Scroll listener for sticky blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Security', path: '/security' },
    { label: 'About', path: '/about' },
    { label: 'Team', path: '/team' },
    { label: 'Contact', path: '/contact' }
  ]

  const isActive = (path: string) => location.pathname === path

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
        {/* Logo — replace inner content with supplied logo asset when available */}
        <Link
          to="/"
          id="logo-container"
          className="flex items-center cursor-pointer group"
        >
          <Logo variant="dark" iconSize={34} className="group-hover:opacity-90 transition-opacity" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              id={`nav-link-${link.label.toLowerCase()}`}
              className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                isActive(link.path)
                  ? 'text-[#D4AF37] font-bold'
                  : 'text-[#0B132B]/75 hover:text-[#0B132B]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            id="nav-request-demo-btn"
            onClick={() => navigate('/request-demo')}
            className="px-5 py-2.5 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1 text-[#0B132B] hover:bg-[#0B132B]/5 rounded-lg transition-colors cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FAF9F6] border-b border-[#0B132B]/5 shadow-lg flex flex-col p-6 gap-4 lg:hidden animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              id={`mobile-nav-link-${link.label.toLowerCase()}`}
              className={`text-sm font-bold text-left py-1 transition-colors ${
                isActive(link.path) ? 'text-[#D4AF37]' : 'text-[#0B132B]/85 hover:text-[#D4AF37]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[#0B132B]/5 pt-4">
            <Link
              to="/request-demo"
              id="mobile-nav-request-demo-btn"
              className="w-full py-3 text-center bg-[#0B132B] text-white rounded-xl text-xs font-bold block hover:bg-[#D4AF37] hover:text-[#0B132B] transition-all"
            >
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
