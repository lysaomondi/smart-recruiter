import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
    if (!message) return null;

    return (
        <div className="error-container">
            <div className="error-message">
                <span className="error-icon">⚠️</span>
                <p>{message}</p>
                {onRetry && (
                    <button onClick={onRetry} className="btn-retry">
                        Retry
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;