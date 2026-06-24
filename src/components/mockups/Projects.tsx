import React, { useState } from 'react'
import { useStore } from '../../hooks/useStore'
import { Search, FolderGit, SlidersHorizontal, Plus, AlertCircle } from 'lucide-react'

export const Projects: React.FC = () => {
  const { projects, addProject, toggleProjectStatus } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'Active' | 'Closed' | 'Archived' | 'All'>('Active')
  
  // Adding project states
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCourt, setNewCourt] = useState('Delhi High Court')
  const [newCNR, setNewCNR] = useState('')

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newCNR.trim()) return

    addProject({
      title: newTitle,
      court: newCourt,
      number: newCNR,
      status: 'Active'
    })

    setNewTitle('')
    setNewCNR('')
    setShowAddForm(false)
  }

  // Filter projects by tab and query
  const filteredProjects = projects.filter((p) => {
    const matchesTab = activeTab === 'All' ? true : p.status === activeTab
    const matchesQuery =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.court.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesQuery
  })

  return (
    <div id="projects-mockup" className="w-full min-h-[550px] flex bg-[#FAF9F6] border border-[#0B132B]/10 rounded-2xl shadow-xl overflow-hidden text-left font-sans">
      {/* Sidebar: Project Navigation */}
      <div className="w-[28%] border-r border-[#0B132B]/5 bg-white p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <button
            id="proj-sidebar-new-btn"
            onClick={() => setShowAddForm(true)}
            className="w-full py-2 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> New Project
          </button>
          
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#0B132B]/60 uppercase tracking-widest">Matters Hierarchy</span>
            <div className="space-y-1 text-xs text-[#0B132B] font-medium">
              <div className="p-2 bg-[#0B132B]/5 rounded-lg border-l-2 border-[#D4AF37] flex items-center gap-2">
                <FolderGit className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>All Matter Workspaces</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#FAF9F6] border border-[#0B132B]/5 rounded-xl space-y-1 text-[9px] text-[#4B5563]">
          <div className="font-bold text-[#0B132B] flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-[#D4AF37]" /> CNR Cause-List Sync
          </div>
          <p>IndyLaw listens to daily court PDFs automatically. Event logs sync instantly with CNR inputs.</p>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Path & Title */}
        <div className="mb-4 flex justify-between items-start">
          <div>
            <div className="text-[10px] text-slate-muted mb-1">Workspace / <span className="text-[#0B132B]">Projects</span></div>
            <h3 className="text-xl font-bold text-[#0B132B]">Projects Dashboard</h3>
          </div>
          
          {/* Add Form Dialog overlay (simplified inline card) */}
          {showAddForm && (
            <div className="absolute top-20 right-20 bg-white border border-[#D4AF37] p-5 rounded-2xl shadow-xl z-20 w-80 animate-fadeIn space-y-3 font-sans">
              <div className="text-xs font-bold text-[#0B132B] border-b border-[#0B132B]/5 pb-2">Create New Matter Workspace</div>
              <form onSubmit={handleAddProject} className="space-y-2.5">
                <div>
                  <label className="text-[10px] font-bold text-[#4B5563] block mb-1">Matter Title</label>
                  <input
                    id="new-project-title"
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Tata Sons v. Cyrus Mistry"
                    className="w-full bg-[#FAF9F6] border border-[#0B132B]/15 rounded p-1.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#4B5563] block mb-1">CNR Number</label>
                  <input
                    id="new-project-cnr"
                    type="text"
                    required
                    value={newCNR}
                    onChange={(e) => setNewCNR(e.target.value)}
                    placeholder="e.g. CNR-SC1290382026"
                    className="w-full bg-[#FAF9F6] border border-[#0B132B]/15 rounded p-1.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#4B5563] block mb-1">Court Forum</label>
                  <select
                    id="new-project-court"
                    value={newCourt}
                    onChange={(e) => setNewCourt(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#0B132B]/15 rounded p-1.5 text-xs focus:outline-none focus:border-[#D4AF37] text-xs"
                  >
                    <option>Supreme Court of India</option>
                    <option>Delhi High Court</option>
                    <option>NCLT Mumbai Bench IV</option>
                    <option>Bombay High Court</option>
                  </select>
                </div>
                <div className="flex gap-2 justify-end pt-2 border-t border-[#0B132B]/5">
                  <button
                    id="cancel-add-project"
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1 text-[10px] text-[#4B5563] font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    id="submit-add-project"
                    type="submit"
                    className="px-3 py-1 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-[10px] font-bold rounded cursor-pointer"
                  >
                    Create Matter
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Search matter inputs */}
        <div className="flex gap-2 mb-4 bg-white p-3 rounded-xl border border-[#0B132B]/5 shadow-sm">
          <div className="relative flex-1">
            <input
              id="project-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search matters, numbers, parties, CNR..."
              className="w-full bg-[#FAF9F6] border border-[#0B132B]/10 rounded-lg pl-3 pr-8 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-[#4B5563]" />
          </div>
          <button
            id="proj-filters-toggle"
            type="button"
            className="px-3 bg-[#0B132B]/5 hover:bg-[#0B132B] hover:text-[#D4AF37] text-[#0B132B] border border-[#0B132B]/10 rounded-lg text-xs font-bold flex items-center justify-center cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#0B132B]/5 mb-3 gap-4">
          {(['Active', 'Closed', 'Archived', 'All'] as const).map((tab) => (
            <button
              key={tab}
              id={`proj-tab-${tab}`}
              onClick={() => setActiveTab(tab)}
              className={`text-xs pb-2 font-bold relative transition-all cursor-pointer ${
                activeTab === tab ? 'text-[#0B132B] border-b-2 border-b-[#D4AF37]' : 'text-slate-muted hover:text-[#0B132B]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Table List */}
        <div className="flex-1 overflow-y-auto bg-white border border-[#0B132B]/5 rounded-xl">
          <table className="w-full text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-[#0B132B]/5 text-slate-muted font-bold text-left">
                <th className="p-3">Matter Title</th>
                <th className="p-3">Matter Number / CNR</th>
                <th className="p-3">Court Forum</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-slate-muted font-medium">
                    No projects found matching the criteria. Click "+ New Project" or add matters in the sidebar.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} id={`row-${p.id}`} className="border-b border-[#0B132B]/5 hover:bg-[#FAF9F6] transition-colors">
                    <td className="p-3 font-bold text-[#0B132B]">{p.title}</td>
                    <td className="p-3 text-slate-muted font-mono">{p.number}</td>
                    <td className="p-3 font-medium text-[#AA820A]">{p.court}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        p.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : p.status === 'Closed'
                          ? 'bg-gray-100 text-gray-700 border border-gray-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-muted">{p.lastUpdated}</td>
                    <td className="p-3 text-center flex justify-center gap-2">
                      <button
                        id={`action-toggle-${p.id}`}
                        type="button"
                        onClick={() => toggleProjectStatus(p.id)}
                        className="text-[9px] bg-[#0B132B]/5 hover:bg-[#0B132B] hover:text-white px-2 py-1 rounded border border-[#0B132B]/10 cursor-pointer font-bold"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
