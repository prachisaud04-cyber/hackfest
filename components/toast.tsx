'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'

interface ToastMessage {
  id: string
  title: string
  description?: string
  type?: 'success' | 'info' | 'warning' | 'error'
}

interface ToastContextType {
  showToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback(
    (title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, title, description, type }])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 4000)
    },
    []
  )

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-portal-container" aria-live="polite">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className={`toast-notification-item toast-${toast.type || 'success'}`}
            >
              <div className="toast-icon">
                {toast.type === 'info' && <Info size={18} />}
                {toast.type === 'warning' && <AlertTriangle size={18} />}
                {toast.type === 'error' && <AlertTriangle size={18} className="text-red-400" />}
                {(!toast.type || toast.type === 'success') && <CheckCircle2 size={18} />}
              </div>
              <div className="toast-text-content">
                <strong className="toast-title">{toast.title}</strong>
                {toast.description && <p className="toast-description">{toast.description}</p>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="toast-close-btn"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    // Fallback if rendered outside provider
    return {
      showToast: (title: string, description?: string) => {
        console.log(`[Toast] ${title}: ${description || ''}`)
      },
    }
  }
  return context
}
