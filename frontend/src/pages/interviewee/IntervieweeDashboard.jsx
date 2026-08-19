import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyAssessments } from '../../store/slices/assessmentSlice';
import { fetchInvitations, acceptInvitation, declineInvitation } from '../../store/slices/invitationSlice';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import InvitationCard from '../../components/interview/InvitationCard';

const IntervieweeDashboard = () => {
    const dispatch = useDispatch();
    const { assessments, loading: assessmentsLoading } = useSelector((state) => state.assessment);
    const { invitations, loading: invitationsLoading } = useSelector((state) => state.invitation);
    const { user } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState('pending');

    useEffect(() => {
        dispatch(fetchMyAssessments());
        dispatch(fetchInvitations());
    }, [dispatch]);

    const handleAcceptInvitation = async (invitationId) => {
        await dispatch(acceptInvitation(invitationId)).unwrap();
        dispatch(fetchInvitations());
    };

    const handleDeclineInvitation = async (invitationId) => {
        await dispatch(declineInvitation(invitationId)).unwrap();
        dispatch(fetchInvitations());
    };

    if (assessmentsLoading || invitationsLoading) return <Loading />;

    const pendingInvitations = invitations.filter((inv) => inv.status === 'pending');
    const upcomingAssessments = assessments.filter((a) => a.status === 'upcoming');
    const completedAssessments = assessments.filter((a) => a.status === 'completed');

    const renderContent = () => {
        switch (activeTab) {
            case 'pending':
                return (
                    <div className="invitations-list">
                        {pendingInvitations.length === 0 ? (
                            <p className="no-items">No pending invitations</p>
                        ) : (
                            pendingInvitations.map((invitation) => (
                                <InvitationCard
                                    key={invitation.id}
                                    invitation={invitation}
                                    onAccept={handleAcceptInvitation}
                                    onDecline={handleDeclineInvitation}
                                />
                            ))
                        )}
                    </div>
                );
            case 'upcoming':
                return (
                    <div className="assessments-grid">
                        {upcomingAssessments.length === 0 ? (
                            <p className="no-items">No upcoming assessments</p>
                        ) : (
                            upcomingAssessments.map((assessment) => (
                                <div key={assessment.id} className="assessment-card">
                                    <h3>{assessment.title}</h3>
                                    <p>{assessment.description}</p>
                                    <div className="assessment-meta">
                                        <span>📅 {new Date(assessment.startDate).toLocaleDateString()}</span>
                                        <span>⏱️ {assessment.duration} minutes</span>
                                    </div>
                                    <Link to={`/interviewee/assessment/${assessment.id}/instructions`}>
                                        <Button variant="primary">Start Assessment</Button>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                );
            case 'completed':
                return (
                    <div className="assessments-grid">
                        {completedAssessments.length === 0 ? (
                            <p className="no-items">No completed assessments</p>
                        ) : (
                            completedAssessments.map((assessment) => (
                                <div key={assessment.id} className="assessment-card completed">
                                    <h3>{assessment.title}</h3>
                                    <div className="assessment-score">
                                        <span className="score-label">Score:</span>
                                        <span className="score-value">{assessment.score}%</span>
                                    </div>
                                    <Link to={`/interviewee/assessment/${assessment.id}/feedback`}>
                                        <Button variant="secondary">View Feedback</Button>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="interviewee-dashboard">
            <div className="dashboard-header">
                <h1>Welcome, {user?.name || 'Interviewee'}</h1>
                <p>Track your assessments and invitations</p>
                <Link to="/interviewee/trial">
                    <Button variant="outline">Take Trial Assessment</Button>
                </Link>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <span className="stat-number">{pendingInvitations.length}</span>
                    <span className="stat-label">Pending Invitations</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{upcomingAssessments.length}</span>
                    <span className="stat-label">Upcoming Assessments</span>
                </div>
                <div className="stat-card">
                    <span className="stat-number">{completedAssessments.length}</span>
                    <span className="stat-label">Completed Assessments</span>
                </div>
            </div>

            <div className="dashboard-tabs">
                <button
                    className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pending')}
                >
                    Pending Invitations
                </button>
                <button
                    className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Upcoming
                </button>
                <button
                    className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('completed')}
                >
                    Completed
                </button>
            </div>

            <div className="dashboard-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default IntervieweeDashboard;