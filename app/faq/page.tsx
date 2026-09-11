'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  Search,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Users,
  Code2,
  Award,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { PageTransition } from '@/components/page-transition'
import { SectionHeading } from '@/components/section-heading'

interface FAQItem {
  id: number
  question: string
  answer: string
  category: 'General' | 'Teams' | 'Technical' | 'Judging'
}

const faqList: FAQItem[] = [
  {
    id: 1,
    question: 'Who can participate?',
    answer:
      'HackFest 2026 is open to undergraduate and postgraduate students, self-taught developers, UI/UX designers, product managers, and curious builders of all experience levels. Whether you are building your very first project or scaling your tenth startup idea, you are welcome to participate.',
    category: 'General',
  },
  {
    id: 2,
    question: 'What is the team size?',
    answer:
      'Teams must consist of 2 to 4 members. We believe this size provides the ideal balance for effective collaboration, diverse skill sets (coding, design, pitch), and agile project delivery within the 36-hour timeframe.',
    category: 'Teams',
  },
  {
    id: 3,
    question: 'Is registration free?',
    answer:
      'Yes, HackFest 2026 is 100% free for every participant! There are no entry fees or hidden charges. Meals, caffeine, high-speed Wi-Fi, workshop sessions, mentor access, and swag are provided at zero cost to accepted onsite hackers.',
    category: 'General',
  },
  {
    id: 4,
    question: 'Do I need previous hackathon experience?',
    answer:
      'Not at all! Many of our participants and past winners were first-time hackathon attendees. We provide dedicated mentor hours, technical workshops, and starter resources to help beginners take ideas from concept to completion.',
    category: 'General',
  },
  {
    id: 5,
    question: 'Can I participate individually?',
    answer:
      'You can register individually as a solo builder. However, for final project submissions, teams must have 2–4 members. We host a dedicated team-formation mixer and matchmaking session on Day 1 at 11:00 AM (both onsite and on Discord) to help solo participants form teams.',
    category: 'Teams',
  },
  {
    id: 6,
    question: 'Which technologies can I use?',
    answer:
      'You are free to use any programming language, frontend/backend framework, cloud platform, AI API, open-source library, or hardware dev board that best fits your solution (e.g. Next.js, Python, Rust, Flutter, React Native, PyTorch, Supabase, Tailwind, Arduino, ESP32, etc.).',
    category: 'Technical',
  },
  {
    id: 7,
    question: 'What should we build?',
    answer:
      'You can build any software or hardware application aligned with one of our six challenge tracks: AI & Machine Learning, Web & App Development, Cybersecurity, HealthTech, Sustainability, or Open Innovation. All code must be written from scratch during the hackathon.',
    category: 'Technical',
  },
  {
    id: 8,
    question: 'How long do we have to build?',
    answer:
      'The continuous hacking sprint lasts for 24 hours—commencing at 12:00 PM on Day 1 (13 September) and concluding at 12:00 PM on Day 2 (14 September). After the submission deadline, live project demos and judging begin at 01:00 PM.',
    category: 'Technical',
  },
  {
    id: 9,
    question: 'How will projects be judged?',
    answer:
      'Projects are evaluated by industry judges across four weighted rubrics: Technical Execution & Depth (30%), Novelty & Creativity (25%), Real-world Utility & Problem Solving (25%), and Demo Polish & Presentation (20%).',
    category: 'Judging',
  },
  {
    id: 10,
    question: 'What happens after registration?',
    answer:
      'Upon submitting your registration, you will receive your unique Registration ID (e.g. HF26-00127). You can check your registration status anytime via the Status page. Accepted participants will receive an email 48 hours prior to Day 1 with check-in instructions and Discord links.',
    category: 'General',
  },
]

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const toggleAccordion = (id: number) => {
    setOpenId((current) => (current === id ? null : id))
  }

  const filteredFaqs = faqList.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <PageTransition>
      <main className="page-wrapper">
        {/* Page Header */}
        <section className="subpage-header-section">
          <div className="subpage-header-container">
            <span className="eyebrow">08 / FREQUENTLY ASKED QUESTIONS</span>
            <h1 className="subpage-hero-title">
              Everything You Need to <span className="text-gradient-cyan">Know</span>.
            </h1>
            <p className="subpage-hero-subtitle">
              Have questions about registration, team formation, judging rubrics, or technical rules?
              Find clear answers to common inquiries below.
            </p>
          </div>
        </section>

        {/* Filter Controls */}
        <section className="section-container" style={{ paddingTop: '0' }}>
          <div className="faq-controls-bar glass-card">
            {/* Search Input */}
            <div className="faq-search-box">
              <Search size={18} className="accent-cyan" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions (e.g. team size, technologies, prizes)..."
              />
            </div>

            {/* Category Pills */}
            <div className="faq-category-pills">
              {['All', 'General', 'Teams', 'Technical', 'Judging'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`category-pill-btn ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="faq-accordion-container">
            {filteredFaqs.length === 0 ? (
              <div className="glass-card faq-empty-state">
                <HelpCircle size={36} className="accent-violet" />
                <h3>No questions found</h3>
                <p>We couldn&apos;t find any FAQs matching &quot;{searchTerm}&quot;.</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All')
                  }}
                  className="button button-secondary"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openId === faq.id
                return (
                  <div
                    key={faq.id}
                    className={`faq-accordion-card glass-card ${isOpen ? 'accordion-expanded' : ''}`}
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                    >
                      <div className="faq-question-left">
                        <span className="faq-category-tag">{faq.category}</span>
                        <span className="faq-question-text">{faq.question}</span>
                      </div>
                      <div className={`faq-chevron-box ${isOpen ? 'chevron-rotated' : ''}`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="faq-answer-wrapper"
                        >
                          <div className="faq-answer-content">
                            <p>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })
            )}
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="section-container dark-bg-band">
          <div className="helpdesk-contact-card glass-card">
            <div className="helpdesk-icon-box">
              <MessageCircle size={28} className="accent-cyan" />
            </div>
            <div className="helpdesk-info">
              <h3>Still have a question not covered here?</h3>
              <p>
                Our community team is here to help! Reach out directly via email or our contact page.
              </p>
            </div>
            <div className="helpdesk-action-btn">
              <Link href="/contact" className="button button-primary">
                <span>Contact Organizer</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
