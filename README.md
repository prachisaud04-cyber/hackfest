# ⚡ HackFest 2026 — Premier National Level 36-Hour Hackathon Platform

![HackFest 2026 Banner](https://img.shields.io/badge/HackFest-2026-00f0ff?style=for-the-badge&logo=codeforces&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

A full-stack, enterprise-grade event registration and management platform built for **HackFest 2026** — India's premier 36-hour national hackathon hosted on **16–17 October 2026**.

Featuring an electric dark navy & cyan cyberpunk aesthetic, animated particle networks, interactive digital ticket generation, 3D holographic badge inspector, real-time MongoDB Atlas persistence, and a comprehensive organizer management portal.

---

## 🌟 Key Features

### 🖥️ Frontend (12 Interactive Routes)
- **Home (`/`)**: Hero section with live countdown timer, prize pool showcase, key stats, animated track highlights, and schedule preview.
- **About (`/about`)**: HackFest mission, impact metrics, organizing committee, and event vision.
- **Tracks (`/tracks`)**: 4 challenge domains (AI & Intelligent Systems, Web3 & Decentralized Tech, ClimateTech & Smart Cities, Open Innovation) with problem statements, criteria, and tech stacks.
- **Schedule (`/schedule`)**: Interactive 3-day timeline with **1-click Google Calendar sync** and `.ics` file download.
- **Rules & Regulations (`/rules`)**: Real hackathon rulebook with searchable rule categories and interactive "I Agree" hacker badge issuance.
- **Mentors & Judges (`/mentors`)**: Industry leaders and domain experts with social links, bios, and company badges.
- **Prizes (`/prizes`)**: Grand prize pool breakdown (₹5,00,000+), track-specific awards, category bounties, and sponsor perks.
- **Register (`/register`)**: 
  - Dynamic multi-step registration form with client-side & server-side validation.
  - Verification with custom `checked.gif` success animation.
  - **Hacker Pass Generation**: Dynamic digital ticket with registration ID, team details, QR/barcode, and quick download/print.
  - **3D Holographic Hacker Badge**: Interactive rotating 3D badge modal with holographic sheen.
- **Status Checker (`/status`)**: Real-time status lookup by email address (with auto-fill query param support: `?email=...`).
- **FAQ (`/faq`)**: Categorized accordion with live search and quick answers.
- **Contact (`/contact`)**: Help desk inquiries, emergency contacts, venue directions, and interactive form.
- **Organizer Dashboard (`/organizer`)**: 
  - Real-time KPI summary cards (Total Teams, Total Hackers, Tracks, Confirmed).
  - Searchable, filterable (by Track & Status), and sortable participant table.
  - Participant detail modal.
  - **1-Click CSV Export** for offline reporting.

### ⚙️ Backend (Node.js + Express + MongoDB Atlas)
- **Database Persistence**: Powered by MongoDB Atlas via Mongoose schemas.
- **Sequential Registration IDs**: Automatically generated in sequence (`HF26-00001`, `HF26-00002`, ...).
- **Duplicate Prevention**: Rejects duplicate email submissions with clean HTTP 409 Conflict responses.
- **CORS Configured**: Secure cross-origin resource sharing between Next.js frontend and Express API.
- **RESTful Endpoints**: Clean JSON APIs for registration, status lookup, and organizer querying.

---

## 📁 Project Structure

```text
hackfest/
├── app/                          # Next.js 16 App Router (12 Pages)
│   ├── about/page.tsx            # About HackFest
│   ├── contact/page.tsx          # Contact & Support
│   ├── faq/page.tsx              # FAQ & Search
│   ├── mentors/page.tsx          # Mentors & Judges
│   ├── organizer/page.tsx        # Organizer Dashboard & CSV Export
│   ├── prizes/page.tsx           # Prize Pool & Bounties
│   ├── register/page.tsx         # Registration & Hacker Ticket Card
│   ├── rules/page.tsx            # Rules & Agreement Card
│   ├── schedule/page.tsx         # Schedule & Calendar Export (.ics)
│   ├── status/page.tsx           # Live Registration Status Checker
│   ├── tracks/page.tsx           # Challenge Tracks
│   ├── layout.tsx                # Root layout with Toast & Scroll-to-Top
│   ├── globals.css               # Global Tailwind CSS styles & animations
│   └── page.tsx                  # Landing / Home Page
├── backend/                      # Standalone Node.js + Express API
│   ├── controllers/
│   │   └── registrationController.js  # Business logic & MongoDB operations
│   ├── models/
│   │   └── Registration.js            # Mongoose Registration Schema
│   ├── routes/
│   │   └── registrationRoutes.js      # Express API route declarations
│   ├── .env.example              # Sample backend environment configuration
│   ├── .gitignore                # Protects secrets from version control
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server & MongoDB connection
├── components/                   # Reusable UI & Feature Components
│   ├── animated-network.tsx      # Cyberpunk canvas particle network
│   ├── footer.tsx                # Global footer with quick links
│   ├── hacker-badge-modal.tsx    # 3D interactive holographic badge modal
│   ├── hacker-ticket-card.tsx    # Digital Hacker Pass ticket component
│   ├── navbar.tsx                # Responsive navigation bar with active route indicators
│   ├── page-transition.tsx       # Smooth page mount transitions
│   ├── scroll-to-top.tsx         # Floating scroll-to-top button
│   ├── section-heading.tsx       # Uniform section headers
│   ├── toast.tsx                 # Toast notification provider
│   └── ui/                       # UI primitives (buttons, inputs, cards, dialogs)
├── lib/
│   ├── api.ts                    # Typed API client with live backend connection
│   └── utils.ts                  # ClassName helper utilities
├── public/                       # Static assets (animations, icons, logos)
│   └── animations/checked.gif    # Registration success GIF
├── package.json                  # Root Next.js dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── README.md                     # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** >= 18.x installed ([Download Node.js](https://nodejs.org))
- **MongoDB Atlas** database cluster ([Create Free Cluster](https://www.mongodb.com/cloud/atlas))

---

### 2. Backend Setup

1. Open a terminal and navigate to the `backend/` folder:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` configuration:
   - Copy `.env.example` to `.env`:
     ```bash
     copy .env.example .env
     ```
   - Open `backend/.env` and paste your MongoDB Atlas connection string:
     ```env
     PORT=5000
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/hackfest?retryWrites=true&w=majority
     ```

4. Start the backend server:
   ```bash
   npm start
   ```
   > Server will start on `http://localhost:5000` and display: `✅ MongoDB connected successfully`.

---

### 3. Frontend Setup

1. In a new terminal window, navigate to the project root:
   ```bash
   cd hackfest
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables:
   - By default, the frontend connects to the deployed backend (`https://backend-4mj7yx965-prachisaud04-cybers-projects.vercel.app`).
   - To connect to a local backend, create `.env.local` and set:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:5000/api
     ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 📡 Backend API Reference

Base URL (Deployed): `https://backend-4mj7yx965-prachisaud04-cybers-projects.vercel.app/api`
Base URL (Local Dev): `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body / Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server & DB health status | None |
| `GET` | `/events` | Event metadata & track stats | None |
| `POST` | `/registrations` | Register team / participant | `{ fullName, email, phone, college, teamName, teamSize, role, track }` |
| `GET` | `/registrations/:email` | Lookup registration by email | URL Param: `:email` |
| `GET` | `/admin/registrations` | Organizer: Fetch all registrations | None |

---

## 🔒 Security Best Practices

- **Zero Hardcoded Secrets**: All database credentials and connection URIs are loaded strictly through environment variables.
- **Git Protection**: `.env` and `.env.local` files are ignored in both root and backend `.gitignore` rules.
- **Input Sanitization & Validation**: Email regex formatting, team size boundaries (2–4), and field trimming enforced on both frontend and backend.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database & ODM**: [MongoDB Atlas](https://www.mongodb.com/atlas) & [Mongoose](https://mongoosejs.com/)
- **Animations**: CSS Keyframes & Canvas Particle Network

---

## 👥 HackFest 2026 Organizing Committee

Built with 💙 for developers, creators, and innovators.

*Know the rules. Build boldly. Ship responsibly.*
