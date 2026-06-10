'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { MessageCircle, X } from 'lucide-react'

// Heavy AI-SDK-powered panel is only loaded once the user opens the chat,
// keeping it out of the initial page bundle for a faster first load.
const SupportChatPanel = dynamic(
  () => import('./support-chat-panel').then((m) => m.SupportChatPanel),
  { ssr: false }
)

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('supportChatHidden') === 'true') {
      setIsHidden(true)
    }
  }, [])

  const handleHide = () => {
    setIsHidden(true)
    setIsOpen(false)
    localStorage.setItem('supportChatHidden', 'true')
  }

  const handleShow = () => {
    setIsHidden(false)
    localStorage.removeItem('supportChatHidden')
  }

  // Hidden state - show small tab on the right edge
  if (isHidden) {
    return (
      <button
        onClick={handleShow}
        className="fixed bottom-24 right-0 z-40 bg-primary-600 hover:bg-primary-700 text-white px-2 py-3 rounded-l-lg shadow-lg transition-all duration-300"
        title="Show support chat"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    )
  }

  // Closed state - floating launcher button
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <div className="relative flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white pl-3 pr-2 py-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 focus:outline-none"
            title="Open support chat"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Need Help?</span>
          </button>
          <button
            onClick={handleHide}
            className="p-1 hover:bg-white/20 rounded-full transition-colors ml-1"
            title="Hide chat"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
    )
  }

  // Open state - load the heavy chat panel on demand
  return <SupportChatPanel onHide={handleHide} />
}
