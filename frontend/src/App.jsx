import React, { useState } from 'react';
import DisclaimerBanner from './components/layout/DisclaimerBanner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import './styles/index.css';
import './styles/layout.css';
import './styles/landing.css';

export function App() {
  const [authModalState, setAuthModalState] = useState(null); // 'login' | 'register' | null

  const handleOpenAuth = (mode = 'login') => {
    // For Phase A, displays a clean feedback toast/notice that Auth forms are scheduled for Phase B
    setAuthModalState(mode);
  };

  const handleCloseAuth = () => {
    setAuthModalState(null);
  };

  return (
    <div className="app-layout">
      {/* 1. Educational Safety Advisory Banner */}
      <DisclaimerBanner />

      {/* 2. Global Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onNavigateSection={(sectionId) => {
          const el = document.getElementById(sectionId);
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Main View Area */}
      <main className="main-content" id="main-content">
        <LandingPage
          onGetStarted={() => handleOpenAuth('register')}
          onLearnMore={() => {
            const el = document.getElementById('features');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* 4. Global Footer */}
      <Footer />

      {/* Phase A Notice Dialog (if Sign In or Launch Assistant is clicked before Phase B forms) */}
      {authModalState && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="phase-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(7, 12, 24, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1rem',
          }}
          onClick={handleCloseAuth}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              maxWidth: '460px',
              width: '100%',
              boxShadow: 'var(--shadow-card)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="phase-modal-title" style={{ fontSize: 'var(--text-xl)', marginBottom: '0.75rem' }}>
              {authModalState === 'register' ? 'Registration Interface' : 'Authentication Portal'}
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Phase A focuses on the core design system tokens, responsive layout, and landing experience. Authentication forms (Supabase Auth integration, password visibility toggles, and validation) are scheduled for <strong>Phase B</strong>.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCloseAuth}
              >
                Got it, continue exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
