import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, HelpCircle, Info } from 'lucide-react';

/**
 * RiskBadge & StatusBadge Component
 * Semantic color badges for Low, Medium, High, and Unknown threat tiers.
 */
export const Badge = ({
  level = 'info',
  children,
  showIcon = true,
  className = '',
  ...props
}) => {
  const getIcon = () => {
    switch (level.toLowerCase()) {
      case 'low':
        return <ShieldCheck size={14} aria-hidden="true" />;
      case 'medium':
        return <AlertTriangle size={14} aria-hidden="true" />;
      case 'high':
        return <AlertOctagon size={14} aria-hidden="true" />;
      case 'unknown':
        return <HelpCircle size={14} aria-hidden="true" />;
      default:
        return <Info size={14} aria-hidden="true" />;
    }
  };

  const badgeStyles = {
    low: {
      color: 'var(--risk-low)',
      background: 'var(--risk-low-bg)',
      border: '1px solid var(--risk-low-border)',
    },
    medium: {
      color: 'var(--risk-medium)',
      background: 'var(--risk-medium-bg)',
      border: '1px solid var(--risk-medium-border)',
    },
    high: {
      color: 'var(--risk-high)',
      background: 'var(--risk-high-bg)',
      border: '1px solid var(--risk-high-border)',
    },
    unknown: {
      color: 'var(--risk-unknown)',
      background: 'var(--risk-unknown-bg)',
      border: '1px solid var(--risk-unknown-border)',
    },
    info: {
      color: 'var(--accent-cyan)',
      background: 'var(--accent-cyan-subtle)',
      border: '1px solid rgba(6, 182, 212, 0.3)',
    },
  };

  const currentStyle = badgeStyles[level.toLowerCase()] || badgeStyles.info;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-semibold)',
        lineHeight: 1.2,
        ...currentStyle,
      }}
      className={className}
      {...props}
    >
      {showIcon && getIcon()}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
