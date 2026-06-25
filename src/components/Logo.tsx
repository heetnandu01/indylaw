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
  iconSize = 36
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImg}
        alt="IndyLaw logo"
        style={{
          height: iconSize,
          width: 'auto',
          display: 'block',
          // Invert to white when used on dark backgrounds
          filter: variant === 'light' ? 'brightness(0) invert(1)' : 'none'
        }}
      />
    </div>
  )
}
