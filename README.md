DataRaksha AI

Stay Safe in the Digital World

DataRaksha AI is an AI-powered digital safety assistant designed to help users identify potential online threats, analyze suspicious messages, check URLs against known threats, and understand privacy policies in simple language.

Project Status: Initial development — requirements and architecture phase.

1. Problem Statement

People regularly receive suspicious emails, SMS messages, and website links. They may struggle to recognize phishing attempts, understand online scams, or interpret lengthy privacy policies.

DataRaksha AI aims to make digital safety information easier to understand by combining AI-assisted analysis, URL threat checking, risk explanations, and practical safety recommendations in one application.

2. Objectives

- Analyze suspicious messages and emails for potential phishing and scam indicators.
- Check URLs against available known-threat information.
- Summarize privacy policies in simple language.
- Provide understandable risk categories, supporting reasons, and safety recommendations.
- Allow authenticated users to access their own analysis history.
- Provide protected administrator functionality.
- Promote digital awareness and safer online decisions.

3. Key Features

Message and Email Security Analysis

Users will be able to submit suspicious text for analysis of potential phishing, scam indicators, suspicious requests, and warning signs.

URL Security Analysis

Users will be able to submit website URLs for checking against the Google Safe Browsing service. Results will explain the findings and any limitations of the check.

Privacy Policy Analyzer

Users will be able to submit privacy policy text and receive a simplified summary of data collection, sharing, retention, permissions, and potential privacy concerns.

Risk Rating and Recommendations

The application will provide Low, Medium, or High risk categories with supporting evidence and recommended safety actions. Numeric scoring rules and thresholds will be documented before implementation.

Authentication and Analysis History

Users will be able to register, log in, and access their own saved analysis records.

Administrator

An authorized administrator will have access to designated administrative functions protected by appropriate authorization checks.

4. Technology Stack

Component| Technology
Frontend| React + Vite
Styling| CSS
Backend| Python + FastAPI
AI analysis| Gemini 2.5 Flash API
URL threat checking| Google Safe Browsing API
Database| Supabase PostgreSQL
Authentication| Supabase Auth
Version control| Git and GitHub

Supabase is the only database and authentication platform planned for this project. No additional database system will be introduced in the MVP.

5. System Architecture

1. The user interacts with the React frontend.
2. The frontend sends requests to the FastAPI backend.
3. The backend validates input and handles authorization.
4. Message and privacy policy analysis use the configured Gemini API.
5. URL analysis uses Google Safe Browsing for available threat information.
6. The backend applies documented risk-scoring rules and prepares explanations and safety recommendations.
7. Supabase stores permitted user records and analysis history.
8. The frontend displays the results to the user.

AI-generated explanations and deterministic backend risk scoring are separate responsibilities. Unavailable threat-check services must not be interpreted as evidence that content is safe.

6. User Roles

Individual User

- Register and log in.
- Analyze suspicious messages and emails.
- Check URLs.
- Summarize privacy policies.
- View analysis results and safety recommendations.
- Access personal analysis history.

Administrator

- Access protected administrative functionality.
- Perform only explicitly authorized administrative actions.

Company-specific functionality is excluded from the MVP and reserved for future scope.

7. Security and Privacy

- Store API secrets in environment variables.
- Never commit API keys, passwords, or privileged Supabase credentials to GitHub.
- Use Supabase Row Level Security policies to restrict access to personal records.
- Validate user input on the backend.
- Enforce authorization for protected operations.
- Avoid storing unnecessary sensitive information.
- Handle API failures and unknown results clearly.

8. Project Development Phases

1. Finalize requirements and documentation.
2. Set up the project structure and development environment.
3. Build the React frontend.
4. Configure Supabase database and authentication.
5. Develop the FastAPI backend.
6. Integrate Gemini and Google Safe Browsing.
7. Implement risk scoring and explanations.
8. Integrate and test all modules.
9. Deploy the application and prepare project documentation.

9. Testing Strategy

Testing will cover valid and invalid inputs, API failures, malformed URLs, AI response validation, authentication, role permissions, user-specific history access, risk-scoring boundaries, and frontend/backend integration.

Features will be marked complete only after they have been implemented and tested.

10. Limitations

AI analysis may be inaccurate, and known-threat databases may not identify every malicious website. A URL with no known threat detected is not guaranteed to be safe. Privacy summaries depend on the policy text provided. The application provides guidance rather than a guarantee of cybersecurity.

11. Future Scope

- Company-oriented security analysis.
- Additional phishing and fraud detection methods.
- Advanced security reports and analytics.
- Improved multilingual explanations.
- Additional privacy-awareness features.

12. Project Status

DataRaksha AI is currently in the initial requirements and architecture phase. The features described above are planned capabilities and must not be considered implemented until development and testing are complete.

13. Disclaimer

DataRaksha AI is an educational digital safety project. Its analysis results are advisory and should not replace professional security assessment or independent verification.

---

Project Name: DataRaksha AI
Tagline: Stay Safe in the Digital World