'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Download,
  Search,
  Home,
  Check,
  Copy,
  QrCode,
  ShieldCheck,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Layers,
  ArrowRight,
  RotateCcw,
  Zap,
} from 'lucide-react'
import { motion } from 'motion/react'
import { useToast } from '@/components/toast'

export interface HackerTicketProps {
  data: {
    name: string
    team: string
    track: string
    role: string
    registrationId: string
    date?: string
    venue?: string
    mode?: string
    college?: string
    email?: string
  }
  onResetForm?: () => void
}

export function HackerTicketCard({ data, onResetForm }: HackerTicketProps) {
  const [copied, setCopied] = useState(false)
  const { showToast } = useToast()

  const handleCopyId = () => {
    navigator.clipboard.writeText(data.registrationId)
    setCopied(true)
    showToast('Registration ID Copied', data.registrationId, 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadTicket = () => {
    showToast(
      'Generating Ticket Printout',
      'Opening print dialog. Select "Save as PDF" to save your digital Hacker Ticket.',
      'info'
    )
    setTimeout(() => {
      window.print()
    }, 300)
  }

  const eventDate = data.date || '13–14 September 2026'
  const eventVenue = data.venue || 'Information Technology department, Gauhati University'
  const eventMode = data.mode || 'Hybrid'

  return (
    <div className="hacker-ticket-wrapper">
      {/* Premium Digital Event Ticket Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="premium-hacker-ticket-container"
        id="printable-hacker-ticket"
      >
        {/* Animated ambient border glow */}
        <div className="ticket-border-glow" />

        {/* Moving horizontal scanline */}
        <div className="ticket-scanline-bar" />

        {/* Notched perforated edges */}
        <div className="ticket-notch-left" />
        <div className="ticket-notch-right" />

        {/* Ticket Header */}
        <div className="ticket-header-block">
          <div className="ticket-brand-group">
            <div className="ticket-logo-row">
              <span className="ticket-brand-main">HACKFEST</span>
              <span className="ticket-brand-year">2026</span>
            </div>
            <span className="ticket-tagline-motto">&ldquo;BUILD. BREAK. INNOVATE.&rdquo;</span>
          </div>

          <div className="ticket-pass-badge-pill">
            <ShieldCheck size={13} className="accent-cyan" />
            <span>HACKER TICKET</span>
            <span className="live-status-dot" />
          </div>
        </div>

        {/* Ticket Decorative Divider */}
        <div className="ticket-perforation-divider">
          <div className="dashed-line" />
        </div>

        {/* Ticket Main Content Grid */}
        <div className="ticket-body-grid">
          {/* Left / Top Details */}
          <div className="ticket-info-col">
            {/* Participant Profile Banner */}
            <div className="ticket-participant-banner">
              <div className="ticket-avatar-disc">
                <span>{data.name.substring(0, 2).toUpperCase()}</span>
              </div>
              <div className="ticket-participant-meta">
                <span className="ticket-field-lbl">HACKER NAME</span>
                <h3 className="ticket-hacker-name">{data.name}</h3>
                {data.college && <span className="ticket-college-tag">{data.college}</span>}
              </div>
            </div>

            {/* Structured Ticket Fields Grid */}
            <div className="ticket-fields-matrix">
              <div className="ticket-field-cell">
                <span className="tf-lbl">TEAM</span>
                <strong className="tf-val">{data.team}</strong>
              </div>

              <div className="ticket-field-cell">
                <span className="tf-lbl">ROLE</span>
                <strong className="tf-val">{data.role}</strong>
              </div>

              <div className="ticket-field-cell">
                <span className="tf-lbl">CHALLENGE TRACK</span>
                <strong className="tf-val accent-cyan">{data.track}</strong>
              </div>

              <div className="ticket-field-cell">
                <span className="tf-lbl">STATUS</span>
                <span className="tf-status-badge">
                  <span className="pulse-green-dot" />
                  REGISTERED
                </span>
              </div>

              <div className="ticket-field-cell">
                <span className="tf-lbl">EVENT DATES</span>
                <strong className="tf-val">{eventDate}</strong>
              </div>

              <div className="ticket-field-cell">
                <span className="tf-lbl">MODE</span>
                <strong className="tf-val">{eventMode}</strong>
              </div>

              <div className="ticket-field-cell span-two-cols">
                <span className="tf-lbl">VENUE</span>
                <strong className="tf-val tf-venue-val">{eventVenue}</strong>
              </div>
            </div>
          </div>

          {/* Right / QR & Barcode Section */}
          <div className="ticket-barcode-col">
            <div className="ticket-reg-id-box">
              <span className="tf-lbl">REGISTRATION ID</span>
              <strong className="ticket-reg-id-val mono-font">{data.registrationId}</strong>
              <button
                type="button"
                onClick={handleCopyId}
                className="ticket-copy-btn"
                title="Copy Registration ID"
              >
                {copied ? <Check size={12} className="accent-cyan" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* QR Code Graphic with Scan Beam */}
            <div className="ticket-qr-container">
              <div className="qr-laser-scanner-beam" />
              <div className="mock-qr-code-graphic">
                <div className="qr-corner qr-tl" />
                <div className="qr-corner qr-tr" />
                <div className="qr-corner qr-bl" />
                <div className="qr-matrix-dots" />
                <div className="qr-center-logo">
                  <Zap size={14} />
                </div>
              </div>
              <span className="qr-scan-instruction">SCAN TO VERIFY</span>
            </div>

            {/* Tech Barcode lines */}
            <div className="ticket-barcode-bars" />
            <span className="ticket-serial-stamp">HF26-GU-AUTH-{data.registrationId.replace('HF26-', '')}</span>
          </div>
        </div>

        {/* Ticket Footer Strip */}
        <div className="ticket-footer-strip">
          <span>SECURED EVENT PASS · ADMIT ONE HACKER · NON-TRANSFERABLE</span>
        </div>
      </motion.div>

      {/* Ticket Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="ticket-actions-row"
      >
        <button
          type="button"
          onClick={handleDownloadTicket}
          className="button button-primary ticket-action-btn"
        >
          <Download size={16} />
          <span>Download Hacker Ticket</span>
        </button>

        {data.email ? (
          <Link
            href={`/status?email=${encodeURIComponent(data.email)}`}
            className="button button-secondary ticket-action-btn"
          >
            <Search size={16} />
            <span>View Registration Status</span>
          </Link>
        ) : (
          <Link href="/status" className="button button-secondary ticket-action-btn">
            <Search size={16} />
            <span>View Registration Status</span>
          </Link>
        )}

        <Link href="/" className="button button-secondary ticket-action-btn">
          <Home size={16} />
          <span>Back to Home</span>
        </Link>

        {onResetForm && (
          <button
            type="button"
            onClick={onResetForm}
            className="button button-secondary ticket-action-btn"
          >
            <RotateCcw size={15} />
            <span>Register Another Team</span>
          </button>
        )}
      </motion.div>
    </div>
  )
}
