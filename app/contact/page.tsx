'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Mail,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Check,
  Building,
  Globe2,
} from 'lucide-react'
import { PageTransition } from '@/components/page-transition'
import { SectionHeading } from '@/components/section-heading'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
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

    if (!formData.name.trim()) newErrors.name = 'Please enter your name.'
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSending(true)

    // Simulate sending contact message
    setTimeout(() => {
      setIsSending(false)
      setIsSuccess(true)
    }, 800)
  }

  const resetForm = () => {
    setIsSuccess(false)
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
    })
    setErrors({})
  }

  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* Page Header */}
        <section className="subpage-header-section">
          <div className="subpage-header-container">
            <span className="eyebrow">09 / GET IN TOUCH</span>
            <h1 className="subpage-hero-title">
              Have Questions? <span className="text-gradient-cyan">Let&apos;s Connect</span>.
            </h1>
            <p className="subpage-hero-subtitle">
              Whether you are a hacker with questions about logistics, a mentor interested in joining, or a
              sponsor looking to partner, our organizing team is ready to help.
            </p>
          </div>
        </section>

        {/* Contact Layout Grid */}
        <section className="section-container" style={{ paddingTop: '0' }}>
          <div className="contact-main-grid">
            {/* Left Column: Contact Details & Venue Info */}
            <div className="contact-info-column">
              <div className="glass-card contact-info-card">
                <span className="eyebrow">DIRECT REACH</span>
                <h2 className="contact-card-heading">Contact Details</h2>
                <p className="contact-card-sub">
                  Reach out to the HackFest 2026 organizing committee directly via email or visit the
                  innovation venue.
                </p>

                <div className="contact-methods-list">
                  {/* Email */}
                  <div className="contact-method-item">
                    <div className="contact-method-icon">
                      <Mail size={20} className="accent-cyan" />
                    </div>
                    <div className="contact-method-text">
                      <span className="method-label">Official Email</span>
                      <a href="mailto:hello@hackfest-demo.dev" className="method-val accent-link">
                        hello@hackfest-demo.dev
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="contact-method-item">
                    <div className="contact-method-icon">
                      <MapPin size={20} className="accent-violet" />
                    </div>
                    <div className="contact-method-text">
                      <span className="method-label">Event Venue</span>
                      <strong className="method-val">Information Technology department, Gauhati University</strong>
                      <span className="method-sub">Gauhati University, Jalukbari, Guwahati, Assam 781014, India</span>
                    </div>
                  </div>

                  {/* Format */}
                  <div className="contact-method-item">
                    <div className="contact-method-icon">
                      <Globe2 size={20} className="accent-blue" />
                    </div>
                    <div className="contact-method-text">
                      <span className="method-label">Event Format</span>
                      <strong className="method-val">Hybrid Mode</strong>
                      <span className="method-sub">Physical Arena + Global Online Discord Cohort</span>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="contact-method-item">
                    <div className="contact-method-icon">
                      <Clock size={20} className="accent-cyan" />
                    </div>
                    <div className="contact-method-text">
                      <span className="method-label">Support Hours</span>
                      <strong className="method-val">09:00 AM – 06:00 PM IST</strong>
                      <span className="method-sub">Expected response within 24 hours</span>
                    </div>
                  </div>
                </div>

                <div className="venue-highlight-box">
                  <Building size={16} className="accent-cyan" />
                  <span>
                    Onsite check-in starts at 09:00 AM on 13 September at Information Technology department, Gauhati University.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="contact-form-column">
              <div className="glass-card contact-form-card">
                {isSuccess ? (
                  /* Success State */
                  <div className="contact-success-state">
                    <div className="contact-success-icon-badge">
                      <CheckCircle2 size={36} />
                    </div>
                    <span className="eyebrow">MESSAGE DISPATCHED</span>
                    <h3 className="success-heading">Message Sent Successfully!</h3>
                    <p className="success-body">
                      Thank you for contacting us, <strong>{formData.name}</strong>. Our team will review your
                      inquiry and reply to <strong>{formData.email}</strong> shortly.
                    </p>
                    <div className="success-action-btns">
                      <button onClick={resetForm} className="button button-primary">
                        <RotateCcw size={15} />
                        <span>Send Another Message</span>
                      </button>
                      <Link href="/" className="button button-secondary">
                        <span>Return to Home</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Form State */
                  <>
                    <div className="form-header-row">
                      <span className="eyebrow">MESSAGE US</span>
                      <h2 className="form-heading">Send a Direct Message</h2>
                      <p className="form-subtext">
                        Fill in your query and our organizing team will get back to you.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="custom-contact-form" noValidate>
                      {/* Name */}
                      <div className="input-group">
                        <label htmlFor="contact-name">
                          Your Name <span className="req">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="e.g. Priyanshu Sharma"
                          className={errors.name ? 'input-error' : ''}
                        />
                        {errors.name && <span className="field-err-msg">{errors.name}</span>}
                      </div>

                      {/* Email */}
                      <div className="input-group">
                        <label htmlFor="contact-email">
                          Email Address <span className="req">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="you@example.com"
                          className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <span className="field-err-msg">{errors.email}</span>}
                      </div>

                      {/* Subject */}
                      <div className="input-group">
                        <label htmlFor="contact-subject">Inquiry Subject</label>
                        <select
                          id="contact-subject"
                          value={formData.subject}
                          onChange={(e) => updateField('subject', e.target.value)}
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Registration Support">Registration Support</option>
                          <option value="Mentorship Opportunities">Mentorship Opportunities</option>
                          <option value="Sponsorship & Partnerships">Sponsorship & Partnerships</option>
                          <option value="Venue & Logistics">Venue & Logistics</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div className="input-group">
                        <label htmlFor="contact-message">
                          Message <span className="req">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => updateField('message', e.target.value)}
                          placeholder="How can we help you?"
                          className={errors.message ? 'input-error' : ''}
                        />
                        {errors.message && <span className="field-err-msg">{errors.message}</span>}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSending}
                        className="button button-primary button-full contact-submit-btn"
                      >
                        {isSending ? (
                          <>
                            <span className="spinner-loader" />
                            <span>Sending Message…</span>
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Send Message</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>

                      <p className="frontend-demo-footnote">
                        Frontend demo mode — message submission triggers client simulation.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
