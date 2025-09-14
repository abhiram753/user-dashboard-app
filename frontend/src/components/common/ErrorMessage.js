import React from 'react';

const ErrorMessage = ({
  message,
  title = 'Error',
  onRetry,
  retryText = 'Try Again'
}) => {
  return (
    <div className="alert alert-danger d-flex flex-column align-items-start" role="alert">
      <strong className="mb-1">{title}</strong>
      <span>{message}</span>
      {onRetry && (
        <button
          className="btn btn-outline-light btn-sm mt-2"
          onClick={onRetry}
        >
          {retryText}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
