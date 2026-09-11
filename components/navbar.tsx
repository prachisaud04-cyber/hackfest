'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/tracks', label: 'Tracks' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/mentors', label: 'Mentors' },
  { href: '/prizes', label: 'Prizes' },
  { href: '/rules', label: 'Rules' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/status', label: 'Status' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Track scroll position for header glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (pathname?.startsWith('/organizer')) {
    return null
  }

  const triggerSearch = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))
  }

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link href="/" className="logo-link">
          <span className="logo-brand">HACKFEST</span>
          <span className="logo-badge">2026</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
                {isActive && <span className="active-dot" />}
              </Link>
            )
          })}
        </nav>

        <div className="navbar-actions">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={triggerSearch}
            className="navbar-search-btn"
            title="Search site (Ctrl+K)"
            aria-label="Open Command Search"
          >
            <Search size={14} className="accent-cyan" />
            <span className="navbar-search-lbl">Search...</span>
            <kbd className="navbar-search-kbd">Ctrl K</kbd>
          </button>

          <Link href="/register" className="button button-register">
            <span>REGISTER NOW</span>
            <ArrowRight size={15} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="mobile-drawer"
          >
            <div className="mobile-nav-inner">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setTimeout(triggerSearch, 100)
                }}
                className="mobile-search-trigger-btn"
              >
                <Search size={16} className="accent-cyan" />
                <span>Search pages, tracks, rules...</span>
                <kbd>Ctrl K</kbd>
              </button>

              <nav className="mobile-nav-links" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`mobile-nav-item ${isActive ? 'mobile-nav-item-active' : ''}`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="active-dot" />}
                    </Link>
                  )
                })}
              </nav>

              <div className="mobile-drawer-footer">
                <Link href="/register" className="button button-primary w-full justify-center">
                  <span>REGISTER NOW</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
