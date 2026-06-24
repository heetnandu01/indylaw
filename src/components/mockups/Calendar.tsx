import React, { useState } from 'react'
import { useStore } from '../../hooks/useStore'
import { Calendar as CalendarIcon, MapPin, Plus, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'

export const Calendar: React.FC = () => {
  const { calendarEvents, addCalendarEvent } = useStore()
  
  // Date State for Demo - static representation of June 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(22) // June 22 default selected
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEventTitle, setNewEventTitle] = useState('')
  const [newEventDay, setNewEventDay] = useState(25)
  const [newEventType, setNewEventType] = useState<'Hearing' | 'Deadline' | 'Meeting'>('Hearing')
  const [newEventDetails, setNewEventDetails] = useState('')
  const [newEventCourt, setNewEventCourt] = useState('Supreme Court of India')

  // Generate calendar days for June 2026
  // June 1, 2026 is a Monday. June has 30 days.
  // Assuming Sunday start:
  // Sun: May 31 (blank/prev month)
  // Mon: June 1 -> Tue: June 2...
  const daysInJune = 30
  
  const gridDays = []
  
  // Add placeholder for May 31st
  gridDays.push({ day: 31, isCurrentMonth: false })
  
  // Add June days
  for (let i = 1; i <= daysInJune; i++) {
    gridDays.push({ day: i, isCurrentMonth: true })
  }
  
  // Add July placeholders to fill the grid (total 35 cells for 5 rows of 7)
  const remainingCells = 35 - gridDays.length
  for (let i = 1; i <= remainingCells; i++) {
    gridDays.push({ day: i, isCurrentMonth: false })
  }

  // Get active events for the selected day in June 2026
  const activeEvents = calendarEvents.filter((ev) => {
    if (!selectedDay) return false
    const dateStr = `2026-06-${selectedDay.toString().padStart(2, '0')}`
    return ev.date === dateStr
  })

  const getEventsForDay = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return []
    const dateStr = `2026-06-${day.toString().padStart(2, '0')}`
    return calendarEvents.filter((ev) => ev.date === dateStr)
  }

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEventTitle.trim()) return

    const dateStr = `2026-06-${newEventDay.toString().padStart(2, '0')}`
    addCalendarEvent({
      title: newEventTitle,
      date: dateStr,
      type: newEventType,
      details: newEventDetails || 'General schedule event.',
      court: newEventType === 'Hearing' ? newEventCourt : undefined
    })

    setNewEventTitle('')
    setNewEventDetails('')
    setShowAddForm(false)
    setSelectedDay(newEventDay) // Select the newly created day
  }

  return (
    <div id="calendar-mockup" className="w-full min-h-[550px] flex bg-[#FAF9F6] border border-[#0B132B]/10 rounded-2xl shadow-xl overflow-hidden text-left font-sans">
      {/* Left Pane: Upcoming list & selected day details */}
      <div className="w-[33%] border-r border-[#0B132B]/5 bg-white p-5 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-[#0B132B]/5 pb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0B132B]">
              <CalendarIcon className="w-4 h-4 text-[#D4AF37]" /> Schedules & Cause-list
            </div>
            <button
              id="calendar-add-event-btn"
              onClick={() => setShowAddForm(true)}
              className="p-1 bg-[#FAF9F6] border border-[#0B132B]/10 hover:border-[#D4AF37] rounded text-[10px] text-[#0B132B] font-bold flex items-center gap-0.5 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Event
            </button>
          </div>

          {/* Add event inline form overlay */}
          {showAddForm && (
            <div className="border border-[#D4AF37] bg-[#D4AF37]/5 p-4 rounded-xl space-y-3 animate-fadeIn">
              <div className="text-[11px] font-bold text-[#0B132B]">Schedule Calendar Event</div>
              <form onSubmit={handleAddEventSubmit} className="space-y-2 text-xs">
                <div>
                  <label className="text-[9px] font-bold text-[#4B5563] block mb-0.5">Event Name</label>
                  <input
                    id="new-event-title"
                    type="text"
                    required
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    placeholder="e.g. CA No. 12/2026 In Re: Essar"
                    className="w-full bg-white border border-[#0B132B]/15 rounded p-1 text-[11px] focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[9px] font-bold text-[#4B5563] block mb-0.5">Day in June</label>
                    <input
                      id="new-event-day"
                      type="number"
                      min="1"
                      max="30"
                      value={newEventDay}
                      onChange={(e) => setNewEventDay(Number(e.target.value))}
                      className="w-full bg-white border border-[#0B132B]/15 rounded p-1 text-[11px] focus:outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] font-bold text-[#4B5563] block mb-0.5">Type</label>
                    <select
                      id="new-event-type"
                      value={newEventType}
                      onChange={(e) => setNewEventType(e.target.value as 'Hearing' | 'Deadline' | 'Meeting')}
                      className="w-full bg-white border border-[#0B132B]/15 rounded p-1 text-[11px] focus:outline-none text-[11px]"
                    >
                      <option>Hearing</option>
                      <option>Deadline</option>
                      <option>Meeting</option>
                    </select>
                  </div>
                </div>

                {newEventType === 'Hearing' && (
                  <div>
                    <label className="text-[9px] font-bold text-[#4B5563] block mb-0.5">Court Forum</label>
                    <input
                      id="new-event-court"
                      type="text"
                      value={newEventCourt}
                      onChange={(e) => setNewEventCourt(e.target.value)}
                      placeholder="e.g. Supreme Court Courtroom 3"
                      className="w-full bg-white border border-[#0B132B]/15 rounded p-1 text-[11px] focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[9px] font-bold text-[#4B5563] block mb-0.5">Notes</label>
                  <textarea
                    id="new-event-details"
                    value={newEventDetails}
                    onChange={(e) => setNewEventDetails(e.target.value)}
                    className="w-full h-12 bg-white border border-[#0B132B]/15 rounded p-1 text-[11px] focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  <button
                    id="cancel-add-event"
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-2 py-0.5 text-[10px] text-[#4B5563] font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    id="submit-add-event"
                    type="submit"
                    className="px-3 py-0.5 bg-[#0B132B] text-white text-[10px] font-bold rounded cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Selected Date Details */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-[#0B132B]/60 uppercase tracking-widest block">Selected: June {selectedDay}, 2026</span>
            
            {activeEvents.length === 0 ? (
              <div className="p-4 bg-[#FAF9F6] border border-dashed border-[#0B132B]/5 rounded-xl text-center text-slate-muted">
                <AlertCircle className="w-5 h-5 text-slate-light mx-auto mb-1.5" />
                <span className="text-xs font-semibold block text-[#0B132B]">No Events Scheduled</span>
                <span className="text-[10px] text-[#4B5563] mt-1">Select highlighted days on the calendar to view hearings.</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                {activeEvents.map((ev) => (
                  <div
                    key={ev.id}
                    id={`event-detail-${ev.id}`}
                    className="p-3 bg-white border border-[#0B132B]/5 rounded-xl shadow-sm space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                        ev.type === 'Hearing'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : ev.type === 'Deadline'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        {ev.type}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[#0B132B]">{ev.title}</div>
                    {ev.court && (
                      <div className="flex items-center gap-1.5 text-[10px] text-[#AA820A] font-semibold">
                        <MapPin className="w-3.5 h-3.5" /> {ev.court}
                      </div>
                    )}
                    <p className="text-[10px] text-[#4B5563] leading-relaxed border-t border-[#0B132B]/5 pt-1.5 font-medium">
                      {ev.details}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sync panel */}
        <div className="p-3 bg-[#FAF9F6] border border-[#0B132B]/5 rounded-xl text-[9px] text-[#4B5563] space-y-1.5">
          <div className="flex items-center justify-between font-bold text-[#0B132B]">
            <span>Google Calendar Sync</span>
            <span className="text-emerald-600">Connected</span>
          </div>
          <p>Hearing dates sync and notify via SMS and email 24h prior.</p>
        </div>
      </div>

      {/* Right Pane: Month Calendar Grid */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#0B132B]">June 2026</h3>
          </div>
          <div className="flex gap-1.5">
            <button id="prev-month-btn" className="p-1 hover:bg-[#0B132B]/5 border border-[#0B132B]/10 rounded cursor-pointer text-[#0B132B]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button id="next-month-btn" className="p-1 hover:bg-[#0B132B]/5 border border-[#0B132B]/10 rounded cursor-pointer text-[#0B132B]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 grid grid-cols-7 gap-1 bg-white border border-[#0B132B]/5 p-2 rounded-xl">
          {/* Weekday headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-center text-[10px] font-bold text-[#0B132B]/60 uppercase py-1 border-b border-[#0B132B]/5">
              {d}
            </div>
          ))}

          {/* Grid Cells */}
          {gridDays.map((cell, index) => {
            const isSelected = cell.isCurrentMonth && selectedDay === cell.day
            const events = getEventsForDay(cell.day, cell.isCurrentMonth)
            const hasEvents = events.length > 0

            return (
              <div
                key={index}
                id={cell.isCurrentMonth ? `june-day-${cell.day}` : `other-day-${index}`}
                onClick={() => cell.isCurrentMonth && setSelectedDay(cell.day)}
                className={`min-h-[60px] p-1 flex flex-col justify-between border border-[#0B132B]/5 transition-all ${
                  cell.isCurrentMonth ? 'cursor-pointer hover:bg-[#FAF9F6]' : 'bg-[#FAF9F6]/50 opacity-40 select-none'
                } ${isSelected ? 'bg-[#D4AF37]/10 border-[#D4AF37] ring-1 ring-[#D4AF37]/50 font-bold' : 'bg-white'}`}
              >
                {/* Day number */}
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] ${isSelected ? 'text-[#0B132B] font-bold' : 'text-slate-dark'}`}>
                    {cell.day}
                  </span>
                  {/* Event indicator dot */}
                  {hasEvents && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                  )}
                </div>

                {/* Micro Event label for cell */}
                {hasEvents && (
                  <div className="hidden lg:block space-y-0.5">
                    {events.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[8px] px-1 rounded truncate leading-tight font-medium ${
                          ev.type === 'Hearing'
                            ? 'bg-rose-50 text-rose-700'
                            : ev.type === 'Deadline'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-indigo-50 text-indigo-700'
                        }`}
                      >
                        {ev.title.replace('Hearing:', '').replace('Deadline:', '')}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
