'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Users,
  Code2,
  BrainCircuit,
  FileCheck2,
  Send,
  Award,
  HeartHandshake,
  Scale,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Check,
  AlertCircle,
  Lightbulb,
  Cpu,
  HelpCircle,
  TrendingUp,
  Layout,
  Presentation,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { PageTransition } from '@/components/page-transition'
import { SectionHeading } from '@/components/section-heading'
import { useToast } from '@/components/toast'

const ruleSections = [
  {
    id: 'team-rules',
    number: '01',
    title: 'TEAM RULES',
    icon: Users,
    accent: 'cyan',
    summary: 'Team formation, composition limits, and participant coordination.',
    rules: [
      'Teams must consist of 2–4 participants.',
      'Each participant can be part of only one team.',
      'Teams must provide accurate registration information.',
      'Team members may have different roles such as Developer, Designer, AI/ML, etc.',
      'Teams are responsible for their own communication and coordination.',
    ],
  },
  {
    id: 'build-rules',
    number: '02',
    title: 'BUILD RULES',
    icon: Code2,
    accent: 'violet',
    summary: 'Project commencement, tooling allowances, and working prototype requirements.',
    rules: [
      'Projects must be developed during the official hackathon period.',
      'Teams may use open-source libraries, frameworks and publicly available APIs.',
      'Existing projects may be used only as references or starting resources where permitted.',
      'Teams must be able to explain their project’s implementation.',
      'The final submission must be functional enough to demonstrate the core idea.',
    ],
  },
  {
    id: 'ai-tools',
    number: '03',
    title: 'AI & TOOLS',
    icon: BrainCircuit,
    accent: 'blue',
    summary: 'Permitted AI coding assistants, generative tools, and attribution obligations.',
    rules: [
      'AI tools and coding assistants are allowed.',
      'Teams must understand and be able to explain AI-generated or AI-assisted code they submit.',
      'Do not submit work that you cannot explain or demonstrate.',
      'Give appropriate credit to third-party assets, APIs and open-source resources when required.',
    ],
  },
  {
    id: 'code-ownership',
    number: '04',
    title: 'CODE & OWNERSHIP',
    icon: FileCheck2,
    accent: 'cyan',
    summary: 'Intellectual property, licensing compliance, and original authorship.',
    rules: [
      'Participants must respect software licenses and intellectual property.',
      'Do not submit copyrighted material without permission.',
      'Do not copy another team’s project.',
      'Third-party assets should be used according to their respective licenses.',
    ],
  },
  {
    id: 'submission',
    number: '05',
    title: 'SUBMISSION',
    icon: Send,
    accent: 'violet',
    summary: 'Submission checkpoints, demo requirements, and deadline enforcement.',
    rules: [
      'Projects must be submitted before the official deadline.',
      'Late submissions may be disqualified unless organizers announce otherwise.',
      'Teams must provide a project description and demonstration.',
      'Judges may evaluate both the final product and the team’s explanation.',
    ],
  },
  {
    id: 'code-of-conduct',
    number: '07',
    title: 'CODE OF CONDUCT',
    icon: HeartHandshake,
    accent: 'cyan',
    summary: 'Community respect, zero-tolerance anti-harassment policy, and collaborative spirit.',
    rules: [
      'Treat fellow participants, mentors, judges and organizers with respect.',
      'Harassment, discrimination, bullying and disruptive behavior are not permitted.',
      'Do not attempt to damage event infrastructure or another team’s work.',
      'Keep the hackathon environment collaborative and inclusive.',
    ],
  },
  {
    id: 'fair-play',
    number: '08',
    title: 'FAIR PLAY',
    icon: Scale,
    accent: 'violet',
    summary: 'Integrity safeguards, anti-tampering rules, and disqualification grounds.',
    rules: [
      'Do not impersonate another participant.',
      'Do not manipulate registration or judging systems.',
      'Do not intentionally disrupt another team’s project.',
      'Organizers reserve the right to disqualify submissions that violate the rules.',
    ],
  },
  {
    id: 'organizer-rights',
    number: '09',
    title: 'ORGANIZER RIGHTS',
    icon: Sliders,
    accent: 'blue',
    summary: 'Schedule adjustments, rule updates, and arbitration authority.',
    rules: [
      'Organizers may modify schedules when necessary.',
      'Organizers may clarify or update rules during the event.',
      'Final decisions regarding rule violations and judging are made by the organizers.',
    ],
  },
]

const judgingCriteria = [
  {
    title: 'Innovation',
    icon: Lightbulb,
    accent: 'cyan',
    weight: '20%',
    desc: 'Uniqueness of the concept, novelty of the technical approach, and creative problem framing.',
  },
  {
    title: 'Technical Implementation',
    icon: Cpu,
    accent: 'violet',
    weight: '25%',
    desc: 'Architectural robustness, clean code practices, difficulty level, and stack mastery.',
  },
  {
    title: 'Problem Solving',
    icon: HelpCircle,
    accent: 'blue',
    weight: '20%',
    desc: 'Effectiveness in resolving the stated real-world challenge or ecosystem pain point.',
  },
  {
    title: 'User Experience',
    icon: Layout,
    accent: 'cyan',
    weight: '15%',
    desc: 'Intuitive design, user interface polish, ergonomics, responsiveness, and accessibility.',
  },
  {
    title: 'Impact',
    icon: TrendingUp,
    accent: 'violet',
    weight: '10%',
    desc: 'Scalability potential, sustainability, commercial or social viability, and practical utility.',
  },
  {
    title: 'Presentation',
    icon: Presentation,
    accent: 'blue',
    weight: '10%',
    desc: 'Demo execution, clarity of technical explanation, narrative storytelling, and Q&A defense.',
  },
]

export default function RulesPage() {
  const [agreed, setAgreed] = useState(false)
  const { showToast } = useToast()

  const handleAgreementToggle = () => {
    const nextState = !agreed
    setAgreed(nextState)
    if (nextState) {
      showToast(
        'Rules Acknowledged ✓',
        'You have agreed to HackFest 2026 rules. You can proceed to registration.',
        'success'
      )
    }
  }

  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* Page Header */}
        <section className="subpage-header-section">
          <div className="subpage-header-container">
            <span className="eyebrow">05 / GUIDELINES & PROTOCOLS</span>
            <h1 className="subpage-hero-title">
              HACKFEST 2026 <br />
              <span className="text-gradient-cyan">RULES & REGULATIONS</span>
            </h1>
            <p className="subpage-hero-subtitle">
              &ldquo;Know the rules. Build boldly. Ship responsibly.&rdquo;
            </p>
          </div>
        </section>

        {/* Introduction / Overview Banner */}
        <section className="section-container" style={{ paddingBottom: '1.5rem', paddingTop: '0' }}>
          <div className="rules-intro-banner glass-card">
            <div className="rules-intro-left">
              <ShieldCheck size={28} className="accent-cyan" />
              <div>
                <h3 className="rules-banner-title">Fair, Open & High-Velocity Sprint</h3>
                <p className="rules-banner-desc">
                  Every participant agrees to uphold these regulations to ensure a safe, collaborative, and
                  inspiring environment. All projects undergo impartial rubric evaluation by our judging panel.
                </p>
              </div>
            </div>
            <div className="rules-intro-stats">
              <div className="rule-mini-stat">
                <span className="stat-num">09</span>
                <span className="stat-lbl">Rule Sections</span>
              </div>
              <div className="rule-mini-stat">
                <span className="stat-num">06</span>
                <span className="stat-lbl">Judging Rubrics</span>
              </div>
              <div className="rule-mini-stat">
                <span className="stat-num">100%</span>
                <span className="stat-lbl">Open Source Spirit</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01 - 05 Rules Grid */}
        <section className="section-container">
          <SectionHeading
            eyebrow="PARTICIPATION & BUILD PROTOCOLS"
            title="Core Competition Rules"
            copy="Review the foundational requirements regarding teams, development timelines, tooling, ownership, and project submissions."
          />

          <div className="rules-cards-grid">
            {ruleSections.slice(0, 5).map((section, idx) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.35, delay: idx * 0.07 }}
                  className={`rule-block-card glass-card accent-border-${section.accent}`}
                >
                  <div className="rule-card-header">
                    <div className="rule-badge-chip">
                      <span>SECTION {section.number}</span>
                    </div>
                    <div className={`rule-icon-box rule-icon-${section.accent}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="rule-card-title">{section.title}</h3>
                  <p className="rule-card-summary">{section.summary}</p>

                  <div className="rule-divider-line" />

                  <ul className="rule-points-list">
                    {section.rules.map((ruleText, rIdx) => (
                      <li key={rIdx}>
                        <CheckCircle2 size={16} className={`accent-${section.accent} point-bullet-icon`} />
                        <span>{ruleText}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Section 06: Judging Rubric Animated Cards */}
        <section className="section-container dark-bg-band">
          <SectionHeading
            eyebrow="SECTION 06 / EVALUATION FRAMEWORK"
            title="Judging & Scoring Rubrics"
            copy="Submitted projects are evaluated across six structured pillars during the Day 2 prototype demonstrations."
          />

          <div className="judging-rubrics-grid">
            {judgingCriteria.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`judging-rubric-card glass-card accent-border-${item.accent}`}
                >
                  <div className="rubric-header-row">
                    <div className={`rubric-icon-circle rubric-icon-${item.accent}`}>
                      <Icon size={22} />
                    </div>
                    <div className="rubric-weight-badge">
                      <span>{item.weight}</span>
                    </div>
                  </div>

                  <h3 className="rubric-card-title">{item.title}</h3>
                  <p className="rubric-card-desc">{item.desc}</p>

                  <div className="rubric-progress-meter">
                    <div
                      className={`rubric-meter-fill meter-${item.accent}`}
                      style={{ width: item.weight }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Section 07 - 09 Conduct & Integrity */}
        <section className="section-container">
          <SectionHeading
            eyebrow="ETHICS, CONDUCT & ARBITRATION"
            title="Conduct & Organizer Rights"
            copy="Standards for maintaining an inclusive, honest, and respectful atmosphere throughout the event."
          />

          <div className="rules-cards-grid">
            {ruleSections.slice(5).map((section, idx) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className={`rule-block-card glass-card accent-border-${section.accent}`}
                >
                  <div className="rule-card-header">
                    <div className="rule-badge-chip">
                      <span>SECTION {section.number}</span>
                    </div>
                    <div className={`rule-icon-box rule-icon-${section.accent}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="rule-card-title">{section.title}</h3>
                  <p className="rule-card-summary">{section.summary}</p>

                  <div className="rule-divider-line" />

                  <ul className="rule-points-list">
                    {section.rules.map((ruleText, rIdx) => (
                      <li key={rIdx}>
                        <CheckCircle2 size={16} className={`accent-${section.accent} point-bullet-icon`} />
                        <span>{ruleText}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Final Interactive Acknowledgement Section */}
        <section className="section-container" style={{ paddingTop: '1rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rules-ack-card"
          >
            <div className="rules-ack-glow" />

            <span className="eyebrow">OFFICIAL ACKNOWLEDGEMENT</span>
            <h2 className="rules-ack-title">READY TO HACK?</h2>
            <p className="rules-ack-subtitle">
              Ensure you have understood all guidelines. Check the box below to unlock registration.
            </p>

            <div
              className={`interactive-ack-checkbox ${agreed ? 'checked' : ''}`}
              onClick={handleAgreementToggle}
              role="checkbox"
              aria-checked={agreed}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault()
                  handleAgreementToggle()
                }
              }}
            >
              <div className={`custom-checkbox-box ${agreed ? 'is-active' : ''}`}>
                <AnimatePresence>
                  {agreed && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Check size={16} className="ack-check-icon" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="ack-label-text">
                I have read and agree to the HackFest 2026 rules and participation guidelines.
              </span>
            </div>

            <div className="rules-ack-action-row">
              <Link
                href="/register"
                className={`button button-lg ${agreed ? 'button-primary' : 'button-secondary disabled-ack-btn'}`}
              >
                <span>Continue to Registration</span>
                <ArrowRight size={16} />
              </Link>

              <Link href="/faq" className="button button-secondary button-lg">
                <span>View HackFest FAQ</span>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </PageTransition>
  )
}
