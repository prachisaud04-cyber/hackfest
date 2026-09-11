'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  GitBranch,
  BriefcaseBusiness,
  Sparkles,
  MapPin,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Shield,
  Zap,
} from 'lucide-react'

export function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith('/organizer')) {
    return null
  }
  return (
    <footer className="site-footer">
      <div className="footer-glow" />
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-col footer-brand-col">
            <Link href="/" className="logo-link">
              <span className="logo-brand">HACKFEST</span>
              <span className="logo-badge">2026</span>
            </Link>
            <p className="footer-tagline">
              <strong>Build. Break. Innovate.</strong>
              <br />
              2 Days. One Idea. Endless Possibilities.
            </p>
            <div className="footer-meta-pill">
              <MapPin size={14} className="accent-cyan" />
              <span>Information Technology department, Gauhati University · Hybrid</span>
            </div>
            <div className="footer-meta-pill">
              <Mail size={14} className="accent-cyan" />
              <a href="mailto:hello@hackfest-demo.dev">hello@hackfest-demo.dev</a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About HackFest</Link>
              </li>
              <li>
                <Link href="/rules">Rules & Regulations</Link>
              </li>
              <li>
                <Link href="/tracks">Challenge Tracks</Link>
              </li>
              <li>
                <Link href="/schedule">Timeline & Schedule</Link>
              </li>
            </ul>
          </div>

          {/* Community & Details */}
          <div className="footer-col">
            <h4 className="footer-col-title">Participants</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/mentors">Mentors & Judges</Link>
              </li>
              <li>
                <Link href="/prizes">Prizes & Awards</Link>
              </li>
              <li>
                <Link href="/faq">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link href="/contact">Contact & Venue</Link>
              </li>
            </ul>
          </div>

          {/* Registration & Status */}
          <div className="footer-col">
            <h4 className="footer-col-title">Admin & Access</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/register" className="highlight-link">
                  Register Your Team <ArrowUpRight size={13} />
                </Link>
              </li>
              <li>
                <Link href="/status">Check Registration Status</Link>
              </li>
              <li>
                <Link href="/organizer" className="organizer-footer-pill">
                  <Shield size={13} className="accent-cyan" />
                  <span>Organizer Portal</span>
                </Link>
              </li>
            </ul>
            <div className="footer-socials">
              <span className="social-label">Follow our updates:</span>
              <div className="social-icons">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="social-btn"
                >
                  <GitBranch size={16} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="social-btn"
                >
                  <BriefcaseBusiness size={16} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X / Twitter"
                  className="social-btn"
                >
                  <Sparkles size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom-row">
          <div className="footer-bottom-left">
            <p>© 2026 HackFest. Demo frontend experience created for educational purposes.</p>
          </div>
          <div className="footer-bottom-right">
            <span>GAUHATI UNIVERSITY · HYBRID · 13–14 SEPT 2026</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
