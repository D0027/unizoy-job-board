<div align="center">

# 🏢 Unizoy Careers
### *A Premium Full-Stack Job Board Platform*

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Express](https://img.shields.io/badge/Express-5.2.1-grey?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9.2-green?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS_4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Render](https://img.shields.io/badge/Backend-Render-46e3b7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

**A clean, modern, production-ready job board built for Unizoy — featuring a public careers page, a candidate application flow, and a secure admin dashboard to post, manage, and review applicants.**

[🌐 Live Demo](https://unizoy-job-board-b8qs.vercel.app/) · [📋 Admin Portal](#admin-portal) · [🚀 Quick Start](#-quick-start)

</div>

---

## ✨ What is Unizoy Careers?

**Unizoy Careers** is a full-stack job board platform with a warm, premium aesthetic. It lets the Unizoy team post open roles and receive candidate applications — all managed through a built-in password-protected admin dashboard, with no third-party CMS or ATS needed.

The frontend is a beautiful **Next.js 16** app styled with **Tailwind CSS v4**, featuring a warm sand (`#fdf7f2`) color palette, organic gradient backgrounds, and smooth rounded card layouts. The backend is a lightweight **Express + MongoDB** REST API deployed on Render.

---

## 🖼️ Pages at a Glance

### 🌐 Public Careers Page (`/`)
- Animated **"Join our growing team"** hero badge with Sparkles icon
- Large serif headline: *"Build the future with Unizoy"*
- Live job listings fetched from the API, with:
  - Job title, description, location
  - **Employment Type** badge (Full-Time / Part-Time / Contract / Internship)
  - **Work Mode** badge (Remote / Hybrid / On-site)
  - Posted date
- **Live search bar** — filter jobs by title or location in real time
- "Apply Now" button per listing → routes to `/apply/[id]`
- Warm sand background with fixed SVG corner decorations and radial gradients
- Professional footer with Privacy Policy, Terms of Service, Cookie Settings

### 📝 Apply Page (`/apply/[id]`)
- Per-job dynamic application form
- Collects: Candidate Name, Email, Resume Link, LinkedIn Profile, Cover Letter
- Submits to `POST /api/apply` → stored in MongoDB

### 🔐 Admin Portal (`/admin`)
- **Passcode-protected login screen** (key: `unizoy123`)
- Sidebar navigation with three tabs:

| Tab | What it does |
|-----|-------------|
| **Post a Job** | Create a new listing with title, description, location, work mode, and employment type |
| **Manage Jobs** | View all live jobs — edit or delete any listing instantly |
| **View Candidates** | Browse all applications with candidate name, email, cover letter, LinkedIn link, resume link, and applied date |

---

## 🗂️ Project Structure

```
unizoy-job-board/
│
├── backend/                        # Node.js + Express REST API
│   ├── models/
│   │   ├── Job.js                  # Mongoose Job schema
│   │   └── Application.js          # Mongoose Application schema
│   ├── server.js                   # Express server + all API routes
│   └── package.json
│
└── frontend/                       # Next.js 16 App Router frontend
    ├── public/
    │   └── favicon.ico
    ├── src/
    │   └── app/
    │       ├── page.js             # Public careers homepage
    │       ├── layout.js           # Root layout (Geist fonts, metadata)
    │       ├── globals.css         # Tailwind + custom warm background
    │       ├── apply/
    │       │   └── [id]/
    │       │       └── page.js     # Dynamic job application form
    │       └── admin/
    │           └── page.js         # Password-protected admin dashboard
    ├── next.config.mjs
    ├── postcss.config.mjs          # Tailwind CSS v4 PostCSS plugin
    ├── eslint.config.mjs
    ├── jsconfig.json
    └── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | Next.js (App Router) | 16.1.6 |
| **UI Styling** | Tailwind CSS | v4 |
| **Icons** | Lucide React | 0.577.0 |
| **HTTP Client** | Axios | 1.13.6 |
| **Fonts** | Geist Sans + Geist Mono (Google Fonts) | — |
| **Backend Framework** | Express.js | 5.2.1 |
| **Database** | MongoDB + Mongoose | 9.2.4 |
| **Environment Vars** | dotenv | 17.3.1 |
| **CORS** | cors | 2.8.6 |
| **Backend Hosting** | Render | — |
| **Frontend Hosting** | Vercel (recommended) | — |

---

## 🗄️ Database Schemas

### Job Schema (`/backend/models/Job.js`)

```js
{
  title:          String  // required
  description:    String  // required
  location:       String  // required — e.g. "Remote, India"
  workMode:       String  // required — "Remote" | "Hybrid" | "On-site"  (default: "Remote")
  employmentType: String  // required — "Full-Time" | "Part-Time" | "Contract" | "Internship" (default: "Full-Time")
  createdAt:      Date    // auto — Date.now
}
```

### Application Schema (`/backend/models/Application.js`)

```js
{
  jobId:           ObjectId  // required — ref: 'Job' (populated on fetch)
  candidateName:   String    // required
  candidateEmail:  String    // required
  resumeLink:      String    // required — direct link to resume
  linkedInProfile: String    // optional — LinkedIn URL
  coverLetter:     String    // optional — free text
  appliedAt:       Date      // auto — Date.now
}
```

---

## 🌐 API Reference

Base URL (production): `https://unizoy-job-board.onrender.com`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/jobs` | Fetch all jobs (sorted newest first) | Public |
| `POST` | `/api/jobs` | Create a new job listing | Admin only |
| `PUT` | `/api/jobs/:id` | Update an existing job | Admin only |
| `DELETE` | `/api/jobs/:id` | Delete a job listing | Admin only |
| `POST` | `/api/apply` | Submit a job application | Public |
| `GET` | `/api/applications` | Fetch all applications (with job title populated) | Admin only |
| `GET` | `/` | Health check — "Unizoy Backend is running smoothly!" | Public |

### Example Payloads

**POST `/api/jobs`**
```json
{
  "title": "Senior Frontend Engineer",
  "description": "We're looking for a React expert...",
  "location": "Remote, India",
  "workMode": "Remote",
  "employmentType": "Full-Time"
}
```

**POST `/api/apply`**
```json
{
  "jobId": "664abc123def456",
  "candidateName": "Riya Patel",
  "candidateEmail": "riya@email.com",
  "resumeLink": "https://drive.google.com/...",
  "linkedInProfile": "https://linkedin.com/in/riya",
  "coverLetter": "I'm excited to apply because..."
}
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A MongoDB connection string (free tier at [mongodb.com/atlas](https://www.mongodb.com/atlas))

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/unizoy-job-board.git
cd unizoy-job-board
```

---

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/unizoy-jobs
PORT=5000
```

Start the backend server:

```bash
node server.js
# or with nodemon for hot reload:
npx nodemon server.js
```

You should see:
```
✅ Connected to MongoDB Database!
🚀 Server running on port 5000
```

---

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory (optional — only needed if you want to point to your local backend instead of the live Render API):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> **Note:** By default, `page.js` and `admin/page.js` point directly to `https://unizoy-job-board.onrender.com`. Update those URLs if you're running locally.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Portal

Navigate to `/admin` on the running site.

**Default passcode:** `unizoy123`

> ⚠️ For production, replace the hardcoded passcode in `admin/page.js` with a proper environment variable or authentication provider (e.g. NextAuth.js).

Once logged in you can:
- **Post a Job** — fill in title, description, location, work mode, and employment type → publishes to the live careers page instantly
- **Manage Jobs** — see all open positions, click **Edit** to update any field, or **Delete** to remove from the live site
- **View Candidates** — see every application with name, email, cover letter, LinkedIn, and resume link; click **Reply** to open your mail client directly

---

## ☁️ Deployment

### Backend → Render

1. Push your repo to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set **Root Directory** to `backend`
4. Set **Build Command:** `npm install`
5. Set **Start Command:** `node server.js`
6. Add environment variable: `MONGO_URI = your_mongodb_connection_string`
7. Deploy — Render gives you a public URL like `https://unizoy-job-board.onrender.com`

### Frontend → Vercel (recommended)

```bash
npm install -g vercel
cd frontend
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com) — Vercel auto-detects Next.js and deploys on every push to `main`.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary Dark | `#0f172a` | Navbar, headings, buttons |
| Primary Dark Hover | `#1e293b` | Button hover state |
| Warm Sand BG | `#fdf7f2` | Page background |
| Card Background | `#f4e4d4` | Job listing cards |
| Card Border | `#e8d5c4` | Card and input borders |
| Remote Badge | `blue-100 / blue-800` | Work mode tag |
| Employment Badge | `white/50` | Employment type tag |

**Fonts:** Geist Sans (body) + Georgia serif (hero headings)

**Background:** Fixed warm sand (`#fdf7f2`) with layered radial gradients and faint SVG "U" outline corner decorations — giving it a premium editorial feel.

---

## 📦 Available Scripts

### Backend
```bash
node server.js          # Start server
npx nodemon server.js   # Start with hot reload (install nodemon separately)
```

### Frontend
```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Build for production
npm run start    # Start production build
npm run lint     # Run ESLint
```

---

## 🔮 Roadmap / Ideas

- [ ] Replace hardcoded admin passcode with NextAuth.js or JWT auth
- [ ] Add application status tracking (Pending / Reviewed / Shortlisted / Rejected)
- [ ] Email notifications to candidates on application receipt (Resend / Nodemailer)
- [ ] Rich text job description editor (Tiptap or Quill)
- [ ] Pagination for large job listings
- [ ] Category/department filtering on the public board
- [ ] Analytics dashboard for admin (total views, applications per job)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add: your feature description"`
4. Push and open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

**Built with ❤️ for Unizoy**

*Connecting great talent with great opportunities.*

© 2025 Unizoy. All rights reserved.

</div>
