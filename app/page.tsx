'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  GitBranch,
  Globe2,
  HeartPulse,
  Camera,
  BriefcaseBusiness,
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Sprout,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'

const tracks = [
  { title: 'AI & Machine Learning', description: 'Build intelligent solutions using AI and ML.', icon: BrainCircuit, accent: 'cyan' },
  { title: 'Web & App Development', description: 'Create useful, scalable digital experiences.', icon: Globe2, accent: 'violet' },
  { title: 'Cybersecurity', description: 'Build solutions that make the digital world safer.', icon: ShieldCheck, accent: 'blue' },
  { title: 'HealthTech', description: 'Use technology to improve health and wellbeing.', icon: HeartPulse, accent: 'cyan' },
  { title: 'Sustainability', description: 'Create technology-driven solutions for a greener future.', icon: Sprout, accent: 'violet' },
  { title: 'Open Innovation', description: 'Build anything that solves a meaningful problem.', icon: Sparkles, accent: 'blue' },
]

const schedule = {
  build: [['09:00 AM', 'Registration & Check-in'], ['10:00 AM', 'Opening Ceremony'], ['11:00 AM', 'Challenge Reveal'], ['12:00 PM', 'Hacking Begins'], ['04:00 PM', 'Mentor Connect'], ['08:00 PM', 'Progress Check']],
  ship: [['09:00 AM', 'Final Sprint'], ['12:00 PM', 'Submission Deadline'], ['01:00 PM', 'Project Demos'], ['03:30 PM', 'Judging'], ['05:00 PM', 'Results & Closing Ceremony']],
}

const faqs = [
  ['Who can participate?', 'Students, developers, designers, and curious builders of all experience levels are welcome.'],
  ['How many members can be on a team?', 'Teams can include 2–4 members. You can also register solo and find teammates during kickoff.'],
  ['Is registration free?', 'Yes. HackFest is completely free for every participant.'],
  ['Do I need previous hackathon experience?', 'Not at all. Mentors and volunteers will help you turn your idea into a working prototype.'],
  ['Can I participate without a team?', 'Yes. Choose a team size and use the kickoff networking session to find collaborators.'],
  ['What technologies can I use?', 'Use any language, framework, API, or tool that helps you build your solution.'],
  ['What should we build?', 'Pick one of the six tracks or bring an open innovation idea that solves a meaningful problem.'],
  ['How will projects be judged?', 'Projects are evaluated on impact, creativity, technical execution, and demo quality.'],
]

function Button({ children, variant = 'primary', href = '#register', onClick }: { children: React.ReactNode; variant?: 'primary' | 'secondary'; href?: string; onClick?: () => void }) {
  return <a onClick={onClick} href={href} className={`button ${variant === 'secondary' ? 'button-secondary' : ''}`}>{children}<ArrowRight size={17} /></a>
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function Countdown() {
  const values = ['04', '12', '36', '08']
  return <div className="countdown"><span className="countdown-label">Registration closes in</span><div className="countdown-row">{values.map((value, i) => <div className="countdown-item" key={value}><strong>{value}</strong><span>{['Days', 'Hours', 'Minutes', 'Seconds'][i]}</span></div>)}</div></div>
}

function Navbar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const links = ['About', 'Tracks', 'Schedule', 'Prizes', 'FAQ', 'Contact']
  return <header className="navbar"><a href="#home" className="logo">HACKFEST <small>2D</small></a><nav className={open ? 'nav-open' : ''}>{links.map(link => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}<Button /></nav><button className="menu-button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></header>
}

function Registration({ onSuccess }: { onSuccess: (data: { name: string; team: string; track: string; id: string; email: string }) => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', college: '', team: '', size: '2', role: 'Developer', track: 'AI & Machine Learning', terms: false })
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')
  const update = (key: string, value: string | boolean) => setForm(current => ({ ...current, [key]: value }))
  function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.college || !form.team || !form.terms) return setError('Please complete every required field and accept the guidelines.')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid email address.')
    if (!/^\+?[0-9\s-]{10,}$/.test(form.phone)) return setError('Please enter a valid phone number.')
    setError(''); setState('loading')
    setTimeout(() => { setState('idle'); onSuccess({ name: form.name, team: form.team, track: form.track, id: 'HF26-00127', email: form.email }) }, 900)
  }
  return <form className="registration-form" onSubmit={submit}>
    <div className="form-grid"><label>Full Name<input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" /></label><label>Email Address<input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" /></label><label>Phone Number<input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91 98765 43210" /></label><label>College / Organization<input value={form.college} onChange={e => update('college', e.target.value)} placeholder="Where do you build?" /></label><label>Team Name<input value={form.team} onChange={e => update('team', e.target.value)} placeholder="Your team name" /></label><label>Team Size<select value={form.size} onChange={e => update('size', e.target.value)}><option>2</option><option>3</option><option>4</option></select></label><label>Participation Role<select value={form.role} onChange={e => update('role', e.target.value)}><option>Developer</option><option>Designer</option><option>AI/ML</option><option>Other</option></select></label><label>Preferred Track<select value={form.track} onChange={e => update('track', e.target.value)}>{tracks.map(track => <option key={track.title}>{track.title}</option>)}</select></label></div>
    <label className="check-row"><input type="checkbox" checked={form.terms} onChange={e => update('terms', e.target.checked)} /><span>I agree to the HackFest participation guidelines.</span></label>
    {error && <p className="form-error">{error}</p>}<button className="button submit-button" disabled={state === 'loading'}>{state === 'loading' ? 'Submitting…' : 'Complete Registration'}{state === 'loading' ? <span className="spinner" /> : <ArrowRight size={17} />}</button>
    <p className="form-note">Demo experience — registration will connect to a REST API in the next release.</p>
  </form>
}

export default function Page() {
  const [navOpen, setNavOpen] = useState(false)
  const [registered, setRegistered] = useState<{ name: string; team: string; track: string; id: string; email: string } | null>(null)
  const [statusEmail, setStatusEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'found' | 'missing'>('idle')
  const [activeDay, setActiveDay] = useState<'build' | 'ship'>('build')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [contactSent, setContactSent] = useState(false)
  const statusData = registered && statusEmail.toLowerCase() === registered.email.toLowerCase() ? registered : registered && status === 'found' ? registered : null
  const stats = useMemo(() => [['2 Days', 'Hackathon Duration'], ['2–4', 'Members / Team'], ['6', 'Challenge Tracks'], ['100+', 'Hackers']], [])
  return <main>
    <Navbar open={navOpen} setOpen={setNavOpen} />
    <section className="hero" id="home"><div className="hero-grid" /><div className="hero-copy"><span className="pill"><Zap size={14} /> 2-DAY HACKATHON · 16–17 OCT 2026</span><h1>BUILD.<br /><span>BREAK.</span><br />INNOVATE.</h1><p className="hero-title">HackFest <i>2026</i></p><p className="hero-subtitle">2 Days. One Idea. Endless Possibilities.</p><p className="hero-description">Bring your ideas to life, collaborate with fellow builders, and create solutions that matter in just two days.</p><div className="hero-actions"><Button /><Button variant="secondary" href="#about">Explore HackFest</Button></div></div><div className="hero-side"><div className="orbit-card"><span className="orbit-dot" /><span className="mono">IDEA → BUILD → DEMO</span><strong>Make it<br /><em>matter.</em></strong><small>GUWAHATI · HYBRID</small></div><Countdown /></div><div className="stats">{stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>
    <section className="section about-section" id="about"><SectionHeading eyebrow="01 / ABOUT HACKFEST" title="Two Days. Infinite Possibilities." copy="HackFest is a collaborative two-day hackathon designed to bring together curious minds, developers, designers, and problem-solvers. Turn an idea into a working prototype and present it to a panel of judges." /><div className="about-layout"><div className="about-cards">{[['BUILD', 'Turn an idea into a working prototype.', Code2], ['COLLABORATE', 'Work with teammates, mentors, and fellow builders.', Users], ['INNOVATE', 'Create technology-driven solutions to meaningful problems.', Sparkles]].map(([title, copy, Icon]) => <div className="value-card" key={title as string}><Icon size={21} /><h3>{title as string}</h3><p>{copy as string}</p></div>)}</div><div className="flow-card"><span className="eyebrow">THE HACKFEST LOOP</span><div className="flow-line">{['IDEA', 'BUILD', 'TEST', 'DEMO'].map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}</div><p>Start with a spark. Leave with something real.</p></div></div></section>
    <section className="section dark-section" id="why"><SectionHeading eyebrow="02 / WHY PARTICIPATE" title="Build your unfair advantage." /><div className="feature-grid">{[['Learn by Building', 'Gain practical experience by creating a real project.', Cpu], ['Meet Builders', 'Connect with students, developers and creators.', Users], ['Get Mentorship', 'Receive guidance and feedback from experienced mentors.', MessageCircle], ['Showcase Your Work', 'Present your project and compete for prizes.', Trophy]].map(([title, copy, Icon]) => <div className="feature-card" key={title as string}><Icon size={24} /><h3>{title as string}</h3><p>{copy as string}</p><ArrowRight size={17} /></div>)}</div></section>
    <section className="section" id="tracks"><SectionHeading eyebrow="03 / CHALLENGE TRACKS" title="Choose your challenge." copy="Six directions. One goal: build something that matters." /><div className="track-grid">{tracks.map(({ title, description, icon: Icon, accent }) => <div className={`track-card ${accent}`} key={title}><div className="track-icon"><Icon size={21} /></div><span className="track-number">0{tracks.findIndex(track => track.title === title) + 1}</span><h3>{title}</h3><p>{description}</p><a href="#register">Explore track <ArrowRight size={15} /></a></div>)}</div></section>
    <section className="section dark-section process-section"><SectionHeading eyebrow="04 / HOW IT WORKS" title="From blank page to big idea." /><div className="process-grid">{[['01', 'REGISTER', 'Sign up for HackFest.'], ['02', 'BUILD YOUR TEAM', 'Form a team of 2–4 members.'], ['03', 'HACK FOR 2 DAYS', 'Design, develop, test and improve.'], ['04', 'DEMO & WIN', 'Submit your project and present.']].map(([num, title, copy]) => <div className="process-step" key={num}><span>{num}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></section>
    <section className="section schedule-section" id="schedule"><SectionHeading eyebrow="05 / THE AGENDA" title="A weekend worth remembering." /><div className="schedule-tabs"><button className={activeDay === 'build' ? 'active' : ''} onClick={() => setActiveDay('build')}>DAY 1 <small>BUILD</small></button><button className={activeDay === 'ship' ? 'active' : ''} onClick={() => setActiveDay('ship')}>DAY 2 <small>SHIP</small></button></div><div className="schedule-list">{schedule[activeDay].map(([time, event]) => <div className="schedule-item" key={time + event}><time>{time}</time><span /><strong>{event}</strong></div>)}</div></section>
    <section className="section prizes-section" id="prizes"><SectionHeading eyebrow="06 / PRIZES" title="Good ideas deserve a spotlight." /><div className="prize-grid">{[['01', 'GRAND PRIZE', '₹50,000'], ['02', 'RUNNER UP', '₹25,000'], ['03', 'SECOND RUNNER UP', '₹15,000']].map(([num, title, amount], i) => <div className={`prize-card prize-${i}`} key={title}><span>{num}</span><Trophy size={22} /><h3>{title}</h3><strong>{amount}</strong></div>)}</div><div className="special-awards"><span>Special awards</span>{['Best UI/UX', 'Best AI Solution', 'Best Social Impact', 'Best Beginner Team'].map(item => <b key={item}>{item}</b>)}</div><p className="disclaimer">Prize details are fictional and subject to final event confirmation.</p></section>
    <section className="section register-section" id="register"><div className="register-intro"><span className="eyebrow">07 / YOUR TURN</span><h2>Ready to build something awesome?</h2><p>Bring the curiosity. We’ll bring the canvas.</p></div><div className="register-panel">{registered ? <div className="success-card"><div className="success-icon"><Check /></div><span className="eyebrow">REGISTRATION CONFIRMED</span><h2>You&apos;re registered!</h2><p>Welcome to HackFest 2026, {registered.name}.</p><div className="confirmation-grid"><span>Participant<strong>{registered.name}</strong></span><span>Team<strong>{registered.team}</strong></span><span>Track<strong>{registered.track}</strong></span><span>Registration ID<strong>{registered.id}</strong></span><span>Event date<strong>16–17 Oct 2026</strong></span></div><Button href="#status">Check Registration Status</Button></div> : <Registration onSuccess={setRegistered} />}</div></section>
    <section className="section status-section" id="status"><div className="status-copy"><span className="eyebrow">08 / STATUS CHECKER</span><h2>Check your registration.</h2><p>Already registered? Check your HackFest registration details using your email.</p></div><div className="status-panel"><div className="status-input"><input type="email" value={statusEmail} onChange={e => { setStatusEmail(e.target.value); setStatus('idle') }} placeholder="Email address" /><button onClick={() => setStatus(statusEmail && registered && statusEmail.toLowerCase() === registered.email.toLowerCase() ? 'found' : 'missing')}>Check Status <ArrowRight size={16} /></button></div>{status === 'found' && statusData && <div className="status-result found"><Check size={18} /><strong>Registration confirmed</strong><p>{statusData.name} · {statusData.team} · {statusData.id}</p></div>}{status === 'missing' && <div className="status-result missing"><X size={18} /><strong>Registration not found</strong><p>We couldn&apos;t find a registration associated with this email.</p></div>}</div></section>
    <section className="section faq-section" id="faq"><SectionHeading eyebrow="09 / FAQ" title="Questions, answered." /><div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${openFaq === i ? 'is-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{question}</span><ChevronDown size={18} /></button>{openFaq === i && <p>{answer}</p>}</div>)}</div></section>
    <section className="section contact-section" id="contact"><div><SectionHeading eyebrow="10 / SAY HELLO" title="Have questions? Let&apos;s talk." /><div className="contact-details"><p><strong>Email</strong><a href="mailto:hello@hackfest-demo.dev">hello@hackfest-demo.dev</a></p><p><strong>Location</strong><span><MapPin size={15} /> Innovation Hub, Guwahati</span></p></div></div><form className="contact-form" onSubmit={e => { e.preventDefault(); setContactSent(true) }}>{contactSent ? <div className="contact-success"><Check size={22} /><h3>Message sent.</h3><p>We&apos;ll get back to you soon.</p></div> : <><input required placeholder="Name" /><input required type="email" placeholder="Email" /><textarea required placeholder="Message" rows={4} /><button className="button">Send Message <ArrowRight size={17} /></button></>}</form></section>
    <footer><div className="footer-top"><div><a href="#home" className="logo">HACKFEST <small>2026</small></a><p>2 Days. One Idea. Endless Possibilities.</p></div><div className="footer-links">{['Home', 'About', 'Tracks', 'Schedule', 'Prizes', 'FAQ', 'Contact'].map(link => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}</div><div className="socials"><a href="#contact" aria-label="GitHub"><GitBranch size={18} /></a><a href="#contact" aria-label="LinkedIn"><BriefcaseBusiness size={18} /></a><a href="#contact" aria-label="Instagram"><Camera size={18} /></a><a href="#contact" aria-label="X"><X size={18} /></a></div></div><div className="footer-bottom"><span>© 2026 HackFest. Demo project created for educational purposes.</span><span>GUWAHATI · INDIA</span></div></footer>
  </main>
}
