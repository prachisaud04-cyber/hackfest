'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Code2,
  Users,
  Trophy,
  Coffee,
  CheckCircle2,
  Flag,
  Presentation,
  Flame,
  Download,
  CalendarPlus,
} from 'lucide-react'
import { motion } from 'motion/react'
import { PageTransition } from '@/components/page-transition'
import { useToast } from '@/components/toast'

type DayType = 'day1' | 'day2' | 'all'

const scheduleData = {
  day1: {
    date: 'Sunday, 13 September 2026',
    theme: 'BUILD',
    tagline: 'From blank repo to functional prototype',
    events: [
      {
        time: '09:00 AM',
        title: 'Registration & Check-in',
        description:
          'Arrive at Information Technology department, Gauhati University, collect your hacker badge, goodie bag, and set up your team workspace.',
        location: 'Main Reception & Lounge',
        type: 'Logistics',
        icon: Users,
      },
      {
        time: '10:00 AM',
        title: 'Opening Ceremony',
        description:
          'Welcome keynote by guest speakers, introduction of mentors, sponsors, and event walkthrough.',
        location: 'Auditorium & Live Stream',
        type: 'Keynote',
        icon: Sparkles,
      },
      {
        time: '11:00 AM',
        title: 'Challenge Reveal & Team Mixer',
        description:
          'Official release of track-specific problem statements and final solo-hacker team matchmaking.',
        location: 'Main Arena & Discord',
        type: 'Briefing',
        icon: Flag,
      },
      {
        time: '12:00 PM',
        title: 'Hacking Begins!',
        description:
          'The 24-hour sprint officially starts. Git repos created, APIs configured, and coffee starts flowing.',
        location: 'Hacking Arena & Online Spaces',
        type: 'Milestone',
        icon: Flame,
      },
      {
        time: '04:00 PM',
        title: 'Mentor Connect Session',
        description:
          '1:1 breakout sessions with industry mentors to review system architecture and remove blockers.',
        location: 'Mentor Pods & Discord Audio',
        type: 'Mentorship',
        icon: Code2,
      },
      {
        time: '08:00 PM',
        title: 'Progress Check & Dinner',
        description:
          'Midway sprint check-in, warm food served, lightning tech help desk, and optional mini-games.',
        location: 'Dining Hall & Arena',
        type: 'Check-in',
        icon: Coffee,
      },
    ],
  },
  day2: {
    date: 'Monday, 14 September 2026',
    theme: 'SHIP',
    tagline: 'Polish, submit, present, and celebrate',
    events: [
      {
        time: '09:00 AM',
        title: 'Final Sprint & Breakfast',
        description:
          'Morning fuel up, final bug fixes, UI/UX polish, deployment checks, and pitch preparation.',
        location: 'Hacking Arena',
        type: 'Sprint',
        icon: Coffee,
      },
      {
        time: '12:00 PM',
        title: 'Submission Deadline (Code Freeze)',
        description:
          'Official code freeze. All GitHub repositories, demo links, and video walkthroughs must be submitted.',
        location: 'Submission Portal',
        type: 'Hard Deadline',
        icon: Clock,
      },
      {
        time: '01:00 PM',
        title: 'Project Demos & Science Fair',
        description:
          'Live project demonstrations! Teams showcase their working prototypes at exhibition booths to judges.',
        location: 'Exhibition Hall & Live Stage',
        type: 'Presentations',
        icon: Presentation,
      },
      {
        time: '03:30 PM',
        title: 'Judging & Deliberation',
        description:
          'Judges review scoring rubrics across technical depth, creativity, real-world utility, and pitch quality.',
        location: 'Judges Chamber',
        type: 'Evaluation',
        icon: CheckCircle2,
      },
      {
        time: '05:00 PM',
        title: 'Results & Closing Ceremony',
        description:
          'Announcement of Grand Prize, Runners Up, Track Winners, Special Awards, and celebratory closing photos.',
        location: 'Main Auditorium & Stream',
        type: 'Awards',
        icon: Trophy,
      },
    ],
  },
}

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState<DayType>('day1')
  const { showToast } = useToast()

  const googleCalUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=HackFest+2026+Hackathon&dates=20260913T033000Z/20260914T123000Z&details=HackFest+2026+hybrid+hackathon+at+Information+Technology+department,+Gauhati+University.+Build.+Break.+Innovate.&location=Information+Technology+department,+Gauhati+University,+Jalukbari,+Guwahati,+Assam+781014'

  const downloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HackFest//HackFest 2026//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:HackFest 2026 Hackathon',
      'DESCRIPTION:A 2-day hybrid hackathon for students, developers, and innovators.',
      'LOCATION:Information Technology department, Gauhati University, Jalukbari, Guwahati, Assam 781014',
      'DTSTART:20260913T033000Z',
      'DTEND:20260914T123000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'hackfest-2026-calendar.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Calendar Invite Downloaded', 'Import hackfest-2026.ics into Apple Calendar or Outlook')
  }

  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* Page Header */}
        <section className="subpage-header-section">
          <div className="subpage-header-container">
            <span className="eyebrow">03 / TIMELINE & AGENDA</span>
            <h1 className="subpage-hero-title">
              Two Focused Days. <span className="text-gradient-cyan">One Electric Weekend</span>.
            </h1>
            <p className="subpage-hero-subtitle">
              Mark your calendar for 13–14 September 2026. Every hour is crafted to maximize building momentum,
              mentor access, and demo quality.
            </p>
          </div>
        </section>

        {/* Schedule Tabs & Calendar Actions */}
        <section className="section-container">
          <div className="schedule-tabs-container-flex">
            <div className="schedule-filter-tabs">
              <button
                onClick={() => setActiveTab('day1')}
                className={`schedule-tab-btn ${activeTab === 'day1' ? 'active' : ''}`}
              >
                <span className="tab-day-label">DAY 1</span>
                <span className="tab-theme-label">BUILD · 13 SEPT</span>
              </button>
              <button
                onClick={() => setActiveTab('day2')}
                className={`schedule-tab-btn ${activeTab === 'day2' ? 'active' : ''}`}
              >
                <span className="tab-day-label">DAY 2</span>
                <span className="tab-theme-label">SHIP · 14 SEPT</span>
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`schedule-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              >
                <span className="tab-day-label">FULL TIMELINE</span>
                <span className="tab-theme-label">ALL 48 HRS</span>
              </button>
            </div>

            {/* Calendar Quick Sync Buttons */}
            <div className="calendar-sync-actions">
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary button-sm"
                onClick={() => showToast('Opening Google Calendar', 'Add HackFest 2026 to your schedule')}
              >
                <CalendarPlus size={14} className="accent-cyan" />
                <span>Google Calendar</span>
              </a>
              <button onClick={downloadICS} className="button button-secondary button-sm">
                <Download size={14} />
                <span>iCal / Outlook (.ics)</span>
              </button>
            </div>
          </div>

          {/* Timeline View */}
          <div className="timeline-schedule-wrapper">
            {(activeTab === 'day1' || activeTab === 'all') && (
              <div className="day-schedule-block">
                <div className="day-header-banner glass-card">
                  <div className="day-header-left">
                    <span className="eyebrow">DAY 01</span>
                    <h2 className="day-title">DAY 1 — BUILD</h2>
                    <p className="day-date-str">{scheduleData.day1.date}</p>
                  </div>
                  <div className="day-header-right">
                    <span className="day-theme-pill">{scheduleData.day1.tagline}</span>
                  </div>
                </div>

                <div className="timeline-events-list">
                  {scheduleData.day1.events.map((event, index) => {
                    const Icon = event.icon
                    return (
                      <motion.div
                        key={event.time + index}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="timeline-event-card glass-card"
                      >
                        <div className="timeline-time-col">
                          <span className="event-time-text">{event.time}</span>
                          <span className="timeline-node-dot" />
                        </div>
                        <div className="timeline-content-col">
                          <div className="timeline-card-header">
                            <h3 className="event-title">{event.title}</h3>
                            <span className="event-type-badge">{event.type}</span>
                          </div>
                          <p className="event-desc">{event.description}</p>
                          <div className="event-location-row">
                            <MapPin size={13} className="accent-cyan" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {(activeTab === 'day2' || activeTab === 'all') && (
              <div className="day-schedule-block" style={{ marginTop: activeTab === 'all' ? '4rem' : '0' }}>
                <div className="day-header-banner glass-card day2-header">
                  <div className="day-header-left">
                    <span className="eyebrow">DAY 02</span>
                    <h2 className="day-title">DAY 2 — SHIP</h2>
                    <p className="day-date-str">{scheduleData.day2.date}</p>
                  </div>
                  <div className="day-header-right">
                    <span className="day-theme-pill">{scheduleData.day2.tagline}</span>
                  </div>
                </div>

                <div className="timeline-events-list">
                  {scheduleData.day2.events.map((event, index) => {
                    const Icon = event.icon
                    return (
                      <motion.div
                        key={event.time + index}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="timeline-event-card glass-card"
                      >
                        <div className="timeline-time-col">
                          <span className="event-time-text">{event.time}</span>
                          <span className="timeline-node-dot" />
                        </div>
                        <div className="timeline-content-col">
                          <div className="timeline-card-header">
                            <h3 className="event-title">{event.title}</h3>
                            <span className="event-type-badge">{event.type}</span>
                          </div>
                          <p className="event-desc">{event.description}</p>
                          <div className="event-location-row">
                            <MapPin size={13} className="accent-cyan" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Venue & Logistics Info */}
        <section className="section-container dark-bg-band">
          <div className="venue-info-grid">
            <div className="glass-card venue-box">
              <div className="venue-icon">
                <MapPin size={22} className="accent-cyan" />
              </div>
              <h3>Physical Venue</h3>
              <p>Information Technology department, Gauhati University, Jalukbari, Guwahati, Assam 781014.</p>
              <span className="venue-note">High-speed Wi-Fi, power desks & meals provided.</span>
            </div>

            <div className="glass-card venue-box">
              <div className="venue-icon">
                <Users size={22} className="accent-violet" />
              </div>
              <h3>Virtual Hub</h3>
              <p>HackFest Official Discord & YouTube Live Stream.</p>
              <span className="venue-note">Access shared with all registered hackers 48h prior.</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-container cta-banner-section">
          <div className="cta-banner-card">
            <div className="cta-glow-effect" />
            <div className="cta-content">
              <span className="eyebrow">SAVE YOUR SEAT</span>
              <h2 className="cta-headline">Ready for this 48-hour adventure?</h2>
              <p className="cta-subtext">
                Free registration is open. Form your team of 2–4 members and prepare to build.
              </p>
              <div className="cta-button-group">
                <Link href="/register" className="button button-primary button-lg">
                  <span>Register Now</span>
                  <ArrowRight size={18} />
                </Link>
                <Link href="/prizes" className="button button-secondary button-lg">
                  <span>View Prizes</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
