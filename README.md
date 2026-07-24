# DETTROIN-INT---VasantValleySchool

A modern, responsive, and feature-rich redesign of the **Vasant Valley School** website, built using the full **MERN Stack (MongoDB, Express, React, Node.js)** and styled with **Tailwind CSS**.

---

## Submission Details

- **Full Name:** Candidate Name
- **Intern ID:** DETTROIN-INT-2026-07
- **Email Address:** candidate.email@example.com
- **GitHub Username:** candidate_username
- **Selected Website:** [Vasant Valley School](https://www.vasantvalley.org/)
- **Live Demo Link:** [Vercel Deployment Link](https://dettroin-int-vasantvalley.vercel.app/)
- **Repository Name:** `DETTROIN-INT---VasantValleySchool`

---

## Technologies Used

- **Frontend:**
  - React.js (Vite configuration)
  - Tailwind CSS (Premium branding palettes & animations)
  - Lucide React (Sleek UI icons)
  - React Router DOM (Single-page app routing)
- **Backend:**
  - Node.js & Express.js
  - JSON Web Tokens (JWT) for secure authentication
  - Bcrypt.js for pre-save password hashing
- **Database:**
  - MongoDB & Mongoose schemas

---

## Key Improvements Made

1. **Brand-Specific Visual Theme:** Crafted a custom theme centered around Vasant Valley's identity, featuring deep crimson reds, gold accents, dark slates, and clean typography (`Inter` & `Outfit`), avoiding generic styles.
2. **Dynamic Live Announcements Ticker:** Implemented a marquee banner at the top of the homepage that scrolls through active notice board headlines queried directly from the database.
3. **MERN Interactive Admissions Intake:** Fully redesigned the Admissions registration flow. Prospective parents can submit student inquiries, which are validated and saved to the MongoDB database in real time.
4. **Role-Based Portal Dashboards:**
   - **Student Dashboard:** View general notices and access personalized report cards with subjects, grades, and faculty remarks.
   - **Teacher Dashboard:** Input new student grades, delete past grade cards, write and broadcast announcements, and monitor notice logs.
   - **Admin Dashboard:** Review overall system statistics, examine active admissions inquiry entries, and approve/reject applications with status update tags.
5. **Autoseeding Database Setup:** To simplify evaluation, running the server automatically seeds default portal accounts (`admin@vasantvalley.edu`, `teacher@vasantvalley.edu`, `student@vasantvalley.edu`) and dummy announcements/grade cards.
6. **Graceful Database Fallbacks:** Added try/catch safeguards inside the frontend pages; if the backend MongoDB is offline, it utilizes interactive local mock content so reviewers can inspect UI transitions instantly.

---

## Project Structure

```
DETTROIN-INT---SchoolWebsite/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Admission.js
│   │   ├── Notice.js
│   │   └── Grade.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── admissions.js
│   │   ├── notices.js
│   │   └── grades.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── GlassCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Academics.jsx
    │   │   ├── Admissions.jsx
    │   │   ├── Portal.jsx
    │   │   └── Dashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── package.json
```

---

## Setup & Running Instructions

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB installed locally and running (on default port `27017`)

### 2. Backend Installation & Startup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   npm start
   ```
   *The server runs on port `5000` and automatically seeds initial accounts.*

### 3. Frontend Installation & Startup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install packages:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Run Vite dev server:
   ```bash
   npm run dev
   ```
   *Open browser at `http://localhost:5173` to interact with the web app.*
