import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...' }) => {
  const spinnerSizeClass =
    size === 'small' ? 'spinner-border-sm' :
    size === 'large' ? 'spinner-border-lg' :
    '';

  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-3">
      <div className={`spinner-border text-primary ${spinnerSizeClass}`} role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <span className="mt-2">{message}</span>
    </div>
  );
};

export default LoadingSpinner;
