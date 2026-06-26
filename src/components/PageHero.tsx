import React from 'react';
import { motion } from 'framer-motion';

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundClass?: string; // Tailwind classes for background color or pattern
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, backgroundClass = 'bg-[#0B132B]' }) => {
  return (
    <section className={`relative overflow-hidden pt-32 pb-16 ${backgroundClass}`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B132B]/80 to-[#0B132B] pointer-events-none" />
      {/* Subtle SVG pattern for premium look */}
      <svg className="absolute left-0 top-0 w-64 h-64 opacity-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="#D4AF37" strokeWidth="0.5" />
      </svg>
      <motion.div
        className="relative container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-md mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default PageHero;
