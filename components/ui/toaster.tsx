"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
export function Toaster() {
  const { toasts } = useToast()
  return (
    <ToastProvider data-oid="0wb5x4f">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="n45pjz0">
            <div className="grid gap-1" data-oid="f6moe:y">
              {title && <ToastTitle data-oid="kpdtafs">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid="5wp_:ky">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="tx9-hkb" />
          </Toast>
        )
      })}
      <ToastViewport data-oid="vqeox23" />
    </ToastProvider>
  )
}
