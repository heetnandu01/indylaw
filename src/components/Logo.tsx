import React from 'react'

interface LogoProps {
  /** 'dark' = navy icon + dark text (for light backgrounds like Navbar)
   *  'light' = white icon + white text (for dark backgrounds like Footer/Hero) */
  variant?: 'dark' | 'light'
  className?: string
  iconSize?: number
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  iconSize = 36
}) => {
  const iconColor = variant === 'dark' ? '#0B132B' : '#FFFFFF'
  const textColor = variant === 'dark' ? '#0B132B' : '#FFFFFF'
  const accentColor = '#D4AF37'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon mark: document + scales of justice */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="IndyLaw logo mark"
      >
        {/* Document shape */}
        <path
          d="M10 4h14l6 6v26H10V4z"
          stroke={iconColor}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Document fold corner */}
        <path
          d="M24 4v6h6"
          stroke={iconColor}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Document lines */}
        <line x1="14" y1="13" x2="24" y2="13" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />
        <line x1="14" y1="17" x2="21" y2="17" stroke={iconColor} strokeWidth="1.6" strokeLinecap="round" />

        {/* Scales of justice — overlapping bottom-left of document */}
        {/* Center post */}
        <line x1="17" y1="22" x2="17" y2="34" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        {/* Top beam */}
        <line x1="10" y1="22" x2="24" y2="22" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        {/* Top pivot circle */}
        <circle cx="17" cy="22" r="1.2" fill={accentColor} />
        {/* Left chain */}
        <line x1="10" y1="22" x2="10" y2="27" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* Right chain */}
        <line x1="24" y1="22" x2="24" y2="27" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
        {/* Left pan */}
        <path d="M7 27 Q10 30 13 27" stroke={accentColor} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        {/* Right pan */}
        <path d="M21 27 Q24 30 27 27" stroke={accentColor} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        {/* Base */}
        <line x1="13" y1="34" x2="21" y2="34" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="15" y1="36" x2="19" y2="36" stroke={accentColor} strokeWidth="1.8" strokeLinecap="round" />
      </svg>

      {/* Wordmark */}
      <span
        style={{ color: textColor, fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.01em', lineHeight: 1 }}
      >
        IndyLaw
      </span>
    </div>
  )
}
