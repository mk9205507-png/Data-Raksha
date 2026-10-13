# DataRaksha AI — Project Phases and Development Roadmap

> **Document Status:** PROPOSED ROADMAP / ACTIVE SPECIFICATION  
> **Target Release:** MVP 1.0  
> **Rule of Integrity:** Tasks and phases are marked Completed only when deliverables exist, code has been written, and functionality has been verified against acceptance criteria. All development phases beyond Phase 1 are currently marked `PENDING`. No arbitrary deadlines are assumed.

---

## Roadmap Summary

| Phase | Phase Name | Status | Primary Dependencies |
| :---: | :--- | :---: | :--- |
| **01** | Requirements and Documentation | **COMPLETED (READY FOR REVIEW)** | None |
| **02** | Repository and Project Structure | **PENDING** | Phase 01 |
| **03** | Frontend Foundation | **PENDING** | Phase 02 |
| **04** | Backend Foundation | **PENDING** | Phase 02 |
| **05** | Supabase Database, Auth, and Row Level Security | **PENDING** | Phase 02 |
| **06** | Message / Email Security Analysis | **PENDING** | Phase 04, Phase 05 |
| **07** | URL Security Analysis | **PENDING** | Phase 04, Phase 05 |
| **08** | Privacy Policy Analysis | **PENDING** | Phase 04, Phase 05 |
| **09** | Risk Scoring and Safety Recommendations | **PENDING** | Phase 06, Phase 07, Phase 08 |
| **10** | Analysis History and User Dashboard | **PENDING** | Phase 05, Phase 09 |
| **11** | Administrator Functions | **PENDING** | Phase 05, Phase 10 |
| **12** | Frontend-Backend Integration | **PENDING** | Phase 03, Phase 09, Phase 10, Phase 11 |
| **13** | Testing, Security Review, Bug Fixing & Deployment | **PENDING** | Phase 12 |

---

## Phase 1: Requirements and Documentation

- **Objective:** Establish unambiguous functional and non-functional specifications, team responsibilities, API contracts, database design, and architecture before implementation begins.
- **Tasks:**
  - [x] Review existing project `README.md` and preserve core project scope.
  - [x] Create complete system specifications in `FINAL_DOCUMENTATION.md`.
  - [x] Create architectural specifications and Mermaid diagrams in `ARCHITECTURE.md`.
  - [x] Define exact REST API contracts in `API_CONTRACT.md`.
  - [x] Formulate Supabase PostgreSQL schema and RLS requirements in `DATABASE_SCHEMA.md`.
  - [x] Establish division of labor and branch workflow in `TEAM_DIVISION.md`.
  - [x] Build development phase plan (`PROJECT_PHASES.md`) and tracking log (`DEVELOPMENT_LOG.md`).
  - [x] Propose codebase directory tree and environment templates in `PROJECT_STRUCTURE.md`.
- **Dependencies:** None.
- **Deliverables:**
  - `docs/FINAL_DOCUMENTATION.md`
  - `docs/ARCHITECTURE.md`
  - `docs/PROJECT_PHASES.md`
  - `docs/TEAM_DIVISION.md`
  - `docs/API_CONTRACT.md`
  - `docs/DATABASE_SCHEMA.md`
  - `docs/DEVELOPMENT_LOG.md`
  - `docs/PROJECT_STRUCTURE.md`
- **Acceptance Criteria:**
  - All documentation is free of contradictory databases (Supabase PostgreSQL only) or auth providers (Supabase Auth only).
  - Individual User and Administrator are the only MVP roles; Company features are deferred to Future Scope.
  - Risk-scoring rules are deterministic and marked provisional.
- **Completion Checklist:**
  - [x] All 8 documentation files created in `docs/`.
  - [x] Root `.gitignore` and `.env.example` created.
  - [x] `README.md` verified and preserved.

---

## Phase 2: Repository and Project Structure

- **Objective:** Initialize the decoupled repository workspace with separate `frontend/` and `backend/` directories, dependency manifests, and baseline configs without committing real secrets.
- **Tasks:**
  - [ ] Initialize frontend directory using Vite (`npm create vite@latest frontend -- --template react`).
  - [ ] Initialize backend Python virtual environment and create `backend/requirements.txt`.
  - [ ] Configure root and local `.gitignore` rules.
  - [ ] Populate `frontend/.env.example` and `backend/.env.example` with documented placeholders.
  - [ ] Establish package directory layout in `backend/app/` matching `PROJECT_STRUCTURE.md`.
- **Dependencies:** Phase 01.
- **Deliverables:**
  - `frontend/package.json` and Vite configuration.
  - `backend/requirements.txt` and package layout.
  - Active virtual environment and dependency lockfiles.
- **Acceptance Criteria:**
  - `npm run build` executes without errors on default Vite boilerplate.
  - Python virtual environment cleanly imports FastAPI, Uvicorn, and Pydantic.
  - Git status confirms `.env` files are strictly ignored.
- **Completion Checklist:**
  - [ ] Frontend scaffold initialized.
  - [ ] Backend scaffold initialized.
  - [ ] Secret ignore verified.

---

## Phase 3: Frontend Foundation

- **Objective:** Build the responsive design system and core component layouts in React using Vanilla CSS.
- **Tasks:**
  - [ ] Implement design tokens (colors, dark theme accents, typography) in `frontend/src/styles/index.css`.
  - [ ] Build global layout components: `Navbar.jsx`, `Footer.jsx`, `DisclaimerBanner.jsx`.
  - [ ] Build reusable analysis components: `RiskBadge.jsx`, `ScoreMeter.jsx`, `WarningSigns.jsx`, `Recommendations.jsx`.
  - [ ] Build accessible modal components for Login and Registration forms.
  - [ ] Implement tabbed dashboard shell for switching between analysis tools.
- **Dependencies:** Phase 02.
- **Deliverables:**
  - Reusable UI component library.
  - Responsive layout functional across desktop, tablet, and mobile screens.
- **Acceptance Criteria:**
  - Layout is fully responsive down to 320px mobile viewport.
  - Vanilla CSS used exclusively; zero external utility-class CSS frameworks installed.
  - Components render mock visual states for Low, Medium, and High risk categories cleanly.
- **Completion Checklist:**
  - [ ] Style tokens and CSS variables implemented.
  - [ ] Common layout components created.
  - [ ] Reusable analysis cards created.

---

## Phase 4: Backend Foundation

- **Objective:** Create the FastAPI server core with settings management, error handling, CORS headers, and health check endpoints.
- **Tasks:**
  - [ ] Implement `backend/app/main.py` with FastAPI initialization and CORS middleware.
  - [ ] Build `backend/app/core/config.py` using `pydantic-settings` to parse environment variables.
  - [ ] Implement standard JSON exception handlers in `backend/app/core/exceptions.py`.
  - [ ] Implement `/api/v1/health` endpoint returning server status.
  - [ ] Set up Pytest test harness in `backend/tests/conftest.py`.
- **Dependencies:** Phase 02.
- **Deliverables:**
  - Executable FastAPI server (`uvicorn app.main:app`).
  - Interactive OpenAPI docs at `http://localhost:8000/docs`.
  - Health check test suite passing.
- **Acceptance Criteria:**
  - `GET /api/v1/health` returns `200 OK` with JSON status payload.
  - Unhandled errors return standardized JSON error schemas rather than raw stack traces.
- **Completion Checklist:**
  - [ ] FastAPI app runs on local port 8000.
  - [ ] Health check endpoint passes automated tests.
  - [ ] CORS configured to allow frontend development origin.

---

## Phase 5: Supabase Database, Authentication, and Row Level Security

- **Objective:** Provision the Supabase PostgreSQL database tables, apply foreign key constraints, enable Row Level Security (RLS) policies, and implement JWT verification in FastAPI.
- **Tasks:**
  - [ ] Write SQL migration scripts for `user_profiles`, `analysis_history`, and `audit_logs`.
  - [ ] Implement PostgreSQL trigger to automatically create a `user_profiles` row upon `auth.users` signup.
  - [ ] Apply RLS policies restricting individual users to their own history and profiles.
  - [ ] Implement backend JWT authentication dependency (`get_current_user`) in `backend/app/core/auth.py`.
  - [ ] Implement role verification dependency (`require_admin`) checking `user_profiles.role = 'admin'`.
- **Dependencies:** Phase 02.
- **Deliverables:**
  - Executable SQL migration files in `backend/migrations/`.
  - Working FastAPI authentication dependencies.
- **Acceptance Criteria:**
  - Valid Supabase JWT token decodes to user UUID.
  - Expired, invalid, or forged tokens return `401 Unauthorized`.
  - Non-admin tokens requesting admin functions return `403 Forbidden`.
  - RLS strictly isolates records between two different test users.
- **Completion Checklist:**
  - [ ] Database tables provisioned in Supabase.
  - [ ] RLS policies enabled and verified.
  - [ ] FastAPI JWT dependency tested with unit tests.

---

## Phase 6: Message / Email Security Analysis

- **Objective:** Implement backend service and endpoint for analyzing suspicious text (emails, SMS) using Gemini 2.5 Flash.
- **Tasks:**
  - [ ] Implement Pydantic input/output schemas in `backend/app/schemas/message_schema.py`.
  - [ ] Implement `GeminiService.analyze_message()` in `backend/app/services/gemini_service.py`.
  - [ ] Design structured system prompt extracting indicators (urgency, credential lures, impersonation).
  - [ ] Add network timeout (6s threshold) and rate limit (HTTP 429) fallback handlers.
  - [ ] Implement `POST /api/v1/analyze/message` route in `backend/app/routes/analysis.py`.
- **Dependencies:** Phase 04, Phase 05.
- **Deliverables:**
  - Functional `POST /api/v1/analyze/message` endpoint.
  - Gemini service integration module with mocked tests.
- **Acceptance Criteria:**
  - Valid phishing samples return extracted urgency and credential lure indicators.
  - Benign messages return empty or low-risk indicator lists.
  - Text under 10 or over 10,000 characters is rejected with `422 Unprocessable Entity`.
- **Completion Checklist:**
  - [ ] Message analysis route registered.
  - [ ] Gemini API integration tested with mock fixtures.
  - [ ] Validation limits enforced.

---

## Phase 7: URL Security Analysis

- **Objective:** Implement URL threat checking using Google Safe Browsing Lookup API (v4), SSRF protection, and structural link heuristics.
- **Tasks:**
  - [ ] Implement URL schemas in `backend/app/schemas/url_schema.py`.
  - [ ] Implement SSRF defense in `backend/app/utils/url_helpers.py` (blocking localhost and RFC 1918 private IPs).
  - [ ] Build `SafeBrowsingService.check_url()` in `backend/app/services/safe_browsing_service.py`.
  - [ ] Add structural heuristic checks (IP hostname, excessive subdomains, brand keywords).
  - [ ] Implement `POST /api/v1/analyze/url` endpoint.
  - [ ] Ensure non-threat responses are marked "No known threats found" rather than "Guaranteed Safe".
  - [ ] Handle Safe Browsing timeouts by assigning status `UNKNOWN_CHECK`.
- **Dependencies:** Phase 04, Phase 05.
- **Deliverables:**
  - Functional `POST /api/v1/analyze/url` endpoint.
  - Google Safe Browsing service connector with SSRF defenses.
- **Acceptance Criteria:**
  - Known test malware URL returns `threat_status: MATCHED` and `MALWARE` threat type.
  - Benign URL returns `threat_status: CLEAN`.
  - API failure returns `threat_status: UNKNOWN_CHECK` with clear warnings.
  - Private IP input returns `422 Unprocessable Entity`.
- **Completion Checklist:**
  - [ ] SSRF defense tested.
  - [ ] Safe Browsing integration tested.
  - [ ] Unknown threat handling verified.

---

## Phase 8: Privacy Policy Analysis

- **Objective:** Implement privacy policy summarization using Gemini 2.5 Flash to extract key data rights and privacy risks.
- **Tasks:**
  - [ ] Implement privacy schemas in `backend/app/schemas/privacy_schema.py`.
  - [ ] Implement `GeminiService.analyze_privacy_policy()` with structured JSON prompts.
  - [ ] Extract categories: data collected, third-party sharing, tracking, and retention rights.
  - [ ] Implement `POST /api/v1/analyze/privacy-policy` endpoint.
  - [ ] Enforce text length limits (50 to 25,000 characters).
- **Dependencies:** Phase 04, Phase 05.
- **Deliverables:**
  - Functional `POST /api/v1/analyze/privacy-policy` endpoint.
  - Structured privacy policy analysis parser.
- **Acceptance Criteria:**
  - Policy text is broken down into structured, plain-language category cards.
  - Vague retention or data sale terms are highlighted as privacy concerns.
- **Completion Checklist:**
  - [ ] Privacy policy route operational.
  - [ ] Category summaries return structured JSON.
  - [ ] Input validation limits enforced.

---

## Phase 9: Risk Scoring and Safety Recommendations

- **Objective:** Implement the pure, deterministic backend risk calculation engine to assign 0–100 scores, Low/Medium/High categories, and tailored safety advice.
- **Tasks:**
  - [ ] Implement `backend/app/services/risk_engine.py`.
  - [ ] Implement message scoring algorithm with weighted indicators.
  - [ ] Implement URL threat scoring algorithm integrating Safe Browsing and structural heuristics.
  - [ ] Implement privacy policy scoring algorithm based on data-sharing terms.
  - [ ] Implement category mapper (Low: 0–39, Medium: 40–69, High: 70–100).
  - [ ] Build safety recommendation generator mapping detected indicators to actionable defensive steps.
  - [ ] Connect risk engine to all three analysis endpoints.
- **Dependencies:** Phase 06, Phase 07, Phase 08.
- **Deliverables:**
  - Pure Python risk scoring engine with zero external network dependencies.
  - Comprehensive unit test suite for scoring boundary calculations.
- **Acceptance Criteria:**
  - Scoring is purely deterministic and repeatable.
  - Safe Browsing threat match guarantees score $\ge 85$ (High).
  - Safe Browsing failure triggers caution penalty ($45$ base).
  - Every response includes at least two actionable recommendations.
- **Completion Checklist:**
  - [ ] Scoring formulas implemented and covered by unit tests.
  - [ ] Integration with analysis routes complete.
  - [ ] Boundary tests (39/40, 69/70) passing.

---

## Phase 10: Analysis History and User Dashboard

- **Objective:** Implement persistence for analysis scans, paginated user history retrieval, and individual record deletion.
- **Tasks:**
  - [ ] Implement `SupabaseService.save_analysis_record()` to insert records into `analysis_history`.
  - [ ] Implement `GET /api/v1/history` endpoint with pagination (`page`, `limit`).
  - [ ] Implement `DELETE /api/v1/history/{record_id}` endpoint.
  - [ ] Store SHA-256 hash and truncated excerpt rather than raw sensitive messages.
- **Dependencies:** Phase 05, Phase 09.
- **Deliverables:**
  - Functional history endpoints under `/api/v1/history`.
  - User history persistence service.
- **Acceptance Criteria:**
  - Analyses run by authenticated users are saved to the database.
  - Authenticated users can only retrieve their own history.
  - Attempting to delete another user's record returns `404 Not Found` or `403 Forbidden`.
- **Completion Checklist:**
  - [ ] Save-to-history operational.
  - [ ] History list and delete endpoints tested.
  - [ ] Data minimization (excerpts only) verified.

---

## Phase 11: Administrator Functions

- **Objective:** Implement administrative routes for platform observability, aggregate usage statistics, and audit logging.
- **Tasks:**
  - [ ] Implement `GET /api/v1/admin/stats` returning total scans, risk category counts, and API error counts.
  - [ ] Implement audit logging into `public.audit_logs` whenever admin endpoints are accessed.
  - [ ] Protect all admin endpoints with the `require_admin` dependency.
- **Dependencies:** Phase 05, Phase 10.
- **Deliverables:**
  - Functional `GET /api/v1/admin/stats` endpoint.
  - Audit log recording service.
- **Acceptance Criteria:**
  - Requests without `role = 'admin'` receive `403 Forbidden`.
  - Admin view accurately reports aggregate scan counts across all users without exposing individual user contents.
- **Completion Checklist:**
  - [ ] Admin route implemented and role-gated.
  - [ ] Unit tests verify 403 response for regular users.
  - [ ] Audit logs verify administrative actions recorded.

---

## Phase 12: Frontend-Backend Integration

- **Objective:** Wire the React user interface to live FastAPI endpoints and Supabase Auth, replacing mock data with real requests.
- **Tasks:**
  - [ ] Build `frontend/src/api/client.js` with Axios/Fetch interceptor attaching JWT tokens.
  - [ ] Wire up Supabase Auth context (`login`, `register`, `logout`) in React.
  - [ ] Connect Message Analyzer form to `POST /api/v1/analyze/message`.
  - [ ] Connect URL Checker form to `POST /api/v1/analyze/url`.
  - [ ] Connect Privacy Policy form to `POST /api/v1/analyze/privacy-policy`.
  - [ ] Connect History timeline page to `GET` and `DELETE /api/v1/history`.
  - [ ] Connect Admin dashboard view to `GET /api/v1/admin/stats`.
  - [ ] Display real-time loading spinners and user-friendly error banners on API failures.
- **Dependencies:** Phase 03, Phase 09, Phase 10, Phase 11.
- **Deliverables:**
  - Fully integrated, end-to-end operational web application.
- **Acceptance Criteria:**
  - User can sign up, log in, run all 3 analyses, view score meters, inspect history, and log out cleanly.
  - Network errors display friendly error messages without app crashes.
- **Completion Checklist:**
  - [ ] Auth lifecycle operational in UI.
  - [ ] All 3 analysis tools connected and tested.
  - [ ] History and Admin views rendered from live API data.

---

## Phase 13: Testing, Security Review, Bug Fixing & Deployment Preparation

- **Objective:** Perform end-to-end integration testing, SSRF and prompt-injection security audits, cross-browser compatibility checks, and prepare deployment configs.
- **Tasks:**
  - [ ] Run full backend test suite (`pytest tests/`).
  - [ ] Test cross-browser compatibility (Chrome, Firefox, Edge, Safari).
  - [ ] Verify zero leaked API keys or secrets in Git history.
  - [ ] Perform SSRF attack simulation against private IPs on URL endpoint.
  - [ ] Prepare deployment configuration guides for Vercel/Netlify (frontend) and Render/Railway (backend).
  - [ ] Prepare presentation demonstration script and walkthrough guide.
- **Dependencies:** Phase 12.
- **Deliverables:**
  - Completed test execution report.
  - Clean, secure production-ready build.
  - Presentation demonstration guide.
- **Acceptance Criteria:**
  - 100% pass rate on all functional test cases (TC-AUTH, TC-MSG, TC-URL, TC-POL, TC-HIST, TC-ADM).
  - Zero critical security vulnerabilities.
  - All acceptance criteria AC-01 through AC-08 satisfied.
- **Completion Checklist:**
  - [ ] Test suite passing.
  - [ ] Security review signed off.
  - [ ] Final deployment documentation ready.
