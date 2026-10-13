# DataRaksha AI — System Architecture Specification

> **Document Status:** PROPOSED ARCHITECTURE / PENDING IMPLEMENTATION  
> **Target Version:** MVP 1.0  
> **Last Updated:** October 2026  
> **Core Principle:** Separation of heuristic AI explanation from deterministic backend scoring. Zero "100% safe" guarantees.

---

## 1. High-Level System Architecture Overview

DataRaksha AI is built on a decoupled, client-server web architecture designed for security, clarity, and maintainability.

```mermaid
graph TD
    subgraph Client["Presentation Layer (Client Browser)"]
        UI["React 18 + Vite SPA<br/>(Vanilla CSS Styling)"]
        AuthContext["Auth Context<br/>(Supabase Client SDK)"]
        APIClient["Frontend API Client<br/>(JWT Bearer Auth)"]
    end

    subgraph Backend["Application Layer (FastAPI Server)"]
        App["FastAPI REST API Gateway<br/>(Python 3.11+)"]
        AuthGuard["JWT Auth & Role Guard<br/>(User / Admin Verification)"]
        InputVal["Pydantic Input Validation<br/>& SSRF Protection"]
        RiskEngine["Deterministic Risk Engine<br/>(Rule-Based 0–100 Scoring)"]
        ServiceGemini["Gemini Service<br/>(Gemini 2.5 Flash API)"]
        ServiceSB["Safe Browsing Service<br/>(Google Safe Browsing v4)"]
        ServiceDB["Supabase Service Client<br/>(PostgreSQL Operations)"]
    end

    subgraph External["External Cloud Services"]
        ExtGemini["Google Gemini 2.5 Flash API<br/>(Semantic & Phishing Analysis)"]
        ExtSB["Google Safe Browsing API<br/>(Known Threat Feeds)"]
    end

    subgraph Database["Data & Identity Layer (Supabase)"]
        SupaAuth["Supabase Auth<br/>(auth.users / JWT Issuance)"]
        SupaPG["Supabase PostgreSQL<br/>(user_profiles, analysis_history, audit_logs)"]
        RLS["Row Level Security (RLS)<br/>(Engine-Level Isolation)"]
    end

    UI --> AuthContext
    AuthContext -->|User Sign-In / Token| SupaAuth
    UI --> APIClient
    APIClient -->|HTTPS + Bearer JWT| App
    App --> AuthGuard
    AuthGuard --> InputVal
    InputVal --> ServiceGemini
    InputVal --> ServiceSB
    ServiceGemini -->|Async HTTPS| ExtGemini
    ServiceSB -->|Async HTTPS| ExtSB
    ServiceGemini --> RiskEngine
    ServiceSB --> RiskEngine
    RiskEngine --> ServiceDB
    ServiceDB --> SupaPG
    SupaPG --- RLS
```

---

## 2. Component Architecture Breakdown

### 2.1 React Frontend (`frontend/`)
- **Technology:** React 18, Vite build tool, Vanilla CSS.
- **Role:** Handles presentation, user interaction, state management, and real-time visual feedback (score meters, warning badges, recommendations).
- **Security Boundaries:**
  - Contains **zero server secrets** or administrative API keys.
  - Communicates with Supabase Auth using only the public `anon` key.
  - Passes user JWT tokens in the `Authorization: Bearer <token>` header to the backend.
  - Performs non-authoritative client validation (length checks, URL syntax) for responsive UX; authoritative validation is strictly enforced on the backend.

### 2.2 FastAPI Backend (`backend/`)
- **Technology:** Python 3.11+, FastAPI, Uvicorn, Pydantic v2, HTTPX.
- **Role:** Serves as the authoritative security gateway and processing coordinator.
- **Responsibilities:**
  - Validates and sanitizes incoming user input.
  - Verifies Supabase JWT tokens and user roles (`user` vs `admin`).
  - Calls external threat and AI APIs asynchronously with timeout guards.
  - Runs the deterministic risk-scoring logic.
  - Writes audit logs and analysis history into Supabase PostgreSQL.

### 2.3 Supabase Auth & Identity
- **Role:** Centralized identity provider for registration, login, password resets, and session management.
- **Token Mechanism:** Issues cryptographic JSON Web Tokens (JWT) containing the user UUID (`sub`).
- **Role Integration:** Custom user roles (`user`, `admin`) are stored in `public.user_profiles` linked to `auth.users(id)`.

### 2.4 Supabase PostgreSQL Database
- **Role:** Relational persistent storage for user profiles, analysis history, and administrative audit logs.
- **Isolation Model:** Protected by PostgreSQL **Row Level Security (RLS)** policies. Every row is bound to `auth.uid()`, preventing cross-user data leakage at the database engine level.

### 2.5 Google Gemini 2.5 Flash API
- **Role:** Natural language understanding and semantic reasoning engine.
- **Usage:**
  - Extracts phishing indicators, urgency markers, and impersonation cues from message text.
  - Summarizes legal privacy policy text into structured categories (data collected, shared, tracked, retention).
  - Explains technical URL structural flags in accessible language.
- **Crucial Rule:** The AI provides linguistic evidence and narrative explanations; **it does not generate the numeric risk score**.

### 2.6 Google Safe Browsing Lookup API (v4)
- **Role:** Authoritative blacklist threat intelligence lookup for malware, social engineering (phishing), and unwanted software.
- **Zero Safe Guarantee Rule:**
  - A threat match confirms malicious status (Score $\ge 85$).
  - An empty result indicates **no known threats cataloged**, not that the website is guaranteed safe.
  - An API error or timeout returns `UNKNOWN_CHECK` with a caution penalty.

---

## 3. User Authentication and Authorization Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User / Admin
    participant UI as React Frontend
    participant Auth as Supabase Auth
    participant API as FastAPI Backend
    participant DB as Supabase PostgreSQL

    Note over User,Auth: Authentication Lifecycle
    User->>UI: Submits Email & Password
    UI->>Auth: signInWithPassword(email, password)
    Auth-->>UI: 200 OK + JWT Access Token (claims: sub=user_uuid)
    UI->>UI: Store Session in Memory / Local Secure Storage

    Note over User,DB: Authorized Request
    User->>UI: Requests Protected Action (e.g. Run Analysis)
    UI->>API: POST /api/v1/analyze/* (Header: Authorization: Bearer <JWT>)
    API->>API: Decode JWT & Verify Signature (SUPABASE_JWT_SECRET)
    
    alt Administrator Route (/api/v1/admin/*)
        API->>DB: Query role FROM user_profiles WHERE user_id = sub
        DB-->>API: Returns role ('user' or 'admin')
        alt Role is 'user'
            API-->>UI: 403 Forbidden ("Admin privilege required")
        else Role is 'admin'
            API->>API: Proceed to admin controller
        end
    end

    API->>API: Authorize user (sub) & proceed
```

---

## 4. End-to-End Data Flows

### 4.1 Message and Email Security Analysis Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Frontend as React Frontend
    participant Backend as FastAPI Backend
    participant Gemini as Gemini 2.5 Flash API
    participant RiskEngine as Backend Risk Engine
    participant Supabase as Supabase PostgreSQL

    User->>Frontend: Pastes message/email text (10–10,000 chars)
    Frontend->>Backend: POST /api/v1/analyze/message (Bearer JWT, {text})
    Backend->>Backend: Validate text length & sanitize input
    Backend->>Gemini: POST generateContent (Structured JSON Schema Prompt)
    
    alt Gemini Responds Successfully
        Gemini-->>Backend: JSON: {urgency, credential_lure, impersonation, evidence}
    else Gemini Times Out / Fails (6s)
        Backend-->>Frontend: 503 Service Unavailable ("AI service unavailable, please retry")
    end

    Backend->>RiskEngine: calculate_message_risk(parsed_indicators)
    Note over RiskEngine: Applies deterministic rule weights (0–100)<br/>Maps to Low, Medium, or High<br/>Selects actionable recommendations
    RiskEngine-->>Backend: {score: 75, category: "High", warning_signs, recommendations}

    Backend->>Supabase: INSERT into analysis_history (user_id, excerpt, score, findings)
    Supabase-->>Backend: 201 Created (record_id)
    Backend-->>Frontend: 200 OK (score, category, warning_signs, recommendations, record_id)
    Frontend-->>User: Displays colored Risk Card, Score Meter, & Safety Advice
```

### 4.2 URL Threat Checking Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Frontend as React Frontend
    participant Backend as FastAPI Backend
    participant SafeBrowsing as Google Safe Browsing API
    participant Gemini as Gemini 2.5 Flash API
    participant RiskEngine as Backend Risk Engine
    participant Supabase as Supabase PostgreSQL

    User->>Frontend: Enters website URL (e.g. http://secure-update.xyz)
    Frontend->>Backend: POST /api/v1/analyze/url (Bearer JWT, {url})
    Backend->>Backend: URL normalization, SSRF check (reject RFC 1918 / localhost)
    
    par Query Safe Browsing
        Backend->>SafeBrowsing: POST threatMatches:find (URL)
        SafeBrowsing-->>Backend: Threat match or empty result {}
    and Inspect URL Structure via Gemini
        Backend->>Gemini: Analyze typosquatting, subdomains, deceptive keywords
        Gemini-->>Backend: Structural indicators & plain-language explanation
    end

    Backend->>RiskEngine: calculate_url_risk(sb_result, structural_indicators)
    Note over RiskEngine: Known threat = Score 95 (High)<br/>No match = Score 5–40 (Heuristics)<br/>API failure = Score 45 (UNKNOWN_CHECK)
    RiskEngine-->>Backend: {score, category, threat_status, warning_signs, recommendations}

    Backend->>Supabase: INSERT into analysis_history
    Backend-->>Frontend: 200 OK
    Frontend-->>User: Displays Risk Meter, Safe Browsing status, & Warning Banner
```

### 4.3 Privacy Policy Analysis Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant Frontend as React Frontend
    participant Backend as FastAPI Backend
    participant Gemini as Gemini 2.5 Flash API
    participant RiskEngine as Backend Risk Engine
    participant Supabase as Supabase PostgreSQL

    User->>Frontend: Pastes privacy policy text (50–25,000 chars)
    Frontend->>Backend: POST /api/v1/analyze/privacy-policy (Bearer JWT, {policy_text})
    Backend->>Backend: Input validation & sanitization
    Backend->>Gemini: Structured Prompt: categorize data collection, third-party sharing, tracking, retention
    Gemini-->>Backend: Structured JSON categories & plain-language summaries
    Backend->>RiskEngine: calculate_privacy_risk(extracted_privacy_terms)
    RiskEngine-->>Backend: Privacy Concern Score (0–100) & Category (Low, Med, High)
    Backend->>Supabase: INSERT into analysis_history
    Backend-->>Frontend: 200 OK (summary cards, concern score, recommendations)
    Frontend-->>User: Displays Plain-Language Summary Breakdown & Privacy Rating
```

---

## 5. Backend Deterministic Risk-Scoring Engine

The core design principle of DataRaksha AI is the **strict separation between AI prose and numeric risk evaluation**:

```
[ User Input ]
       │
       ▼
[ External Services ] ─── (Gemini extracts boolean flags: urgency=true, asks_otp=true)
                      ─── (Safe Browsing checks known blacklists: match=MALWARE)
       │
       ▼
[ Pure Python Risk Engine ] ─── (Deterministic Rule Calculations: W1 + W2 + ... )
                            ─── (Applies score caps: min(100, sum))
                            ─── (Maps score to Low: 0–39, Medium: 40–69, High: 70–100)
                            ─── (Selects deterministic defensive recommendations)
       │
       ▼
[ Structured JSON Response ]
```

### Key Safety Guarantees
1. **Explainable:** Every point added to the score can be directly traced to a verified indicator or threat list match.
2. **Stable:** Re-evaluating the same set of detected indicators produces the exact same score.
3. **Conservative:** When external APIs fail, the engine adds a provisional caution penalty and labels the result `UNKNOWN_CHECK`, never defaulting to zero risk.

---

## 6. Error Handling, Resilience, and Security Boundaries

### 6.1 Server-Side Request Forgery (SSRF) Defense
Before querying external services for user-submitted URLs:
- The backend parses the hostname and resolves its IP address.
- Addresses in loopback (`127.0.0.0/8`), private RFC 1918 ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), and cloud link-local metadata ranges (`169.254.169.254`) are **immediately rejected** with `422 Unprocessable Entity`.

### 6.2 External API Resilience Matrix

| Failure Mode | Detection | System Action | User Impact |
| :--- | :--- | :--- | :--- |
| **Gemini Rate Limit (429)** | HTTP 429 received from Gemini API | Intercepted in service layer; returns 503 with retry-after header | *"Analysis service is experiencing high traffic. Please retry in 30 seconds."* |
| **Gemini Timeout (> 6s)** | `asyncio.TimeoutError` triggered | Aborts request; logs warning | *"AI service took too long to respond. Please try again."* |
| **Safe Browsing Unreachable** | HTTP 5xx or connection error | Threat status marked `UNKNOWN_CHECK`; base caution score applied | Result displayed with prominent warning: *"Threat database unreachable. Exercise caution."* |
| **Supabase DB Write Error** | DB exception on history save | Analysis result returned to client; logs error | Result returned successfully; notice: *"Could not save this scan to your history."* |

### 6.3 Security Boundaries & Secret Isolation
- **Secret Isolation:** `GEMINI_API_KEY`, `SAFE_BROWSING_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_JWT_SECRET` reside strictly in `backend/.env`.
- **Client Security:** Frontend uses only `VITE_SUPABASE_ANON_KEY` for client-side authentication handshakes.
- **Data Minimization:** Full raw message text is never permanently stored in the database. Only an abbreviated 255-character excerpt and a SHA-256 hash are recorded.
