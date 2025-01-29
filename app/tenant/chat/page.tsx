"use server"

import ChatInterface from "./_components/chat-interface"

export default async function ChatPage() {
  return (
    <div className="flex size-full flex-col">
      <ChatInterface />
    </div>
  )
}
