'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  Users,
  UsersRound,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Filter,
  Download,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Calendar,
  Building2,
  Sparkles,
  LogOut,
  MapPin,
  Mail,
  Phone,
  Shield,
  Layers,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react'
import { PageTransition } from '@/components/page-transition'
import { api } from '@/lib/api'

export interface Participant {
  id: string
  name: string
  email: string
  phone: string
  college: string
  team: string
  size: number
  role: string
  track: string
  status: 'Confirmed' | 'Pending' | 'Cancelled'
  date: string
}

const initialMockParticipants: Participant[] = [
  {
    id: 'HF26-00127',
    name: 'Prachi Sharma',
    email: 'prachi@example.com',
    phone: '+91 98765 43210',
    college: 'Gauhati University',
    team: 'CodeNova',
    size: 4,
    role: 'Developer (Full-Stack)',
    track: 'AI & Machine Learning',
    status: 'Confirmed',
    date: '10 Sep 2026, 04:15 PM',
  },
  {
    id: 'HF26-00128',
    name: 'Rahul Das',
    email: 'rahul@example.com',
    phone: '+91 98765 43211',
    college: 'Cotton University',
    team: 'ByteForce',
    size: 3,
    role: 'AI/ML Engineer',
    track: 'HealthTech',
    status: 'Confirmed',
    date: '10 Sep 2026, 05:30 PM',
  },
  {
    id: 'HF26-00129',
    name: 'Ananya Roy',
    email: 'ananya@example.com',
    phone: '+91 98765 43212',
    college: 'Assam Engineering College',
    team: 'CyberX',
    size: 2,
    role: 'UI/UX Designer',
    track: 'Cybersecurity',
    status: 'Pending',
    date: '10 Sep 2026, 07:12 PM',
  },
  {
    id: 'HF26-00130',
    name: 'Bikram Kalita',
    email: 'bikram.k@example.com',
    phone: '+91 98765 43213',
    college: 'IIT Guwahati',
    team: 'NexusAI',
    size: 4,
    role: 'Developer (Backend)',
    track: 'AI & Machine Learning',
    status: 'Confirmed',
    date: '11 Sep 2026, 09:20 AM',
  },
  {
    id: 'HF26-00131',
    name: 'Debjani Saikia',
    email: 'debjani@example.com',
    phone: '+91 98765 43214',
    college: 'Gauhati University',
    team: 'GreenTech Innovators',
    size: 3,
    role: 'Product Strategist',
    track: 'Sustainability',
    status: 'Confirmed',
    date: '11 Sep 2026, 11:45 AM',
  },
  {
    id: 'HF26-00132',
    name: 'Tanmoy Barman',
    email: 'tanmoy@example.com',
    phone: '+91 98765 43215',
    college: 'Tezpur University',
    team: 'WebCrafters',
    size: 4,
    role: 'Developer (Frontend)',
    track: 'Web & App Development',
    status: 'Confirmed',
    date: '11 Sep 2026, 01:10 PM',
  },
  {
    id: 'HF26-00133',
    name: 'Sneha Goswami',
    email: 'sneha.g@example.com',
    phone: '+91 98765 43216',
    college: 'NIT Silchar',
    team: 'AeroPulse',
    size: 2,
    role: 'Hardware / IoT',
    track: 'Open Innovation',
    status: 'Pending',
    date: '11 Sep 2026, 02:40 PM',
  },
  {
    id: 'HF26-00134',
    name: 'Abhinav Hazarika',
    email: 'abhinav@example.com',
    phone: '+91 98765 43217',
    college: 'Royal Global University',
    team: 'ShieldOps',
    size: 3,
    role: 'Security Analyst',
    track: 'Cybersecurity',
    status: 'Confirmed',
    date: '11 Sep 2026, 03:55 PM',
  },
  {
    id: 'HF26-00135',
    name: 'Pallavi Deka',
    email: 'pallavi@example.com',
    phone: '+91 98765 43218',
    college: 'Gauhati University',
    team: 'MediAssist',
    size: 4,
    role: 'Developer (Full-Stack)',
    track: 'HealthTech',
    status: 'Confirmed',
    date: '11 Sep 2026, 05:15 PM',
  },
  {
    id: 'HF26-00136',
    name: 'Kunal Medhi',
    email: 'kunal.m@example.com',
    phone: '+91 98765 43219',
    college: 'Assam Engineering College',
    team: 'EcoGrid',
    size: 3,
    role: 'AI/ML Engineer',
    track: 'Sustainability',
    status: 'Cancelled',
    date: '11 Sep 2026, 06:05 PM',
  },
  {
    id: 'HF26-00137',
    name: 'Nandini Bora',
    email: 'nandini@example.com',
    phone: '+91 98765 43220',
    college: 'Jorhat Engineering College',
    team: 'OpenSpark',
    size: 4,
    role: 'UI/UX Designer',
    track: 'Open Innovation',
    status: 'Confirmed',
    date: '11 Sep 2026, 07:30 PM',
  },
  {
    id: 'HF26-00138',
    name: 'Rituraj Nath',
    email: 'rituraj@example.com',
    phone: '+91 98765 43221',
    college: 'Gauhati University',
    team: 'CloudArchitects',
    size: 3,
    role: 'Developer (Backend)',
    track: 'Web & App Development',
    status: 'Confirmed',
    date: '11 Sep 2026, 08:45 PM',
  },
]

const trackOptions = [
  'All Tracks',
  'AI & Machine Learning',
  'Web & App Development',
  'Cybersecurity',
  'HealthTech',
  'Sustainability',
  'Open Innovation',
]

const statusOptions = ['All Statuses', 'Confirmed', 'Pending', 'Cancelled']

type ActiveTab = 'dashboard' | 'registrations' | 'analytics' | 'event'

export default function OrganizerDashboardPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')
  const [participants, setParticipants] = useState<Participant[]>(initialMockParticipants)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTrack, setSelectedTrack] = useState('All Tracks')
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')
  const [sortField, setSortField] = useState<'name' | 'id' | 'date'>('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7
  const [copiedId, setCopiedId] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Load live registrations from MongoDB Atlas & merge with local/demo state
  useEffect(() => {
    async function fetchLiveRegistrations() {
      try {
        const response = await api.getAllRegistrations()
        if (response.success && Array.isArray(response.registrations) && response.registrations.length > 0) {
          const liveMapped: Participant[] = response.registrations.map((item: any) => ({
            id: item.registrationId,
            name: item.fullName,
            email: item.email,
            phone: item.phone,
            college: item.college,
            team: item.teamName,
            size: item.teamSize,
            role: item.role,
            track: item.track,
            status: item.status === 'registered' ? 'Confirmed' : item.status,
            date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Live',
          }))

          setParticipants((prev) => {
            const ids = new Set(liveMapped.map((p) => p.id))
            const remaining = prev.filter((p) => !ids.has(p.id))
            return [...liveMapped, ...remaining]
          })
        }
      } catch (err) {
        console.log('Live backend fetch fallback notice (using local/demo cache)')
      }

      // Also merge any cached registrations
      try {
        const stored = JSON.parse(localStorage.getItem('hackfest_demo_registrations') || '[]')
        if (Array.isArray(stored) && stored.length > 0) {
          const mapped: Participant[] = stored.map((item: any, i: number) => ({
            id: item.registrationId || `HF26-00${200 + i}`,
            name: item.name || 'Anonymous Builder',
            email: item.email || 'user@example.com',
            phone: item.phone || '+91 98765 00000',
            college: item.college || 'Gauhati University',
            team: item.team || 'Alpha Team',
            size: parseInt(item.size, 10) || 3,
            role: item.role || 'Developer',
            track: item.track || 'AI & Machine Learning',
            status: 'Confirmed',
            date: 'Just now',
          }))

          setParticipants((prev) => {
            const ids = new Set(prev.map((p) => p.id))
            const newEntries = mapped.filter((p) => !ids.has(p.id))
            return [...newEntries, ...prev]
          })
        }
      } catch (e) {
        console.error('Error loading local registrations', e)
      }
    }

    fetchLiveRegistrations()
  }, [])

  // Filter and sort participants
  const filteredParticipants = useMemo(() => {
    return participants
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.college.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesTrack = selectedTrack === 'All Tracks' || p.track === selectedTrack
        const matchesStatus = selectedStatus === 'All Statuses' || p.status === selectedStatus

        return matchesSearch && matchesTrack && matchesStatus
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        }
        if (sortField === 'id') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
        }
        return 0
      })
  }, [participants, searchQuery, selectedTrack, selectedStatus, sortField, sortOrder])

  // Pagination calculations
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage) || 1
  const paginatedParticipants = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredParticipants.slice(start, start + itemsPerPage)
  }, [filteredParticipants, currentPage, itemsPerPage])

  // Handle Sort Toggle
  const toggleSort = (field: 'name' | 'id') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  // Handle status update
  const handleUpdateStatus = (id: string, newStatus: 'Confirmed' | 'Pending' | 'Cancelled') => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    )
    if (selectedParticipant && selectedParticipant.id === id) {
      setSelectedParticipant((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Registration ID',
      'Name',
      'Email',
      'Phone',
      'College',
      'Team',
      'Team Size',
      'Role',
      'Track',
      'Status',
      'Registration Date',
    ]

    const rows = filteredParticipants.map((p) => [
      `"${p.id}"`,
      `"${p.name}"`,
      `"${p.email}"`,
      `"${p.phone}"`,
      `"${p.college}"`,
      `"${p.team}"`,
      `"${p.size}"`,
      `"${p.role}"`,
      `"${p.track}"`,
      `"${p.status}"`,
      `"${p.date}"`,
    ])

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `hackfest-2026-participants-${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopiedId(true)
    setTimeout(() => setCopiedId(false), 2000)
  }

  // Track distribution metrics
  const trackCounts = useMemo(() => {
    const counts: Record<string, number> = {
      'AI & Machine Learning': 0,
      'Web & App Development': 0,
      'Cybersecurity': 0,
      'HealthTech': 0,
      'Sustainability': 0,
      'Open Innovation': 0,
    }
    participants.forEach((p) => {
      if (counts[p.track] !== undefined) counts[p.track]++
    })
    return counts
  }, [participants])

  // Team size distribution
  const teamSizeCounts = useMemo(() => {
    const counts: Record<number, number> = { 2: 0, 3: 0, 4: 0 }
    participants.forEach((p) => {
      if (counts[p.size] !== undefined) counts[p.size]++
    })
    return counts
  }, [participants])

  return (
    <PageTransition>
      <div className="organizer-portal-layout">
        {/* SIDEBAR NAVIGATION */}
        <aside className={`organizer-sidebar ${sidebarOpen ? 'sidebar-mobile-open' : ''}`}>
          <div className="sidebar-top">
            <Link href="/" className="sidebar-brand-link">
              <span className="sidebar-brand-name">HACKFEST</span>
              <span className="sidebar-brand-tag">ORGANIZER</span>
            </Link>
            <button
              className="sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close Sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <div className="sidebar-nav-section">
            <span className="sidebar-section-title">MANAGEMENT</span>
            <nav className="sidebar-nav-menu">
              <button
                className={`sidebar-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('dashboard')
                  setSidebarOpen(false)
                }}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>

              <button
                className={`sidebar-nav-btn ${activeTab === 'registrations' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('registrations')
                  setSidebarOpen(false)
                }}
              >
                <ClipboardList size={18} />
                <span>Registrations</span>
                <span className="sidebar-badge">{participants.length}</span>
              </button>

              <button
                className={`sidebar-nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('analytics')
                  setSidebarOpen(false)
                }}
              >
                <BarChart3 size={18} />
                <span>Analytics</span>
              </button>

              <button
                className={`sidebar-nav-btn ${activeTab === 'event' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('event')
                  setSidebarOpen(false)
                }}
              >
                <Calendar size={18} />
                <span>Event Overview</span>
              </button>
            </nav>
          </div>

          <div className="sidebar-bottom">
            <div className="admin-profile-box">
              <div className="admin-avatar">
                <span>OP</span>
              </div>
              <div className="admin-profile-info">
                <strong>Organizing Lead</strong>
                <span>IT Dept · GU</span>
              </div>
            </div>

            <div className="sidebar-footer-actions">
              <Link href="/" className="sidebar-footer-link">
                <ArrowUpRight size={14} />
                <span>Public Website</span>
              </Link>
              <Link href="/" className="sidebar-footer-link logout-btn">
                <LogOut size={14} />
                <span>Exit Demo</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* MAIN DASHBOARD AREA */}
        <main className="organizer-main-content">
          {/* Top Bar */}
          <header className="organizer-topbar">
            <div className="topbar-left">
              <button
                className="organizer-menu-toggle"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar menu"
              >
                <LayoutDashboard size={20} />
              </button>
              <div>
                <h1 className="topbar-page-title">
                  {activeTab === 'dashboard' && 'Organizer Overview'}
                  {activeTab === 'registrations' && 'Participant Management'}
                  {activeTab === 'analytics' && 'HackFest Analytics'}
                  {activeTab === 'event' && 'Event Logistics & Schedule'}
                </h1>
                <p className="topbar-subtitle">
                  Information Technology department, Gauhati University · 13–14 September 2026
                </p>
              </div>
            </div>

            <div className="topbar-right">
              <span className="demo-live-pill">
                <span className="live-pulse-dot" />
                Frontend Demo Portal
              </span>
              <button
                onClick={handleExportCSV}
                className="button button-primary button-sm export-btn"
                title="Download Participant Data as CSV"
              >
                <Download size={15} />
                <span>Export CSV</span>
              </button>
            </div>
          </header>

          <div className="dashboard-scroll-body">
            {/* KPI SUMMARY CARDS */}
            <section className="kpi-cards-grid">
              <div className="kpi-card glass-card">
                <div className="kpi-card-top">
                  <span className="kpi-label">TOTAL REGISTRATIONS</span>
                  <div className="kpi-icon-circle icon-cyan">
                    <Users size={18} />
                  </div>
                </div>
                <div className="kpi-value-row">
                  <strong className="kpi-number">1,248</strong>
                  <span className="kpi-sub-tag text-cyan">+12% vs last week</span>
                </div>
                <span className="kpi-footer-note">36 hrs sprint cohort</span>
              </div>

              <div className="kpi-card glass-card">
                <div className="kpi-card-top">
                  <span className="kpi-label">TOTAL TEAMS</span>
                  <div className="kpi-icon-circle icon-violet">
                    <UsersRound size={18} />
                  </div>
                </div>
                <div className="kpi-value-row">
                  <strong className="kpi-number">312</strong>
                  <span className="kpi-sub-tag text-violet">Avg 3.2 members</span>
                </div>
                <span className="kpi-footer-note">2–4 members per team</span>
              </div>

              <div className="kpi-card glass-card">
                <div className="kpi-card-top">
                  <span className="kpi-label">CONFIRMED</span>
                  <div className="kpi-icon-circle icon-green">
                    <CheckCircle2 size={18} />
                  </div>
                </div>
                <div className="kpi-value-row">
                  <strong className="kpi-number">1,180</strong>
                  <span className="kpi-sub-tag text-green">94.5% rate</span>
                </div>
                <span className="kpi-footer-note">Checked in & approved</span>
              </div>

              <div className="kpi-card glass-card">
                <div className="kpi-card-top">
                  <span className="kpi-label">PENDING REVIEW</span>
                  <div className="kpi-icon-circle icon-amber">
                    <Clock size={18} />
                  </div>
                </div>
                <div className="kpi-value-row">
                  <strong className="kpi-number">68</strong>
                  <span className="kpi-sub-tag text-amber">Review queue</span>
                </div>
                <span className="kpi-footer-note">Pending team confirmation</span>
              </div>
            </section>

            {/* TAB 1: DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
              <div className="dashboard-content-stack">
                {/* Analytics Quick Snapshot */}
                <div className="dashboard-split-grid">
                  {/* Track distribution bars */}
                  <div className="glass-card panel-card">
                    <div className="panel-header">
                      <div>
                        <h3 className="panel-title">Track Popularity</h3>
                        <p className="panel-subtitle">Distribution across 6 challenge domains</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('analytics')}
                        className="panel-view-all"
                      >
                        View Details
                      </button>
                    </div>

                    <div className="track-bar-metrics-list">
                      {Object.entries(trackCounts).map(([trackName, count]) => {
                        const total = participants.length || 1
                        const percentage = Math.round((count / total) * 100)
                        return (
                          <div key={trackName} className="track-metric-row">
                            <div className="track-metric-info">
                              <span className="metric-track-name">{trackName}</span>
                              <span className="metric-track-count">
                                <strong>{count * 48}</strong> hackers ({percentage}%)
                              </span>
                            </div>
                            <div className="progress-track-bg">
                              <div
                                className="progress-track-fill"
                                style={{ width: `${Math.max(12, percentage)}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Team Size & Quick Stats */}
                  <div className="glass-card panel-card">
                    <div className="panel-header">
                      <div>
                        <h3 className="panel-title">Team Composition</h3>
                        <p className="panel-subtitle">Member distribution breakdown</p>
                      </div>
                      <span className="panel-badge-pill">Live Ratio</span>
                    </div>

                    <div className="team-composition-grid">
                      <div className="team-size-box">
                        <span className="size-number">4</span>
                        <span className="size-label">Members (52%)</span>
                        <p className="size-desc">Full 4-person quad squads</p>
                      </div>
                      <div className="team-size-box">
                        <span className="size-number">3</span>
                        <span className="size-label">Members (33%)</span>
                        <p className="size-desc">Triad builder groups</p>
                      </div>
                      <div className="team-size-box">
                        <span className="size-number">2</span>
                        <span className="size-label">Members (15%)</span>
                        <p className="size-desc">Duo pair teams</p>
                      </div>
                    </div>

                    <div className="venue-readiness-banner">
                      <div className="readiness-icon">
                        <Building2 size={20} className="accent-cyan" />
                      </div>
                      <div className="readiness-text">
                        <strong>Venue Capacity & Network Readiness</strong>
                        <p>
                          IT Dept, Gauhati University auditorium & labs prepared with gigabit Wi-Fi and
                          100+ power outlets.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Registrations Quick Table */}
                <div className="glass-card panel-card">
                  <div className="panel-header">
                    <div>
                      <h3 className="panel-title">Recent Registrations</h3>
                      <p className="panel-subtitle">Latest teams reserved for HackFest 2026</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('registrations')}
                      className="button button-secondary button-sm"
                    >
                      <span>Manage All ({participants.length})</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="responsive-table-container">
                    <table className="organizer-data-table">
                      <thead>
                        <tr>
                          <th>Registration ID</th>
                          <th>Participant Name</th>
                          <th>College / Org</th>
                          <th>Team Name</th>
                          <th>Track</th>
                          <th>Status</th>
                          <th className="text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participants.slice(0, 5).map((p) => (
                          <tr key={p.id}>
                            <td className="mono-cell">{p.id}</td>
                            <td>
                              <div className="participant-name-cell">
                                <strong>{p.name}</strong>
                                <span className="email-sub">{p.email}</span>
                              </div>
                            </td>
                            <td>{p.college}</td>
                            <td>
                              <span className="team-pill">{p.team}</span>
                            </td>
                            <td>
                              <span className="track-chip-tag">{p.track}</span>
                            </td>
                            <td>
                              <span className={`status-badge status-${p.status.toLowerCase()}`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="text-right">
                              <button
                                onClick={() => setSelectedParticipant(p)}
                                className="button-table-action"
                                title="View details"
                              >
                                <Eye size={14} />
                                <span>Inspect</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FULL REGISTRATIONS TABLE */}
            {(activeTab === 'registrations' || activeTab === 'dashboard') && activeTab === 'registrations' && (
              <div className="glass-card table-management-panel">
                {/* Search & Filter Toolbar */}
                <div className="table-toolbar">
                  <div className="search-input-wrapper">
                    <Search size={16} className="search-icon" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                      }}
                      placeholder="Search by ID, name, email, team, college..."
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="clear-search-btn"
                        aria-label="Clear search"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  <div className="filter-controls-group">
                    {/* Track Filter */}
                    <div className="select-wrapper">
                      <select
                        value={selectedTrack}
                        onChange={(e) => {
                          setSelectedTrack(e.target.value)
                          setCurrentPage(1)
                        }}
                      >
                        {trackOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div className="select-wrapper">
                      <select
                        value={selectedStatus}
                        onChange={(e) => {
                          setSelectedStatus(e.target.value)
                          setCurrentPage(1)
                        }}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Table Data */}
                <div className="responsive-table-container">
                  <table className="organizer-data-table">
                    <thead>
                      <tr>
                        <th onClick={() => toggleSort('id')} className="cursor-pointer">
                          <div className="th-flex">
                            <span>Registration ID</span>
                            <ArrowUpDown size={13} />
                          </div>
                        </th>
                        <th onClick={() => toggleSort('name')} className="cursor-pointer">
                          <div className="th-flex">
                            <span>Name & Email</span>
                            <ArrowUpDown size={13} />
                          </div>
                        </th>
                        <th>College / Institution</th>
                        <th>Team Name</th>
                        <th>Size</th>
                        <th>Role</th>
                        <th>Track</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedParticipants.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="table-empty-row">
                            <div className="empty-table-state">
                              <Search size={32} className="accent-violet" />
                              <h4>No participants match your criteria</h4>
                              <p>Try clearing filters or search terms</p>
                              <button
                                onClick={() => {
                                  setSearchQuery('')
                                  setSelectedTrack('All Tracks')
                                  setSelectedStatus('All Statuses')
                                }}
                                className="button button-secondary button-sm"
                              >
                                Reset Filters
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        paginatedParticipants.map((p) => (
                          <tr key={p.id}>
                            <td className="mono-cell">{p.id}</td>
                            <td>
                              <div className="participant-name-cell">
                                <strong>{p.name}</strong>
                                <span className="email-sub">{p.email}</span>
                              </div>
                            </td>
                            <td>
                              <span className="college-text">{p.college}</span>
                            </td>
                            <td>
                              <span className="team-pill">{p.team}</span>
                            </td>
                            <td>
                              <span className="size-badge">{p.size}</span>
                            </td>
                            <td>
                              <span className="role-text">{p.role}</span>
                            </td>
                            <td>
                              <span className="track-chip-tag">{p.track}</span>
                            </td>
                            <td>
                              <span className={`status-badge status-${p.status.toLowerCase()}`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="text-right">
                              <button
                                onClick={() => setSelectedParticipant(p)}
                                className="button-table-action"
                                title="Inspect participant details"
                              >
                                <Eye size={14} />
                                <span>Inspect</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Pagination */}
                <div className="table-pagination-footer">
                  <span className="pagination-summary">
                    Showing <strong>{filteredParticipants.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</strong> to{' '}
                    <strong>{Math.min(currentPage * itemsPerPage, filteredParticipants.length)}</strong> of{' '}
                    <strong>{filteredParticipants.length}</strong> participants
                  </span>

                  <div className="pagination-buttons">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="pagination-nav-btn"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={16} />
                      <span>Prev</span>
                    </button>

                    <div className="page-numbers-list">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          onClick={() => setCurrentPage(num)}
                          className={`page-num-btn ${currentPage === num ? 'active' : ''}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="pagination-nav-btn"
                      aria-label="Next page"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ANALYTICS VIEW */}
            {activeTab === 'analytics' && (
              <div className="analytics-view-stack">
                <div className="analytics-grid-two">
                  {/* Track popularity breakdown */}
                  <div className="glass-card panel-card">
                    <div className="panel-header">
                      <div>
                        <h3 className="panel-title">Track Popularity & Capacity</h3>
                        <p className="panel-subtitle">Total allocations across all 6 challenge tracks</p>
                      </div>
                      <Sparkles size={18} className="accent-cyan" />
                    </div>

                    <div className="track-analytics-bars">
                      {Object.entries(trackCounts).map(([trackName, count]) => {
                        const total = participants.length || 1
                        const percentage = Math.round((count / total) * 100)
                        return (
                          <div key={trackName} className="track-analytics-row">
                            <div className="analytics-row-header">
                              <strong>{trackName}</strong>
                              <span>{count * 48} Hackers ({percentage}%)</span>
                            </div>
                            <div className="progress-bar-container">
                              <div
                                className="progress-bar-cyan"
                                style={{ width: `${Math.max(10, percentage)}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Team Size Breakdown */}
                  <div className="glass-card panel-card">
                    <div className="panel-header">
                      <div>
                        <h3 className="panel-title">Team Size Distribution</h3>
                        <p className="panel-subtitle">Proportion of squads by participant count</p>
                      </div>
                      <Users size={18} className="accent-violet" />
                    </div>

                    <div className="team-size-analytics-list">
                      <div className="team-size-analytics-item">
                        <div className="item-left">
                          <span className="size-badge-big">4</span>
                          <div>
                            <strong>4-Member Teams (52%)</strong>
                            <p>Full cross-functional teams (Dev + Design + AI + Pitch)</p>
                          </div>
                        </div>
                        <span className="count-stat">162 Teams</span>
                      </div>

                      <div className="team-size-analytics-item">
                        <div className="item-left">
                          <span className="size-badge-big">3</span>
                          <div>
                            <strong>3-Member Teams (33%)</strong>
                            <p>Standard engineering trio cohorts</p>
                          </div>
                        </div>
                        <span className="count-stat">103 Teams</span>
                      </div>

                      <div className="team-size-analytics-item">
                        <div className="item-left">
                          <span className="size-badge-big">2</span>
                          <div>
                            <strong>2-Member Teams (15%)</strong>
                            <p>Pair-programming agile builders</p>
                          </div>
                        </div>
                        <span className="count-stat">47 Teams</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* College Representation Snapshot */}
                <div className="glass-card panel-card">
                  <div className="panel-header">
                    <div>
                      <h3 className="panel-title">Top Represented Institutions</h3>
                      <p className="panel-subtitle">Regional participation footprint across Assam & Northeast</p>
                    </div>
                    <Building2 size={18} className="accent-blue" />
                  </div>

                  <div className="institutions-chips-grid">
                    {[
                      { name: 'Gauhati University', count: '412 Hackers', tag: 'Host Campus' },
                      { name: 'Assam Engineering College (AEC)', count: '235 Hackers', tag: 'Guwahati' },
                      { name: 'Cotton University', count: '184 Hackers', tag: 'Guwahati' },
                      { name: 'IIT Guwahati', count: '142 Hackers', tag: 'Amingaon' },
                      { name: 'Tezpur University', count: '118 Hackers', tag: 'Tezpur' },
                      { name: 'NIT Silchar', count: '89 Hackers', tag: 'Silchar' },
                      { name: 'Royal Global University', count: '76 Hackers', tag: 'Guwahati' },
                      { name: 'Other National & Online Cohorts', count: '220+ Hackers', tag: 'Hybrid' },
                    ].map((inst) => (
                      <div key={inst.name} className="institution-card">
                        <div className="inst-top">
                          <strong>{inst.name}</strong>
                          <span className="inst-tag">{inst.tag}</span>
                        </div>
                        <span className="inst-count">{inst.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: EVENT LOGISTICS OVERVIEW */}
            {activeTab === 'event' && (
              <div className="event-overview-stack">
                <div className="event-logistics-grid">
                  <div className="glass-card panel-card">
                    <div className="panel-header">
                      <div>
                        <h3 className="panel-title">Venue & Operational Hub</h3>
                        <p className="panel-subtitle">Physical operations center</p>
                      </div>
                      <MapPin size={18} className="accent-cyan" />
                    </div>

                    <div className="venue-meta-details">
                      <div className="venue-meta-row">
                        <span className="venue-field">Department</span>
                        <strong>Information Technology department</strong>
                      </div>
                      <div className="venue-meta-row">
                        <span className="venue-field">University</span>
                        <strong>Gauhati University</strong>
                      </div>
                      <div className="venue-meta-row">
                        <span className="venue-field">Campus Location</span>
                        <span>Jalukbari, Guwahati, Assam 781014, India</span>
                      </div>
                      <div className="venue-meta-row">
                        <span className="venue-field">Dates</span>
                        <strong className="accent-cyan">13–14 September 2026 (Sunday – Monday)</strong>
                      </div>
                      <div className="venue-meta-row">
                        <span className="venue-field">Check-in Kickoff</span>
                        <span>09:00 AM IST (13 September 2026)</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card panel-card">
                    <div className="panel-header">
                      <div>
                        <h3 className="panel-title">Critical Sprint Milestones</h3>
                        <p className="panel-subtitle">Key event agenda timestamps</p>
                      </div>
                      <Clock size={18} className="accent-violet" />
                    </div>

                    <div className="agenda-timeline-mini">
                      <div className="agenda-mini-item">
                        <span className="mini-time">13 Sep · 09:00 AM</span>
                        <strong>Check-in & Swag Kit Handout</strong>
                      </div>
                      <div className="agenda-mini-item">
                        <span className="mini-time">13 Sep · 12:00 PM</span>
                        <strong className="accent-cyan">Hacking Officially Begins (24-Hour Timer)</strong>
                      </div>
                      <div className="agenda-mini-item">
                        <span className="mini-time">13 Sep · 04:00 PM</span>
                        <strong>Mentor Breakout Checkpoints</strong>
                      </div>
                      <div className="agenda-mini-item">
                        <span className="mini-time">14 Sep · 12:00 PM</span>
                        <strong className="accent-violet">Submission Code Freeze & Project Upload</strong>
                      </div>
                      <div className="agenda-mini-item">
                        <span className="mini-time">14 Sep · 05:00 PM</span>
                        <strong>Judging Results & Award Ceremony</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* PARTICIPANT DETAIL MODAL */}
        {selectedParticipant && (
          <div
            className="modal-overlay-backdrop"
            onClick={() => setSelectedParticipant(null)}
          >
            <div
              className="modal-card glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="modal-header-left">
                  <span className="eyebrow">PARTICIPANT PROFILE</span>
                  <h2 className="modal-title">{selectedParticipant.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedParticipant(null)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="modal-id-bar">
                <div>
                  <span className="modal-id-label">Registration ID</span>
                  <strong className="modal-id-code">{selectedParticipant.id}</strong>
                </div>
                <button
                  onClick={() => handleCopyId(selectedParticipant.id)}
                  className="button-copy-modal"
                >
                  {copiedId ? <Check size={14} className="accent-cyan" /> : <Copy size={14} />}
                  <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
                </button>
              </div>

              <div className="modal-details-grid">
                <div className="modal-detail-item">
                  <span className="detail-label">Email Address</span>
                  <a href={`mailto:${selectedParticipant.email}`} className="detail-val accent-link">
                    {selectedParticipant.email}
                  </a>
                </div>

                <div className="modal-detail-item">
                  <span className="detail-label">Phone Number</span>
                  <span className="detail-val">{selectedParticipant.phone}</span>
                </div>

                <div className="modal-detail-item">
                  <span className="detail-label">College / Organization</span>
                  <strong className="detail-val">{selectedParticipant.college}</strong>
                </div>

                <div className="modal-detail-item">
                  <span className="detail-label">Team Name</span>
                  <span className="detail-val">{selectedParticipant.team}</span>
                </div>

                <div className="modal-detail-item">
                  <span className="detail-label">Team Size</span>
                  <span className="detail-val">{selectedParticipant.size} Members</span>
                </div>

                <div className="modal-detail-item">
                  <span className="detail-label">Participation Role</span>
                  <span className="detail-val">{selectedParticipant.role}</span>
                </div>

                <div className="modal-detail-item">
                  <span className="detail-label">Preferred Track</span>
                  <span className="detail-val accent-cyan">{selectedParticipant.track}</span>
                </div>

                <div className="modal-detail-item">
                  <span className="detail-label">Registration Date</span>
                  <span className="detail-val">{selectedParticipant.date}</span>
                </div>
              </div>

              {/* Status Management Bar */}
              <div className="modal-status-mgmt">
                <span className="status-mgmt-label">Current Status:</span>
                <div className="status-toggle-btns">
                  <button
                    onClick={() => handleUpdateStatus(selectedParticipant.id, 'Confirmed')}
                    className={`status-btn-opt ${
                      selectedParticipant.status === 'Confirmed' ? 'active-confirmed' : ''
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    <span>Confirmed</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedParticipant.id, 'Pending')}
                    className={`status-btn-opt ${
                      selectedParticipant.status === 'Pending' ? 'active-pending' : ''
                    }`}
                  >
                    <Clock size={14} />
                    <span>Pending</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedParticipant.id, 'Cancelled')}
                    className={`status-btn-opt ${
                      selectedParticipant.status === 'Cancelled' ? 'active-cancelled' : ''
                    }`}
                  >
                    <XCircle size={14} />
                    <span>Cancelled</span>
                  </button>
                </div>
              </div>

              <div className="modal-footer">
                <span className="modal-demo-note">
                  * Changes are saved live to the organizer session state.
                </span>
                <button
                  onClick={() => setSelectedParticipant(null)}
                  className="button button-primary"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
