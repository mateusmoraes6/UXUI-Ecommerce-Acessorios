"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type ToastProps = {
  message: string
  type?: "success" | "error" | "info"
  duration?: number
  onClose: () => void
}

export function Toast({ message, type = "success", duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Aguardar a animação terminar
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg transition-all duration-300",
        {
          "bg-green-100 text-green-800": type === "success",
          "bg-red-100 text-red-800": type === "error",
          "bg-blue-100 text-blue-800": type === "info",
          "translate-y-0 opacity-100": isVisible,
          "translate-y-2 opacity-0": !isVisible,
        },
      )}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="ml-2 rounded-full p-1 hover:bg-black/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export type ToastData = {
  id: string
  message: string
  type: "success" | "error" | "info"
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([])

  // Função global para adicionar toasts
  useEffect(() => {
    window.showToast = (message: string, type: "success" | "error" | "info" = "success") => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, message, type }])
      return id
    }
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
      ))}
    </>
  )
}

// Declaração global para TypeScript
declare global {
  interface Window {
    showToast: (message: string, type?: "success" | "error" | "info") => string
  }
}
