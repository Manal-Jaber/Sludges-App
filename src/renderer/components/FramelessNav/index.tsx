import React from 'react';
import './index.scss';

interface FramelessNav {}

const FramelessNav: React.FC<FramelessNav> = () => {
  // Listeners
  /**
   * TODO:
   * Need to add below listeners
   */
  const minimizeWindow = () => {};
  const maximizeWindow = () => {};
  const closeWindow = () => {};

  return (
    <div className="frameless-nav">
      <div className="actions">
        <div className="action-icon" id="min-btn" onClick={minimizeWindow}>
          <svg
            className="minimize-icon"
            aria-hidden="false"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <rect fill="currentColor" width="10" height="1" x="1" y="6"></rect>
          </svg>
        </div>
        <div className="action-icon" id="max-btn" onClick={maximizeWindow}>
          <svg
            className="maximize-icon"
            aria-hidden="false"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <rect
              width="9"
              height="9"
              x="1.5"
              y="1.5"
              fill="none"
              stroke="currentColor"
            ></rect>
          </svg>
        </div>
        <div className="action-icon" id="close-btn" onClick={closeWindow}>
          <svg
            className="close-icon"
            aria-hidden="false"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <polygon
              fill="currentColor"
              fillRule="evenodd"
              points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"
            ></polygon>
          </svg>
        </div>
      </div>
      {/* <div className="app-logo">logo</div> */}
    </div>
  );
};

export default FramelessNav;
