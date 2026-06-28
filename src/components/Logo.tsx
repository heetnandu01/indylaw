import React from 'react'
import logoImg from '../assets/logo.png'

interface LogoProps {
  /** 'dark' = for light backgrounds (Navbar)
   *  'light' = for dark backgrounds (Footer/Hero) */
  variant?: 'dark' | 'light'
  className?: string
  /** Height of the logo image in px */
  iconSize?: number
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  iconSize = 34
}) => {
  // The logo.png has a navy background with white text/icon.
  // On light backgrounds (Navbar) we show it as-is inside a rounded container.
  // On dark backgrounds (Footer) we also show it as-is — it fits naturally.
  const logoHeight = iconSize * 1.5  // give a bit more height so text is readable

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImg}
        alt="IndyLaw"
        height={logoHeight}
        style={{
          height: `${logoHeight}px`,
          width: 'auto',
          objectFit: 'contain',
          borderRadius: '6px',
          display: 'block',
        }}
      />
    </div>
  )
}

