'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BrainCircuit,
  Globe2,
  ShieldCheck,
  HeartPulse,
  Sprout,
  Sparkles,
  Bot,
  Terminal,
  Lock,
  Stethoscope,
  Leaf,
  Compass,
  CheckCircle,
  Lightbulb,
  Search,
  Filter,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { PageTransition } from '@/components/page-transition'
import { useToast } from '@/components/toast'

const allTracks = [
  {
    id: 'ai-ml',
    number: '01',
    title: 'AI & Machine Learning',
    category: 'AI & Intelligence',
    accent: 'cyan',
    icon: BrainCircuit,
    subIcon: Bot,
    tag: 'Trending Domain',
    shortDesc: 'Build intelligent systems, LLM-powered autonomous agents, and computer vision models.',
    fullDesc:
      'Harness cutting-edge generative AI, machine learning pipelines, and neural networks to create tools that automate workflows, assist humans, or uncover complex insights from real-world data.',
    keyThemes: [
      'Autonomous AI agents and workflow automation',
      'Multimodal LLMs for regional language understanding',
      'Computer vision for edge devices and robotics',
      'Predictive analytics and intelligent recommendation engines',
    ],
    sampleIdeas: 'AI copilots for local artisans, automated legal doc summarizer, edge vision for traffic safety.',
  },
  {
    id: 'web-app',
    number: '02',
    title: 'Web & App Development',
    category: 'Software & Web',
    accent: 'violet',
    icon: Globe2,
    subIcon: Terminal,
    tag: 'Ecosystem Core',
    shortDesc: 'Create useful, scalable digital experiences and intuitive modern applications.',
    fullDesc:
      'Design and deploy responsive web platforms, cross-platform mobile apps, or high-throughput distributed tools with exceptional UX, accessibility, and high performance.',
    keyThemes: [
      'Next-generation collaborative web applications',
      'Offline-first and low-bandwidth mobile experiences',
      'Developer tools, APIs, and micro-SaaS platforms',
      'Interactive data visualization and real-time dashboards',
    ],
    sampleIdeas: 'Decentralized peer-to-peer file transfer, community event organizer, low-latency collaboration tool.',
  },
  {
    id: 'cybersecurity',
    number: '03',
    title: 'Cybersecurity',
    category: 'Security',
    accent: 'blue',
    icon: ShieldCheck,
    subIcon: Lock,
    tag: 'Digital Trust',
    shortDesc: 'Build solutions that make the digital world safer, resilient, and privacy-preserving.',
    fullDesc:
      'Develop innovative threat detection systems, zero-trust authentication mechanisms, encrypted communications, or automated vulnerability scanners to safeguard user data.',
    keyThemes: [
      'Zero-trust identity management and biometrics',
      'Automated vulnerability scanners and code auditors',
      'Phishing detection and scam prevention extensions',
      'Decentralized identity and privacy-preserving cryptography',
    ],
    sampleIdeas: 'AI scam detector for messaging apps, open-source SBOM security scanner, zero-knowledge auth system.',
  },
  {
    id: 'healthtech',
    number: '04',
    title: 'HealthTech',
    category: 'Impact & Health',
    accent: 'cyan',
    icon: HeartPulse,
    subIcon: Stethoscope,
    tag: 'Human Impact',
    shortDesc: 'Use technology to improve health, patient wellbeing, and healthcare accessibility.',
    fullDesc:
      'Engineer digital health platforms, wearable integrations, mental wellness trackers, or telemedicine tools that bridge the gap in healthcare delivery and preventive medicine.',
    keyThemes: [
      'Remote patient monitoring and telemedicine apps',
      'Mental health and wellbeing companion tools',
      'Accessible interfaces for eldercare and differently-abled users',
      'Emergency response coordination and medical resource tracking',
    ],
    sampleIdeas: 'SOS emergency ambulance dispatch helper, offline medication tracker, speech-based symptom triage.',
  },
  {
    id: 'sustainability',
    number: '05',
    title: 'Sustainability',
    category: 'Climate & Green',
    accent: 'violet',
    icon: Sprout,
    subIcon: Leaf,
    tag: 'Climate Tech',
    shortDesc: 'Create technology-driven solutions for a greener, more resilient planet.',
    fullDesc:
      'Tackle climate change, urban waste reduction, renewable energy distribution, or biodiversity conservation through software, IoT sensors, and smart resource tracking.',
    keyThemes: [
      'Smart waste classification and recycling logistics',
      'Carbon footprint calculation and green habit trackers',
      'Renewable energy monitoring and microgrid optimization',
      'Sustainable agriculture tools and crop disease diagnostics',
    ],
    sampleIdeas: 'AI crop disease diagnostic app for local farmers, smart solar microgrid monitor, food waste routing app.',
  },
  {
    id: 'open-innovation',
    number: '06',
    title: 'Open Innovation',
    category: 'Open Wildcard',
    accent: 'blue',
    icon: Sparkles,
    subIcon: Compass,
    tag: 'Wildcard Track',
    shortDesc: 'Build anything that solves a meaningful problem without track restrictions.',
    fullDesc:
      'Have an unconventional idea that spans multiple domains? Open Innovation is your playground. Bring any hardware, software, fintech, edtech, or gaming project to life.',
    keyThemes: [
      'Cross-disciplinary hardware and software prototypes',
      'EdTech tools and gamified learning platforms',
      'Civic tech, open government data, and public utility apps',
      'Fintech, micro-investments, and financial literacy tools',
    ],
    sampleIdeas: 'Interactive gamified science simulator, civic issue reporting app with GPS tracking, community micro-lending.',
  },
]

const categories = ['All Categories', 'AI & Intelligence', 'Software & Web', 'Security', 'Impact & Health', 'Climate & Green', 'Open Wildcard']

export default function TracksPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [searchQuery, setSearchQuery] = useState('')
  const { showToast } = useToast()

  const filteredTracks = useMemo(() => {
    return allTracks.filter((track) => {
      const matchesCategory =
        selectedCategory === 'All Categories' || track.category === selectedCategory
      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.sampleIdeas.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.keyThemes.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* Page Header */}
        <section className="subpage-header-section">
          <div className="subpage-header-container">
            <span className="eyebrow">02 / CHALLENGE TRACKS</span>
            <h1 className="subpage-hero-title">
              Six Directions. <span className="text-gradient-cyan">One Goal</span>: Build What Matters.
            </h1>
            <p className="subpage-hero-subtitle">
              Choose the track that aligns with your passions. Each track features dedicated problem areas,
              expert mentors, and tailored judging benchmarks.
            </p>
          </div>
        </section>

        {/* Search & Filter Toolbar */}
        <section className="section-container" style={{ paddingBottom: '2rem', paddingTop: '0' }}>
          <div className="filter-controls-glass-card glass-card">
            <div className="track-search-field">
              <Search size={18} className="accent-cyan" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks, problem areas, or keywords (e.g. LLMs, climate, API)..."
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="clear-filter-btn"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="category-pills-row">
              {categories.map((cat) => (
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
        </section>

        {/* Tracks List with Staggered Motion */}
        <section className="section-container" style={{ paddingTop: '0' }}>
          <div className="tracks-detailed-grid">
            <AnimatePresence mode="popLayout">
              {filteredTracks.length === 0 ? (
                <div className="glass-card track-empty-state">
                  <h3>No tracks match &quot;{searchQuery}&quot;</h3>
                  <p>Try searching for broader keywords like AI, Web, Security, or Health.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('All Categories')
                    }}
                    className="button button-secondary button-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                filteredTracks.map((track, index) => {
                  const MainIcon = track.icon
                  return (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.28, delay: index * 0.05 }}
                      className={`track-detail-card glass-card accent-border-${track.accent}`}
                      id={track.id}
                    >
                      <div className="track-card-header">
                        <div className={`track-icon-wrapper track-icon-${track.accent}`}>
                          <MainIcon size={24} />
                        </div>
                        <div className="track-header-meta">
                          <span className="track-index-mono">{track.number}</span>
                          <span className="track-tag-pill">{track.tag}</span>
                        </div>
                      </div>

                      <h2 className="track-detail-title">{track.title}</h2>
                      <p className="track-detail-lead">{track.shortDesc}</p>
                      <p className="track-detail-body">{track.fullDesc}</p>

                      <div className="track-sub-section">
                        <h4 className="track-sub-heading">Key Focus Areas:</h4>
                        <ul className="track-themes-list">
                          {track.keyThemes.map((theme, idx) => (
                            <li key={idx}>
                              <CheckCircle size={14} className={`accent-${track.accent}`} />
                              <span>{theme}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="track-example-box">
                        <div className="example-header">
                          <Lightbulb size={14} className="accent-cyan" />
                          <span>Sample Project Ideas:</span>
                        </div>
                        <p className="example-text">{track.sampleIdeas}</p>
                      </div>

                      <div className="track-card-action">
                        <Link
                          href={`/register?track=${encodeURIComponent(track.title)}`}
                          className="button button-primary button-full"
                          onClick={() =>
                            showToast(
                              `Selected ${track.title}`,
                              'Pre-filling track on registration form'
                            )
                          }
                        >
                          <span>Select Track & Register</span>
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </motion.div>
                  )
                })
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Cross-Track Note */}
        <section className="section-container dark-bg-band">
          <div className="guidance-banner-card glass-card">
            <div className="guidance-content">
              <span className="eyebrow">TRACK GUIDELINES</span>
              <h3>Not sure which track to select?</h3>
              <p>
                Don&apos;t worry! You can specify your preferred track during initial registration and modify
                your choice during the Day 1 challenge reveal and team mixer at Gauhati University.
              </p>
              <div className="guidance-actions">
                <Link href="/register" className="button button-primary">
                  <span>Register Your Team</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/schedule" className="button button-secondary">
                  <span>View Day 1 Schedule</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
