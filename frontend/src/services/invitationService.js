import api from './api';

const invitationService = {
    // Get all invitations for interviewee
    getInvitations: () => {
        return api.get('/interviewee/invitations');
    },

    // Accept an invitation
    acceptInvitation: (invitationId) => {
        return api.post(`/interviewee/invitations/${invitationId}/accept`);
    },

    // Decline an invitation
    declineInvitation: (invitationId) => {
        return api.post(`/interviewee/invitations/${invitationId}/decline`);
    },

    // Get invitation details
    getInvitationDetails: (invitationId) => {
        return api.get(`/interviewee/invitations/${invitationId}`);
    },
};

export default invitationService;