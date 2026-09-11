'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Download,
  Search,
  Home,
  Check,
  Copy,
  Share2,
  ShieldCheck,
  Sparkles,
  Printer,
  RotateCcw,
  Zap,
  CheckCircle2,
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
  const [isGeneratingPng, setIsGeneratingPng] = useState(false)
  const { showToast } = useToast()

  const eventDate = data.date || '16–17 October 2026'
  const eventVenue = data.venue || 'Information Technology department, Gauhati University'
  const eventMode = data.mode || 'Hybrid'

  const handleCopyId = () => {
    navigator.clipboard.writeText(data.registrationId)
    setCopied(true)
    showToast('Registration ID Copied', data.registrationId, 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSharePass = async () => {
    const shareUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/status?email=${encodeURIComponent(data.email || '')}`
      : 'https://hackfest.org'

    const shareData = {
      title: 'HackFest 2026 Hacker Pass',
      text: `🚀 My team "${data.team}" is officially registered for HackFest 2026! Registration ID: ${data.registrationId}`,
      url: shareUrl,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        showToast('Shared Successfully', 'Your Hacker Pass was shared.', 'success')
        return
      } catch (err) {
        // User cancelled or fallback
      }
    }

    // Fallback: Copy link
    navigator.clipboard.writeText(shareUrl)
    showToast('Team Pass Link Copied', 'Share this link with your teammates to view the pass.', 'success')
  }

  // 1-Click PNG Ticket Generator using HTML5 Canvas
  const handleDownloadPng = () => {
    setIsGeneratingPng(true)
    showToast('Generating PNG Ticket', 'Creating high-resolution digital pass...', 'info')

    try {
      const canvas = document.createElement('canvas')
      canvas.width = 1200
      canvas.height = 680
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        window.print()
        setIsGeneratingPng(false)
        return
      }

      // Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 680)
      bgGrad.addColorStop(0, '#030712')
      bgGrad.addColorStop(0.5, '#060d24')
      bgGrad.addColorStop(1, '#02050e')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, 1200, 680)

      // Cyberpunk Grid Lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)'
      ctx.lineWidth = 1
      for (let x = 0; x < 1200; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 680)
        ctx.stroke()
      }
      for (let y = 0; y < 680; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(1200, y)
        ctx.stroke()
      }

      // Outer Neon Border
      ctx.strokeStyle = '#00f0ff'
      ctx.lineWidth = 3
      ctx.strokeRect(30, 30, 1140, 620)

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)'
      ctx.lineWidth = 1
      ctx.strokeRect(38, 38, 1124, 604)

      // Corner Tech Accents
      const drawCorner = (x: number, y: number) => {
        ctx.fillStyle = '#00f0ff'
        ctx.fillRect(x - 5, y - 5, 10, 10)
      }
      drawCorner(30, 30)
      drawCorner(1170, 30)
      drawCorner(30, 650)
      drawCorner(1170, 650)

      // Header Brand
      ctx.fillStyle = '#00f0ff'
      ctx.font = 'bold 38px monospace'
      ctx.fillText('HACKFEST 2026', 70, 95)

      ctx.fillStyle = '#9ca3af'
      ctx.font = '16px sans-serif'
      ctx.fillText('“BUILD. BREAK. INNOVATE.” · OFFICIAL HACKER PASS', 70, 125)

      // Pass Badge Pill
      ctx.fillStyle = 'rgba(0, 240, 255, 0.15)'
      ctx.fillRect(860, 60, 250, 48)
      ctx.strokeStyle = '#00f0ff'
      ctx.lineWidth = 1.5
      ctx.strokeRect(860, 60, 250, 48)

      ctx.fillStyle = '#00f0ff'
      ctx.font = 'bold 16px monospace'
      ctx.fillText('● ADMIT ONE HACKER', 885, 90)

      // Perforation Line
      ctx.setLineDash([8, 8])
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(780, 150)
      ctx.lineTo(780, 580)
      ctx.stroke()
      ctx.setLineDash([])

      // Participant Details
      ctx.fillStyle = '#6b7280'
      ctx.font = '13px monospace'
      ctx.fillText('HACKER NAME', 70, 185)

      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 32px sans-serif'
      ctx.fillText(data.name, 70, 225)

      if (data.college) {
        ctx.fillStyle = '#9ca3af'
        ctx.font = '16px sans-serif'
        ctx.fillText(data.college, 70, 255)
      }

      // Metadata Matrix
      const drawField = (label: string, value: string, x: number, y: number, isAccent = false) => {
        ctx.fillStyle = '#6b7280'
        ctx.font = '12px monospace'
        ctx.fillText(label, x, y)
        ctx.fillStyle = isAccent ? '#00f0ff' : '#f3f4f6'
        ctx.font = 'bold 18px sans-serif'
        ctx.fillText(value, x, y + 26)
      }

      drawField('TEAM NAME', data.team, 70, 310)
      drawField('ROLE', data.role, 420, 310)
      drawField('CHALLENGE TRACK', data.track, 70, 390, true)
      drawField('STATUS', 'CONFIRMED & ACTIVE', 420, 390)
      drawField('EVENT DATES', eventDate, 70, 470)
      drawField('MODE', eventMode, 420, 470)
      drawField('VENUE', eventVenue, 70, 545)

      // Right Column: Registration ID & Barcode
      ctx.fillStyle = 'rgba(0, 240, 255, 0.1)'
      ctx.fillRect(810, 170, 320, 110)
      ctx.strokeStyle = '#00f0ff'
      ctx.lineWidth = 1
      ctx.strokeRect(810, 170, 320, 110)

      ctx.fillStyle = '#6b7280'
      ctx.font = '13px monospace'
      ctx.fillText('REGISTRATION ID', 835, 205)

      ctx.fillStyle = '#00f0ff'
      ctx.font = 'bold 30px monospace'
      ctx.fillText(data.registrationId, 835, 250)

      // Barcode simulation
      ctx.fillStyle = '#f3f4f6'
      let bx = 810
      const barWidths = [3, 1, 4, 2, 5, 2, 1, 4, 3, 2, 6, 2, 4, 1, 3, 5, 2, 3, 4, 2, 1, 5, 2, 4, 3, 1, 4, 2, 5, 3]
      for (let i = 0; i < barWidths.length; i++) {
        ctx.fillRect(bx, 320, barWidths[i], 160)
        bx += barWidths[i] + (i % 2 === 0 ? 5 : 3)
      }

      ctx.fillStyle = '#6b7280'
      ctx.font = '13px monospace'
      ctx.fillText(`HF26-AUTH-${data.registrationId.replace('HF26-', '')}`, 845, 510)

      // Footer
      ctx.fillStyle = 'rgba(0, 240, 255, 0.5)'
      ctx.font = '12px monospace'
      ctx.fillText('SECURED DIGITAL EVENT PASS · GAUHATI UNIVERSITY · 16–17 OCT 2026', 70, 615)

      // Convert to image and download
      const dataUrl = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = dataUrl
      a.download = `HackFest2026-Ticket-${data.registrationId}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      showToast('Ticket Downloaded! 🎉', `Saved as HackFest2026-Ticket-${data.registrationId}.png`, 'success')
    } catch (err) {
      window.print()
    } finally {
      setIsGeneratingPng(false)
    }
  }

  const handlePrintPdf = () => {
    showToast('Print / Save PDF', 'Select "Save as PDF" in your print dialog.', 'info')
    setTimeout(() => window.print(), 300)
  }

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
                  CONFIRMED & ACTIVE
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
          onClick={handleDownloadPng}
          disabled={isGeneratingPng}
          className="button button-primary ticket-action-btn"
          title="Download digital pass as PNG image"
        >
          <Download size={16} />
          <span>{isGeneratingPng ? 'Generating PNG...' : 'Download PNG Ticket'}</span>
        </button>

        <button
          type="button"
          onClick={handleSharePass}
          className="button button-secondary ticket-action-btn"
          title="Share ticket or copy teammate invite link"
        >
          <Share2 size={16} />
          <span>Share / Invite Team</span>
        </button>

        <button
          type="button"
          onClick={handlePrintPdf}
          className="button button-secondary ticket-action-btn"
          title="Print or Save PDF"
        >
          <Printer size={16} />
          <span>Print / PDF</span>
        </button>

        {data.email ? (
          <Link
            href={`/status?email=${encodeURIComponent(data.email)}`}
            className="button button-secondary ticket-action-btn"
          >
            <Search size={16} />
            <span>Check Status</span>
          </Link>
        ) : (
          <Link href="/status" className="button button-secondary ticket-action-btn">
            <Search size={16} />
            <span>Check Status</span>
          </Link>
        )}

        <Link href="/" className="button button-secondary ticket-action-btn">
          <Home size={16} />
          <span>Home</span>
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
