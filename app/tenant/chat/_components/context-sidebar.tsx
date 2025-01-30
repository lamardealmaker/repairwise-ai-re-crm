"use client"

import {
  TicketSuggestion,
  ConversationInsight,
  ContextWindow
} from "@/types/ai-types"
import { Message } from "@/types/chat-types"

export interface ContextSidebarProps {
  isOpen: boolean
  onClose: () => void
  ticketSuggestion: TicketSuggestion | null
  insights: ConversationInsight[]
  context?: ContextWindow
  messages: Message[]
  onCreateTicket: () => Promise<void>
}

export default function ContextSidebar({
  isOpen,
  onClose,
  ticketSuggestion,
  insights,
  context,
  messages,
  onCreateTicket
}: ContextSidebarProps) {
  if (!isOpen) return null

  return (
    <div className="w-80 border-l bg-white p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Context</h2>
        <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
          <span className="sr-only">Close sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {/* Context Summary */}
        {context && (
          <>
            <div>
              <h3 className="font-medium">Summary</h3>
              <p className="mt-2 text-sm text-gray-600">{context.summary}</p>
            </div>

            {/* Long-term Memory */}
            <div>
              <h3 className="font-medium">Remembered Information</h3>
              <div className="mt-2 space-y-2">
                {context.longTerm.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-gray-50 p-3 text-sm"
                  >
                    <div className="font-medium">{item.key}</div>
                    <div className="mt-1 text-gray-600">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Ticket Suggestion */}
        {ticketSuggestion && (
          <div>
            <h3 className="font-medium">Ticket Suggestion</h3>
            <div className="mt-2 rounded-lg bg-blue-50 p-3 text-sm">
              <div className="font-medium">{ticketSuggestion.title}</div>
              <div className="mt-1 text-gray-600">
                {ticketSuggestion.summary}
              </div>
              <div className="mt-2 flex gap-2">
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                  {ticketSuggestion.category}
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                  {ticketSuggestion.priority}
                </span>
              </div>
              <button
                onClick={onCreateTicket}
                className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Create Ticket
              </button>
            </div>
          </div>
        )}

        {/* Insights */}
        {insights.length > 0 && (
          <div>
            <h3 className="font-medium">Insights</h3>
            <div className="mt-2 space-y-2">
              {insights.map((insight, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs">
                      {insight.type}
                    </span>
                    <span className="text-gray-500">
                      {Math.round(insight.confidence * 100)}% confidence
                    </span>
                  </div>
                  <div className="mt-1">{insight.content}</div>
                  {insight.context && (
                    <div className="mt-1 text-sm text-gray-500">
                      Context: {insight.context}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
