'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { MessageCircle, X, Send, Bot, User, Minimize2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Check if user previously hid the chat
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

  // Hidden state - show small toggle button on the side
  if (isHidden) {
    return (
      <button
        onClick={handleShow}
        className="fixed bottom-20 right-0 z-50 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-l-lg shadow-lg transition-all duration-300 hover:pr-4 group"
        title="Show support chat"
      >
        <MessageCircle className="w-4 h-4" />
      </button>
    )
  }

  // Closed state - show "Need Help?" button
  if (!isOpen) {
    return (
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Need Help?</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </button>
        <button
          onClick={handleHide}
          className="text-xs text-text-muted hover:text-text-secondary transition-colors flex items-center gap-1"
        >
          <ChevronDown className="w-3 h-3" />
          Hide
        </button>
      </div>
    )
  }

  // Open state - show chat window
  return (
    <div 
      className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-white rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-300 ${
        isMinimized ? 'w-72 h-14' : 'w-[calc(100vw-2rem)] sm:w-96 h-[450px] sm:h-[500px] max-w-96'
      }`}
    >
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3 flex items-center justify-between cursor-pointer"
        onClick={() => isMinimized && setIsMinimized(false)}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">ForgeCareerAI Support</h3>
            {!isMinimized && (
              <p className="text-xs text-white/80">Ask me anything!</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMinimized(!isMinimized)
            }}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="Minimize"
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
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
            }}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[calc(100%-120px)] overflow-y-auto p-4 space-y-4 bg-zinc-50">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bot className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  Hi! How can I help you today?
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['How does it work?', 'Pricing plans', 'ATS optimization'].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        sendMessage({ text: q })
                      }}
                      className="text-xs bg-white border border-border px-3 py-1.5 rounded-full hover:bg-primary-50 hover:border-primary-200 transition-colors"
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
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-primary-600'
                      : 'bg-zinc-200'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-zinc-600" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white rounded-br-md'
                      : 'bg-white border border-border text-text-primary rounded-bl-md'
                  }`}
                >
                  {getMessageText(message)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-zinc-200 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-zinc-600" />
                </div>
                <div className="bg-white border border-border px-3 py-2 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
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
