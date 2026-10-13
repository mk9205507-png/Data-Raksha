# DataRaksha AI — Project Structure and Codebase Blueprint

> **Document Status:** PROPOSED ARCHITECTURE / CODEBASE BLUEPRINT  
> **Target Release:** MVP 1.0  
> **Document Purpose:** Complete codebase organization, directory breakdown, file responsibilities, and environment configuration templates for DataRaksha AI.

---

## 1. Directory Tree Overview

The project is structured as a clean, decoupled monorepo containing distinct directories for documentation, the **React + Vite frontend**, and the **FastAPI backend**:

```text
DataSecurity/
├── README.md                           # Core project introduction and overview (Preserved)
├── .gitignore                          # Root Git ignore rules (Configured)
├── .env.example                        # Root environment variable template (Configured)
│
├── docs/                               # Complete project documentation and team planning
│   ├── FINAL_DOCUMENTATION.md          # Complete system specifications and requirements
│   ├── ARCHITECTURE.md                 # System architecture, component models & Mermaid diagrams
│   ├── PROJECT_PHASES.md               # 13-phase development roadmap and checklists
│   ├── TEAM_DIVISION.md                # 2-person work distribution, file ownership & git rules
│   ├── API_CONTRACT.md                 # REST API endpoints, schemas, and error behavior
│   ├── DATABASE_SCHEMA.md              # Supabase PostgreSQL schema, RLS policies & DDL
│   ├── DEVELOPMENT_LOG.md              # Active 13-phase progress tracking checklist
│   └── PROJECT_STRUCTURE.md            # Codebase structure and file descriptions (This file)
│
├── frontend/                           # Client-side Single Page Application (SPA)
│   ├── public/                         # Static assets (favicons, manifest, icons)
│   │   └── favicon.ico
│   ├── src/
│   │   ├── api/                        # HTTP client and backend API request helpers
│   │   │   ├── client.js               # Central Axios/Fetch instance with JWT interceptors
│   │   │   ├── analysisApi.js          # Calls to message, URL, and privacy analysis endpoints
│   │   │   ├── historyApi.js           # Calls to fetch and delete user analysis history
│   │   │   └── adminApi.js             # Calls to protected administrative metrics endpoints
│   │   ├── assets/                     # Component images, SVG icons, and graphics
│   │   ├── components/                 # Reusable, modular UI components
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx          # Header navigation with authentication state
│   │   │   │   ├── Footer.jsx          # Footer with advisory disclaimers and links
│   │   │   │   ├── DisclaimerBanner.jsx# Prominent educational safety advisory banner
│   │   │   │   ├── LoadingSpinner.jsx  # Animated loading indicator for active scans
│   │   │   │   └── Modal.jsx           # Accessible dialog container for login/register
│   │   │   ├── analysis/
│   │   │   │   ├── RiskBadge.jsx       # Color-coded badge (Low: Green, Med: Yellow, High: Red)
│   │   │   │   ├── ScoreMeter.jsx      # Visual 0–100 gauge or risk meter bar
│   │   │   │   ├── WarningSigns.jsx    # Card listing detected threat indicators
│   │   │   │   └── Recommendations.jsx # Actionable safety advice card
│   │   │   └── auth/
│   │   │       ├── LoginForm.jsx       # Email & password login form
│   │   │       └── RegisterForm.jsx    # User registration form
│   │   ├── context/
│   │   │   └── AuthContext.jsx         # React Context managing Supabase session & user state
│   │   ├── pages/                      # Main route pages and views
│   │   │   ├── Home.jsx                # Landing page explaining features & mission
│   │   │   ├── Dashboard.jsx           # Unified tabbed safety hub for all 3 analyzers
│   │   │   ├── MessageAnalyzer.jsx     # Suspicious SMS/Email analysis interface
│   │   │   ├── UrlChecker.jsx          # URL threat inspection interface
│   │   │   ├── PrivacyAnalyzer.jsx     # Privacy policy summarizer interface
│   │   │   ├── History.jsx             # User's personal scan history timeline
│   │   │   └── AdminDashboard.jsx      # Protected admin view for system statistics
│   │   ├── styles/                     # Vanilla CSS stylesheets
│   │   │   ├── index.css               # Global tokens, CSS reset, typography, and theme vars
│   │   │   ├── components.css          # Styles for reusable cards, buttons, badges, and meters
│   │   │   └── pages.css               # Page-specific layouts and responsive containers
│   │   ├── utils/                      # Frontend helper functions and formatters
│   │   │   ├── formatters.js           # Date and risk label formatting utilities
│   │   │   └── validators.js           # Client-side input length and URL format checkers
│   │   ├── App.jsx                     # Root application component with route declarations
│   │   └── main.jsx                    # Vite React DOM entry point
│   ├── .env.example                    # Frontend environment variable template
│   ├── index.html                      # HTML document entry point
│   ├── package.json                    # Frontend dependencies and npm scripts
│   └── vite.config.js                  # Vite bundler configuration
│
└── backend/                            # Server-side REST API application
    ├── app/
    │   ├── __init__.py
    │   ├── main.py                     # FastAPI application factory and entry point
    │   ├── core/                       # Core application configurations and security
    │   │   ├── __init__.py
    │   │   ├── config.py               # Settings management using pydantic-settings
    │   │   ├── auth.py                 # Supabase JWT token verification dependency
    │   │   ├── security.py             # Hash verification and security utilities
    │   │   └── exceptions.py           # Custom exception definitions and HTTP handlers
    │   ├── routes/                     # REST API route handlers (endpoints)
    │   │   ├── __init__.py
    │   │   ├── health.py               # Health check endpoint (/api/v1/health)
    │   │   ├── analysis.py             # Main analysis endpoints (/api/v1/analyze/*)
    │   │   ├── history.py              # User history endpoints (/api/v1/history/*)
    │   │   └── admin.py                # Protected admin endpoints (/api/v1/admin/*)
    │   ├── schemas/                    # Pydantic request and response schemas
    │   │   ├── __init__.py
    │   │   ├── common.py               # Shared error and pagination schemas
    │   │   ├── message_schema.py       # Message analysis input & output models
    │   │   ├── url_schema.py           # URL analysis input & output models
    │   │   ├── privacy_schema.py       # Privacy policy input & output models
    │   │   ├── history_schema.py       # History record models
    │   │   └── admin_schema.py         # Administrative metrics response models
    │   ├── services/                   # External API connectors and business logic
    │   │   ├── __init__.py
    │   │   ├── gemini_service.py       # Gemini 2.5 Flash API connector
    │   │   ├── safe_browsing_service.py# Google Safe Browsing Lookup API connector
    │   │   ├── supabase_service.py     # Supabase database operations client
    │   │   └── risk_engine.py          # Deterministic backend risk calculation engine
    │   └── utils/                      # Helper utilities and data cleaners
    │       ├── __init__.py
    │       ├── sanitizers.py           # Input text cleaning and prompt injection mitigation
    │       └── url_helpers.py          # URL parsing, canonicalization, and SSRF validation
    ├── migrations/                     # SQL database schema and RLS policies
    │   ├── 001_initial_schema.sql      # Table creation (profiles, history, audit)
    │   └── 002_rls_policies.sql        # Row Level Security policies and functions
    ├── tests/                          # Backend test suite
    │   ├── __init__.py
    │   ├── conftest.py                 # Pytest fixtures and mock client setup
    │   ├── test_health.py              # Health check test
    │   ├── test_auth.py                # JWT verification and role tests
    │   ├── test_risk_engine.py         # Unit tests for scoring logic & edge cases
    │   ├── test_gemini_service.py      # Mocked tests for Gemini integration
    │   ├── test_safe_browsing.py       # Mocked tests for Google Safe Browsing
    │   └── test_routes.py              # Integration tests for API endpoints
    ├── .env.example                    # Backend environment variable template
    └── requirements.txt                # Python package dependencies
```

---

## 2. Explanation of Directories and File Responsibilities

### 2.1 Documentation Layer (`docs/`)
- **`FINAL_DOCUMENTATION.md`**: Complete system specifications, functional/non-functional requirements, and acceptance criteria.
- **`ARCHITECTURE.md`**: Architectural component breakdown, valid Mermaid data-flow diagrams, and security boundaries.
- **`PROJECT_PHASES.md`**: 13-phase development roadmap with dependencies, deliverables, and checklists.
- **`TEAM_DIVISION.md`**: Work allocation between Frontend (Person 1) and Backend (Person 2) developers with Git collaboration rules.
- **`API_CONTRACT.md`**: REST API endpoints, request/response JSON schemas, and error behavior.
- **`DATABASE_SCHEMA.md`**: Proposed Supabase PostgreSQL schema, DDL migration scripts, and Row Level Security policies.
- **`DEVELOPMENT_LOG.md`**: Active progress tracking checklist for all 13 phases.
- **`PROJECT_STRUCTURE.md`**: This blueprint explaining the codebase organization.

### 2.2 Frontend Layer (`frontend/`)
- **`src/api/client.js`**: Central HTTP client (Axios or Fetch) with request interceptor attaching the Supabase JWT `Authorization: Bearer <token>`.
- **`src/components/common/`**: Reusable navigation bar, footer, educational disclaimer banners, accessible modals, and loading spinners.
- **`src/components/analysis/`**: Risk cards, score meter gauge (0–100), detected warning signs, and actionable safety recommendations.
- **`src/context/AuthContext.jsx`**: Manages Supabase user sessions, registration, login, and logout state across all components.
- **`src/pages/`**:
  - `Home.jsx`: Public landing page explaining the mission of DataRaksha AI.
  - `Dashboard.jsx`: Tabbed user interface switching between Message, URL, and Policy analyzers.
  - `History.jsx`: Personal timeline of previous scans with deletion controls.
  - `AdminDashboard.jsx`: Protected administrator dashboard displaying platform metrics.
- **`src/styles/`**: Vanilla CSS stylesheets (`index.css`, `components.css`, `pages.css`) with color tokens and responsive grid rules.

### 2.3 Backend Layer (`backend/`)
- **`app/main.py`**: FastAPI application entry point, CORS middleware, lifespan events, and router registration.
- **`app/core/config.py`**: Loads and validates environment variables (`GEMINI_API_KEY`, `SAFE_BROWSING_API_KEY`, `SUPABASE_URL`, etc.).
- **`app/core/auth.py`**: Dependency verifying Supabase JWT tokens (`get_current_user`) and enforcing admin role checks (`require_admin`).
- **`app/routes/`**: Modular route handlers for `/health`, `/analyze/*`, `/history/*`, and `/admin/*`.
- **`app/services/gemini_service.py`**: Async client calling Gemini 2.5 Flash for message analysis and privacy policy summarization.
- **`app/services/safe_browsing_service.py`**: Queries Google Safe Browsing Lookup API (v4) for threat matches.
- **`app/services/risk_engine.py`**: Pure Python deterministic scoring engine calculating 0–100 scores and risk categories.
- **`app/services/supabase_service.py`**: Server-side client using the Supabase service key to persist analysis records and fetch admin statistics.
- **`app/utils/url_helpers.py`**: Normalizes URLs and blocks private IP ranges (`127.0.0.1`, `10.0.0.0/8`, `192.168.0.0/16`) to prevent SSRF vulnerabilities.
- **`tests/`**: Pytest test suite covering health checks, auth validation, risk scoring boundaries, and mocked service connectors.

---

## 3. Environment Configuration Templates

### 3.1 Backend Environment Template (`backend/.env.example`)
```ini
ENVIRONMENT=development
DEBUG=True
APP_NAME="DataRaksha AI Backend"
API_V1_PREFIX=/api/v1
PORT=8000
HOST=0.0.0.0

ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

SAFE_BROWSING_API_KEY=your_google_safe_browsing_api_key_here

SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_secret_key_here
SUPABASE_JWT_SECRET=your_supabase_jwt_secret_here

RISK_THRESHOLD_LOW=39
RISK_THRESHOLD_MEDIUM=69
```

### 3.2 Frontend Environment Template (`frontend/.env.example`)
```ini
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key_here
VITE_APP_TITLE="DataRaksha AI"
VITE_APP_VERSION=1.0.0
```
