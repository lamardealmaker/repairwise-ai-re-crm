"use client"

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <div className="size-2 animate-bounce rounded-full bg-gray-400" />
      <div className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]" />
      <div className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]" />
    </div>
  )
}
