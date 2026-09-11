'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Command,
  ArrowRight,
  FileText,
  Calendar,
  Award,
  Users,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Mail,
  Home,
  UserCheck,
  LayoutDashboard,
  X,
  Compass,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface PaletteItem {
  id: string
  title: string
  subtitle: string
  category: 'Pages' | 'Tracks' | 'Tools & Actions' | 'Help & Info'
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  badge?: string
}

const PALETTE_ITEMS: PaletteItem[] = [
  // Pages
  { id: 'page-home', title: 'Home', subtitle: 'Countdown, Overview & Prize highlights', category: 'Pages', href: '/', icon: Home },
  { id: 'page-register', title: 'Register Team', subtitle: 'Submit 2–4 member hackathon team', category: 'Pages', href: '/register', icon: Sparkles, badge: 'Hot' },
  { id: 'page-status', title: 'Registration Status', subtitle: 'Track confirmation & digital pass by email', category: 'Pages', href: '/status', icon: UserCheck },
  { id: 'page-tracks', title: 'Challenge Tracks', subtitle: '4 innovation tracks & problem domains', category: 'Pages', href: '/tracks', icon: Compass },
  { id: 'page-schedule', title: 'Schedule & Timeline', subtitle: '3-day hackathon agenda & calendar sync', category: 'Pages', href: '/schedule', icon: Calendar },
  { id: 'page-rules', title: 'Rules & Regulations', subtitle: 'Eligibility, submission, and code of conduct', category: 'Pages', href: '/rules', icon: ShieldAlert },
  { id: 'page-prizes', title: 'Prizes & Bounties', subtitle: '₹5,00,000+ prize pool and perks', category: 'Pages', href: '/prizes', icon: Award },
  { id: 'page-mentors', title: 'Mentors & Judges', subtitle: 'Industry leaders and tech experts', category: 'Pages', href: '/mentors', icon: Users },
  { id: 'page-organizer', title: 'Organizer Dashboard', subtitle: 'Live team metrics, table & CSV export', category: 'Pages', href: '/organizer', icon: LayoutDashboard },
  { id: 'page-about', title: 'About HackFest', subtitle: 'Mission, impact metrics, and vision', category: 'Pages', href: '/about', icon: FileText },
  { id: 'page-faq', title: 'Frequently Asked Questions', subtitle: 'Searchable answers & guidelines', category: 'Pages', href: '/faq', icon: HelpCircle },
  { id: 'page-contact', title: 'Contact & Support', subtitle: 'Help desk, venue location & emergency contacts', category: 'Pages', href: '/contact', icon: Mail },

  // Tracks
  { id: 'track-ai', title: 'AI & Intelligent Systems Track', subtitle: 'LLMs, autonomous agents, neural apps', category: 'Tracks', href: '/tracks#track-ai', icon: Compass },
  { id: 'track-web3', title: 'Web3 & Decentralized Tech Track', subtitle: 'Smart contracts, dApps, identity, DeFi', category: 'Tracks', href: '/tracks#track-web3', icon: Compass },
  { id: 'track-climate', title: 'ClimateTech & Smart Cities Track', subtitle: 'Clean energy, IoT sensors, urban resilience', category: 'Tracks', href: '/tracks#track-climate', icon: Compass },
  { id: 'track-open', title: 'Open Innovation Track', subtitle: 'Any breakthrough technology or software', category: 'Tracks', href: '/tracks#track-open', icon: Compass },

  // Tools & Actions
  { id: 'action-export-ics', title: 'Add HackFest to Calendar (.ics)', subtitle: 'Export 16–17 October 2026 to Google/Apple Calendar', category: 'Tools & Actions', href: '/schedule', icon: Calendar },
  { id: 'action-check-email', title: 'Lookup Registration ID', subtitle: 'Find your issued hacker ticket by email', category: 'Tools & Actions', href: '/status', icon: Search },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Global hotkey listener (Cmd+K / Ctrl+K / / key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  // Filter items
  const filtered = PALETTE_ITEMS.filter((item) => {
    const q = query.toLowerCase().trim()
    if (!q) return true
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
  })

  // Keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const selected = filtered[selectedIndex]
      if (selected) {
        setIsOpen(false)
        router.push(selected.href)
      }
    }
  }

  const handleSelect = (href: string) => {
    setIsOpen(false)
    router.push(href)
  }

  return (
    <>
      {/* Floating Shortcut Trigger Button (Desktop & Mobile) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="command-palette-trigger"
        aria-label="Open Command Search Palette"
        title="Search HackFest 2026 (Ctrl+K)"
      >
        <Search size={14} className="accent-cyan" />
        <span className="cpt-text">Search...</span>
        <kbd className="cpt-kbd">Ctrl K</kbd>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="command-palette-backdrop" onClick={() => setIsOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="command-palette-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input Bar */}
              <div className="command-palette-search-bar">
                <Search size={18} className="command-palette-search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setSelectedIndex(0)
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type a command, page, track, or action..."
                  className="command-palette-input"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="command-palette-clear-btn"
                  >
                    <X size={14} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="command-palette-close-btn"
                  aria-label="Close search"
                >
                  <kbd>ESC</kbd>
                </button>
              </div>

              {/* Results List */}
              <div className="command-palette-results">
                {filtered.length === 0 ? (
                  <div className="command-palette-empty">
                    <HelpCircle size={28} className="text-muted-foreground mb-2" />
                    <p className="font-semibold text-foreground">No matching results found</p>
                    <span className="text-xs text-muted-foreground">Try searching for &quot;tracks&quot;, &quot;rules&quot;, &quot;register&quot;, or &quot;schedule&quot;</span>
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const Icon = item.icon
                    const isSelected = idx === selectedIndex

                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item.href)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`command-palette-item ${isSelected ? 'is-selected' : ''}`}
                      >
                        <div className="cpi-icon-wrap">
                          <Icon size={16} />
                        </div>
                        <div className="cpi-content">
                          <div className="cpi-title-row">
                            <span className="cpi-title">{item.title}</span>
                            {item.badge && <span className="cpi-badge">{item.badge}</span>}
                            <span className="cpi-cat">{item.category}</span>
                          </div>
                          <p className="cpi-subtitle">{item.subtitle}</p>
                        </div>
                        <ArrowRight size={14} className="cpi-arrow" />
                      </div>
                    )
                  })
                )}
              </div>

              {/* Palette Footer */}
              <div className="command-palette-footer">
                <div className="cpf-hint">
                  <kbd>↑</kbd>
                  <kbd>↓</kbd>
                  <span>to navigate</span>
                </div>
                <div className="cpf-hint">
                  <kbd>↵</kbd>
                  <span>to select</span>
                </div>
                <div className="cpf-hint">
                  <kbd>ESC</kbd>
                  <span>to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
