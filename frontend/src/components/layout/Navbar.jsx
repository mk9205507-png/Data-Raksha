import React, { useState } from 'react';
import { Shield, Menu, X, ArrowRight, Lock } from 'lucide-react';
import Button from '../common/Button';

export const Navbar = ({ onOpenAuth, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand */}
        <a href="#hero" className="brand-link" onClick={() => handleNavClick('hero')} aria-label="DataRaksha AI Home">
          <div className="brand-icon-wrapper">
            <Shield size={22} strokeWidth={2.5} aria-hidden="true" />
          </div>
          <div className="brand-info">
            <span className="brand-name">
              DataRaksha <span className="brand-badge">AI</span>
            </span>
            <span className="brand-tagline">Stay Safe in the Digital World</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li>
              <a
                href="#features"
                className="nav-item-link"
                onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}
              >
                Security Engines
              </a>
            </li>
            <li>
              <a
                href="#workflow"
                className="nav-item-link"
                onClick={(e) => { e.preventDefault(); handleNavClick('workflow'); }}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#security"
                className="nav-item-link"
                onClick={(e) => { e.preventDefault(); handleNavClick('security'); }}
              >
                Privacy & Architecture
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenAuth?.('login')}
            leftIcon={<Lock size={14} />}
          >
            Sign In
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenAuth?.('register')}
            rightIcon={<ArrowRight size={14} />}
          >
            Launch Assistant
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="mobile-drawer" role="dialog" aria-modal="true">
          <ul className="mobile-nav-list">
            <li>
              <a
                href="#features"
                className="mobile-nav-item"
                onClick={(e) => { e.preventDefault(); handleNavClick('features'); }}
              >
                Security Engines
              </a>
            </li>
            <li>
              <a
                href="#workflow"
                className="mobile-nav-item"
                onClick={(e) => { e.preventDefault(); handleNavClick('workflow'); }}
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#security"
                className="mobile-nav-item"
                onClick={(e) => { e.preventDefault(); handleNavClick('security'); }}
              >
                Privacy & Architecture
              </a>
            </li>
          </ul>

          <div className="mobile-drawer-actions">
            <Button
              variant="secondary"
              onClick={() => { setMobileMenuOpen(false); onOpenAuth?.('login'); }}
              leftIcon={<Lock size={15} />}
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              onClick={() => { setMobileMenuOpen(false); onOpenAuth?.('register'); }}
              rightIcon={<ArrowRight size={15} />}
            >
              Launch Assistant
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
