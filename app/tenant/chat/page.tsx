"use server"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import {
  getChatSessionsAction,
  getChatMessagesAction
} from "@/actions/db/chat-actions"
import ChatInterface from "./_components/chat-interface"
import { Message, Attachment } from "@/types/chat-types"
import { SelectChatMessage, SelectChatAttachment } from "@/db/schema"

export default async function ChatPage() {
  const session = await auth()
  if (!session?.userId) redirect("/login")

  const { data: sessions } = await getChatSessionsAction(session.userId)
  const activeSession = sessions?.[0]

  let messages: Message[] = []
  if (activeSession?.id) {
    const { data: fetchedMessages } = await getChatMessagesAction(
      activeSession.id
    )
    if (fetchedMessages) {
      messages = fetchedMessages.map(
        (
          msg: SelectChatMessage & { attachments?: SelectChatAttachment[] }
        ) => ({
          id: msg.id,
          sessionId: msg.sessionId,
          content: msg.content,
          role: msg.role,
          metadata: msg.metadata,
          createdAt: msg.createdAt.toISOString(),
          updatedAt: msg.updatedAt.toISOString(),
          attachments: msg.attachments?.map((att: SelectChatAttachment) => ({
            id: att.id,
            messageId: att.messageId,
            name: att.name,
            type: att.type,
            url: att.url,
            size: att.size,
            metadata: att.metadata,
            createdAt: att.createdAt.toISOString(),
            updatedAt: att.updatedAt.toISOString()
          }))
        })
      )
    }
  }

  return (
    <div className="flex size-full flex-col">
      <ChatInterface
        userId={session.userId}
        initialSessionId={activeSession?.id}
        initialMessages={messages}
      />
    </div>
  )
}
