import React, { useState, useEffect } from 'react'
import { Play, Sparkles, Pause, RotateCcw, Cpu, Search, Scale, FileText, Calendar } from 'lucide-react'

// Import mockups for simulated playback representation
import { ResearchAI } from './mockups/ResearchAI'
import { CaseExplorer } from './mockups/CaseExplorer'
import { Canvas } from './mockups/Canvas'
import { Drafting } from './mockups/Drafting'
import { Projects } from './mockups/Projects'
import { Calendar as CalendarMockup } from './mockups/Calendar'

interface DemoItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  desc: string
  component: React.FC
}

export const DemoShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('research-demo')
  const [isPlaying, setIsPlaying] = useState(true)
  const [playbackProgress, setPlaybackProgress] = useState(15)

  const demos: DemoItem[] = [
    { id: 'research-demo', label: 'Research Demo', icon: Cpu, desc: 'Query Indian case law with natural language, receiving citation grounded explanations.', component: ResearchAI },
    { id: 'explorer-demo', label: 'Case Explorer Demo', icon: Search, desc: 'Search precedents by citations, benches, dates, and keyword filters.', component: CaseExplorer },
    { id: 'canvas-demo', label: 'Canvas Demo', icon: Scale, desc: 'Outline argument connections and coordinate evidentiary citations.', component: Canvas },
    { id: 'drafting-demo', label: 'Drafting Demo', icon: FileText, desc: 'Instantly write custom contractual and petition clauses with AI autocompletion.', component: Drafting },
    { id: 'projects-demo', label: 'Projects Demo', icon: FileText, desc: 'Sync timelines, legal documents, tasks, and client structures within projects.', component: Projects },
    { id: 'calendar-demo', label: 'Calendar Demo', icon: Calendar, desc: 'Automatically schedule court deadlines, reminders, and hearings via causes lists.', component: CalendarMockup }
  ]

  // Playback timer simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) return 0
          return prev + 1
        })
      }, 250)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const activeDemo = demos.find((d) => d.id === activeTab) || demos[0]
  const ActiveComponent = activeDemo.component

  return (
    <section id="demo-showcase-section" className="py-20 bg-white px-6 font-sans border-t border-[#0B132B]/5">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest font-sans">Product Walkthrough</h2>
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B132B]">
            See IndyLaw in Action
          </h3>
          <p className="text-xs sm:text-sm text-slate-muted max-w-xl mx-auto">
            Click through our interactive system walkthroughs. Feel the interface, try elements, and watch the system work.
          </p>
        </div>

        {/* Demo Tabs Selector */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {demos.map((d) => {
            const Icon = d.icon
            const isActive = d.id === activeTab
            return (
              <button
                key={d.id}
                id={`demo-tab-btn-${d.id}`}
                onClick={() => {
                  setActiveTab(d.id)
                  setPlaybackProgress(10)
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0B132B] border-[#0B132B] text-white shadow-md'
                    : 'bg-[#FAF9F6] border-[#0B132B]/5 text-slate-muted hover:border-[#D4AF37]/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-light'}`} />
                <span>{d.label}</span>
              </button>
            )
          })}
        </div>

        {/* Mock Screen Player container */}
        <div className="border border-[#0B132B]/10 rounded-3xl bg-[#FAF9F6] p-4 shadow-xl max-w-5xl mx-auto space-y-4">
          {/* Player controls bar */}
          <div className="flex justify-between items-center border-b border-[#0B132B]/5 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-[10px] text-[#0B132B] font-bold uppercase tracking-wider ml-2 font-mono">{activeDemo.label}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                id="demo-play-toggle"
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 hover:bg-[#0B132B]/5 rounded transition-colors text-[#0B132B] cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                id="demo-play-reset"
                onClick={() => setPlaybackProgress(0)}
                className="p-1 hover:bg-[#0B132B]/5 rounded transition-colors text-[#0B132B] cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              
              {/* Progress bar container */}
              <div className="w-24 h-1.5 bg-[#0B132B]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37] transition-all" style={{ width: `${playbackProgress}%` }} />
              </div>
            </div>
          </div>

          {/* Render Active mockup inside player */}
          <div className="relative">
            <ActiveComponent />
          </div>

          <div className="flex gap-2 items-center text-[10px] text-slate-muted italic pt-1 justify-center">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span>Interactive Demo: Click and type inside the workspace mockup screen to test full operations.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
