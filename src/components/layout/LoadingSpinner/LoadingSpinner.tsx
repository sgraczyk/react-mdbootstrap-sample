import * as React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <style>
      {`
        @keyframes loading-spinner {
          0% { transform : rotate(0deg); }
          100% { transform : rotate(360deg); }
        }
        `}
    </style>
  </div>
);

export default LoadingSpinner;
