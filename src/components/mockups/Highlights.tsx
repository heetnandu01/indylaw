import React, { useState } from 'react'
import { useStore } from '../../hooks/useStore'
import { Search, Highlighter, Tag, Trash2, FileText, Check } from 'lucide-react'

export const Highlights: React.FC = () => {
  const { highlights, addHighlight, deleteHighlight } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  
  // Custom states for highlighting demo
  const [highlightNoteText, setHighlightNoteText] = useState('')
  const [activeHighlightingText, setActiveHighlightingText] = useState<string | null>(null)
  const [showAddSuccess, setShowAddSuccess] = useState(false)

  // Document excerpt that can be clicked to highlight
  const documentExcerpt = {
    title: 'Justice K.S. Puttaswamy v. Union of India (2017)',
    citation: '(2017) 10 SCC 1',
    paragraphs: [
      {
        id: 'p-1',
        text: 'Privacy is a constitutionally protected right which emerges primarily from the guarantee of life and personal liberty in Article 21 of the Constitution.'
      },
      {
        id: 'p-2',
        text: 'Informational privacy is a facet of the right to privacy. The state must restrict data collection within proportional limits backed by a clear legislative mandate.'
      },
      {
        id: 'p-3',
        text: 'The right of an individual to exercise control over his personal data and to be able to determine his own self-projection is an essential element of liberty.'
      }
    ]
  }

  // Filtered highlights based on search query and tag
  const filteredHighlights = highlights.filter((h) => {
    const matchesSearch =
      h.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.citation.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTag = selectedTag ? h.tags.includes(selectedTag) : true

    return matchesSearch && matchesTag
  })

  // Get all unique tags
  const allTags = Array.from(new Set(highlights.flatMap((h) => h.tags)))

  const handleTextSegmentClick = (text: string) => {
    setActiveHighlightingText(text)
    setHighlightNoteText('')
  }

  const handleSaveHighlight = () => {
    if (!activeHighlightingText) return

    addHighlight({
      text: activeHighlightingText,
      citation: documentExcerpt.title,
      note: highlightNoteText || 'Added from document explorer.',
      tags: ['Puttaswamy', 'Privacy', 'Article 21']
    })

    setActiveHighlightingText(null)
    setHighlightNoteText('')
    setShowAddSuccess(true)
    setTimeout(() => setShowAddSuccess(false), 2000)
  }

  return (
    <div id="highlights-mockup" className="w-full min-h-[550px] flex bg-[#FAF9F6] border border-[#0B132B]/10 rounded-2xl shadow-xl overflow-hidden text-left font-sans">
      {/* Left Pane: Interactive Document Viewer */}
      <div className="w-[45%] border-r border-[#0B132B]/5 bg-white p-5 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#0B132B]/5 pb-3">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">Judgment Viewer</span>
              <h4 className="text-xs font-bold text-[#0B132B] line-clamp-1">{documentExcerpt.title}</h4>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-[10px] text-[#4B5563] italic">Click a key holding sentence to highlight and save it:</span>
            
            <div className="space-y-3.5">
              {documentExcerpt.paragraphs.map((p) => {
                const isSelected = activeHighlightingText === p.text
                const isAlreadyHighlighted = highlights.some(h => h.text === p.text)

                return (
                  <p
                    key={p.id}
                    onClick={() => !isAlreadyHighlighted && handleTextSegmentClick(p.text)}
                    className={`text-xs leading-relaxed p-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                      isAlreadyHighlighted
                        ? 'bg-[#D4AF37]/15 border-l-4 border-[#D4AF37] text-[#0B132B]'
                        : isSelected
                        ? 'bg-[#0B132B]/5 border border-dashed border-[#D4AF37] text-[#0B132B] shadow-sm'
                        : 'bg-[#FAF9F6] border border-[#0B132B]/5 hover:border-[#D4AF37]/45 text-[#4B5563]'
                    }`}
                  >
                    {p.text}
                    {isAlreadyHighlighted && (
                      <span className="inline-flex items-center gap-0.5 ml-1 text-[9px] bg-[#D4AF37] text-[#0B132B] px-1.5 py-0.5 rounded-full font-bold">
                        <Check className="w-2 h-2" /> Highlighted
                      </span>
                    )}
                  </p>
                )
              })}
            </div>
          </div>
        </div>

        {/* Dynamic add-note card */}
        {activeHighlightingText && (
          <div className="mt-4 p-4 border border-[#D4AF37] bg-[#D4AF37]/5 rounded-xl space-y-3 animate-fadeIn">
            <div className="text-xs font-bold text-[#0B132B] flex items-center gap-1">
              <Highlighter className="w-3.5 h-3.5 text-[#D4AF37]" /> Create Highlight
            </div>
            <textarea
              id="highlight-note-input"
              value={highlightNoteText}
              onChange={(e) => setHighlightNoteText(e.target.value)}
              placeholder="Add personal note/memo context here..."
              className="w-full h-16 bg-white border border-[#0B132B]/10 rounded-lg p-2 text-xs text-[#111827] focus:outline-none focus:border-[#D4AF37]"
            />
            <div className="flex gap-2 justify-end">
              <button
                id="cancel-highlight-btn"
                type="button"
                onClick={() => setActiveHighlightingText(null)}
                className="px-2.5 py-1 text-[11px] text-[#4B5563] hover:text-[#0B132B] font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="save-highlight-btn"
                type="button"
                onClick={handleSaveHighlight}
                className="px-3 py-1 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
              >
                Add Highlight
              </button>
            </div>
          </div>
        )}
        
        {showAddSuccess && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-center gap-1.5 font-medium animate-fadeIn">
            <Check className="w-4 h-4" /> Highlight added successfully to repository!
          </div>
        )}
      </div>

      {/* Right Pane: Highlights list */}
      <div className="flex-1 flex flex-col p-5 overflow-hidden">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-[#0B132B]">My Highlights</h3>
          <p className="text-xs text-[#4B5563]">
            Search across every highlight and note you've made. Search the text, your notes, or tags.
          </p>
        </div>

        {/* Search & Tag filter */}
        <div className="space-y-3 mb-4">
          <div className="relative">
            <input
              id="highlight-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search highlights, notes and tags..."
              className="w-full bg-white border border-[#0B132B]/10 rounded-lg pl-3 pr-9 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-[#4B5563]" />
          </div>

          {/* Tag Pills */}
          <div className="flex flex-wrap gap-1">
            <button
              id="tag-filter-all"
              onClick={() => setSelectedTag(null)}
              className={`text-[9px] px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                selectedTag === null
                  ? 'bg-[#0B132B] border-[#0B132B] text-white font-bold'
                  : 'bg-white border-[#0B132B]/10 text-[#4B5563] hover:border-[#D4AF37]/50'
              }`}
            >
              All Tags
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                id={`tag-filter-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedTag(tag)}
                className={`text-[9px] px-2 py-0.5 rounded-full border transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0B132B] font-bold'
                    : 'bg-white border-[#0B132B]/10 text-[#4B5563] hover:border-[#D4AF37]/50'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Highlights Feed */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredHighlights.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center p-6 border border-dashed border-[#0B132B]/5 rounded-xl bg-white">
              <Highlighter className="w-8 h-8 text-[#0B132B]/20 mb-2" />
              <span className="text-xs font-semibold text-[#0B132B]">No highlights found</span>
              <span className="text-[10px] text-[#4B5563] mt-1 max-w-[180px]">
                Try selecting elements on the left or clearing filters.
              </span>
            </div>
          ) : (
            filteredHighlights.map((hl) => (
              <div
                key={hl.id}
                id={`highlight-card-${hl.id}`}
                className="p-3 bg-white border border-[#0B132B]/5 rounded-xl shadow-sm hover:border-[#D4AF37]/35 transition-all group space-y-2.5"
              >
                {/* Highlight passage */}
                <div className="text-xs text-[#111827] leading-relaxed pl-2 border-l-2 border-[#D4AF37] italic bg-[#FAF9F6] p-1.5 rounded-r-lg font-serif">
                  "{hl.text}"
                </div>

                {/* Annotation and Citation */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-[#0B132B]">
                    Source: <span className="text-[#AA820A]">{hl.citation}</span>
                  </div>
                  {hl.note && (
                    <div className="text-[10px] text-[#4B5563] bg-[#FAF9F6] p-2 rounded-lg border border-[#0B132B]/5">
                      <span className="font-bold text-[#0B132B]">Memo:</span> {hl.note}
                    </div>
                  )}
                </div>

                {/* Footer details: tags & actions */}
                <div className="flex justify-between items-center pt-1 border-t border-[#0B132B]/5">
                  <div className="flex flex-wrap gap-1">
                    {hl.tags.map((t) => (
                      <span key={t} className="text-[9px] text-[#4B5563] flex items-center gap-0.5">
                        <Tag className="w-2 h-2 text-[#D4AF37]" /> {t}
                      </span>
                    ))}
                  </div>
                  <button
                    id={`delete-highlight-${hl.id}`}
                    type="button"
                    onClick={() => deleteHighlight(hl.id)}
                    className="p-1 text-slate-muted hover:text-red-500 rounded hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
