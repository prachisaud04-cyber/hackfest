'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Copy, Check, Printer, Sparkles, MapPin, Calendar, QrCode, ShieldCheck } from 'lucide-react'

interface HackerBadgeModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    name: string
    team: string
    track: string
    id: string
    role?: string
    college?: string
  }
}

export function HackerBadgeModal({ isOpen, onClose, data }: HackerBadgeModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(data.id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <AnimatePresence>
      <div className="modal-overlay-backdrop" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="hacker-badge-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top close button */}
          <button onClick={onClose} className="badge-modal-close" aria-label="Close pass">
            <X size={20} />
          </button>

          {/* Holographic Badge Ticket Container */}
          <div className="holographic-pass-container">
            <div className="pass-lanyard-hole" />
            <div className="pass-shine-effect" />

            {/* Badge Header */}
            <div className="badge-header-row">
              <div className="badge-brand">
                <span className="brand-title">HACKFEST</span>
                <span className="brand-year">2026</span>
              </div>
              <div className="badge-type-pill">
                <ShieldCheck size={12} />
                <span>OFFICIAL HACKER PASS</span>
              </div>
            </div>

            {/* Hacker Identity */}
            <div className="badge-identity-section">
              <div className="badge-avatar-circle">
                <span>{data.name.substring(0, 2).toUpperCase()}</span>
              </div>
              <h3 className="badge-hacker-name">{data.name}</h3>
              <p className="badge-team-name">Team {data.team}</p>
              {data.college && <span className="badge-college-name">{data.college}</span>}
            </div>

            {/* Pass Metadata Table */}
            <div className="badge-meta-grid">
              <div className="badge-meta-item">
                <span className="meta-lbl">CHALLENGE TRACK</span>
                <strong className="meta-val accent-cyan">{data.track}</strong>
              </div>
              <div className="badge-meta-item">
                <span className="meta-lbl">REGISTRATION ID</span>
                <strong className="meta-val mono-font">{data.id}</strong>
              </div>
              <div className="badge-meta-item">
                <span className="meta-lbl">EVENT DATES</span>
                <strong className="meta-val">13–14 Sept 2026</strong>
              </div>
              <div className="badge-meta-item">
                <span className="meta-lbl">VENUE</span>
                <strong className="meta-val">IT Dept · Gauhati Univ</strong>
              </div>
            </div>

            {/* Barcode & QR Stamp */}
            <div className="badge-barcode-footer">
              <div className="barcode-graphic-bars" />
              <div className="barcode-digits">{data.id} · 2026-GU-HF</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="badge-modal-actions">
            <button onClick={handleCopy} className="button button-secondary button-sm">
              {copied ? <Check size={14} className="accent-cyan" /> : <Copy size={14} />}
              <span>{copied ? 'Copied ID' : 'Copy Reg ID'}</span>
            </button>
            <button onClick={handlePrint} className="button button-primary button-sm">
              <Printer size={14} />
              <span>Print / Save Pass</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
