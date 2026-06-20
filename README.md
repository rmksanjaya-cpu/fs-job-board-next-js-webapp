# Vaskara Job Board 🚀
### The Premium Software Internships & Co-ops Board for Students

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/rmksanjaya-cpu/fs-job-board-next-js-webapp)

Vaskara is a premium, state-of-the-art job board platform engineered specifically for computer science and software engineering students seeking verified, high-quality internship and co-op listings. Built using **Next.js**, **React**, and **TypeScript**, Vaskara integrates server-side performance, search engine indexing (SEO), and a beautiful glassmorphic design language.

---

## 🌟 Core Features & Visual Capabilities

* **Dynamic Code-Splitting & Skeletons**: Uses Next.js lazy-loading components (`next/dynamic`) to render the "Featured Opportunities" section. Custom SVG structural skeletons (`FeaturedJobsSkeleton.tsx`) prevent layout shifts.
* **Interactive Live Job Search (`/jobs`)**:
  * Real-time text search queries that filter through titles, companies, and skill keywords.
  * Custom multi-filter dropdown menus (Job Types, Placement Terms, Locations, Categories) featuring custom styling, smooth transitions, and keyboard accessibility.
* **Server-Prerendered Job Detail Pages (`/jobs/[id]`)**: Full server-side generation (SSG) with `generateStaticParams` for near-instantaneous page loads, optimized search engine previews, and dynamic route matching.
* **Interactive Apply Modal (Glassmorphic)**:
  * Sleek backdrop overlay with scale and fade-in animations.
  * Contextual branding header rendering the company logo and three colorful custom metadata status badges (Job Type, Category, Base Pay).
  * Drag-and-drop file dropzone supporting `.pdf`, `.doc`, and `.docx` uploads up to **5MB**.
  * Dynamic character count visualizer for the cover letter area.
  * Full front-end validation mapping and asynchronous server loading indicators.
  * Interactive success overlay displaying application confirmation details.
* **Smart 404 Route Handlers**:
  * Global `not-found.tsx` layout for invalid paths.
  * Contextual `app/jobs/[id]/not-found.tsx` that triggers if an internship posting has expired or been removed. Features the same detail-page design layout and highlights helpful application tips for students.
* **Local Persistence Layer**: Saves submitted metadata to process and store records on the server.

---

## 🎨 Design System & Aesthetics

Vaskara prioritizes visual excellence and a premium layout through:
* **Glassmorphism & Gradients**: Subtle background blurs (`backdrop-blur-sm`), semi-transparent elements, and glowing gradients to emphasize active components.
* **Harmonious Color Palette**: Built using Tailwind CSS custom colors paired with an HSL theme (curated navy blues, indigo highlights, and rich dark mode values).
* **Micro-Animations**: Understated scaling hover states, fade-ins, border highlights, and loading spinners that make the application feel highly interactive and modern.
* **Custom Typography**: Built with modern typography utilizing Google Fonts (Inter/Geist font families) to provide maximum readability.

---

## 🔍 SEO & Performance Best Practices

Automatically optimized according to web standards:
* **Unique Metadata**: Every page contains custom titles and descriptive meta tags for higher search visibility.
* **Semantic HTML**: Formatted using structure-specific tags (`<main>`, `<section>`, `<aside>`, `<header>`, `<footer>`, `<article>`).
* **Heading Hierarchy**: Enforces a single `<h1>` per page with sequentially nested tags (`<h2>`, `<h3>`, `<h4>`).
* **Accessible Element IDs**: Interactive components (dropdowns, forms, buttons) have unique, descriptive IDs for automated browser tests and accessibility screen readers.

---

## 📁 Project Directory Structure

```ascii
fs-job-board-next-js-webapp/
│
├── app/                                 # Next.js App Router root
│   ├── api/
│   │   └── jobs/
│   │       └── [id]/
│   │           └── apply/
│   │               └── route.ts         # Handles form uploads, server validations & writes to JSON
│   ├── jobs/
│   │   ├── (search)/
│   │   │   └── page.tsx                 # Search panel with dynamic filtering
│   │   └── [id]/
│   │       ├── not-found.tsx            # Expired/removed job details 404 page
│   │       └── page.tsx                 # Dynamic SSG job detail page
│   ├── layout.tsx                       # Metadata & global styling wrapper
│   ├── not-found.tsx                    # Fallback global 404 page
│   └── page.tsx                         # Homepage landing index
│
├── components/                          # Reusable UI component layer
│   ├── ApplyModal.tsx                   # Apply button trigger + glassmorphic modal form
│   ├── CustomDropdown.tsx               # Polished multi-select filter selector
│   ├── FeaturedJobs.tsx                 # Mapped cards for featured job listings
│   ├── FeaturedJobsSkeleton.tsx         # Lazy-loaded loading layout
│   ├── Features.tsx                     # Why Vaskara section
│   ├── Footer.tsx                       # Navigation, newsletter form & repository link
│   ├── Header.tsx                       # Sticky header navigation
│   ├── Hero.tsx                         # Header landing search panel
│   └── Stats.tsx                        # Core platform dashboard metrics
│
├── data/                                # Local storage database files
│   ├── applications.json                # Persisted applicant metadata records
│   └── jobs.json                        # Internships & co-ops metadata database
│
├── lib/                                 # Data querying & helper layer
│   ├── applications.ts                  # Persistance methods to parse & append submissions
│   └── jobs.ts                          # Methods to retrieve & filter database listings
│
├── public/                              # Static public assets
├── package.json                         # Scripts & dependency definitions
├── tsconfig.json                        # TypeScript rules configuration
└── resume_mockup.pdf                    # Pre-created mock PDF CV for local validation testing
```

---

## 📦 Database Persistence (`data/applications.json`)

All applications submitted through the **Apply Now** portal are validated on the server side and appended to the local storage path.

### Application Metadata Schema

Below is an example of a successfully recorded application payload:
```json
[
  {
    "id": "app_3bphc0uoo",
    "jobId": "frontend-developer-intern-vercel",
    "jobTitle": "Frontend Developer Intern",
    "fullName": "Kasun Rathnayaka",
    "email": "kasun@example.com",
    "phone": "+1 555-019-2834",
    "portfolio": "https://kasun.dev",
    "github": "https://github.com/rmksanjaya-cpu",
    "coverLetter": "I am very excited to apply for this internship!",
    "resumeName": "resume_mockup.pdf",
    "resumeSize": 243787,
    "submittedAt": "2026-06-20T05:18:53.011Z"
  }
]
```

---

## 🚀 Getting Started

Follow these steps to set up and run Vaskara locally:

### 1. Installation

Clone the repository and install the dependencies:
```bash
git clone https://github.com/rmksanjaya-cpu/fs-job-board-next-js-webapp.git
cd fs-job-board-next-js-webapp
npm install
```

### 2. Run the Development Server

Start the local development server:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) inside your web browser.

### 3. Build & Run in Production

To build the optimized package and run it:
```bash
npm run build
npm start
```

---

## 🧪 E2E Form Testing Flow

You can perform end-to-end testing of the form validations and JSON persistence layer:
1. Navigate to `/jobs/frontend-developer-intern-vercel`.
2. Click **Apply for this role** to launch the popup modal.
3. Test front-end validations by leaving the fields empty and clicking **Submit Application**. Check the red warning text mapping below the inputs.
4. Try uploading a file larger than 5MB or of an invalid file extension. Observe the upload warning messages.
5. Fill out the candidate fields, upload the pre-configured [resume_mockup.pdf](file:///c:/Users/Kasun%20Rathnayaka/Documents/GitHub/fs-job-board-next-js-webapp/resume_mockup.pdf) file located in the workspace root, and submit.
6. Verify the success state animation is displayed and check [data/applications.json](file:///c:/Users/Kasun%20Rathnayaka/Documents/GitHub/fs-job-board-next-js-webapp/data/applications.json) to see the new record.

---

## 📄 License & Source Info

* **Repository**: [github.com/rmksanjaya-cpu/fs-job-board-next-js-webapp](https://github.com/rmksanjaya-cpu/fs-job-board-next-js-webapp)
* Contributions, forks, and issues are welcome. Built following premium web app development principles.
