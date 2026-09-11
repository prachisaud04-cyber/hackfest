'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  RotateCcw,
  Copy,
  Calendar,
  MapPin,
  ExternalLink,
  Ticket,
  Home,
  Search,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { PageTransition } from '@/components/page-transition'
import { SectionHeading } from '@/components/section-heading'
import { HackerBadgeModal } from '@/components/hacker-badge-modal'
import { HackerTicketCard } from '@/components/hacker-ticket-card'
import { useToast } from '@/components/toast'
import { api } from '@/lib/api'

const trackOptions = [
  'AI & Machine Learning',
  'Web & App Development',
  'Cybersecurity',
  'HealthTech',
  'Sustainability',
  'Open Innovation',
]

const roleOptions = [
  'Developer (Frontend / Full-Stack)',
  'Developer (Backend / Systems)',
  'AI / Machine Learning Engineer',
  'UI/UX Designer',
  'Product Manager / Strategist',
  'Hardware / IoT Engineer',
  'Other / Multi-disciplinary',
]

interface RegistrationData {
  name: string
  email: string
  phone: string
  college: string
  team: string
  size: string
  role: string
  track: string
  terms: boolean
  registrationId: string
  date: string
}

function RegisterFormContent() {
  const searchParams = useSearchParams()
  const initialTrack = searchParams?.get('track') || 'AI & Machine Learning'
  const { showToast } = useToast()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    team: '',
    size: '2',
    role: 'Developer (Frontend / Full-Stack)',
    track: initialTrack,
    terms: false,
  })

  useEffect(() => {
    const trackParam = searchParams?.get('track')
    if (trackParam && trackOptions.includes(trackParam)) {
      setForm((prev) => ({ ...prev, track: trackParam }))
    }
  }, [searchParams])

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registeredData, setRegisteredData] = useState<RegistrationData | null>(null)
  const [copied, setCopied] = useState(false)
  const [showBadgeModal, setShowBadgeModal] = useState(false)

  const updateField = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!form.name.trim()) newErrors.name = 'Full name is required.'
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.'
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.'
    }

    if (!form.college.trim()) newErrors.college = 'College or organization is required.'
    if (!form.team.trim()) newErrors.team = 'Team name is required.'

    const sizeNum = parseInt(form.size, 10)
    if (isNaN(sizeNum) || sizeNum < 2 || sizeNum > 4) {
      newErrors.size = 'Team size must be between 2 and 4 members.'
    }

    if (!form.terms) {
      newErrors.terms = 'You must agree to the HackFest participation guidelines.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    try {
      // 1. Send to Express + MongoDB backend
      const res = await api.register({
        fullName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        college: form.college.trim(),
        teamName: form.team.trim(),
        teamSize: Number(form.size),
        role: form.role.trim(),
        track: form.track.trim(),
      })

      if (res.success && res.registration) {
        const newRegistration: RegistrationData = {
          ...form,
          registrationId: res.registration.registrationId,
          date: '16–17 October 2026',
        }

        // Cache in localStorage for instant offline access
        try {
          const existing = JSON.parse(localStorage.getItem('hackfest_demo_registrations') || '[]')
          existing.push(newRegistration)
          localStorage.setItem('hackfest_demo_registrations', JSON.stringify(existing))
        } catch (err) {
          console.error('LocalStorage cache failed', err)
        }

        setRegisteredData(newRegistration)
        showToast(
          'Registration Confirmed! 🎉',
          `Welcome to HackFest 2026, ${newRegistration.name}. Your ID is ${res.registration.registrationId}.`,
          'success'
        )
      } else {
        throw new Error(res.message || 'Registration failed. Please try again.')
      }
    } catch (err: any) {
      console.error('[Registration Error]', err)

      // Handle duplicate email conflict (409)
      if (err.status === 409 || err.message?.includes('already registered') || err.message?.includes('Duplicate')) {
        setErrors({ email: 'This email is already registered. Please check your registration status.' })
        showToast('Already Registered', 'This email is already registered for HackFest 2026.', 'warning')
        return
      }

      // Handle validation or server errors
      const errorMessage = err.message || 'Could not complete registration. Please check your connection.'
      showToast('Registration Failed', errorMessage, 'error')
      setErrors({ terms: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyId = () => {
    if (registeredData?.registrationId) {
      navigator.clipboard.writeText(registeredData.registrationId)
      setCopied(true)
      showToast('Registration ID Copied', registeredData.registrationId, 'success')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const resetForm = () => {
    setRegisteredData(null)
    setShowBadgeModal(false)
    setForm({
      name: '',
      email: '',
      phone: '',
      college: '',
      team: '',
      size: '2',
      role: 'Developer (Frontend / Full-Stack)',
      track: 'AI & Machine Learning',
      terms: false,
    })
    setErrors({})
  }

  return (
    <div className="registration-content-grid">
      {/* Left Column: Information & Guidelines */}
      <div className="registration-sidebar">
        <div className="glass-card reg-info-card">
          <span className="eyebrow">REGISTRATION PERKS</span>
          <h3 className="reg-info-title">What&apos;s Included for Every Hacker:</h3>
          <ul className="reg-perks-list">
            <li>
              <CheckCircle2 size={16} className="accent-cyan" />
              <span>100% Free Entry & Hacker Pass</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="accent-cyan" />
              <span>1:1 Access to Experienced Mentors</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="accent-cyan" />
              <span>Meals, Snacks & Caffeine at Venue</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="accent-cyan" />
              <span>Exclusive HackFest T-Shirt & Stickers</span>
            </li>
            <li>
              <CheckCircle2 size={16} className="accent-cyan" />
              <span>Verified Certificate of Participation</span>
            </li>
          </ul>

          <div className="reg-side-box">
            <div className="side-box-header">
              <Users size={16} className="accent-violet" />
              <strong>Team Policy</strong>
            </div>
            <p>
              Teams must consist of 2 to 4 members. If you don&apos;t have a full team yet, you can register
              now and finalize your team before kickoff.
            </p>
          </div>

          <div className="reg-side-box">
            <div className="side-box-header">
              <Calendar size={16} className="accent-cyan" />
              <strong>Important Dates</strong>
            </div>
            <p>
              Event Dates: <strong>13–14 September 2026</strong>
              <br />
              Venue: Information Technology department, Gauhati University (Hybrid)
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Form or Success Experience */}
      <div className="registration-main-panel">
        {registeredData ? (
          /* SUCCESS STATE WITH CHECKED.GIF AND HACKER TICKET */
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card success-registration-card"
          >
            {/* STEP 1: Centered checked.gif Animation */}
            <div className="success-animation-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/animations/checked.gif"
                alt="Registration Success Animation"
                width={160}
                height={160}
                className="success-gif-animation"
              />
            </div>

            {/* STEP 2: Main Confirmation Banner */}
            <span className="eyebrow">REGISTRATION CONFIRMED</span>
            <h2 className="success-main-title">YOU&apos;RE REGISTERED!</h2>
            <p className="success-welcome-text">
              &ldquo;Your place at HackFest 2026 is confirmed.&rdquo;
            </p>

            {/* STEP 3: Futuristic Hacker Ticket Card */}
            <HackerTicketCard
              data={{
                name: registeredData.name,
                team: registeredData.team,
                track: registeredData.track,
                role: registeredData.role,
                registrationId: registeredData.registrationId,
                date: registeredData.date,
                venue: 'Information Technology department, Gauhati University',
                mode: 'Hybrid',
                college: registeredData.college,
                email: registeredData.email,
              }}
              onResetForm={resetForm}
            />

            {/* Optional Secondary Modal Pass */}
            <HackerBadgeModal
              isOpen={showBadgeModal}
              onClose={() => setShowBadgeModal(false)}
              data={{
                name: registeredData.name,
                team: registeredData.team,
                track: registeredData.track,
                id: registeredData.registrationId,
                role: registeredData.role,
                college: registeredData.college,
              }}
            />
          </motion.div>
        ) : (
          /* REGISTRATION FORM */
          <div className="glass-card registration-form-card">
            <div className="form-card-header">
              <h2 className="form-title">Team & Participant Details</h2>
              <p className="form-subtitle">Fill out the required information below to reserve your slot.</p>
            </div>

            <form onSubmit={handleSubmit} className="custom-reg-form" noValidate>
              <div className="form-fields-grid">
                {/* Full Name */}
                <div className="input-group">
                  <label htmlFor="reg-name">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <span className="field-err-msg">{errors.name}</span>}
                </div>

                {/* Email Address */}
                <div className="input-group">
                  <label htmlFor="reg-email">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="alex@example.com"
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="field-err-msg">{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div className="input-group">
                  <label htmlFor="reg-phone">
                    Phone Number <span className="req">*</span>
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className={errors.phone ? 'input-error' : ''}
                  />
                  {errors.phone && <span className="field-err-msg">{errors.phone}</span>}
                </div>

                {/* College / Organization */}
                <div className="input-group">
                  <label htmlFor="reg-college">
                    College / Organization <span className="req">*</span>
                  </label>
                  <input
                    id="reg-college"
                    type="text"
                    value={form.college}
                    onChange={(e) => updateField('college', e.target.value)}
                    placeholder="e.g. IIT Guwahati / Tech University"
                    className={errors.college ? 'input-error' : ''}
                  />
                  {errors.college && <span className="field-err-msg">{errors.college}</span>}
                </div>

                {/* Team Name */}
                <div className="input-group">
                  <label htmlFor="reg-team">
                    Team Name <span className="req">*</span>
                  </label>
                  <input
                    id="reg-team"
                    type="text"
                    value={form.team}
                    onChange={(e) => updateField('team', e.target.value)}
                    placeholder="e.g. Quantum Synthesizers"
                    className={errors.team ? 'input-error' : ''}
                  />
                  {errors.team && <span className="field-err-msg">{errors.team}</span>}
                </div>

                {/* Team Size */}
                <div className="input-group">
                  <label htmlFor="reg-size">
                    Team Size <span className="req">*</span>
                  </label>
                  <select
                    id="reg-size"
                    value={form.size}
                    onChange={(e) => updateField('size', e.target.value)}
                  >
                    <option value="2">2 Members</option>
                    <option value="3">3 Members</option>
                    <option value="4">4 Members</option>
                  </select>
                </div>

                {/* Participation Role */}
                <div className="input-group">
                  <label htmlFor="reg-role">
                    Primary Role in Team <span className="req">*</span>
                  </label>
                  <select
                    id="reg-role"
                    value={form.role}
                    onChange={(e) => updateField('role', e.target.value)}
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Track */}
                <div className="input-group">
                  <label htmlFor="reg-track">
                    Preferred Track <span className="req">*</span>
                  </label>
                  <select
                    id="reg-track"
                    value={form.track}
                    onChange={(e) => updateField('track', e.target.value)}
                  >
                    {trackOptions.map((track) => (
                      <option key={track} value={track}>
                        {track}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guidelines & Terms Checkbox */}
              <div className="terms-checkbox-row">
                <label className="checkbox-custom-label">
                  <input
                    type="checkbox"
                    checked={form.terms}
                    onChange={(e) => updateField('terms', e.target.checked)}
                  />
                  <span className="checkbox-text">
                    I agree to the HackFest 2026 Code of Conduct, participation rules, and guidelines.
                  </span>
                </label>
                {errors.terms && <span className="field-err-msg block-err">{errors.terms}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="button button-primary button-full reg-submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-loader" />
                    <span>Processing Registration…</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Complete Free Registration</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p className="frontend-demo-footnote">
                Demo behavior — all validation is handled on the client side. No server API or database is
                currently connected.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* Page Header */}
        <section className="subpage-header-section">
          <div className="subpage-header-container">
            <span className="eyebrow">06 / REGISTRATION</span>
            <h1 className="subpage-hero-title">
              Claim Your Spot at <span className="text-gradient-cyan">HackFest 2026</span>.
            </h1>
            <p className="subpage-hero-subtitle">
              Registration is completely free. Assemble your team of 2–4 members, select your challenge
              track, and get ready for 36 hours of high-impact building.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-container" style={{ paddingTop: '0' }}>
          <Suspense fallback={<div className="loading-placeholder">Loading registration form…</div>}>
            <RegisterFormContent />
          </Suspense>
        </section>
      </main>
    </PageTransition>
  )
}
