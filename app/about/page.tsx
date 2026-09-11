'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Lightbulb,
  Users,
  Target,
  Rocket,
  Code2,
  CheckCircle2,
  Cpu,
  Layers,
  Award,
  Globe2,
  Coffee,
  Workflow,
  Compass,
} from 'lucide-react'
import { PageTransition } from '@/components/page-transition'
import { SectionHeading } from '@/components/section-heading'

const eventHighlights = [
  {
    icon: Sparkles,
    title: '100% Free & Open Access',
    description: 'Zero registration or participation fees. Food, refreshments, and workspace provided for all onsite participants.',
  },
  {
    icon: Globe2,
    title: 'Hybrid Experience',
    description: 'Join in-person at Information Technology department, Gauhati University, or collaborate online from anywhere in the world via Discord & streaming.',
  },
  {
    icon: Users,
    title: '1:1 Expert Mentorship',
    description: 'Continuous hands-on guidance from industry software engineers, startup founders, and cybersecurity analysts.',
  },
  {
    icon: Award,
    title: '₹90,000+ Prize Pool',
    description: 'Cash rewards for top overall teams, plus specialized category awards for UI/UX, AI, Social Impact, and Beginners.',
  },
  {
    icon: Layers,
    title: '6 Diverse Tracks',
    description: 'Solve problems across AI/ML, Web/Mobile, Security, HealthTech, Sustainability, and Open Innovation.',
  },
  {
    icon: Coffee,
    title: 'Hacker Survival Kit',
    description: 'High-speed Wi-Fi, endless caffeine, midnight snacks, hardware testing benches, and exclusive HackFest 2026 swag.',
  },
]

const hackathonJourney = [
  {
    step: '01',
    phase: 'IDEA',
    title: 'Kickoff & Challenge Reveal',
    description:
      'Begin on Day 1 with the opening keynote, team matchmaking, and deep dive into track problem statements.',
    tag: 'Day 1 · 10:00 AM',
  },
  {
    step: '02',
    phase: 'BUILD',
    title: '36-Hour Continuous Sprint',
    description:
      'Architect your codebase, iterate through UI designs, integrate APIs, and validate your core solution with mentors.',
    tag: 'Day 1 · 12:00 PM onwards',
  },
  {
    step: '03',
    phase: 'SHIP',
    title: 'Code Freeze & Polish',
    description:
      'Finalize code repositories, record demo walkthroughs, prepare pitch slide decks, and test live deployments.',
    tag: 'Day 2 · 12:00 PM',
  },
  {
    step: '04',
    phase: 'DEMO',
    title: 'Live Showcase & Awards',
    description:
      'Present working prototypes live to our panel of judges, receive feedback, celebrate achievements, and win prizes.',
    tag: 'Day 2 · 01:00 PM',
  },
]

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* Page Header */}
        <section className="subpage-header-section">
          <div className="subpage-header-container">
            <span className="eyebrow">01 / ABOUT HACKFEST 2026</span>
            <h1 className="subpage-hero-title">
              Where Bold Ideas Become <span className="text-gradient-cyan">Working Reality</span>.
            </h1>
            <p className="subpage-hero-subtitle">
              HackFest 2026 is Guwahati’s premier 2-day hybrid hackathon designed to empower builders,
              engineers, designers, and innovators to solve meaningful problems in 36 hours.
            </p>
          </div>
        </section>

        {/* What is HackFest & Why it exists */}
        <section className="section-container">
          <div className="two-column-story-grid">
            <div className="glass-card story-card accent-border-cyan">
              <div className="story-icon-wrapper">
                <Lightbulb size={24} className="accent-cyan" />
              </div>
              <span className="mono-sub">THE VISION</span>
              <h2 className="story-heading">What is HackFest?</h2>
              <p className="story-paragraph">
                HackFest is an intensive, high-energy collaborative hackathon that brings together a diverse
                community of creators. Whether you are passionate about crafting intelligent AI agents,
                architecting scalable web ecosystems, or solving regional sustainability challenges, HackFest
                provides the canvas, mentorship, and platform to ship something exceptional.
              </p>
              <p className="story-paragraph">
                Over 2 action-packed days (13–14 September 2026), teams collaborate under one roof at the
                Information Technology department, Gauhati University, alongside an active global cohort participating online.
              </p>
            </div>

            <div className="glass-card story-card accent-border-violet">
              <div className="story-icon-wrapper">
                <Target size={24} className="accent-violet" />
              </div>
              <span className="mono-sub">OUR PURPOSE</span>
              <h2 className="story-heading">Why Does HackFest Exist?</h2>
              <p className="story-paragraph">
                Most great ideas remain trapped in brainstorming documents or forgotten GitHub repositories.
                HackFest exists to break that inertia. We believe the best way to learn, grow, and innovate is
                through rapid, unconstrained building with real feedback.
              </p>
              <p className="story-paragraph">
                We bridge the gap between academic learning and real-world technology production by connecting
                aspiring students with seasoned engineers, founders, and domain experts.
              </p>
            </div>
          </div>
        </section>

        {/* The 2 Days Journey: Build -> Ship -> Demo */}
        <section className="section-container dark-bg-band">
          <SectionHeading
            eyebrow="THE HACKFEST JOURNEY"
            title="2 Days → Build → Ship → Demo"
            copy="A structured high-velocity sprint designed to take you from a blank canvas to a fully functioning prototype."
          />

          <div className="journey-steps-grid">
            {hackathonJourney.map((step) => (
              <div key={step.step} className="journey-step-card glass-card">
                <div className="journey-card-top">
                  <span className="journey-step-number">{step.step}</span>
                  <span className="journey-phase-badge">{step.phase}</span>
                </div>
                <h3 className="journey-step-title">{step.title}</h3>
                <p className="journey-step-desc">{step.description}</p>
                <div className="journey-card-bottom">
                  <span className="journey-tag-text">{step.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What Participants Will Experience & Who Can Participate */}
        <section className="section-container">
          <div className="experience-grid">
            <div className="glass-card experience-card">
              <div className="card-header-with-icon">
                <Rocket size={24} className="accent-cyan" />
                <h2 className="card-title-lg">What You Will Experience</h2>
              </div>
              <ul className="experience-checklist">
                <li>
                  <CheckCircle2 size={18} className="accent-cyan" />
                  <div>
                    <strong>Hands-on Prototyping:</strong> Move from concept to deployment with full creative
                    freedom.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className="accent-cyan" />
                  <div>
                    <strong>Direct Mentorship Hours:</strong> Scheduled review slots with technical leads to
                    troubleshoot bugs and refine architecture.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className="accent-cyan" />
                  <div>
                    <strong>Live Stage Pitching:</strong> Practice presenting your solution to an audience of
                    peers and judges.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className="accent-cyan" />
                  <div>
                    <strong>Networking & Career Opportunities:</strong> Connect with innovative tech teams
                    looking for talent.
                  </div>
                </li>
              </ul>
            </div>

            <div className="glass-card experience-card">
              <div className="card-header-with-icon">
                <Users size={24} className="accent-violet" />
                <h2 className="card-title-lg">Who Can Participate?</h2>
              </div>
              <ul className="experience-checklist">
                <li>
                  <CheckCircle2 size={18} className="accent-violet" />
                  <div>
                    <strong>College Students:</strong> Undergraduate, postgraduate, and diploma students from
                    any branch or year.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className="accent-violet" />
                  <div>
                    <strong>First-Time Hackers:</strong> Beginners looking to build their first portfolio
                    project in a supportive space.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className="accent-violet" />
                  <div>
                    <strong>Designers & UI/UX Creators:</strong> Visual storytellers who design intuitive,
                    human-centered experiences.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className="accent-violet" />
                  <div>
                    <strong>Developers & Tinkerers:</strong> Coders, AI enthusiasts, and makers eager to test
                    new technologies.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Event Highlights Grid */}
        <section className="section-container dark-bg-band">
          <SectionHeading
            eyebrow="KEY PILLARS"
            title="Event Highlights"
            copy="Everything included in your HackFest 2026 experience at a glance."
          />

          <div className="highlights-grid">
            {eventHighlights.map((highlight) => {
              const Icon = highlight.icon
              return (
                <div key={highlight.title} className="glass-card highlight-box-card">
                  <div className="highlight-icon-circle">
                    <Icon size={20} />
                  </div>
                  <h3 className="highlight-title">{highlight.title}</h3>
                  <p className="highlight-desc">{highlight.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-container cta-banner-section">
          <div className="cta-banner-card">
            <div className="cta-glow-effect" />
            <div className="cta-content">
              <span className="eyebrow">JOIN THE SPRINT</span>
              <h2 className="cta-headline">Ready to write code that matters?</h2>
              <p className="cta-subtext">
                Explore our six challenge tracks or register your team of 2–4 members now.
              </p>
              <div className="cta-button-group">
                <Link href="/register" className="button button-primary button-lg">
                  <span>Register for Free</span>
                  <ArrowRight size={18} />
                </Link>
                <Link href="/tracks" className="button button-secondary button-lg">
                  <span>Explore Tracks</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
