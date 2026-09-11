'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  Briefcase,
  Layers,
  Award,
  GitBranch,
  BriefcaseBusiness,
  Share2,
  Info,
  CheckCircle2,
  BrainCircuit,
  ShieldCheck,
  Globe2,
  Terminal,
  Search,
  Filter,
  X,
  Calendar,
  MessageSquare,
  Zap,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { PageTransition } from '@/components/page-transition'
import { SectionHeading } from '@/components/section-heading'
import { useToast } from '@/components/toast'

const mentorCategories = [
  'All Domains',
  'AI & Machine Learning',
  'Startups & Strategy',
  'Cloud & Full-Stack',
  'Cybersecurity',
  'HealthTech & Impact',
]

const mentorsList = [
  {
    name: 'Aarav Mehta',
    role: 'Product Engineering Lead',
    domain: 'AI & Machine Learning',
    category: 'AI & Machine Learning',
    accent: 'cyan',
    initials: 'AM',
    bio: 'Specializes in scaling LLM architectures, real-time agent workflows, and distributed inference pipelines. Has coached 30+ hackathon teams to production deployments.',
    tags: ['Generative AI', 'System Design', 'LLMs', 'Python'],
    company: 'NeuralCraft Systems',
  },
  {
    name: 'Riya Sharma',
    role: 'Founder & Technology Strategist',
    domain: 'Startups & Innovation',
    category: 'Startups & Strategy',
    accent: 'violet',
    initials: 'RS',
    bio: 'Serial entrepreneur and advisor guiding early-stage builder teams on product-market fit, lean MVP execution, user feedback loops, and venture storytelling.',
    tags: ['Product Strategy', 'Startup Pitching', 'User Research', 'GTM'],
    company: 'VentureScale Labs',
  },
  {
    name: 'Kabir Sen',
    role: 'Senior Software Engineer',
    domain: 'Cloud & Full-Stack Development',
    category: 'Cloud & Full-Stack',
    accent: 'blue',
    initials: 'KS',
    bio: 'Passionate about serverless infrastructure, Next.js full-stack ecosystems, high-throughput microservices, and crafting delightful, responsive developer tools.',
    tags: ['TypeScript', 'Next.js', 'AWS Cloud', 'Distributed Systems'],
    company: 'Apex Cloud Platforms',
  },
  {
    name: 'Ananya Rao',
    role: 'Cybersecurity Specialist',
    domain: 'Security & Digital Trust',
    category: 'Cybersecurity',
    accent: 'cyan',
    initials: 'AR',
    bio: 'Security researcher with expertise in zero-trust protocols, web application penetration testing, API vulnerability auditing, and automated privacy tools.',
    tags: ['Zero-Trust', 'AppSec', 'Cryptography', 'Pen-Testing'],
    company: 'Sentinel Defense Group',
  },
  {
    name: 'Vikramaditya Barua',
    role: 'HealthTech AI Researcher',
    domain: 'HealthTech & Bio-Informatics',
    category: 'HealthTech & Impact',
    accent: 'violet',
    initials: 'VB',
    bio: 'Specialist in clinical ML validation, bio-signal processing, edge inference on low-power devices, and HIPAA-compliant telemetry pipelines.',
    tags: ['Medical AI', 'PyTorch', 'Signal Processing', 'FastAPI'],
    company: 'PulseAI Diagnostics',
  },
  {
    name: 'Nilakshi Devi',
    role: 'Staff Infrastructure Architect',
    domain: 'Distributed Cloud & DevOps',
    category: 'Cloud & Full-Stack',
    accent: 'cyan',
    initials: 'ND',
    bio: 'Guides developer teams on resilient container architectures, Kubernetes clusters, GraphQL federations, and high-velocity continuous deployment setups.',
    tags: ['Kubernetes', 'GraphQL', 'Serverless', 'Golang'],
    company: 'Starlight Cloud Systems',
  },
]

const judgesList = [
  {
    name: 'Dr. Vikram Goswami',
    role: 'Head of Applied Research & Innovation',
    domain: 'Systems & Artificial Intelligence',
    accent: 'cyan',
    initials: 'VG',
    bio: 'Over 15 years evaluating deep-tech research, algorithmic innovation, and engineering feasibility across academia and industry.',
    criteriaFocus: 'Algorithmic Novelty & Technical Execution',
    company: 'Inst. of Advanced Tech',
  },
  {
    name: 'Meera Nambiar',
    role: 'VP of Product Design & UX',
    domain: 'Human-Centered Computing',
    accent: 'violet',
    initials: 'MN',
    bio: 'Design leader passionate about accessible interfaces, user ergonomics, frictionless onboarding, and polished visual craft.',
    criteriaFocus: 'User Experience & Interface Craft',
    company: 'DesignScale Studios',
  },
  {
    name: 'Siddharth Roy',
    role: 'Venture Partner & Tech Evangelist',
    domain: 'Scalable Architecture & Market Fit',
    accent: 'blue',
    initials: 'SR',
    bio: 'Venture investor assessing real-world commercial viability, team execution velocity, and impactful problem-solving.',
    criteriaFocus: 'Real-World Impact & Viability',
    company: 'Horizon Seed Capital',
  },
  {
    name: 'Tenzin Norbu',
    role: 'Open Source Core Contributor',
    domain: 'Developer Tools & Infra',
    accent: 'cyan',
    initials: 'TN',
    bio: 'Veteran open-source maintainer evaluating code quality, repository structure, security hygiene, and architectural clarity.',
    criteriaFocus: 'Code Hygiene & Demo Polish',
    company: 'OpenCore Foundation',
  },
]

export default function MentorsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Domains')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { showToast } = useToast()

  const filteredMentors = useMemo(() => {
    return mentorsList.filter((mentor) => {
      const matchCategory =
        selectedCategory === 'All Domains' || mentor.category === selectedCategory

      const cleanQuery = searchQuery.trim().toLowerCase()
      const matchSearch =
        !cleanQuery ||
        mentor.name.toLowerCase().includes(cleanQuery) ||
        mentor.role.toLowerCase().includes(cleanQuery) ||
        mentor.company.toLowerCase().includes(cleanQuery) ||
        mentor.domain.toLowerCase().includes(cleanQuery) ||
        mentor.tags.some((t) => t.toLowerCase().includes(cleanQuery)) ||
        mentor.bio.toLowerCase().includes(cleanQuery)

      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchQuery])

  const handleRequestGuidance = (mentorName: string) => {
    showToast(
      'Mentorship Pods Queue',
      `Mentorship for ${mentorName} will open on Day 1 (13 Sept) at 04:00 PM at Gauhati University.`,
      'info'
    )
  }

  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* Page Header */}
        <section className="subpage-header-section">
          <div className="subpage-header-container">
            <span className="eyebrow">04 / MENTORS & JUDGES</span>
            <h1 className="subpage-hero-title">
              Guidance from <span className="text-gradient-cyan">Industry Leaders</span> & Builders.
            </h1>
            <p className="subpage-hero-subtitle">
              Get direct 1:1 mentorship throughout the sprint and present your prototype to seasoned
              evaluators from leading tech companies and startup ecosystems.
            </p>
          </div>
        </section>

        {/* Demo Profiles Notice Banner */}
        <section className="section-container" style={{ paddingBottom: '1rem', paddingTop: '0' }}>
          <div className="demo-disclaimer-banner glass-card">
            <Info size={18} className="accent-cyan" />
            <div className="demo-disclaimer-text">
              <strong>Fictional Demo Profiles:</strong>
              <span>
                {' '}The mentor and judge profiles displayed below are fictional sample representations created
                for the HackFest 2026 frontend preview.
              </span>
            </div>
          </div>
        </section>

        {/* Mentors Section */}
        <section className="section-container">
          <SectionHeading
            eyebrow="TECHNICAL MENTORS"
            title="Meet Your Sprint Mentors"
            copy="Our mentors will be available during designated breakout hours on Day 1 and Day 2 to help debug issues, refine architecture, and review code."
          />

          {/* Search & Domain Filter Bar */}
          <div className="tracks-filter-bar glass-card" style={{ marginBottom: '2.5rem' }}>
            <div className="filter-search-box">
              <Search size={18} className="search-icon-input" />
              <input
                type="text"
                placeholder="Search mentors by name, tech stack, domain, or company…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="category-pills-row">
              <span className="filter-pill-label">
                <Filter size={14} />
                <span>Domain:</span>
              </span>
              <div className="filter-pills-group">
                {mentorCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mentors Grid with Motion Cards */}
          <div className="mentors-detailed-grid">
            <AnimatePresence mode="popLayout">
              {filteredMentors.length > 0 ? (
                filteredMentors.map((mentor, index) => (
                  <motion.div
                    key={mentor.name}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.28, delay: index * 0.05 }}
                    className={`mentor-full-card glass-card accent-border-${mentor.accent}`}
                  >
                    <div className="mentor-card-top">
                      <div className={`mentor-avatar-circle mentor-avatar-${mentor.accent}`}>
                        <span>{mentor.initials}</span>
                      </div>
                      <div className="mentor-card-meta">
                        <span className="mentor-company-tag">{mentor.company}</span>
                        <span className="mentor-domain-badge">{mentor.domain}</span>
                      </div>
                    </div>

                    <div className="mentor-card-body">
                      <h3 className="mentor-card-name">{mentor.name}</h3>
                      <p className="mentor-card-title">{mentor.role}</p>
                      <p className="mentor-card-bio">{mentor.bio}</p>
                    </div>

                    <div className="mentor-skills-row">
                      {mentor.tags.map((tag) => (
                        <span key={tag} className="skill-chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mentor-card-footer">
                      <button
                        onClick={() => handleRequestGuidance(mentor.name)}
                        className="mentor-status-indicator"
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                        title="Click to check breakout schedule"
                      >
                        <span className="online-dot" /> Available 13–14 Sept
                      </button>
                      <div className="mentor-social-icons">
                        <span className="social-icon-demo" title="Demo GitHub Profile">
                          <GitBranch size={14} />
                        </span>
                        <span className="social-icon-demo" title="Demo Profile">
                          <BriefcaseBusiness size={14} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="empty-filter-state glass-card"
                  style={{ gridColumn: '1 / -1', padding: '3rem 2rem', textAlign: 'center' }}
                >
                  <Search size={36} className="accent-cyan" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No Mentors Found</h3>
                  <p style={{ color: 'var(--muted-foreground)', maxWidth: '420px', margin: '0 auto 1.5rem' }}>
                    No mentors matched your search query &quot;{searchQuery}&quot; or selected domain filter.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('All Domains')
                    }}
                    className="button button-secondary button-sm"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Judges Section */}
        <section className="section-container dark-bg-band">
          <SectionHeading
            eyebrow="EVALUATION PANEL"
            title="The Judging Panel"
            copy="Our judges will evaluate submitted projects during Day 2 project demos across four core rubrics: Innovation, Technical Depth, Usability, and Presentation."
          />

          <div className="judges-detailed-grid">
            {judgesList.map((judge) => (
              <div
                key={judge.name}
                className={`judge-full-card glass-card accent-border-${judge.accent}`}
              >
                <div className="judge-card-top">
                  <div className={`judge-avatar-circle judge-avatar-${judge.accent}`}>
                    <span>{judge.initials}</span>
                  </div>
                  <div className="judge-card-meta">
                    <span className="judge-company-tag">{judge.company}</span>
                    <span className="judge-eval-badge">Judge</span>
                  </div>
                </div>

                <div className="judge-card-body">
                  <h3 className="judge-card-name">{judge.name}</h3>
                  <p className="judge-card-title">{judge.role}</p>
                  <p className="judge-card-domain">{judge.domain}</p>
                  <p className="judge-card-bio">{judge.bio}</p>
                </div>

                <div className="judge-focus-box">
                  <span className="focus-label">Primary Evaluation Focus:</span>
                  <span className="focus-value">{judge.criteriaFocus}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mentorship Support Note */}
        <section className="section-container">
          <div className="glass-card mentor-helpdesk-card">
            <div className="helpdesk-header">
              <span className="eyebrow">DURING THE EVENT</span>
              <h2>How to Request Mentor Assistance?</h2>
              <p>
                On Day 1 (13 Sept) at 04:00 PM, dedicated mentor breakout pods will open both on the floor at
                Information Technology department, Gauhati University and in the HackFest Discord. You can queue for 15-minute 1:1 sessions for
                code debugging, architecture validation, or pitch coaching.
              </p>
            </div>
            <div className="helpdesk-action">
              <Link href="/register" className="button button-primary button-lg">
                <span>Join as a Hacker</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}

