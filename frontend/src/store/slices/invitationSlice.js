import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import invitationService from '../../services/invitationService';

export const fetchInvitations = createAsyncThunk(
    'invitation/fetchInvitations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await invitationService.getInvitations();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const acceptInvitation = createAsyncThunk(
    'invitation/acceptInvitation',
    async (invitationId, { rejectWithValue }) => {
        try {
            const response = await invitationService.acceptInvitation(invitationId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const declineInvitation = createAsyncThunk(
    'invitation/declineInvitation',
    async (invitationId, { rejectWithValue }) => {
        try {
            const response = await invitationService.declineInvitation(invitationId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    invitations: [],
    loading: false,
    error: null,
};

const invitationSlice = createSlice({
    name: 'invitation',
    initialState,
    reducers: {
        clearInvitationError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInvitations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInvitations.fulfilled, (state, action) => {
                state.loading = false;
                state.invitations = action.payload;
            })
            .addCase(fetchInvitations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(acceptInvitation.fulfilled, (state, action) => {
                const index = state.invitations.findIndex(
                    (inv) => inv.id === action.payload.id
                );
                if (index !== -1) {
                    state.invitations[index] = action.payload;
                }
            })
            .addCase(declineInvitation.fulfilled, (state, action) => {
                const index = state.invitations.findIndex(
                    (inv) => inv.id === action.payload.id
                );
                if (index !== -1) {
                    state.invitations[index] = action.payload;
                }
            });
    },
});

export const { clearInvitationError } = invitationSlice.actions;
export default invitationSlice.reducer;