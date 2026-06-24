import { create } from 'zustand'

export interface Client {
  id: string
  name: string
  type: 'Individual' | 'Company' | 'Trust' | 'Partnership Firm' | 'Government Body'
  email: string
  phone: string
  status: 'Active' | 'Inactive'
  mattersCount: number
}

export interface Project {
  id: string
  title: string
  number: string
  court: string
  status: 'Active' | 'Closed' | 'Archived'
  lastUpdated: string
}

export interface CanvasNode {
  id: string
  text: string
  x: number
  y: number
}

export interface HighlightItem {
  id: string
  text: string
  citation: string
  note: string
  tags: string[]
}

export interface CalendarEvent {
  id: string
  title: string
  date: string // YYYY-MM-DD
  type: 'Hearing' | 'Deadline' | 'Meeting'
  details: string
  court?: string
}

interface IndyLawState {
  // Navigation & Feature Highlight
  activeFeatureIndex: number
  setActiveFeatureIndex: (index: number) => void

  // Demo play status
  activeDemoId: string | null
  setActiveDemoId: (id: string | null) => void

  // 1. Research AI State
  researchPrompt: string
  setResearchPrompt: (prompt: string) => void
  researchResponse: string | null
  setResearchResponse: (response: string | null) => void
  isGeneratingResearch: boolean
  setIsGeneratingResearch: (generating: boolean) => void

  // 2. Case Explorer State
  explorerQuery: string
  setExplorerQuery: (query: string) => void
  explorerJurisdiction: string
  setExplorerJurisdiction: (jurisdiction: string) => void

  // 3. Highlights State
  highlights: HighlightItem[]
  addHighlight: (highlight: Omit<HighlightItem, 'id'>) => void
  deleteHighlight: (id: string) => void

  // 4. Canvas State
  canvasNodes: CanvasNode[]
  addCanvasNode: (text?: string) => void
  updateCanvasNodePosition: (id: string, x: number, y: number) => void
  updateCanvasNodeText: (id: string, text: string) => void
  deleteCanvasNode: (id: string) => void

  // 5. Drafting State
  selectedDraftId: string
  setSelectedDraftId: (id: string) => void
  draftContent: Record<string, string>
  updateDraftContent: (id: string, content: string) => void
  isDraftingAI: boolean
  setIsDraftingAI: (loading: boolean) => void

  // 6. Projects State
  projects: Project[]
  addProject: (project: Omit<Project, 'id' | 'lastUpdated'>) => void
  toggleProjectStatus: (id: string) => void

  // 7. Calendar State
  calendarEvents: CalendarEvent[]
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void
  selectedDate: string // YYYY-MM-DD

  // 8. Clients State
  clients: Client[]
  addClient: (client: Omit<Client, 'id' | 'mattersCount'>) => void
  clientFilter: string
}

export const useStore = create<IndyLawState>((set) => ({
  // Navigation & Feature Highlight
  activeFeatureIndex: 0,
  setActiveFeatureIndex: (index) => set({ activeFeatureIndex: index }),

  activeDemoId: null,
  setActiveDemoId: (id) => set({ activeDemoId: id }),

  // 1. Research AI State
  researchPrompt: '',
  setResearchPrompt: (prompt) => set({ researchPrompt: prompt }),
  researchResponse: null,
  setResearchResponse: (response) => set({ researchResponse: response }),
  isGeneratingResearch: false,
  setIsGeneratingResearch: (generating) => set({ isGeneratingResearch: generating }),

  // 2. Case Explorer State
  explorerQuery: '',
  setExplorerQuery: (query) => set({ explorerQuery: query }),
  explorerJurisdiction: 'All Jurisdictions',
  setExplorerJurisdiction: (jurisdiction) => set({ explorerJurisdiction: jurisdiction }),

  // 3. Highlights State
  highlights: [
    {
      id: 'h-1',
      text: 'Right to privacy is an intrinsic part of the right to life and personal liberty under Article 21 and as a part of the freedoms guaranteed by Part III of the Constitution.',
      citation: 'Justice K.S. Puttaswamy v. Union of India (2017)',
      note: 'Foundational citation for data privacy defenses.',
      tags: ['Privacy', 'Constitutional Law', 'Article 21']
    },
    {
      id: 'h-2',
      text: 'The power of the arbitrator to award interest for the pre-reference period, pendente lite, and future period is well-recognized unless expressly barred by the contract.',
      citation: 'Union of India v. Krafters Engineering (2011)',
      note: 'Crucial for recovery petition calculations.',
      tags: ['Arbitration', 'Commercial Law']
    }
  ],
  addHighlight: (highlight) =>
    set((state) => ({
      highlights: [{ ...highlight, id: `h-${Date.now()}` }, ...state.highlights]
    })),
  deleteHighlight: (id) =>
    set((state) => ({
      highlights: state.highlights.filter((h) => h.id !== id)
    })),

  // 4. Canvas State
  canvasNodes: [
    { id: 'node-1', text: 'Section 9 Application:\nShow immediate risk of dissipation of assets by Respondent.', x: 120, y: 150 },
    { id: 'node-2', text: 'Authority to cite:\nAdani Power case on interim protection thresholds.', x: 420, y: 150 },
    { id: 'node-3', text: 'Key Evidence:\nBank transfer records dated 12/03/2026 showing capital siphoning.', x: 270, y: 350 }
  ],
  addCanvasNode: (text = 'Double-click to type...') =>
    set((state) => {
      // Find a non-overlapping position
      const lastNode = state.canvasNodes[state.canvasNodes.length - 1]
      const x = lastNode ? lastNode.x + 50 : 200
      const y = lastNode ? lastNode.y + 100 : 200
      return {
        canvasNodes: [
          ...state.canvasNodes,
          { id: `node-${Date.now()}`, text, x: x > 500 ? 150 : x, y: y > 450 ? 150 : y }
        ]
      }
    }),
  updateCanvasNodePosition: (id, x, y) =>
    set((state) => ({
      canvasNodes: state.canvasNodes.map((n) => (n.id === id ? { ...n, x, y } : n))
    })),
  updateCanvasNodeText: (id, text) =>
    set((state) => ({
      canvasNodes: state.canvasNodes.map((n) => (n.id === id ? { ...n, text } : n))
    })),
  deleteCanvasNode: (id) =>
    set((state) => ({
      canvasNodes: state.canvasNodes.filter((n) => n.id !== id)
    })),

  // 5. Drafting State
  selectedDraftId: 'draft-1',
  setSelectedDraftId: (id) => set({ selectedDraftId: id }),
  draftContent: {
    'draft-1': `BEFORE THE HON'BLE SUPREME COURT OF INDIA
CRIMINAL ORIGINAL JURISDICTION
WRIT PETITION (CRIMINAL) NO. ______ OF 2026

IN THE MATTER OF:
Aditya Sen & Ors.                                     ...Petitioners

VERSUS

State of NCT of Delhi & Anr.                          ...Respondents

PETITION UNDER ARTICLE 32 OF THE CONSTITUTION OF INDIA SEEKING ENFORCEMENT OF FUNDAMENTAL RIGHTS UNDER ARTICLE 21...`,
    'draft-2': `BEFORE THE ARBITRAL TRIBUNAL CONSTITUTED UNDER THE DIAC RULES
IN THE ARBITRATION MATTER OF:
Apex Tech Solutions Pvt. Ltd.                         ...Claimant

VERSUS

Global Retail Logistics Ltd.                          ...Respondent

WRITTEN SUBMISSIONS ON BEHALF OF THE RESPONDENT

1. That the Claimant has failed to establish any material breach of the Service Level Agreement dated 14th August 2024.
2. That as per Clause 18.2 of the Agreement, any disputes concerning invoice adjustments must be first referred to the Joint Steering Committee...`,
    'draft-3': `Date: June 22, 2026

BY REGISTERED AD WITH ACK. DUE

To,
The Managing Director,
Eminent Infrastructure Developers Ltd.,
Connaught Place, New Delhi - 110001.

SUBJECT: LEGAL NOTICE REGARDING BUILDER DELAY AND NON-DELIVERY OF POSSESSION OF APARTMENT NO. 402, BLOCK-B, ROYAL GARDENS JURISPUDENCE...`
  },
  updateDraftContent: (id, content) =>
    set((state) => ({
      draftContent: { ...state.draftContent, [id]: content }
    })),
  isDraftingAI: false,
  setIsDraftingAI: (loading) => set({ isDraftingAI: loading }),

  // 6. Projects State
  projects: [
    { id: 'proj-1', title: 'ABC Corp v. Tax Department', number: 'CNR-DLHC010043212025', court: 'Delhi High Court', status: 'Active', lastUpdated: '2 hours ago' },
    { id: 'proj-2', title: 'In Re: Shareholder Dispute (Zenith Hotels)', number: 'CNR-NCLTMUM024892025', court: 'NCLT Mumbai Bench IV', status: 'Active', lastUpdated: '1 day ago' },
    { id: 'proj-3', title: 'Ramesh Kumar Bail Application', number: 'CNR-SC000192832026', court: 'Supreme Court of India', status: 'Closed', lastUpdated: '3 days ago' }
  ],
  addProject: (project) =>
    set((state) => ({
      projects: [
        ...state.projects,
        {
          ...project,
          id: `proj-${Date.now()}`,
          lastUpdated: 'Just now'
        }
      ]
    })),
  toggleProjectStatus: (id) =>
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id === id) {
          const nextStatus: Record<Project['status'], Project['status']> = {
            'Active': 'Closed',
            'Closed': 'Archived',
            'Archived': 'Active'
          }
          return { ...p, status: nextStatus[p.status] }
        }
        return p
      })
    })),

  // 7. Calendar State
  calendarEvents: [
    { id: 'ev-1', title: 'Hearing: ABC Corp v. Tax Dept', date: '2026-06-08', type: 'Hearing', details: 'Delhi High Court, Court Room 12. Cause List Item No. 14.', court: 'Delhi High Court' },
    { id: 'ev-2', title: 'Hearing: Zenith Shareholder Dispute', date: '2026-06-15', type: 'Hearing', details: 'NCLT Mumbai Bench IV. Argument on interim injunction.', court: 'NCLT Mumbai' },
    { id: 'ev-3', title: 'Supreme Court Admission', date: '2026-06-22', type: 'Hearing', details: 'Admission hearing before Court Room 3. Hon\'ble DY Chandrachud presiding. Item No. 9.', court: 'Supreme Court of India' },
    { id: 'ev-4', title: 'Drafting Deadline: Reply Affidavit', date: '2026-06-25', type: 'Deadline', details: 'Submit draft reply affidavit for Zenith Hotels matter to Senior Advocate.' },
    { id: 'ev-5', title: 'Client Consultation: Adani Group', date: '2026-06-29', type: 'Meeting', details: 'Pre-litigation strategy meeting regarding port tariff revisions.' }
  ],
  addCalendarEvent: (event) =>
    set((state) => ({
      calendarEvents: [...state.calendarEvents, { ...event, id: `ev-${Date.now()}` }]
    })),
  selectedDate: '2026-06-22',

  // 8. Clients State
  clients: [
    { id: 'c-1', name: 'Adani Group (Legal Cell)', type: 'Company', email: 'legal.compliance@adani.com', phone: '+91 22 2656 5555', status: 'Active', mattersCount: 4 },
    { id: 'c-2', name: 'Vikram Seth', type: 'Individual', email: 'vikram@sethlegal.in', phone: '+91 98100 12345', status: 'Active', mattersCount: 1 },
    { id: 'c-3', name: 'Tata Sons Ltd', type: 'Company', email: 'general.counsel@tata.com', phone: '+91 22 6665 8282', status: 'Active', mattersCount: 7 },
    { id: 'c-4', name: 'LIC India', type: 'Government Body', email: 'delhi.zonal@licindia.com', phone: '+91 11 2331 4321', status: 'Active', mattersCount: 2 },
    { id: 'c-5', name: 'HDFC Bank Ltd', type: 'Company', email: 'recovery.litigation@hdfcbank.com', phone: '+91 22 5011 2211', status: 'Active', mattersCount: 12 },
    { id: 'c-6', name: 'Singhania & Trust', type: 'Trust', email: 'trustees@singhaniatrust.org', phone: '+91 33 2248 9090', status: 'Inactive', mattersCount: 0 }
  ],
  addClient: (client) =>
    set((state) => ({
      clients: [
        ...state.clients,
        {
          ...client,
          id: `c-${Date.now()}`,
          mattersCount: 1
        }
      ]
    })),
  clientFilter: 'All'
}))
