const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className="error-container" role="alert">
      <div className="error-message">
        <span className="error-icon" aria-hidden="true">⚠</span>
        <p>{typeof message === 'string' ? message : 'Something went wrong.'}</p>
        {onRetry && <button type="button" onClick={onRetry} className="btn-retry">Retry</button>}
      </div>
    </div>
  );
};

export default ErrorMessage;
