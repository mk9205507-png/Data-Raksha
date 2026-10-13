# DataRaksha AI — REST API Contract Specification

> **Contract Status:** PROPOSED CONTRACT / PENDING IMPLEMENTATION  
> **Target Base URL:** `http://localhost:8000/api/v1` (Development)  
> **Specification Version:** 1.0.0  
> **Standard Headers:**
> - `Content-Type: application/json`
> - `Authorization: Bearer <Supabase_Access_Token>` (when authentication is required)

---

## 1. Overview and Standard Response Structure

All responses follow a consistent, predictable JSON schema.

### Standard Success Envelope
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2026-10-13T12:00:00Z"
}
```

### Standard Error Envelope
```json
{
  "success": false,
  "error": {
    "code": "STRING_ERROR_CODE",
    "message": "Human-readable summary of the error.",
    "details": "Technical explanation or field-specific validation errors.",
    "timestamp": "2026-10-13T12:00:00Z"
  }
}
```

---

## 2. Endpoints Specification

### 2.1 Health Check

- **Method & Path:** `GET /health`
- **Purpose:** Monitor backend operational readiness and server time.
- **Authentication:** None (Public).
- **Request Parameters:** None.
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "status": "healthy",
      "service": "DataRaksha AI API",
      "version": "1.0.0",
      "environment": "development"
    },
    "timestamp": "2026-10-13T12:00:00Z"
  }
  ```
- **Error Responses:** None under standard operation.

---

### 2.2 Suspicious Message and Email Security Analysis

- **Method & Path:** `POST /analyze/message`
- **Purpose:** Analyze suspicious SMS or email text using Gemini 2.5 Flash, extract threat indicators, compute a deterministic risk score (0–100), and produce safety recommendations.
- **Authentication:** Required (`Authorization: Bearer <JWT>`).
- **Request Body:**
  ```json
  {
    "text": "URGENT: Your State Bank account is locked due to suspicious activity. Click http://sbi-verify.xyz/login immediately or legal action will be initiated within 2 hours."
  }
  ```
- **Validation Constraints:**
  - `text`: String, minimum 10 characters, maximum 10,000 characters. Stripped of null characters.
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "analysis_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "analysis_type": "message",
      "risk_score": 85,
      "risk_category": "High",
      "warning_signs": [
        "Extreme urgency language threatening account suspension within 2 hours.",
        "Credential harvesting attempt targeting online banking login details.",
        "Suspicious unverified domain link impersonating an official financial institution."
      ],
      "recommendations": [
        "Do not click the provided link or enter any personal credentials.",
        "Contact your bank directly using the phone number printed on the back of your official card.",
        "Forward the message to your bank's fraud reporting email and block the sender."
      ],
      "technical_findings": {
        "urgency_detected": true,
        "credential_lure": true,
        "authority_impersonation": true,
        "financial_lure": false
      },
      "disclaimer": "This analysis is advisory and based on automated threat detection heuristics. It does not provide an absolute cybersecurity guarantee."
    },
    "timestamp": "2026-10-13T12:00:01Z"
  }
  ```
- **Validation Error (`422 Unprocessable Entity`):**
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR",
      "message": "Invalid message content provided.",
      "details": "Text must be between 10 and 10,000 characters.",
      "timestamp": "2026-10-13T12:00:02Z"
    }
  }
  ```
- **External API Failure Behavior (`503 Service Unavailable`):**
  *Occurs when Gemini API times out (>6s) or returns HTTP 429/500.*
  ```json
  {
    "success": false,
    "error": {
      "code": "AI_SERVICE_UNAVAILABLE",
      "message": "AI analysis service is temporarily unavailable.",
      "details": "The analysis engine did not receive a timely response from Google Gemini. Please retry in a few moments.",
      "timestamp": "2026-10-13T12:00:03Z"
    }
  }
  ```

---

### 2.3 URL Threat Checking

- **Method & Path:** `POST /analyze/url`
- **Purpose:** Inspect a URL against Google Safe Browsing Lookup API (v4), perform structural link heuristics, calculate a deterministic risk score, and return explainable guidance.
- **Authentication:** Required (`Authorization: Bearer <JWT>`).
- **Request Body:**
  ```json
  {
    "url": "http://secure-update.account-verification.xyz/login"
  }
  ```
- **Validation Constraints:**
  - `url`: String, valid HTTP or HTTPS URI, maximum 2,048 characters.
  - Rejection of private IP ranges (`127.0.0.1`, `10.0.0.0/8`, `192.168.0.0/16`, `169.254.169.254`) to prevent SSRF.
- **Success Response — Known Threat Detected (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "analysis_id": "c1f72a4d-52ef-4e1a-829d-478a598c11e3",
      "analysis_type": "url",
      "target_url": "http://secure-update.account-verification.xyz/login",
      "threat_status": "MATCHED",
      "risk_score": 95,
      "risk_category": "High",
      "safe_browsing_match": {
        "matched": true,
        "threat_types": ["SOCIAL_ENGINEERING"]
      },
      "warning_signs": [
        "Identified as a malicious social engineering (phishing) page by Google Safe Browsing.",
        "Uses an unencrypted HTTP connection for a login path.",
        "Contains misleading subdomain structures mimicking account verification."
      ],
      "recommendations": [
        "Do not visit this webpage or download any files from it.",
        "If you already entered passwords on this link, change them immediately on the genuine service.",
        "Close this browser tab and clear your temporary browser cache."
      ],
      "disclaimer": "This analysis is advisory. The presence or absence of a threat entry does not guarantee that a site is completely secure."
    },
    "timestamp": "2026-10-13T12:00:04Z"
  }
  ```
- **Success Response — No Known Threat Found (`200 OK`):**
  *Note: Clean status does NOT guarantee the site is 100% safe.*
  ```json
  {
    "success": true,
    "data": {
      "analysis_id": "e4a28f11-09cd-4cb1-97b2-6c3e98112bfa",
      "analysis_type": "url",
      "target_url": "https://www.wikipedia.org",
      "threat_status": "CLEAN",
      "risk_score": 10,
      "risk_category": "Low",
      "safe_browsing_match": {
        "matched": false,
        "threat_types": []
      },
      "warning_signs": [],
      "recommendations": [
        "Always verify you are on the intended official domain before entering credentials.",
        "Ensure the browser continues to display a valid HTTPS padlock icon."
      ],
      "disclaimer": "No known threats were detected on public security feeds. However, brand-new or zero-day threats may not be cataloged yet. Always exercise caution."
    },
    "timestamp": "2026-10-13T12:00:05Z"
  }
  ```
- **Fallback Response — Safe Browsing Service Unreachable (`200 OK` with caution):**
  ```json
  {
    "success": true,
    "data": {
      "analysis_id": "f5b39e22-1ade-4db2-88c3-7d4f09223cba",
      "analysis_type": "url",
      "target_url": "https://unknown-domain.io",
      "threat_status": "UNKNOWN_CHECK",
      "risk_score": 45,
      "risk_category": "Medium",
      "safe_browsing_match": {
        "matched": false,
        "service_available": false
      },
      "warning_signs": [
        "External threat intelligence feed could not be reached to verify this link.",
        "System applied a caution penalty due to unverified threat status."
      ],
      "recommendations": [
        "Proceed with heightened caution as threat verification was temporarily unavailable.",
        "Do not download attachments or enter sensitive credentials on this link."
      ],
      "disclaimer": "Threat lookup service was temporarily unavailable. Inconclusive checks must not be assumed safe."
    },
    "timestamp": "2026-10-13T12:00:06Z"
  }
  ```
- **Validation Error (`422 Unprocessable Entity`):**
  ```json
  {
    "success": false,
    "error": {
      "code": "INVALID_URL",
      "message": "The provided URL is invalid or prohibited.",
      "details": "Private IP addresses, loopback addresses, and non-HTTP protocols are prohibited.",
      "timestamp": "2026-10-13T12:00:07Z"
    }
  }
  ```

---

### 2.4 Privacy Policy Analysis

- **Method & Path:** `POST /analyze/privacy-policy`
- **Purpose:** Parse complex legal privacy policy text using Gemini 2.5 Flash, extract key data collection and sharing clauses, and calculate a Privacy Concern Rating.
- **Authentication:** Required (`Authorization: Bearer <JWT>`).
- **Request Body:**
  ```json
  {
    "policy_text": "We collect your geolocation, contact list, and device identifiers. We may share or sell this data to third-party advertising partners and data brokers. Your data is retained indefinitely unless legally mandated otherwise..."
  }
  ```
- **Validation Constraints:**
  - `policy_text`: String, minimum 50 characters, maximum 25,000 characters.
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "analysis_id": "a8c912e4-6789-4b10-a123-abcdef012345",
      "analysis_type": "privacy_policy",
      "risk_score": 75,
      "risk_category": "High",
      "summary_breakdown": {
        "data_collected": [
          "Precise real-time geolocation",
          "Contact list and address book contents",
          "Unique device hardware identifiers"
        ],
        "third_party_sharing": [
          "Data is explicitly sold or shared with commercial data brokers and advertisers."
        ],
        "tracking_profiling": [
          "Cross-platform behavioral tracking and user profiling enabled."
        ],
        "user_rights_retention": [
          "Data retained indefinitely with no automated deletion timeline."
        ]
      },
      "warning_signs": [
        "Explicitly states that personal information is sold to third parties.",
        "Indefinite retention of sensitive location and contact records."
      ],
      "recommendations": [
        "Avoid granting location and contact permissions if installing this service.",
        "Review your browser privacy settings and consider blocking third-party tracking cookies.",
        "Submit a formal privacy data deletion request if you close your account."
      ],
      "disclaimer": "This summary is generated by AI heuristics to assist reading comprehension. It does not constitute legal advice."
    },
    "timestamp": "2026-10-13T12:00:08Z"
  }
  ```

---

### 2.5 Analysis History

#### Retrieve User History
- **Method & Path:** `GET /history?page=1&limit=10`
- **Purpose:** Retrieve paginated scan history for the authenticated user, ordered by most recent first.
- **Authentication:** Required (`Authorization: Bearer <JWT>`).
- **Query Parameters:**
  - `page`: Integer, default `1`, minimum `1`.
  - `limit`: Integer, default `10`, maximum `50`.
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "total": 24,
      "page": 1,
      "limit": 10,
      "records": [
        {
          "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
          "analysis_type": "message",
          "input_excerpt": "URGENT: Your State Bank account is locked...",
          "risk_score": 85,
          "risk_category": "High",
          "threat_status": "PROCESSED",
          "created_at": "2026-10-13T12:00:01Z"
        }
      ]
    },
    "timestamp": "2026-10-13T12:00:09Z"
  }
  ```

#### Delete History Entry
- **Method & Path:** `DELETE /history/{record_id}`
- **Purpose:** Delete a specific history record owned by the authenticated user.
- **Authentication:** Required (`Authorization: Bearer <JWT>`).
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "message": "Analysis record successfully deleted.",
      "deleted_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
    },
    "timestamp": "2026-10-13T12:00:10Z"
  }
  ```
- **Error Response (`404 Not Found` or `403 Forbidden`):**
  *Occurs if the record does not exist or belongs to another user (protected by RLS).*
  ```json
  {
    "success": false,
    "error": {
      "code": "RECORD_NOT_FOUND",
      "message": "Record not found or access denied.",
      "details": "The specified history record does not exist or you lack permission to delete it.",
      "timestamp": "2026-10-13T12:00:11Z"
    }
  }
  ```

---

### 2.6 Administrator Operations

#### Retrieve Aggregate Platform Statistics
- **Method & Path:** `GET /admin/stats`
- **Purpose:** Provide platform observability, aggregate analysis counts, risk category distribution, and error rates.
- **Authentication:** Required (`Authorization: Bearer <JWT>` with verified `role = 'admin'`).
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "total_users": 142,
      "total_analyses": 845,
      "breakdown_by_type": {
        "message": 420,
        "url": 310,
        "privacy_policy": 115
      },
      "breakdown_by_risk": {
        "Low": 310,
        "Medium": 285,
        "High": 250
      },
      "threat_status_counts": {
        "CLEAN": 240,
        "MATCHED": 55,
        "UNKNOWN_CHECK": 15
      },
      "system_status": "HEALTHY"
    },
    "timestamp": "2026-10-13T12:00:12Z"
  }
  ```
- **Authorization Error (`403 Forbidden`):**
  *Returned when a valid user token lacks administrative privileges.*
  ```json
  {
    "success": false,
    "error": {
      "code": "FORBIDDEN_ADMIN_REQUIRED",
      "message": "Administrator access required.",
      "details": "Your account does not possess administrator permissions.",
      "timestamp": "2026-10-13T12:00:13Z"
    }
  }
  ```
