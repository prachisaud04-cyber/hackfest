'use client'

import React from 'react'
import Link from 'next/link'
import {
  Trophy,
  Award,
  Medal,
  Sparkles,
  ArrowRight,
  Palette,
  BrainCircuit,
  HeartHandshake,
  Rocket,
  Gift,
  Cloud,
  FileCheck,
  ShieldAlert,
} from 'lucide-react'
import { PageTransition } from '@/components/page-transition'
import { SectionHeading } from '@/components/section-heading'

const mainPrizes = [
  {
    rank: '01',
    title: 'GRAND PRIZE',
    amount: '₹50,000',
    subtitle: 'Champion of HackFest 2026',
    description:
      'Awarded to the team with the highest overall score across technical complexity, product utility, innovation, and demo presentation.',
    accent: 'cyan',
    icon: Trophy,
    perks: [
      '₹50,000 Direct Cash Prize',
      'Exclusive Champion Winner Trophy',
      'Direct Fast-Track Interview Access',
      'Cloud Credits & Developer Suite Access',
      'HackFest 2026 Winner Goodie Box',
    ],
    highlight: true,
  },
  {
    rank: '02',
    title: 'RUNNER UP',
    amount: '₹25,000',
    subtitle: 'First Runner Up',
    description:
      'Recognizing the second highest overall project showcasing exceptional product design and outstanding execution velocity.',
    accent: 'violet',
    icon: Medal,
    perks: [
      '₹25,000 Direct Cash Prize',
      'Runner Up Trophy & Certificates',
      'Cloud Developer Credits',
      'HackFest 2026 Swag Pack',
    ],
    highlight: false,
  },
  {
    rank: '03',
    title: 'SECOND RUNNER UP',
    amount: '₹15,000',
    subtitle: 'Second Runner Up',
    description:
      'Recognizing third place standing with remarkable creativity and clean code architecture.',
    accent: 'blue',
    icon: Award,
    perks: [
      '₹15,000 Direct Cash Prize',
      'Second Runner Up Certificate',
      'Cloud Credits Package',
      'HackFest 2026 Swag Pack',
    ],
    highlight: false,
  },
]

const specialAwards = [
  {
    icon: Palette,
    title: 'Best UI/UX Design',
    reward: '₹5,000 + Swag',
    description: 'Awarded for the most intuitive, aesthetically stunning, and accessible user experience.',
    accent: 'cyan',
  },
  {
    icon: BrainCircuit,
    title: 'Best AI Solution',
    reward: '₹5,000 + AI Cloud Credits',
    description: 'Awarded for the most creative and impactful implementation of Artificial Intelligence / LLMs.',
    accent: 'violet',
  },
  {
    icon: HeartHandshake,
    title: 'Best Social Impact',
    reward: '₹5,000 + Incubation Support',
    description: 'Awarded to the solution with the greatest potential to solve a real community or environmental challenge.',
    accent: 'blue',
  },
  {
    icon: Rocket,
    title: 'Best Beginner Team',
    reward: '₹5,000 + Mentorship Pack',
    description: 'Awarded to the highest-scoring team comprised entirely of first-time hackathon participants.',
    accent: 'cyan',
  },
]

const hackerPerks = [
  {
    icon: FileCheck,
    title: 'Verified Certificates',
    desc: 'Official digital certificate of participation & achievement for your resume and LinkedIn.',
  },
  {
    icon: Gift,
    title: 'Swag & Goodie Kits',
    desc: 'Custom HackFest t-shirts, sticker packs, metal badges, and hacker notebooks.',
  },
  {
    icon: Cloud,
    title: 'Cloud & API Credits',
    desc: 'Free credits and sandbox API keys from our partner cloud infrastructure providers.',
  },
  {
    icon: Sparkles,
    title: 'Founder & Recruiter Access',
    desc: 'Direct visibility with startup founders and tech teams looking for talented builders.',
  },
]

export default function PrizesPage() {
  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* Page Header */}
        <section className="subpage-header-section">
          <div className="subpage-header-container">
            <span className="eyebrow">05 / PRIZES & RECOGNITION</span>
            <h1 className="subpage-hero-title">
              Rewarding Craft, <span className="text-gradient-cyan">Ambition</span> & Impact.
            </h1>
            <p className="subpage-hero-subtitle">
              Compete for ₹90,000+ in cash prizes, cloud credits, hardware toolkits, and category awards.
              Every participating hacker leaves with valuable experience and verified credentials.
            </p>
          </div>
        </section>

        {/* Podium Cards Grid */}
        <section className="section-container">
          <div className="prizes-podium-grid">
            {mainPrizes.map((prize) => {
              const Icon = prize.icon
              return (
                <div
                  key={prize.title}
                  className={`prize-podium-card glass-card ${
                    prize.highlight ? 'prize-podium-highlight' : ''
                  } accent-border-${prize.accent}`}
                >
                  {prize.highlight && <div className="podium-badge">MOST PRESTIGIOUS</div>}
                  <div className="prize-podium-top">
                    <div className={`prize-icon-circle prize-icon-${prize.accent}`}>
                      <Icon size={28} />
                    </div>
                    <span className="prize-rank-tag">{prize.rank}</span>
                  </div>

                  <h3 className="prize-tier-title">{prize.title}</h3>
                  <span className="prize-tier-sub">{prize.subtitle}</span>
                  <div className="prize-amount-hero">{prize.amount}</div>
                  <p className="prize-tier-desc">{prize.description}</p>

                  <div className="prize-perks-list">
                    <span className="perks-heading">Includes:</span>
                    <ul>
                      {prize.perks.map((perk, i) => (
                        <li key={i}>
                          <Sparkles size={13} className="accent-cyan" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Special Category Awards */}
        <section className="section-container dark-bg-band">
          <SectionHeading
            eyebrow="CATEGORY TRACKS"
            title="Special Category Awards"
            copy="In addition to the top 3 overall podium prizes, teams can win specialized awards in specific domains."
          />

          <div className="special-awards-grid">
            {specialAwards.map((award) => {
              const Icon = award.icon
              return (
                <div key={award.title} className="special-award-card glass-card">
                  <div className="special-award-header">
                    <div className={`special-icon-box accent-icon-${award.accent}`}>
                      <Icon size={20} />
                    </div>
                    <span className="special-reward-pill">{award.reward}</span>
                  </div>
                  <h3 className="special-award-title">{award.title}</h3>
                  <p className="special-award-desc">{award.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Universal Hacker Perks */}
        <section className="section-container">
          <SectionHeading
            eyebrow="FOR ALL PARTICIPANTS"
            title="Every Hacker Leaves a Winner"
            copy="HackFest is built on learning and community. Here is what every accepted team receives."
          />

          <div className="hacker-perks-grid">
            {hackerPerks.map((perk) => {
              const Icon = perk.icon
              return (
                <div key={perk.title} className="hacker-perk-card glass-card">
                  <div className="perk-icon-circle">
                    <Icon size={20} className="accent-cyan" />
                  </div>
                  <h4>{perk.title}</h4>
                  <p>{perk.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Mandatory Disclaimer */}
        <section className="section-container" style={{ paddingTop: '0' }}>
          <div className="disclaimer-banner-box glass-card">
            <ShieldAlert size={18} className="accent-violet" />
            <p className="disclaimer-text">
              <strong>Event Notice:</strong> Demo event — prize details are fictional and subject to final
              event confirmation.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-container cta-banner-section">
          <div className="cta-banner-card">
            <div className="cta-glow-effect" />
            <div className="cta-content">
              <span className="eyebrow">YOUR CHANCE TO WIN</span>
              <h2 className="cta-headline">Ready to claim your prize?</h2>
              <p className="cta-subtext">
                Free registration is open. Form your team of 2–4 members and start preparing your ideas.
              </p>
              <div className="cta-button-group">
                <Link href="/register" className="button button-primary button-lg">
                  <span>Register Now</span>
                  <ArrowRight size={18} />
                </Link>
                <Link href="/faq" className="button button-secondary button-lg">
                  <span>View FAQ</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
