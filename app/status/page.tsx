'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Search,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Layers,
  FileCheck,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  Ticket,
} from 'lucide-react'
import { PageTransition } from '@/components/page-transition'
import { SectionHeading } from '@/components/section-heading'
import { HackerBadgeModal } from '@/components/hacker-badge-modal'
import { useToast } from '@/components/toast'
import { api } from '@/lib/api'

interface StatusResult {
  name: string
  email: string
  team: string
  size: string
  role: string
  track: string
  registrationId: string
  status: 'Confirmed & Active' | 'Waitlist' | 'Pending Review'
  date: string
  venue: string
  college?: string
}

// Pre-seeded demo registrations for instant testing
const defaultDemoRecords: Record<string, StatusResult> = {
  'demo@hackfest.dev': {
    name: 'Aarav Sharma',
    email: 'demo@hackfest.dev',
    team: 'Quantum Pioneers',
    size: '3',
    role: 'Full-Stack Lead',
    track: 'AI & Machine Learning',
    registrationId: 'HF26-00127',
    status: 'Confirmed & Active',
    date: '13–14 September 2026',
    venue: 'Information Technology department, Gauhati University · Hybrid',
    college: 'Gauhati University',
  },
  'alex@example.com': {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    team: 'CyberSentinels',
    size: '4',
    role: 'Security Engineer',
    track: 'Cybersecurity',
    registrationId: 'HF26-00892',
    status: 'Confirmed & Active',
    date: '13–14 September 2026',
    venue: 'Information Technology department, Gauhati University · Hybrid',
    college: 'Cotton University',
  },
}

function StatusCheckerContent() {
  const searchParams = useSearchParams()
  const { showToast } = useToast()

  const [emailInput, setEmailInput] = useState('')
  const [queryState, setQueryState] = useState<'idle' | 'loading' | 'found' | 'not_found'>('idle')
  const [searchResult, setSearchResult] = useState<StatusResult | null>(null)
  const [copiedId, setCopiedId] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [showBadgeModal, setShowBadgeModal] = useState(false)

  const performLookup = async (emailToLookup: string, isAuto = false) => {
    setValidationError('')
    const cleanEmail = emailToLookup.trim().toLowerCase()

    if (!cleanEmail) {
      setValidationError('Please enter an email address.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setValidationError('Please enter a valid email address.')
      return
    }

    setQueryState('loading')

    // 1. First, attempt lookup from live Express + MongoDB Atlas backend
    try {
      const response = await api.getRegistration(cleanEmail)
      if (response.success && response.registration) {
        const live = response.registration
        const rec: StatusResult = {
          name: live.fullName,
          email: live.email,
          team: live.teamName,
          size: String(live.teamSize),
          role: live.role,
          track: live.track,
          registrationId: live.registrationId,
          status: 'Confirmed & Active',
          date: '16–17 October 2026',
          venue: 'Information Technology department, Gauhati University · Hybrid',
          college: live.college,
        }
        setSearchResult(rec)
        setQueryState('found')
        if (isAuto) {
          showToast('Live Record Verified', `Welcome back, ${rec.name}! (Synced with Atlas)`, 'success')
        }
        return
      }
    } catch (err: any) {
      console.log('Live backend lookup check:', err.message)
    }

    // 2. Check in pre-seeded demo records
    if (defaultDemoRecords[cleanEmail]) {
      const rec = defaultDemoRecords[cleanEmail]
      setSearchResult(rec)
      setQueryState('found')
      if (isAuto) {
        showToast('Registration Record Found', `Welcome back, ${rec.name}!`, 'success')
      }
      return
    }

    // 3. Check in localStorage from recent registrations
    try {
      const saved = JSON.parse(localStorage.getItem('hackfest_demo_registrations') || '[]')
      const matched = saved.find(
        (item: any) => item.email && item.email.toLowerCase() === cleanEmail
      )
      if (matched) {
        const rec: StatusResult = {
          name: matched.name,
          email: matched.email,
          team: matched.team,
          size: matched.size || '3',
          role: matched.role || 'Developer',
          track: matched.track || 'AI & Machine Learning',
          registrationId: matched.registrationId || 'HF26-00127',
          status: 'Confirmed & Active',
          date: '16–17 October 2026',
          venue: 'Information Technology department, Gauhati University · Hybrid',
          college: matched.college || 'Gauhati University',
        }
        setSearchResult(rec)
        setQueryState('found')
        if (isAuto) {
          showToast('Registration Record Found', `Welcome back, ${rec.name}!`, 'success')
        }
        return
      }
    } catch (err) {
      console.error('LocalStorage check failed', err)
    }

    // 4. Not found state
    setSearchResult(null)
    setQueryState('not_found')
  }

  // Auto-fill and lookup if ?email=... query param is provided
  useEffect(() => {
    const emailParam = searchParams?.get('email')
    if (emailParam) {
      setEmailInput(emailParam)
      performLookup(emailParam, true)
    }
  }, [searchParams])

  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault()
    performLookup(emailInput)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(true)
    showToast('Copied to Clipboard', text, 'info')
    setTimeout(() => setCopiedId(false), 2000)
  }

  const fillQuickDemo = (email: string) => {
    setEmailInput(email)
    setValidationError('')
    performLookup(email)
  }

  return (
    <div className="status-checker-grid">
      {/* Input Form Box */}
      <div className="glass-card status-search-card">
        <span className="eyebrow">SEARCH REGISTRATION</span>
        <h2 className="status-search-title">Lookup by Email</h2>
        <p className="status-search-desc">
          Enter the email address provided during team registration.
        </p>

        <form onSubmit={handleCheckStatus} className="status-form-wrapper" noValidate>
          <div className="status-input-container">
            <div className="status-input-field">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value)
                  if (validationError) setValidationError('')
                }}
                placeholder="e.g. demo@hackfest.dev"
                className={validationError ? 'input-error' : ''}
              />
            </div>
            <button
              type="submit"
              disabled={queryState === 'loading'}
              className="button button-primary status-submit-btn"
            >
              {queryState === 'loading' ? (
                <>
                  <span className="spinner-loader" />
                  <span>Searching…</span>
                </>
              ) : (
                <>
                  <Search size={16} />
                  <span>Check Status</span>
                </>
              )}
            </button>
          </div>
          {validationError && <p className="field-err-msg">{validationError}</p>}
        </form>

        {/* Demo Quick Fill Buttons */}
        <div className="quick-test-box">
          <span className="quick-test-label">Demo testing shortcuts:</span>
          <div className="quick-test-pills">
            <button
              type="button"
              onClick={() => fillQuickDemo('demo@hackfest.dev')}
              className="demo-chip-btn"
            >
              demo@hackfest.dev
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo('alex@example.com')}
              className="demo-chip-btn"
            >
              alex@example.com
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo('unknown@test.com')}
              className="demo-chip-btn"
            >
              unknown@test.com
            </button>
          </div>
        </div>

        <div className="status-note-footer">
          <AlertCircle size={14} className="accent-violet" />
          <span>Frontend demo checker — searches seeded records and local browser state.</span>
        </div>
      </div>

      {/* Results Display Area */}
      <div className="status-results-wrapper">
        {queryState === 'idle' && (
          <div className="glass-card status-placeholder-card">
            <FileCheck size={40} className="accent-cyan" />
            <h3>Ready to Check</h3>
            <p>
              Enter your email address on the left and click &quot;Check Status&quot; to review your registration record.
            </p>
          </div>
        )}

        {queryState === 'found' && searchResult && (
          <div className="glass-card status-success-record-card">
            <div className="status-badge-row">
              <div className="status-pill-confirmed">
                <CheckCircle2 size={16} />
                <span>{searchResult.status}</span>
              </div>
              <span className="mono-sub">HACKFEST 2026 PASS</span>
            </div>

            <div className="status-id-highlight">
              <div className="status-id-text">
                <span className="label">Registration ID</span>
                <strong className="val">{searchResult.registrationId}</strong>
              </div>
              <button
                onClick={() => handleCopy(searchResult.registrationId)}
                className="button-copy-id"
                title="Copy Registration ID"
              >
                {copiedId ? <Check size={14} className="accent-cyan" /> : <Copy size={14} />}
                <span>{copiedId ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="status-details-grid">
              <div className="status-detail-cell">
                <span className="cell-label">Participant Name</span>
                <strong className="cell-val">{searchResult.name}</strong>
              </div>
              <div className="status-detail-cell">
                <span className="cell-label">Email Address</span>
                <strong className="cell-val">{searchResult.email}</strong>
              </div>
              <div className="status-detail-cell">
                <span className="cell-label">Team Name</span>
                <strong className="cell-val">{searchResult.team}</strong>
              </div>
              <div className="status-detail-cell">
                <span className="cell-label">Team Size</span>
                <strong className="cell-val">{searchResult.size} Members</strong>
              </div>
              <div className="status-detail-cell">
                <span className="cell-label">Role</span>
                <strong className="cell-val">{searchResult.role}</strong>
              </div>
              <div className="status-detail-cell">
                <span className="cell-label">Challenge Track</span>
                <strong className="cell-val accent-cyan">{searchResult.track}</strong>
              </div>
            </div>

            <div className="status-checkin-box">
              <div className="checkin-row">
                <Calendar size={14} className="accent-cyan" />
                <span>Event Dates: <strong>{searchResult.date}</strong></span>
              </div>
              <div className="checkin-row">
                <MapPin size={14} className="accent-cyan" />
                <span>Check-in Location: <strong>{searchResult.venue}</strong></span>
              </div>
            </div>

            <div className="status-actions-row" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                onClick={() => setShowBadgeModal(true)}
                className="button button-primary"
                style={{ background: 'linear-gradient(135deg, #2de2e6, #8b7cff)', color: '#041014' }}
              >
                <Ticket size={16} />
                <span>View Digital Hacker Pass</span>
              </button>

              <Link href="/schedule" className="button button-secondary">
                <span>View Day 1 Schedule</span>
                <ArrowRight size={15} />
              </Link>
              <Link href="/faq" className="button button-secondary">
                <span>Participant FAQ</span>
              </Link>
            </div>

            {/* Hacker Badge Modal */}
            <HackerBadgeModal
              isOpen={showBadgeModal}
              onClose={() => setShowBadgeModal(false)}
              data={{
                name: searchResult.name,
                team: searchResult.team,
                track: searchResult.track,
                id: searchResult.registrationId,
                role: searchResult.role,
                college: searchResult.college,
              }}
            />
          </div>
        )}

        {queryState === 'not_found' && (
          <div className="glass-card status-missing-card">
            <div className="missing-icon-box">
              <XCircle size={36} />
            </div>
            <h3 className="missing-title">Registration Not Found</h3>
            <p className="missing-desc">
              We could not find any active HackFest 2026 registration associated with{' '}
              <strong>{emailInput}</strong>.
            </p>
            <p className="missing-hint">
              Please check for any typos or register your team now. Free slots are still available.
            </p>
            <div className="missing-action-btn">
              <Link href="/register" className="button button-primary">
                <span>Register Now</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function StatusPage() {
  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* Page Header */}
        <section className="subpage-header-section">
          <div className="subpage-header-container">
            <span className="eyebrow">07 / REGISTRATION STATUS CHECKER</span>
            <h1 className="subpage-hero-title">
              Track Your <span className="text-gradient-cyan">HackFest Status</span>.
            </h1>
            <p className="subpage-hero-subtitle">
              Lookup your team registration details, check-in instructions, and confirmed Registration ID
              using your registered email address.
            </p>
          </div>
        </section>

        {/* Status Checker Form & Card */}
        <section className="section-container" style={{ paddingTop: '0' }}>
          <Suspense fallback={<div className="loading-placeholder">Loading status checker…</div>}>
            <StatusCheckerContent />
          </Suspense>
        </section>
      </main>
    </PageTransition>
  )
}

