import React, { useState, useRef } from 'react'
import { useStore, type CanvasNode } from '../../hooks/useStore'
import { Plus, Minus, Trash2, Edit3, Check } from 'lucide-react'

export const Canvas: React.FC = () => {
  const { canvasNodes, addCanvasNode, updateCanvasNodePosition, updateCanvasNodeText, deleteCanvasNode } = useStore()
  const canvasRef = useRef<HTMLDivElement>(null)
  
  const [activeDragId, setActiveDragId] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [zoomLevel, setZoomLevel] = useState(100)

  // Drag handlers using pointer events (better for touch & mobile)
  const handlePointerDown = (e: React.PointerEvent, id: string, node: CanvasNode) => {
    e.preventDefault()
    if (editingNodeId) return // Disable drag while editing
    
    // Calculate exact offset from pointer to top-left of the node card
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y
    })
    setActiveDragId(id)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDragId || !canvasRef.current) return
    e.preventDefault()
    
    // Find node bounds to restrict inside canvas parent
    const canvasRect = canvasRef.current.getBoundingClientRect()
    
    let nextX = e.clientX - dragOffset.x
    let nextY = e.clientY - dragOffset.y
    
    // Constrain within visible bounds
    const maxX = canvasRect.width - 220 // Card width is 200px + padding
    const maxY = canvasRect.height - 150 // Card height is ~110px + padding
    
    if (nextX < 10) nextX = 10
    if (nextX > maxX) nextX = maxX
    if (nextY < 10) nextY = 10
    if (nextY > maxY) nextY = maxY

    updateCanvasNodePosition(activeDragId, nextX, nextY)
  }

  const handlePointerUp = (e: React.PointerEvent, id: string) => {
    if (activeDragId === id) {
      setActiveDragId(null)
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    }
  }

  const startEditing = (node: CanvasNode) => {
    setEditingNodeId(node.id)
    setEditingText(node.text)
  }

  const saveEditing = (id: string) => {
    updateCanvasNodeText(id, editingText)
    setEditingNodeId(null)
  }

  // Draw lines connecting nodes sequentially for simulation
  const renderConnections = () => {
    if (canvasNodes.length < 2) return null
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#D4AF37" />
          </marker>
        </defs>
        {canvasNodes.map((node, index) => {
          // Connect to the next node in the list
          if (index === canvasNodes.length - 1) return null
          const nextNode = canvasNodes[index + 1]
          
          // Compute centers of notes for connecting paths
          const startX = node.x + 100 // Card width is 200px
          const startY = node.y + 60  // Card height is ~110px
          const endX = nextNode.x + 100
          const endY = nextNode.y + 60

          // Generate smooth cubic bezier curves
          const dx = Math.abs(endX - startX) * 0.5
          const cx1 = startX + dx
          const cy1 = startY
          const cx2 = endX - dx
          const cy2 = endY

          return (
            <path
              key={`conn-${node.id}-${nextNode.id}`}
              d={`M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`}
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrow)"
            />
          )
        })}
      </svg>
    )
  }

  return (
    <div id="canvas-mockup" className="w-full min-h-[550px] flex flex-col bg-[#FAF9F6] border border-[#0B132B]/10 rounded-2xl shadow-xl overflow-hidden text-left font-sans relative">
      {/* Top Header Panel */}
      <div className="bg-white border-b border-[#0B132B]/5 px-4 py-3 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <button
            id="back-highlights-btn"
            className="text-[10px] uppercase font-bold text-[#D4AF37] hover:text-[#0B132B] transition-colors"
          >
            ← Your Highlights
          </button>
          <span className="text-[#0B132B]/20">|</span>
          <h3 className="text-xs font-bold text-[#0B132B] tracking-tight">Untitled workspace</h3>
        </div>
        <div className="flex items-center gap-4 text-[10px] text-[#4B5563] font-medium">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>All changes saved</span>
          </div>
          <button
            id="canvas-add-node-btn"
            onClick={() => addCanvasNode()}
            className="flex items-center gap-1 bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Note
          </button>
        </div>
      </div>

      {/* Main Board Editor Container */}
      <div
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        className="flex-1 w-full bg-[#FAF9F6] bg-grid-dots relative overflow-hidden select-none"
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}
      >
        {/* Connection arrows */}
        {renderConnections()}

        {/* Draggable Note Cards */}
        {canvasNodes.map((node) => {
          const isDragging = activeDragId === node.id
          const isEditing = editingNodeId === node.id

          return (
            <div
              key={node.id}
              id={`canvas-node-${node.id}`}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                touchAction: 'none' // Necessary for pointerEvents on mobile
              }}
              className={`absolute w-[200px] min-h-[110px] bg-[#FAF9F6] border rounded-xl shadow-md z-10 transition-shadow ${
                isDragging ? 'shadow-lg border-[#D4AF37] ring-1 ring-[#D4AF37]/50 cursor-grabbing' : 'border-[#0B132B]/10 hover:border-[#D4AF37] cursor-grab'
              }`}
            >
              {/* Note Header Drag Bar */}
              <div
                onPointerDown={(e) => handlePointerDown(e, node.id, node)}
                onPointerUp={(e) => handlePointerUp(e, node.id)}
                className="bg-white border-b border-[#0B132B]/5 px-3 py-1.5 rounded-t-xl flex justify-between items-center text-[10px] font-bold text-[#0B132B] border-t-2 border-t-[#D4AF37]"
              >
                <span className="flex items-center gap-1">Note</span>
                <div className="flex gap-1.5 pointer-events-auto">
                  {isEditing ? (
                    <button
                      id={`save-node-${node.id}`}
                      onClick={() => saveEditing(node.id)}
                      className="p-0.5 text-emerald-600 hover:bg-emerald-50 rounded"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                  ) : (
                    <button
                      id={`edit-node-${node.id}`}
                      onClick={() => startEditing(node)}
                      className="p-0.5 text-slate-muted hover:text-[#0B132B] rounded"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    id={`delete-node-${node.id}`}
                    onClick={() => deleteCanvasNode(node.id)}
                    className="p-0.5 text-slate-muted hover:text-red-500 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Note body text */}
              <div className="p-3">
                {isEditing ? (
                  <textarea
                    id={`editor-text-${node.id}`}
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        saveEditing(node.id)
                      }
                    }}
                    className="w-full h-16 bg-white border border-[#D4AF37] rounded p-1 text-[11px] text-[#111827] focus:outline-none font-sans"
                    autoFocus
                  />
                ) : (
                  <p
                    id={`text-${node.id}`}
                    onDoubleClick={() => startEditing(node)}
                    className="text-[11px] text-[#4B5563] leading-relaxed whitespace-pre-wrap font-sans cursor-text"
                  >
                    {node.text}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Zoom Controls Overlay */}
      <div className="absolute bottom-4 left-4 bg-white border border-[#0B132B]/10 rounded-lg shadow-md px-2.5 py-1.5 flex items-center gap-3 z-10">
        <button
          id="zoom-out-btn"
          onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
          className="p-1 hover:bg-[#0B132B]/5 rounded transition-colors text-[#0B132B] cursor-pointer"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] font-bold text-[#0B132B] min-w-[28px] text-center">{zoomLevel}%</span>
        <button
          id="zoom-in-btn"
          onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
          className="p-1 hover:bg-[#0B132B]/5 rounded transition-colors text-[#0B132B] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Minimap Overlay (Lower-Right) */}
      <div className="absolute bottom-4 right-4 w-28 h-20 bg-white border border-[#0B132B]/10 rounded-lg shadow-md p-1.5 z-10 pointer-events-none flex flex-col justify-between">
        <span className="text-[8px] font-bold text-[#0B132B]/50 uppercase tracking-widest">Minimap</span>
        <div className="flex-1 bg-[#FAF9F6] border border-[#0B132B]/5 relative rounded overflow-hidden bg-grid-dots">
          {/* Miniature nodes */}
          {canvasNodes.map((n) => (
            <div
              key={`mini-${n.id}`}
              style={{
                left: `${(n.x / 550) * 100}%`,
                top: `${(n.y / 550) * 100}%`
              }}
              className="absolute w-4 h-2 bg-[#D4AF37] rounded-sm opacity-60"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
