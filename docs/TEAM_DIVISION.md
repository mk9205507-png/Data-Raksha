# DataRaksha AI — Team Division and Work Breakdown

> **Document Status:** PROPOSED WORK DISTRIBUTION / ACTIVE COLLABORATION PLAN  
> **Team Size:** 2 Developers (Person 1: Frontend Developer, Person 2: Backend Developer)  
> **Goal:** Clear ownership, zero merge collisions, agreed interface boundaries, and smooth integration.

---

## 1. Overview of Division of Labor

The development of DataRaksha AI is structured between two specialized engineering roles:

```
┌─────────────────────────────────────────┐       ┌─────────────────────────────────────────┐
│       PERSON 1: FRONTEND DEVELOPER      │       │       PERSON 2: BACKEND DEVELOPER       │
├─────────────────────────────────────────┤       ├─────────────────────────────────────────┤
│ • React 18 + Vite Scaffold & Build      │       │ • Python 3.11+ + FastAPI Core Server    │
│ • Vanilla CSS Design System & Theme     │       │ • Supabase PostgreSQL Schema & SQL DDL  │
│ • Responsive Layouts (Mobile & Desktop) │       │ • Supabase Auth JWT Verification        │
│ • Authentication & Registration Screens │       │ • Row Level Security (RLS) Policies     │
│ • Message Analysis UI & Input Guards    │       │ • Gemini 2.5 Flash API Integration      │
│ • URL Checker UI & Input Validation     │       │ • Google Safe Browsing v4 Connector     │
│ • Privacy Policy Summarizer UI          │       │ • Deterministic Risk Engine (0–100)     │
│ • Risk Badge, Gauge & Recommendations   │       │ • Safety Recommendations Generator      │
│ • User History & Dashboard Views        │       │ • User History & Admin Endpoints        │
│ • Administrator Interface               │       │ • SSRF Defenses & Input Sanitization    │
│ • Frontend API Client (Axios/Fetch)     │       │ • Pytest Backend Automated Test Suite   │
│ • Accessibility & Usability Testing     │       │ • API Error Handling & Logging          │
└────────────────────┬────────────────────┘       └────────────────────┬────────────────────┘
                     │                                                 │
                     └────────────────────────┬────────────────────────┘
                                              ▼
                                 SHARED RESPONSIBILITIES
                     ┌─────────────────────────────────────────┐
                     │ • Review Architecture & Contracts First │
                     │ • Freeze API Contracts Before Coding    │
                     │ • Feature Branches & Peer Code Reviews  │
                     │ • Joint End-to-End Integration Testing  │
                     │ • Maintain Documentation Currency       │
                     └─────────────────────────────────────────┘
```

---

## 2. Detailed Role Responsibilities

### 2.1 Person 1 — Frontend Developer

*Primary Objective:* Deliver an intuitive, responsive, and visually accessible client interface that guides non-technical users through threat inspection without confusion.

*Specific Deliverables:*
1. **Scaffold & Build Setup:** Initialize the React application using Vite in `frontend/`, configure `package.json`, and maintain development scripts (`npm run dev`, `npm run build`).
2. **Vanilla CSS Design System:** Implement global design tokens in `frontend/src/styles/index.css` (color system, dark-mode accents, typography, spacing variables, and CSS resets). No third-party CSS utility frameworks.
3. **Core Navigation & Layouts:** Build `Navbar.jsx`, `Footer.jsx`, `DisclaimerBanner.jsx`, and responsive page containers.
4. **Authentication Views:** Build login and signup modals/forms interfacing with Supabase Auth client SDK.
5. **Interactive Analysis Views:**
   - `MessageAnalyzer.jsx`: Text submission form with character countdown and clear input cues.
   - `UrlChecker.jsx`: Clean URL input field with client-side syntax validation.
   - `PrivacyPolicyView.jsx`: Policy text input area and category summary breakdown cards.
6. **Risk Presentation Components:**
   - `RiskBadge.jsx`: Color-coded risk tier indicators (Low = Green, Medium = Amber, High = Red).
   - `ScoreMeter.jsx`: Visual radial dial or score bar (0–100).
   - `WarningSigns.jsx`: Clear listing of detected threat indicators with icons.
   - `Recommendations.jsx`: Prominent, actionable safety next steps.
7. **User History & Dashboard:** Build timeline view for users to inspect their previous scans, search results, and delete entries.
8. **Admin Interface:** Build `AdminDashboard.jsx` to render aggregate scan statistics and threat distributions.
9. **Frontend API Client:** Build `frontend/src/api/client.js` with Axios or Fetch, handling JWT injection and network error alerts.
10. **Frontend Accessibility & QA:** Ensure WCAG AA contrast standards, keyboard navigability, and responsive layouts down to 320px mobile viewports.

---

### 2.2 Person 2 — Backend Developer

*Primary Objective:* Build a secure, resilient, and deterministic API engine that orchestrates external threat lookups and enforces database security.

*Specific Deliverables:*
1. **FastAPI Server Foundation:** Build `backend/app/main.py`, configure lifespan handlers, CORS middleware, and settings management via `pydantic-settings`.
2. **Supabase PostgreSQL Schema:** Write and maintain SQL migrations in `backend/migrations/` for `user_profiles`, `analysis_history`, and `audit_logs`.
3. **Supabase Auth & RLS Integration:** Implement server-side JWT verification in `backend/app/core/auth.py` and enforce PostgreSQL Row Level Security (RLS) policies.
4. **Pydantic Validation Schemas:** Define strict request/response data contracts in `backend/app/schemas/`.
5. **External Service Connectors:**
   - `GeminiService`: Async connector calling Gemini 2.5 Flash with structured system prompts.
   - `SafeBrowsingService`: Async connector calling Google Safe Browsing Lookup API v4 with URL normalization.
   - `SupabaseService`: Server-side client using service key for database persistence.
6. **Deterministic Risk Scoring Engine:** Build `backend/app/services/risk_engine.py` calculating transparent, auditable 0–100 scores based on rule formulas.
7. **Defensive Recommendations Engine:** Map extracted indicators to concrete safety recommendations.
8. **REST Route Implementation:**
   - `GET /api/v1/health`
   - `POST /api/v1/analyze/message`
   - `POST /api/v1/analyze/url`
   - `POST /api/v1/analyze/privacy-policy`
   - `GET` & `DELETE /api/v1/history`
   - `GET /api/v1/admin/stats`
9. **Security Controls:** Implement Server-Side Request Forgery (SSRF) defense against private/loopback IP addresses and sanitize inputs against prompt injection.
10. **Automated Testing & Error Handling:** Write backend test suite using Pytest covering unit tests, risk engine calculations, and route integration tests with mock services.

---

## 3. Shared Responsibilities

Both developers share collective ownership of the project's success and integrity:

1. **Architecture & Contract Review:** Both developers must review and sign off on `ARCHITECTURE.md` and `API_CONTRACT.md` before writing dependent code.
2. **API Contract Freeze:** Any change to an endpoint URL, query parameter, request body, or response field requires explicit agreement between both developers.
3. **Branching & Code Review:**
   - Never commit directly to the `main` branch.
   - Person 1 works in `feature/frontend-*` branches.
   - Person 2 works in `feature/backend-*` branches.
   - Every Pull Request (PR) must be reviewed and approved by the other developer before merging.
4. **Joint Integration Testing:** When integrating the frontend with the backend (Phase 12), both developers must conduct joint debugging sessions to verify data flow, JWT handling, and error states.
5. **Documentation Maintenance:** If implementation changes require adjusting data models or configurations, both developers must promptly update the corresponding files in `docs/`.

---

## 4. File and Directory Ownership Matrix

To prevent merge conflicts and maintain clear boundaries, file ownership is allocated as follows:

| Directory / File | Primary Owner | Secondary Reviewer | Description |
| :--- | :---: | :---: | :--- |
| `frontend/` (all contents) | **Person 1** | Person 2 | React components, styles, pages, Vite configs |
| `frontend/.env.example` | **Person 1** | Person 2 | Frontend environment variable template |
| `backend/` (all contents) | **Person 2** | Person 1 | FastAPI routes, schemas, services, migrations |
| `backend/.env.example` | **Person 2** | Person 1 | Backend environment variable template |
| `docs/API_CONTRACT.md` | **Shared** | **Shared** | Contract definition between frontend and backend |
| `docs/FINAL_DOCUMENTATION.md` | **Shared** | **Shared** | Overall system specification |
| `docs/DEVELOPMENT_LOG.md` | **Shared** | **Shared** | Progress log and milestone sign-off |
| `docs/PROJECT_STRUCTURE.md` | **Shared** | **Shared** | Codebase architecture map |
| `README.md` | **Shared** | **Shared** | Root project introduction |
| `.gitignore` | **Shared** | **Shared** | Root Git exclusion rules |
| `.env.example` (root) | **Shared** | **Shared** | Root environment template |

---

## 5. Integration Checkpoints and Conflict Prevention Rules

### 5.1 Checkpoints

```
[ Checkpoint 1 ] ─── Review & Freeze API Contracts (docs/API_CONTRACT.md)
                         │
                         ▼
[ Checkpoint 2 ] ─── Mock Data Phase: Frontend uses mock fixtures matching API contract
                     while Backend develops real endpoints against Pytest suite
                         │
                         ▼
[ Checkpoint 3 ] ─── Auth Handshake: Connect Frontend Supabase Auth token to
                     Backend JWT verification dependency (/api/v1/health & auth)
                         │
                         ▼
[ Checkpoint 4 ] ─── Analysis Integration: Connect Message, URL, and Policy endpoints
                     to UI forms one by one
                         │
                         ▼
[ Checkpoint 5 ] ─── Full E2E & Admin Check: Test History timeline, admin dashboard,
                     error banners, and security edge cases together
```

### 5.2 Rules to Prevent Overwriting Work
1. **Never edit the other developer's primary directory** (`frontend/` vs `backend/`) without prior discussion.
2. **Mocking First:** Person 1 must build UI screens against mock JSON objects defined in `API_CONTRACT.md`. This allows frontend progress without waiting for backend deployment.
3. **Local Testing Before PR:** Person 2 must ensure all Pytest tests pass before opening a PR. Person 1 must ensure `npm run build` succeeds without lint or bundling errors.
4. **Synchronized Pulls:** Before starting daily work, both developers must run `git checkout main && git pull` to stay synchronized with merged changes.
