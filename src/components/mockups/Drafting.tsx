import React, { useState } from 'react'
import { useStore } from '../../hooks/useStore'
import { FileText, Sparkles, Save, Check, AlertCircle, FileEdit } from 'lucide-react'

const DRAFT_TEMPLATES = [
  { id: 'draft-1', name: 'affidavit_copy.docx', date: '18 Jun 2026', version: 'v1' },
  { id: 'draft-2', name: 'written_submission.docx', date: '15 Jun 2026', version: 'v1' },
  { id: 'draft-3', name: 'legal_notice_tenant.docx', date: '10 Jun 2026', version: 'v2' }
]

const AI_SUGGESTIONS = [
  {
    label: 'Insert Arbitration Jurisdiction Clause (Delhi)',
    text: '\n\n"12. GOVERNING LAW AND JURISDICTION: Any dispute, controversy or claim arising out of or relating to this agreement, including its existence, validity, interpretation, performance, breach or termination, shall be referred to and finally resolved by arbitration in accordance with the Arbitration and Conciliation Act, 1996. The seat and venue of arbitration shall be New Delhi, India. The tribunal shall consist of a sole arbitrator appointed by the Delhi International Arbitration Centre (DIAC). The language of the arbitration shall be English."'
  },
  {
    label: 'Insert Limitation of Liability Clause',
    text: '\n\n"8. LIMITATION OF LIABILITY: Notwithstanding anything contained in this agreement, the maximum aggregate liability of the Respondent under any claim, action or suit, whether in contract, tort, equity or otherwise, shall not exceed the total fee paid to the Respondent under this agreement in the twelve (12) months preceding the event giving rise to such liability. In no event shall either party be liable for any indirect, consequential, special, or punitive damages, including loss of profit or goodwill."'
  },
  {
    label: 'Insert Standard Indemnity Clause (Commercial)',
    text: '\n\n"6. INDEMNIFICATION: The Claimant agrees to indemnify, defend, and hold harmless the Respondent and its directors, officers, employees, and agents from and against any and all claims, liabilities, losses, damages, costs, and expenses (including reasonable attorneys fees and legal expenses) arising out of, or resulting from, any breach of representation, warranty, covenant, or agreement made by the Claimant under this Agreement or any willful misconduct or negligence by the Claimant."'
  }
]

export const Drafting: React.FC = () => {
  const {
    selectedDraftId,
    setSelectedDraftId,
    draftContent,
    updateDraftContent,
    isDraftingAI,
    setIsDraftingAI
  } = useStore()

  const [showSaveNotification, setShowSaveNotification] = useState(false)
  const currentContent = draftContent[selectedDraftId] || ''

  const handleDocumentChange = (id: string) => {
    setSelectedDraftId(id)
    setShowSaveNotification(false)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateDraftContent(selectedDraftId, e.target.value)
  }

  const handleApplyAISuggestion = (suggestionText: string) => {
    if (isDraftingAI) return
    setIsDraftingAI(true)
    
    // Simulate streaming text writing
    let currentIdx = 0
    const interval = setInterval(() => {
      if (currentIdx < suggestionText.length) {
        const nextChar = suggestionText[currentIdx]
        updateDraftContent(selectedDraftId, draftContent[selectedDraftId] + nextChar)
        currentIdx++
      } else {
        clearInterval(interval)
        setIsDraftingAI(false)
        setShowSaveNotification(true)
        setTimeout(() => setShowSaveNotification(false), 2000)
      }
    }, 10)
  }

  const activeDraftInfo = DRAFT_TEMPLATES.find(d => d.id === selectedDraftId)

  return (
    <div id="drafting-mockup" className="w-full min-h-[550px] flex bg-[#FAF9F6] border border-[#0B132B]/10 rounded-2xl shadow-xl overflow-hidden text-left font-sans">
      {/* Sidebar: Files */}
      <div className="w-[30%] border-r border-[#0B132B]/5 bg-white flex flex-col justify-between">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">My Drafts</span>
            <button
              id="drafts-new-file"
              type="button"
              className="text-[10px] text-[#D4AF37] font-semibold hover:text-[#0B132B]"
            >
              + New Draft
            </button>
          </div>

          <div className="space-y-1">
            {DRAFT_TEMPLATES.map((draft) => {
              const isActive = draft.id === selectedDraftId
              return (
                <div
                  key={draft.id}
                  id={`draft-tab-${draft.id}`}
                  onClick={() => handleDocumentChange(draft.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-2.5 ${
                    isActive
                      ? 'bg-[#0B132B]/5 border border-[#D4AF37]/50 shadow-sm'
                      : 'border border-transparent hover:bg-[#FAF9F6] text-[#4B5563]'
                  }`}
                >
                  <FileText className={`w-4 h-4 mt-0.5 ${isActive ? 'text-[#D4AF37]' : 'text-slate-light'}`} />
                  <div>
                    <div className={`text-xs font-bold ${isActive ? 'text-[#0B132B]' : 'text-slate-dark'}`}>{draft.name}</div>
                    <div className="flex gap-1.5 items-center mt-1 text-[9px] text-slate-muted">
                      <span>{draft.date}</span>
                      <span>•</span>
                      <span className="bg-[#0B132B]/5 text-[#0B132B] px-1 rounded-sm">{draft.version}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="p-4 border-t border-[#0B132B]/5 bg-[#FAF9F6] text-[10px] text-[#4B5563] space-y-2">
          <div className="flex gap-1 items-center font-bold text-[#0B132B]">
            <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> Formatting Engine
          </div>
          <p className="leading-relaxed">All drafts are generated in standard formats for Supreme Court, NCLT, and High Courts.</p>
        </div>
      </div>

      {/* Editor Space */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Editor Toolbar */}
        <div className="border-b border-[#0B132B]/5 px-5 py-3 flex justify-between items-center bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <FileEdit className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#0B132B]">{activeDraftInfo?.name}</span>
            <span className="text-[10px] text-slate-muted italic">Edited just now</span>
          </div>

          <div className="flex items-center gap-3">
            {showSaveNotification && (
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Auto-saved
              </span>
            )}
            <button
              id="drafts-save-btn"
              type="button"
              onClick={() => {
                setShowSaveNotification(true)
                setTimeout(() => setShowSaveNotification(false), 1500)
              }}
              className="p-1.5 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] rounded-lg transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Editor Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Text Container */}
          <div className="flex-1 p-5 relative">
            <textarea
              id="draft-content-textarea"
              value={currentContent}
              onChange={handleContentChange}
              disabled={isDraftingAI}
              className="w-full h-full border-none resize-none focus:outline-none text-xs text-[#111827] leading-relaxed font-mono bg-white p-2"
              placeholder="Start drafting your document..."
            />
            
            {isDraftingAI && (
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px] pointer-events-none flex items-center justify-center">
                <div className="bg-[#0B132B] text-white rounded-xl shadow-lg px-4 py-2.5 text-xs font-bold flex items-center gap-2 border border-[#D4AF37]">
                  <Sparkles className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  <span>AI Drafting Clause...</span>
                </div>
              </div>
            )}
          </div>

          {/* AI Drafting Copilot panel */}
          <div className="w-[38%] border-l border-[#0B132B]/5 bg-[#FAF9F6] p-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-bold text-[#0B132B] flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> AI drafting copilot
              </div>
              <span className="text-[10px] text-[#4B5563] leading-relaxed block">
                Quickly add clauses to this document using AI template libraries. Choose a boilerplate segment below:
              </span>

              <div className="space-y-2 pt-2">
                {AI_SUGGESTIONS.map((sug, index) => (
                  <button
                    key={index}
                    id={`sug-${index}`}
                    type="button"
                    onClick={() => handleApplyAISuggestion(sug.text)}
                    disabled={isDraftingAI}
                    className="w-full text-left p-2.5 bg-white border border-[#0B132B]/5 hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-lg text-[10px] font-semibold text-[#0B132B] transition-all cursor-pointer leading-snug"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#0B132B]/5 p-3 rounded-lg flex items-center justify-between text-[9px] text-[#4B5563]">
              <span>Context: <strong>Indian Contract Act, 1872</strong></span>
              <span className="text-[#D4AF37]">Matched 100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
