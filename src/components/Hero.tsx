import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Play, Award, FileSpreadsheet, CheckCircle, Scale, Database, Cpu } from 'lucide-react'

interface HeroProps {
  onBookDemoClick: () => void
  onWatchTourClick: () => void
}

export const Hero: React.FC<HeroProps> = ({ onBookDemoClick, onWatchTourClick }) => {
  const workflowNodes = [
    { label: 'Research AI', icon: Cpu, color: '#D4AF37' },
    { label: 'Highlights', icon: FileSpreadsheet, color: '#0B132B' },
    { label: 'Canvas', icon: Scale, color: '#D4AF37' },
    { label: 'Drafts', icon: Award, color: '#0B132B' },
    { label: 'Projects', icon: Database, color: '#D4AF37' }
  ]

  const floatingBadges = [
    'Supreme Court Judgments',
    'High Court Judgments',
    'RBI Circulars',
    'NCLT Decisions',
    'NCLAT Orders',
    'Citation Grounded'
  ]

  return (
    <section
      id="hero-section"
      className="relative min-h-[90vh] pt-32 pb-16 flex flex-col justify-center items-center overflow-hidden bg-[#FAF9F6] px-6 text-center font-sans"
    >
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#D4AF37]/5 to-[#0B132B]/5 blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Column: Headline and Descriptions */}
        <div className="lg:col-span-6 text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B132B]/5 border border-[#0B132B]/10 rounded-full text-[10px] font-bold text-[#0B132B] uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Built specifically for Indian Jurisprudence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#0B132B] leading-[1.1] tracking-tight"
          >
            India's AI-Native <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B132B] via-[#AA820A] to-[#0B132B]">Legal Operating System</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-[#4B5563] leading-relaxed max-w-lg font-normal"
          >
            Research case law, analyze judgments, build arguments, draft legal documents, manage matters, track deadlines, and collaborate with your team — all in one platform grounded in Indian jurisprudence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button
              id="hero-demo-btn"
              onClick={onBookDemoClick}
              className="px-6 py-3.5 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] font-bold rounded-xl text-xs transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              Book a Demo
            </button>
            <button
              id="hero-tour-btn"
              onClick={onWatchTourClick}
              className="px-6 py-3.5 border border-[#0B132B]/10 hover:border-[#D4AF37] bg-white text-[#0B132B] font-bold rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span>Watch Product Tour</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Animated Visual Workflow Mockup & Floating Badges */}
        <div className="lg:col-span-6 relative flex justify-center items-center min-h-[420px]">
          {/* Animated Workflow Canvas Mockup Container */}
          <div className="w-full max-w-lg bg-white border border-[#0B132B]/10 rounded-3xl p-6 shadow-xl relative z-10 flex flex-col justify-between items-center min-h-[300px]">
            <div className="text-[10px] font-bold text-[#0B132B]/60 uppercase tracking-widest text-left w-full border-b border-[#0B132B]/5 pb-2.5 mb-6 flex justify-between items-center">
              <span>Automated Legal Pipeline</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            {/* Workflow Line Sequence */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full relative z-10 px-2 py-4">
              {workflowNodes.map((node, idx) => {
                const Icon = node.icon
                return (
                  <React.Fragment key={node.label}>
                    {/* Node Circle */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0.8 }}
                      animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
                      transition={{ duration: 3, repeat: Infinity, delay: idx * 0.4 }}
                      className="flex flex-col items-center gap-2 relative cursor-pointer"
                    >
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center border transition-all"
                        style={{
                          backgroundColor: node.color === '#0B132B' ? '#0B132B' : '#FAF9F6',
                          borderColor: node.color === '#D4AF37' ? '#D4AF37' : '#0B132B',
                          color: node.color === '#0B132B' ? '#FAF9F6' : '#0B132B'
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-bold text-[#0B132B] uppercase tracking-wider">{node.label}</span>
                    </motion.div>

                    {/* Flow arrow/line (omit on last node) */}
                    {idx < workflowNodes.length - 1 && (
                      <div className="hidden sm:flex flex-col justify-center items-center flex-1 h-0.5 relative">
                        <div className="h-0.5 w-full bg-[#0B132B]/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ left: '-100%' }}
                            animate={{ left: '100%' }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: idx * 0.3 }}
                            className="absolute h-0.5 w-1/3 bg-[#D4AF37] rounded"
                          />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                )
              })}
            </div>

            {/* Verification label */}
            <div className="mt-8 text-center text-[10px] text-slate-muted italic">
              Connect inputs to outputs automatically. Real-time document parsing and calendar deadlines scheduling.
            </div>
          </div>

          {/* Floating Precedent Checkmarks Badges */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {floatingBadges.map((badge, idx) => {
              // Custom positions to lay out around the mockup card nicely
              const positions = [
                { top: '4%', left: '-5%', x: -10, y: -10 },
                { top: '78%', left: '-8%', x: -10, y: 10 },
                { top: '10%', right: '-8%', x: 10, y: -10 },
                { top: '74%', right: '-5%', x: 10, y: 10 },
                { top: '42%', left: '-18%', x: -15, y: 0 },
                { top: '46%', right: '-18%', x: 15, y: 0 }
              ]
              const pos = positions[idx]

              return (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: idx * 0.5,
                    ease: 'easeInOut'
                  }}
                  style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    right: pos.right
                  }}
                  className="hidden md:flex items-center gap-1.5 bg-white border border-[#0B132B]/15 px-3 py-1.5 rounded-full shadow-md text-[9px] font-bold text-[#0B132B]"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]/10" />
                  <span>{badge}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Hero Display Metrics Footnotes */}
      <div className="max-w-6xl mx-auto border-t border-[#0B132B]/10 w-full mt-16 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 text-center">
        <div className="space-y-1">
          <div className="text-2xl font-serif font-bold text-[#0B132B]">50,000+</div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-muted">Legal Precedents</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-serif font-bold text-[#0B132B]">AI-Powered</div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-muted">Legal Research</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-serif font-bold text-[#0B132B]">Built for</div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-muted">Indian Legal Practice</div>
        </div>
      </div>
    </section>
  )
}
