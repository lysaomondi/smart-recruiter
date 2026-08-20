const Loading = ({ message, label, inline = false }) => {
  const content = (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{message || label || 'Loading…'}</p>
    </div>
  );
  return inline ? content : <div className="loading-container">{content}</div>;
};

export default Loading;
