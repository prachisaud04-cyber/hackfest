'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BrainCircuit,
  Globe2,
  ShieldCheck,
  HeartPulse,
  Sprout,
  Sparkles,
  Zap,
  MapPin,
  Users,
  Trophy,
  Cpu,
  MessageCircle,
  Code2,
  Calendar,
  CheckCircle2,
  Flame,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { PageTransition } from '@/components/page-transition'
import { SectionHeading } from '@/components/section-heading'

const featuredTracks = [
  {
    title: 'AI & Machine Learning',
    description: 'Build intelligent applications, LLM agents, predictive models, and autonomous tools.',
    icon: BrainCircuit,
    accent: 'cyan',
    tag: 'Popular',
  },
  {
    title: 'Web & App Development',
    description: 'Engineer high-performance modern web apps, mobile solutions, and dev infrastructure.',
    icon: Globe2,
    accent: 'violet',
    tag: 'High Demand',
  },
  {
    title: 'Cybersecurity',
    description: 'Design zero-trust systems, privacy-enhancing tools, and security defense protocols.',
    icon: ShieldCheck,
    accent: 'blue',
    tag: 'Critical',
  },
  {
    title: 'HealthTech',
    description: 'Transform patient care, telemedicine, assistive devices, and diagnostic tooling.',
    icon: HeartPulse,
    accent: 'cyan',
    tag: 'Impact',
  },
  {
    title: 'Sustainability',
    description: 'Create green energy platforms, climate analytics, and waste-reduction software.',
    icon: Sprout,
    accent: 'violet',
    tag: 'Green Future',
  },
  {
    title: 'Open Innovation',
    description: 'Break boundaries and solve any authentic human challenge with innovative software.',
    icon: Sparkles,
    accent: 'blue',
    tag: 'Wildcard',
  },
]

const sampleMentors = [
  {
    name: 'Aarav Mehta',
    role: 'Product Engineering Lead',
    domain: 'AI & Emerging Technology',
    image: 'AM',
  },
  {
    name: 'Riya Sharma',
    role: 'Founder & Tech Strategist',
    domain: 'Startups & Innovation',
    image: 'RS',
  },
  {
    name: 'Kabir Sen',
    role: 'Senior Software Engineer',
    domain: 'Cloud & Full-Stack',
    image: 'KS',
  },
  {
    name: 'Ananya Rao',
    role: 'Cybersecurity Specialist',
    domain: 'Security & Digital Trust',
    image: 'AR',
  },
]

export default function HomePage() {
  // Target deadline: 13 September 2026, 09:00 AM IST (HackFest Kickoff & Registration Close)
  const targetTime = new Date('2026-09-13T09:00:00+05:30').getTime()

  const calculateRemaining = () => {
    const now = Date.now()
    const diff = Math.max(0, targetTime - now)
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 11,
    mins: 16,
    secs: 47,
  })

  useEffect(() => {
    setTimeLeft(calculateRemaining())
    const timer = setInterval(() => {
      setTimeLeft(calculateRemaining())
    }, 1000)
    return () => clearInterval(timer)
  }, [targetTime])

  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* HERO SECTION */}
        <section className="hero-section" id="hero">
          <div className="hero-background-effects">
            <div className="hero-radial-glow" />
            <div className="hero-grid-overlay" />
          </div>

          <div className="hero-content-grid">
            <div className="hero-left-column">
              <div className="badge-pill">
                <Flame size={14} className="accent-cyan" />
                <span>2-DAY HYBRID HACKATHON · 13–14 SEPT 2026</span>
              </div>

              <h1 className="hero-main-title">
                BUILD.<br />
                <span className="text-gradient-cyan">BREAK.</span><br />
                INNOVATE.
              </h1>

              <div className="hero-subheaders">
                <p className="hero-brand-line">
                  HACKFEST <span className="hero-year">2026</span>
                </p>
                <p className="hero-tagline-lead">2 Days. One Idea. Endless Possibilities.</p>
                <p className="hero-body-text">
                  Bring your ideas to life, collaborate with ambitious builders, and ship impactful
                  technology solutions in just 36 intense, fun-filled hours.
                </p>
              </div>

              {/* Quick Spec Pills */}
              <div className="hero-quick-specs">
                <div className="spec-badge">
                  <Calendar size={14} className="accent-cyan" />
                  <span>13–14 September 2026</span>
                </div>
                <div className="spec-badge">
                  <MapPin size={14} className="accent-cyan" />
                  <span>Information Technology department, Gauhati University · Hybrid</span>
                </div>
                <div className="spec-badge">
                  <Users size={14} className="accent-cyan" />
                  <span>Team Size: 2–4</span>
                </div>
                <div className="spec-badge">
                  <CheckCircle2 size={14} className="accent-cyan" />
                  <span>Registration Free</span>
                </div>
              </div>

              {/* Main Actions */}
              <div className="hero-action-buttons">
                <Link href="/register" className="button button-primary">
                  <span>Register Now</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/about" className="button button-secondary">
                  <span>Explore HackFest</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Hero Right Column: Orbit card & Countdown */}
            <div className="hero-right-column">
              <div className="orbit-interactive-card">
                <div className="orbit-header">
                  <span className="orbit-ping-dot" />
                  <span className="mono-sub">IDEA → BUILD → DEMO</span>
                </div>
                <div className="orbit-body">
                  <h2 className="orbit-headline">
                    Make it<br />
                    <em>matter.</em>
                  </h2>
                  <p className="orbit-location">GAUHATI UNIVERSITY · HYBRID</p>
                </div>
                <div className="orbit-footer">
                  <span className="orbit-badge">Open to all builders</span>
                  <span className="orbit-tag">₹90,000+ Prize Pool</span>
                </div>
              </div>

              {/* Countdown Card */}
              <div className="countdown-container-card">
                <div className="countdown-header-row">
                  <Clock size={14} className="accent-cyan" />
                  <span className="countdown-title-text">Registration Closes In</span>
                </div>
                <div className="countdown-digits-grid">
                  <div className="countdown-slot">
                    <span className="digit-number">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="digit-unit">Days</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-slot">
                    <span className="digit-number">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="digit-unit">Hours</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-slot">
                    <span className="digit-number">
                      {String(timeLeft.mins).padStart(2, '0')}
                    </span>
                    <span className="digit-unit">Minutes</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-slot">
                    <span className="digit-number">
                      {String(timeLeft.secs).padStart(2, '0')}
                    </span>
                    <span className="digit-unit">Seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-bar">
            <div className="metric-box">
              <strong>2 Days</strong>
              <span>Hackathon Duration</span>
            </div>
            <div className="metric-box">
              <strong>2–4</strong>
              <span>Members per Team</span>
            </div>
            <div className="metric-box">
              <strong>6 Tracks</strong>
              <span>Challenge Domains</span>
            </div>
            <div className="metric-box">
              <strong>₹90,000+</strong>
              <span>Total Prize Pool</span>
            </div>
          </div>
        </section>

        {/* SHORT ABOUT SECTION */}
        <section className="section-container">
          <div className="section-header-flex">
            <SectionHeading
              eyebrow="01 / WHAT IS HACKFEST"
              title="Two Days. Infinite Possibilities."
              copy="HackFest is a collaborative two-day hybrid hackathon bringing together curious students, engineers, designers, and innovators to turn ambitious ideas into working prototypes."
            />
            <Link href="/about" className="section-view-all-link">
              <span>Read Full Story</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="about-pillars-grid">
            <div className="glass-card pillar-card">
              <div className="pillar-icon-box">
                <Code2 size={22} />
              </div>
              <h3 className="pillar-title">BUILD</h3>
              <p className="pillar-desc">
                Transform concepts into functioning software or hardware solutions within a 36-hour sprint.
              </p>
            </div>

            <div className="glass-card pillar-card">
              <div className="pillar-icon-box">
                <Users size={22} />
              </div>
              <h3 className="pillar-title">COLLABORATE</h3>
              <p className="pillar-desc">
                Team up with passionate peers, receive 1:1 guidance from industry mentors, and expand your network.
              </p>
            </div>

            <div className="glass-card pillar-card">
              <div className="pillar-icon-box">
                <Sparkles size={22} />
              </div>
              <h3 className="pillar-title">INNOVATE</h3>
              <p className="pillar-desc">
                Tackle real-world problems, pitch to experienced judges, and compete for exciting awards.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURED TRACKS */}
        <section className="section-container dark-bg-band">
          <div className="section-header-flex">
            <SectionHeading
              eyebrow="02 / CHALLENGE TRACKS"
              title="Featured Tracks"
              copy="Choose your problem space and engineer something that matters. Explore all six domains crafted for modern builders."
            />
            <Link href="/tracks" className="section-view-all-link">
              <span>Explore All 6 Tracks</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="tracks-preview-grid">
            {featuredTracks.map((track, i) => {
              const Icon = track.icon
              return (
                <div key={track.title} className={`track-showcase-card accent-border-${track.accent}`}>
                  <div className="track-card-top">
                    <div className={`track-icon-wrapper track-icon-${track.accent}`}>
                      <Icon size={20} />
                    </div>
                    <span className="track-tag-pill">{track.tag}</span>
                  </div>
                  <h3 className="track-card-title">{track.title}</h3>
                  <p className="track-card-desc">{track.description}</p>
                  <Link href={`/tracks`} className="track-learn-link">
                    <span>View track details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )
            })}
          </div>
        </section>

        {/* WHY PARTICIPATE */}
        <section className="section-container">
          <SectionHeading
            eyebrow="03 / WHY PARTICIPATE"
            title="Build Your Unfair Advantage."
            copy="Whether you are a beginner taking your first steps or an experienced hacker looking to build your next breakthrough product."
          />

          <div className="benefits-grid">
            <div className="glass-card benefit-card">
              <div className="benefit-icon">
                <Cpu size={24} />
              </div>
              <h3>Learn by Building</h3>
              <p>Gain hands-on experience by creating a full-stack product under real-world constraints.</p>
            </div>

            <div className="glass-card benefit-card">
              <div className="benefit-icon">
                <Users size={24} />
              </div>
              <h3>Meet Fellow Builders</h3>
              <p>Connect with a community of motivated developers, designers, and creative founders.</p>
            </div>

            <div className="glass-card benefit-card">
              <div className="benefit-icon">
                <MessageCircle size={24} />
              </div>
              <h3>Get 1:1 Mentorship</h3>
              <p>Get architectural advice, code reviews, and pitch coaching from industry veterans.</p>
            </div>

            <div className="glass-card benefit-card">
              <div className="benefit-icon">
                <Trophy size={24} />
              </div>
              <h3>Showcase & Win</h3>
              <p>Present your demo live on stage to seasoned judges and compete for prizes and swag.</p>
            </div>
          </div>
        </section>

        {/* SHORT MENTORS PREVIEW */}
        <section className="section-container dark-bg-band">
          <div className="section-header-flex">
            <SectionHeading
              eyebrow="04 / INDUSTRY MENTORS"
              title="Learn from Experienced Leaders"
              copy="Our mentors come from top engineering, AI, and startup backgrounds to guide you through technical roadblocks."
            />
            <Link href="/mentors" className="section-view-all-link">
              <span>View All Mentors & Judges</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mentors-preview-grid">
            {sampleMentors.map((mentor) => (
              <div key={mentor.name} className="glass-card mentor-preview-card">
                <div className="mentor-avatar-box">
                  <span>{mentor.image}</span>
                </div>
                <div className="mentor-info">
                  <h4 className="mentor-name">{mentor.name}</h4>
                  <p className="mentor-role">{mentor.role}</p>
                  <span className="mentor-domain-pill">{mentor.domain}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="fictional-demo-label">
            * Mentors shown above are demo profiles for the HackFest 2026 frontend preview.
          </p>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="section-container cta-banner-section">
          <div className="cta-banner-card">
            <div className="cta-glow-effect" />
            <div className="cta-content">
              <span className="eyebrow">YOUR TURN TO BUILD</span>
              <h2 className="cta-headline">Ready to Build Something Extraordinary?</h2>
              <p className="cta-subtext">
                Join 100+ innovators on 13–14 September 2026 at Information Technology department,
                Gauhati University or online. Free registration, invaluable mentorship, and endless possibilities.
              </p>
              <div className="cta-button-group">
                <Link href="/register" className="button button-primary button-lg">
                  <Zap size={18} />
                  <span>Register Now for Free</span>
                  <ArrowRight size={18} />
                </Link>
                <Link href="/status" className="button button-secondary button-lg">
                  <span>Check Registration Status</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
