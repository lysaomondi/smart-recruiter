import React from 'react';
import Button from './Button';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    size = 'medium'
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content modal-${size}`} onClick={(e) => e.stopPropagation()}>
                {title && <div className="modal-header"><h3>{title}</h3></div>}
                <div className="modal-body">{children}</div>
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose}>
                        {cancelText}
                    </Button>
                    {onConfirm && (
                        <Button variant="primary" onClick={onConfirm}>
                            {confirmText}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;