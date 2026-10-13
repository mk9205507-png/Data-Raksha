import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerBanner = () => {
  return (
    <aside className="disclaimer-banner" aria-label="Educational Safety Advisory">
      <div className="container disclaimer-content">
        <AlertTriangle size={15} className="disclaimer-icon" aria-hidden="true" />
        <p className="disclaimer-text">
          <span className="disclaimer-highlight">Educational Safety Advisory:</span> DataRaksha AI provides heuristic threat analysis and plain-language summaries. Absence of known threat records does not guarantee 100% digital safety.
        </p>
      </div>
    </aside>
  );
};

export default DisclaimerBanner;
