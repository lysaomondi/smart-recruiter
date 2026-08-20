import React, { useState } from 'react';
import Button from '../common/Button';

const InvitationCard = ({ invitation, onAccept, onDecline }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAccept = async () => {
        setIsProcessing(true);
        try {
            await onAccept(invitation.id);
        } catch (error) {
            console.error('Failed to accept invitation:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDecline = async () => {
        setIsProcessing(true);
        try {
            await onDecline(invitation.id);
        } catch (error) {
            console.error('Failed to decline invitation:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            pending: 'badge-warning',
            accepted: 'badge-success',
            declined: 'badge-danger',
            completed: 'badge-info',
        };
        return statusMap[status] || 'badge-secondary';
    };

    return (
        <div className="invitation-card">
            <div className="invitation-header">
                <h3>{invitation.assessmentTitle}</h3>
                <span className={`badge ${getStatusBadge(invitation.status)}`}>
                    {invitation.status}
                </span>
            </div>

            <div className="invitation-details">
                <p><strong>From:</strong> {invitation.recruiterName}</p>
                <p><strong>Due Date:</strong> {new Date(invitation.dueDate).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {invitation.duration} minutes</p>
                <p><strong>Questions:</strong> {invitation.questionCount}</p>
            </div>

            {invitation.status === 'pending' && (
                <div className="invitation-actions">
                    <Button
                        variant="primary"
                        onClick={handleAccept}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing...' : 'Accept'}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleDecline}
                        disabled={isProcessing}
                    >
                        Decline
                    </Button>
                </div>
            )}
        </div>
    );
};

export default InvitationCard;
