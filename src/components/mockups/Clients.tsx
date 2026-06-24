import React, { useState } from 'react'
import { useStore, type Client } from '../../hooks/useStore'
import { Search, Plus, Mail, Users, ShieldAlert } from 'lucide-react'

export const Clients: React.FC = () => {
  const { clients, addClient } = useStore()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  
  // Adding client states
  const [showAddForm, setShowAddForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState<Client['type']>('Company')
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const categories: string[] = [
    'All',
    'Individual',
    'Company',
    'Trust',
    'Partnership Firm',
    'Government Body'
  ]

  const handleAddClientSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || !newEmail.trim()) return

    addClient({
      name: newName,
      type: newType,
      email: newEmail,
      phone: newPhone || '+91 99999 88888',
      status: 'Active'
    })

    setNewName('')
    setNewEmail('')
    setNewPhone('')
    setShowAddForm(false)
  }

  // Filter clients based on search and category
  const filteredClients = clients.filter((c) => {
    const matchesCategory = activeCategory === 'All' ? true : c.type === activeCategory
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div id="clients-mockup" className="w-full min-h-[550px] flex bg-[#FAF9F6] border border-[#0B132B]/10 rounded-2xl shadow-xl overflow-hidden text-left font-sans">
      {/* Sidebar: Subsections */}
      <div className="w-[28%] border-r border-[#0B132B]/5 bg-white p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <button
            id="clients-sidebar-new-btn"
            onClick={() => setShowAddForm(true)}
            className="w-full py-2 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> New Client
          </button>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#0B132B]/60 uppercase tracking-widest">Client CRM Directory</span>
            <div className="space-y-1 text-xs text-[#0B132B] font-semibold">
              <div className="p-2 bg-[#0B132B]/5 rounded-lg border-l-2 border-[#D4AF37] flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>All Clients</span>
              </div>
              <div className="p-2 text-slate-muted hover:bg-[#FAF9F6] rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#0B132B]/40" />
                <span>Matters & Bills</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#FAF9F6] border border-[#0B132B]/5 rounded-xl space-y-1 text-[9px] text-[#4B5563]">
          <div className="font-bold text-[#0B132B] flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-[#D4AF37]" /> KYC Compliance Audit
          </div>
          <p>Clients are auto-checked against enforcement lists (SEBI, RBI, CBI, ED) at onboarding.</p>
        </div>
      </div>

      {/* Main CRM Area */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        {/* Title */}
        <div className="mb-4 flex justify-between items-start">
          <div>
            <div className="text-[10px] text-slate-muted mb-1">Home / <span className="text-[#0B132B]">Clients</span></div>
            <h3 className="text-xl font-bold text-[#0B132B]">Clients Directory</h3>
          </div>

          {/* Add Client Dialog Overlay */}
          {showAddForm && (
            <div className="absolute top-20 right-20 bg-white border border-[#D4AF37] p-5 rounded-2xl shadow-xl z-20 w-80 animate-fadeIn space-y-3 font-sans">
              <div className="text-xs font-bold text-[#0B132B] border-b border-[#0B132B]/5 pb-2">Register New Client</div>
              <form onSubmit={handleAddClientSubmit} className="space-y-2.5">
                <div>
                  <label className="text-[10px] font-bold text-[#4B5563] block mb-1">Client / Entity Name</label>
                  <input
                    id="new-client-name"
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Reliance Industries"
                    className="w-full bg-[#FAF9F6] border border-[#0B132B]/15 rounded p-1.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#4B5563] block mb-1">Client Classification</label>
                  <select
                    id="new-client-type"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as Client['type'])}
                    className="w-full bg-[#FAF9F6] border border-[#0B132B]/15 rounded p-1.5 text-xs focus:outline-none focus:border-[#D4AF37] text-xs"
                  >
                    <option>Individual</option>
                    <option>Company</option>
                    <option>Trust</option>
                    <option>Partnership Firm</option>
                    <option>Government Body</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#4B5563] block mb-1">Email Address</label>
                  <input
                    id="new-client-email"
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="e.g. legal@reliance.com"
                    className="w-full bg-[#FAF9F6] border border-[#0B132B]/15 rounded p-1.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#4B5563] block mb-1">Phone Number</label>
                  <input
                    id="new-client-phone"
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="e.g. +91 22 7967 8000"
                    className="w-full bg-[#FAF9F6] border border-[#0B132B]/15 rounded p-1.5 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2 border-t border-[#0B132B]/5">
                  <button
                    id="cancel-add-client"
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1 text-[10px] text-[#4B5563] font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    id="submit-add-client"
                    type="submit"
                    className="px-3 py-1 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] text-[10px] font-bold rounded cursor-pointer"
                  >
                    Add Client
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
              id="client-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients by name, company or email..."
              className="w-full bg-[#FAF9F6] border border-[#0B132B]/10 rounded-lg pl-3 pr-8 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-[#4B5563]" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-[#0B132B]/5 mb-3 gap-3.5 pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`client-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={`text-[11px] pb-2 font-bold relative transition-all cursor-pointer ${
                activeCategory === cat ? 'text-[#0B132B] border-b-2 border-b-[#D4AF37]' : 'text-slate-muted hover:text-[#0B132B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clients Table List */}
        <div className="flex-1 overflow-y-auto bg-white border border-[#0B132B]/5 rounded-xl">
          <table className="w-full text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-[#0B132B]/5 text-slate-muted font-bold text-left">
                <th className="p-3">Client / Entity Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Matters</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-slate-muted font-medium">
                    No clients found. Click "+ New Client" to register one.
                  </td>
                </tr>
              ) : (
                filteredClients.map((c) => (
                  <tr key={c.id} id={`client-row-${c.id}`} className="border-b border-[#0B132B]/5 hover:bg-[#FAF9F6] transition-colors">
                    <td className="p-3 font-bold text-[#0B132B]">{c.name}</td>
                    <td className="p-3 font-medium text-slate-muted">{c.type}</td>
                    <td className="p-3 font-mono">{c.email}</td>
                    <td className="p-3 text-slate-muted">{c.phone}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        c.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold text-[#0B132B]">{c.mattersCount}</td>
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
