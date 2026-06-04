'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hidden = localStorage.getItem('supportChatHidden')
    if (hidden === 'true') {
      setIsHidden(true)
    }
  }, [])

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/support-chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  const handleHide = () => {
    setIsHidden(true)
    setIsOpen(false)
    localStorage.setItem('supportChatHidden', 'true')
  }

  const handleShow = () => {
    setIsHidden(false)
    localStorage.removeItem('supportChatHidden')
  }

  const getMessageText = (message: typeof messages[0]): string => {
    if (!message.parts || !Array.isArray(message.parts)) return ''
    return message.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('')
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

  // Closed state - floating button (positioned to avoid overlap)
  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white pl-3 pr-2 py-2.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">Need Help?</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleHide()
            }}
            className="p-1 hover:bg-white/20 rounded-full transition-colors ml-1"
            title="Hide chat"
          >
            <X className="w-4 h-4" />
          </button>
          <span className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </button>
      </div>
    )
  }

  // Open state - chat window
  return (
    <div 
      className={`fixed z-40 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-300 ${
        isMinimized 
          ? 'bottom-4 right-4 w-64 h-12' 
          : 'bottom-4 right-4 w-[calc(100vw-2rem)] sm:w-80 h-[400px] max-w-80'
      }`}
    >
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-2.5 flex items-center justify-between cursor-pointer"
        onClick={() => isMinimized && setIsMinimized(false)}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <span className="font-medium text-sm">Support</span>
        </div>
        <div className="flex items-center gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMinimized(!isMinimized)
            }}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title={isMinimized ? "Expand" : "Minimize"}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleHide()
            }}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="Hide chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[calc(100%-100px)] overflow-y-auto p-3 space-y-3 bg-zinc-50">
            {messages.length === 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-text-secondary mb-3">
                  How can I help you?
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {['How does it work?', 'Pricing', 'ATS tips'].map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage({ text: q })}
                      className="text-xs bg-white border border-border px-2.5 py-1 rounded-full hover:bg-primary-50 hover:border-primary-200 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user' ? 'bg-primary-600' : 'bg-zinc-200'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-3 h-3 text-white" />
                  ) : (
                    <Bot className="w-3 h-3 text-zinc-600" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-sm'
                      : 'bg-white border border-border text-text-primary rounded-bl-sm'
                  }`}
                >
                  {getMessageText(message)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center">
                  <Bot className="w-3 h-3 text-zinc-600" />
                </div>
                <div className="bg-white border border-border px-3 py-2 rounded-xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-2 border-t border-border bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="sm"
                disabled={isLoading || !input.trim()}
                className="bg-primary-600 hover:bg-primary-700 px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
