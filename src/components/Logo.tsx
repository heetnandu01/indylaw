import React from 'react'

interface LogoProps {
  /** 'dark' = for light backgrounds (Navbar)
   *  'light' = for dark backgrounds (Footer/Hero) */
  variant?: 'dark' | 'light'
  className?: string
  /** Height of the logo image/icon in px */
  iconSize?: number
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  iconSize = 34
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#0B132B]'
  const goldColor = '#D4AF37'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Premium subtle outer circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke={goldColor}
          strokeWidth="1.5"
          fill={variant === 'light' ? 'rgba(212, 175, 55, 0.08)' : 'rgba(11, 19, 43, 0.03)'}
        />
        {/* Scale/Pillar representation */}
        <path
          d="M14 27H26"
          stroke={variant === 'light' ? '#FAF9F6' : '#0B132B'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M20 13V27"
          stroke={goldColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 16H28"
          stroke={variant === 'light' ? '#FAF9F6' : '#0B132B'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Left scale pan */}
        <path
          d="M12 16L9.5 22H14.5L12 16Z"
          stroke={goldColor}
          strokeWidth="1.25"
          fill={variant === 'light' ? 'rgba(250, 249, 246, 0.15)' : 'rgba(11, 19, 43, 0.05)'}
          strokeLinejoin="round"
        />
        {/* Right scale pan */}
        <path
          d="M28 16L25.5 22H30.5L28 16Z"
          stroke={goldColor}
          strokeWidth="1.25"
          fill={variant === 'light' ? 'rgba(250, 249, 246, 0.15)' : 'rgba(11, 19, 43, 0.05)'}
          strokeLinejoin="round"
        />
        {/* Accent top diamond */}
        <path
          d="M20 9.5L22 11.5L20 13L18 11.5L20 9.5Z"
          fill={goldColor}
        />
      </svg>
      <span
        className={`font-serif font-bold tracking-wide select-none ${textColor}`}
        style={{ fontSize: `${iconSize * 0.52}px`, lineHeight: '1' }}
      >
        Indy<span className="text-[#D4AF37]">Law</span>
      </span>
    </div>
  )
}

