const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

let invitations = [
    {
        id: 'inv-1',
        assessmentTitle: 'Frontend Fundamentals Assessment',
        recruiterName: 'Smart Recruiter Team',
        dueDate: '2026-08-25T17:00:00Z',
        duration: 30,
        questionCount: 3,
        status: 'pending',
    },
];

const invitationService = {
    // Get all invitations for interviewee
    getInvitations: async () => {
        await delay();
        return invitations.map((invitation) => ({ ...invitation }));
    },

    // Accept an invitation
    acceptInvitation: async (invitationId) => {
        await delay();
        invitations = invitations.map((invitation) =>
            invitation.id === invitationId ? { ...invitation, status: 'accepted' } : invitation
        );
        return invitations.find((invitation) => invitation.id === invitationId);
    },

    // Decline an invitation
    declineInvitation: async (invitationId) => {
        await delay();
        invitations = invitations.map((invitation) =>
            invitation.id === invitationId ? { ...invitation, status: 'declined' } : invitation
        );
        return invitations.find((invitation) => invitation.id === invitationId);
    },

    // Get invitation details
    getInvitationDetails: async (invitationId) => {
        await delay();
        const invitation = invitations.find(({ id }) => id === invitationId);
        if (!invitation) throw new Error('Invitation not found');
        return { ...invitation };
    },
};

export default invitationService;
