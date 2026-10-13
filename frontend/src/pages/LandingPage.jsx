import React from 'react';
import {
  ShieldAlert,
  Link2,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertOctagon,
  Lock,
  Database,
  Cpu,
  Layers,
  ShieldCheck
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export const LandingPage = ({ onGetStarted, onLearnMore }) => {
  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      const el = document.getElementById('features');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      {/* 1. Hero Section */}
      <section id="hero" className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-glow-orb" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-badge">
            <span className="hero-badge-pulse" aria-hidden="true" />
            <span>Digital Safety Assistant • Version 1.0 (MVP)</span>
          </div>

          <h1 id="hero-heading" className="hero-title">
            Stay Safe in the Digital World with <span className="gradient-text">Explainable AI</span> & Verifiable Threat Defense
          </h1>

          <p className="hero-subtitle">
            DataRaksha AI empowers everyday users to analyze suspicious emails and SMS messages, cross-reference links against Google Safe Browsing, and translate dense privacy policies into plain language — backed by a deterministic backend risk-scoring engine.
          </p>

          <div className="hero-actions">
            <Button
              variant="primary"
              size="lg"
              onClick={onGetStarted}
              rightIcon={<ArrowRight size={18} />}
            >
              Get Started with DataRaksha
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleLearnMore}
            >
              Explore Security Engines
            </Button>
          </div>

          {/* Trust and Architectural Pillars Strip */}
          <div className="hero-trust-strip">
            <div className="trust-item">
              <Cpu size={16} className="trust-item-icon" aria-hidden="true" />
              <span>Gemini 2.5 Flash Semantic AI</span>
            </div>
            <div className="trust-item">
              <ShieldCheck size={16} className="trust-item-icon" aria-hidden="true" />
              <span>Google Safe Browsing v4</span>
            </div>
            <div className="trust-item">
              <Layers size={16} className="trust-item-icon" aria-hidden="true" />
              <span>Deterministic 0–100 Risk Engine</span>
            </div>
            <div className="trust-item">
              <Database size={16} className="trust-item-icon" aria-hidden="true" />
              <span>Supabase PostgreSQL + RLS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem Statement Section */}
      <section id="problems" className="section-padding" style={{ background: 'rgba(11, 19, 38, 0.4)' }} aria-labelledby="problems-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">The Digital Threat Reality</span>
            <h2 id="problems-heading" className="section-title">Why Non-Technical Users Need Protection</h2>
            <p className="section-desc">
              Cyber deception has evolved far beyond obvious spam. Attackers exploit psychological urgency, brand spoofing, and obscure legal contracts.
            </p>
          </div>

          <div className="problems-grid">
            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <ShieldAlert size={26} aria-hidden="true" />
              </div>
              <h3 className="problem-title">Deceptive Social Engineering</h3>
              <p className="problem-desc">
                Fraudulent SMS and emails mimic banks or courier services, threatening immediate account closures to manipulate victims into revealing passwords or financial OTPs.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <Link2 size={26} aria-hidden="true" />
              </div>
              <h3 className="problem-title">Masked & Obscured Links</h3>
              <p className="problem-desc">
                Attackers use typosquatted domains, deceptive subdomains, and URL shorteners to mask destinations, evading quick visual inspection by ordinary users.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-icon-wrapper">
                <FileText size={26} aria-hidden="true" />
              </div>
              <h3 className="problem-title">Inaccessible Privacy Policies</h3>
              <p className="problem-desc">
                Legal terms of service are deliberately lengthy and complex, leading users to unwittingly grant permission for third-party data broker sales and behavioral tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Core Security Engines */}
      <section id="features" className="section-padding" aria-labelledby="features-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Specialized Protection</span>
            <h2 id="features-heading" className="section-title">Three Intelligent Analysis Engines</h2>
            <p className="section-desc">
              Each module targets a distinct digital safety attack vector with structured heuristics and actionable next steps.
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1: Message Analysis */}
            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon-box">
                  <ShieldAlert size={28} aria-hidden="true" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className="feature-tech-pill">Gemini 2.5 Flash</span>
                  <Badge level="high">Phishing Alert: High Risk</Badge>
                </div>
              </div>
              <h3 className="feature-title">Message & Email Analysis</h3>
              <p className="feature-desc">
                Submit suspicious SMS messages or emails for in-depth inspection of social engineering tactics, urgency triggers, and spoofed authorities.
              </p>
              <ul className="feature-highlights">
                <li className="feature-highlight-item">
                  <CheckCircle2 size={16} className="feature-check-icon" aria-hidden="true" />
                  <span>Identifies credential harvesting & OTP requests</span>
                </li>
                <li className="feature-highlight-item">
                  <CheckCircle2 size={16} className="feature-check-icon" aria-hidden="true" />
                  <span>Detects coercive deadlines & authority impersonation</span>
                </li>
                <li className="feature-highlight-item">
                  <CheckCircle2 size={16} className="feature-check-icon" aria-hidden="true" />
                  <span>Provides clear, non-technical safety actions</span>
                </li>
              </ul>
            </div>

            {/* Feature 2: URL Threat Checking */}
            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon-box">
                  <Link2 size={28} aria-hidden="true" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className="feature-tech-pill">Google Safe Browsing</span>
                  <Badge level="medium">Threat Status: Verified</Badge>
                </div>
              </div>
              <h3 className="feature-title">URL Threat Verification</h3>
              <p className="feature-desc">
                Verify suspicious hyperlinks against Google Safe Browsing blacklist feeds, augmented with structural heuristic checks for misleading domain tricks.
              </p>
              <ul className="feature-highlights">
                <li className="feature-highlight-item">
                  <CheckCircle2 size={16} className="feature-check-icon" aria-hidden="true" />
                  <span>Checks for malware, phishing, and unwanted software</span>
                </li>
                <li className="feature-highlight-item">
                  <CheckCircle2 size={16} className="feature-check-icon" aria-hidden="true" />
                  <span>Evaluates typosquatting and deceptive subdomains</span>
                </li>
                <li className="feature-highlight-item">
                  <CheckCircle2 size={16} className="feature-check-icon" aria-hidden="true" />
                  <span>Fails safely as UNKNOWN check if feed is unreachable</span>
                </li>
              </ul>
            </div>

            {/* Feature 3: Privacy Policy Simplifier */}
            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon-box">
                  <FileText size={28} aria-hidden="true" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span className="feature-tech-pill">Semantic AI Parsing</span>
                  <Badge level="low">Clear Privacy Rating</Badge>
                </div>
              </div>
              <h3 className="feature-title">Privacy Policy Simplifier</h3>
              <p className="feature-desc">
                Paste dense legal clauses to receive structured, digestible summaries highlighting what data is collected, sold, or retained indefinitely.
              </p>
              <ul className="feature-highlights">
                <li className="feature-highlight-item">
                  <CheckCircle2 size={16} className="feature-check-icon" aria-hidden="true" />
                  <span>Highlights third-party data broker sharing</span>
                </li>
                <li className="feature-highlight-item">
                  <CheckCircle2 size={16} className="feature-check-icon" aria-hidden="true" />
                  <span>Explains tracking, profiling, and user deletion rights</span>
                </li>
                <li className="feature-highlight-item">
                  <CheckCircle2 size={16} className="feature-check-icon" aria-hidden="true" />
                  <span>Calculates a clear Privacy Concern Rating</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works Workflow */}
      <section id="workflow" className="section-padding" style={{ background: 'rgba(10, 15, 29, 0.6)' }} aria-labelledby="workflow-heading">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">System Pipeline</span>
            <h2 id="workflow-heading" className="section-title">How DataRaksha AI Works</h2>
            <p className="section-desc">
              A transparent four-stage pipeline that ensures explainable safety guidance without black-box assumptions.
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">01</span>
              <h3 className="step-title">Submit Input</h3>
              <p className="step-desc">
                Paste message text, a hyperlink, or privacy policy clauses into the dedicated analysis workspace.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number">02</span>
              <h3 className="step-title">Multi-Layer Check</h3>
              <p className="step-desc">
                FastAPI coordinates Google Safe Browsing threat lookups and Gemini 2.5 Flash semantic extraction asynchronously.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number">03</span>
              <h3 className="step-title">Deterministic Scoring</h3>
              <p className="step-desc">
                The backend risk engine computes an auditable 0–100 score and assigns a Low, Medium, or High risk category.
              </p>
            </div>

            <div className="step-card">
              <span className="step-number">04</span>
              <h3 className="step-title">Actionable Defense</h3>
              <p className="step-desc">
                Review highlighted warning signs and concrete protective recommendations, securely saved to your personal history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Security & Architecture Pillars */}
      <section id="security" className="section-padding" aria-labelledby="security-heading">
        <div className="container">
          <div className="pillars-box">
            <div className="section-header" style={{ marginBottom: 'var(--space-2xl)' }}>
              <span className="section-tag">Security Architecture</span>
              <h2 id="security-heading" className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>
                Built on Defensive Engineering Principles
              </h2>
              <p className="section-desc">
                Engineered for transparency, privacy preservation, and responsible safety communication.
              </p>
            </div>

            <div className="pillars-grid">
              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <AlertOctagon size={24} aria-hidden="true" />
                </div>
                <h3 className="pillar-title">Zero "100% Safe" Claims</h3>
                <p className="pillar-desc">
                  No tool can guarantee absolute safety. If threat feeds are unreachable, results are labeled as UNKNOWN rather than falsely certified as clean.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <Lock size={24} aria-hidden="true" />
                </div>
                <h3 className="pillar-title">Strict Credential Isolation</h3>
                <p className="pillar-desc">
                  All external API keys and service secrets reside exclusively on the backend. Frontend code contains zero privileged tokens.
                </p>
              </div>

              <div className="pillar-item">
                <div className="pillar-icon-box">
                  <Database size={24} aria-hidden="true" />
                </div>
                <h3 className="pillar-title">Row Level Security (RLS)</h3>
                <p className="pillar-desc">
                  User scan history is isolated within Supabase PostgreSQL. Database-level RLS policies guarantee users can only query their own records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-title">Take Control of Your Digital Safety</h2>
            <p className="cta-desc">
              Experience the clarity of explainable AI safety analysis with deterministic risk scores and actionable defense guidance.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-base)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="primary"
                size="lg"
                onClick={onGetStarted}
                rightIcon={<ArrowRight size={18} />}
              >
                Launch DataRaksha Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
