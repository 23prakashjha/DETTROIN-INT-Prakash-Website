# DETTROIN-INT-Prakash-Website

A modern, responsive, and feature-rich redesign of the **Vasant Valley School** website, built using the full **MERN Stack (MongoDB, Express, React, Node.js)** and styled with **Tailwind CSS**.

---

## Submission Details

- **Full Name:** Prakash Jha
- **Intern ID:** DETTROIN-INT-2026-07
- **GitHub Username:** 23prakashjha
- **Repository:** `DETTROIN-INT-Prakash-Website`
- **Live Demo:** https://dettroin-int-prakash-website.vercel.app/
- **Selected Website:** [Vasant Valley School](https://www.vasantvalley.org/)

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React, React Router DOM |
| **Backend** | Node.js, Express.js, JWT Auth, Bcrypt.js |
| **Database** | MongoDB, Mongoose |
| **Build** | PostCSS, Autoprefixer |

---

## Key Improvements

1. **Brand-Specific Visual Theme:** Custom theme using Vasant Valley's identity — deep crimson red, gold accents, dark slate backgrounds, and `Inter` + `Outfit` typography.
2. **Custom Favicon:** School graduation cap logo in brand colors replacing the default Vite icon.
3. **Hero Slideshow:** Auto-sliding 3-image carousel with smooth crossfade transitions.
4. **Animated Counters:** Stats section with animated number counters (1:9 ratio, 100% result rate, 30+ activities, 8-acre campus).
5. **Gallery with Lightbox:** 18-item gallery with category filters, masonry/grid toggle, keyboard-navigable lightbox modal, and featured badges.
6. **Dynamic Announcements Ticker:** Live marquee banner pulling active notices from the database.
7. **Role-Based Portal Dashboards:**
   - **Student Dashboard:** View notices, personalized report cards with grades and remarks.
   - **Teacher Dashboard:** Input grades, delete records, broadcast announcements.
   - **Admin Dashboard:** System stats, admissions review, approve/reject applications.
8. **MERN Admissions Intake:** Full registration flow with real-time MongoDB persistence.
9. **Autoseeding Database:** Server auto-seeds default accounts and dummy data on startup.
10. **Graceful Fallbacks:** If MongoDB is offline, frontend uses local mock content for seamless UI review.
11. **23 High-Quality School Images:** Campus, labs, sports, library, art studio, auditorium, and more.
12. **Scroll Animations:** Smooth reveal-on-scroll effects, glassmorphism navbar, staggered link animations.

---

## Pages

| Page | Description |
|---|---|
| **Home** | Hero slideshow, "Why Choose Us", Vision & Core Values, animated counters, campus gallery, testimonials, academic programs, recent news |
| **About** | School history, mission, leadership |
| **Academics** | Curriculum overview, faculty info |
| **Admissions** | Online admission form with MERN backend |
| **Contact** | Contact form, school address, map |
| **Gallery** | 18 items, 5 categories, lightbox, layout toggle |
| **Infrastructure** | Campus facilities showcase |
| **International Curriculum** | IGCSE/Cambridge program details |
| **News & Events** | 7 events with unique images, date badges, categories |
| **Portal** | Student/Teacher/Admin login |
| **Dashboard** | Role-based dashboards with interactive features |
| **Vision & Philosophy** | School values and educational philosophy |

---

## Project Structure

```
DETTROIN-INT-Prakash-Website/
├── backend/
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── models/
│   │   ├── User.js              # Student/Teacher/Admin schema
│   │   ├── Admission.js         # Admission inquiry schema
│   │   ├── Notice.js            # Notice board schema
│   │   └── Grade.js             # Report card schema
│   ├── routes/
│   │   ├── auth.js              # Login/Register endpoints
│   │   ├── admissions.js        # Admission CRUD
│   │   ├── notices.js           # Notice CRUD
│   │   └── grades.js            # Grade CRUD
│   ├── server.js                # Express entry point + autoseed
│   └── package.json
└── frontend/
    ├── public/
    │   ├── favicon.svg           # VVS graduation cap logo
    │   └── *.jpg / *.png         # 23 school images
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Glassmorphism nav with dropdown
    │   │   ├── Footer.jsx        # Newsletter CTA, social links
    │   │   ├── GlassCard.jsx     # Reusable glass effect card
    │   │   └── Skeleton.jsx      # Loading skeleton component
    │   ├── pages/
    │   │   ├── Home.jsx          # Hero, counters, testimonials
    │   │   ├── Gallery.jsx       # Lightbox gallery with filters
    │   │   ├── NewsEvents.jsx    # News cards with images
    │   │   ├── Dashboard.jsx     # Role-based dashboards
    │   │   ├── Portal.jsx        # Login page
    │   │   ├── About.jsx
    │   │   ├── Academics.jsx
    │   │   ├── Admissions.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Infrastructure.jsx
    │   │   ├── InternationalCurriculum.jsx
    │   │   └── VisionPhilosophy.jsx
    │   ├── services/
    │   │   └── api.js            # Axios API wrapper
    │   ├── App.jsx               # Router setup
    │   ├── main.jsx
    │   └── index.css             # Custom animations & utilities
    ├── tailwind.config.js        # Extended animations & theme
    ├── postcss.config.js
    ├── index.html
    └── package.json
```

---

## Setup & Running

### Prerequisites
- Node.js v18+
- MongoDB running locally on port `27017`

### Backend
```bash
cd backend
npm install
npm start
# Server runs on port 5000, auto-seeds accounts
```

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
# Open http://localhost:5173
```

### Default Accounts (Auto-Seeded)

| Role | Email | Password |
|---|---|---|
| Admin | admin@vasantvalley.edu | admin123 |
| Teacher | teacher@vasantvalley.edu | teacher123 |
| Student | student@vasantvalley.edu | student123 |

---

## License

This project was built as part of the DETTROIN internship program.
