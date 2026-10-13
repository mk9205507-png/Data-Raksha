import React from 'react';
import { Shield } from 'lucide-react';

const CURRENT_YEAR = 2026;

export const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="brand-link" style={{ cursor: 'default' }}>
              <div className="brand-icon-wrapper" style={{ width: '34px', height: '34px' }}>
                <Shield size={18} strokeWidth={2.5} aria-hidden="true" />
              </div>
              <span className="brand-name" style={{ fontSize: 'var(--text-base)' }}>
                DataRaksha <span className="brand-badge">AI</span>
              </span>
            </div>
            <p className="footer-desc">
              AI-assisted digital threat analysis pairing Google Gemini 2.5 Flash semantic insights with a deterministic backend risk engine and Google Safe Browsing verification.
            </p>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-cyan)' }}>
              Tagline: Stay Safe in the Digital World
            </span>
          </div>

          {/* Analysis Engines */}
          <div>
            <h3 className="footer-col-title">Analysis Engines</h3>
            <ul className="footer-nav">
              <li><a href="#features" className="footer-link">Message & SMS Phishing</a></li>
              <li><a href="#features" className="footer-link">URL Threat Intelligence</a></li>
              <li><a href="#features" className="footer-link">Privacy Policy Simplifier</a></li>
              <li><a href="#workflow" className="footer-link">Deterministic Scoring (0–100)</a></li>
            </ul>
          </div>

          {/* Architecture & Tech */}
          <div>
            <h3 className="footer-col-title">Architecture</h3>
            <ul className="footer-nav">
              <li><span className="footer-link">React 18 + Vite (Vanilla CSS)</span></li>
              <li><span className="footer-link">Python FastAPI Backend</span></li>
              <li><span className="footer-link">Google Safe Browsing API v4</span></li>
              <li><span className="footer-link">Supabase PostgreSQL + RLS</span></li>
            </ul>
          </div>

          {/* Educational Governance */}
          <div>
            <h3 className="footer-col-title">Project Notice</h3>
            <div className="footer-badge-box">
              <p>
                <strong>Academic Prototype:</strong> Developed for engineering review and demonstration. Risk scoring is rule-based and provisional. Check results are advisory only.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            &copy; {CURRENT_YEAR} DataRaksha AI. Developed for educational digital safety awareness.
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Architecture & System Design</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: 'var(--accent-teal)' }}>Supabase PostgreSQL Protected</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
