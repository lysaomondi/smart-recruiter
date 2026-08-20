import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel', size = 'medium' }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className={`modal-content modal-${size}`} role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute right-4 top-4 text-xl text-panel/60 transition hover:text-ink" aria-label="Close">×</button>
        {title && <div className="modal-header"><h3>{title}</h3></div>}
        <div className="modal-body">{children}</div>
        {onConfirm && <div className="modal-footer"><Button variant="secondary" onClick={onClose}>{cancelText}</Button><Button variant="primary" onClick={onConfirm}>{confirmText}</Button></div>}
      </div>
    </div>
  );
};

export default Modal;
