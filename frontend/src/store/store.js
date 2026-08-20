import { configureStore } from '@reduxjs/toolkit';
import assessmentReducer from './slices/assessmentSlice';
import authReducer from './slices/authSlice';
import invitationReducer from './slices/invitationSlice';
import resultReducer from './slices/resultSlice';

export const store = configureStore({
  reducer: {
    assessment: assessmentReducer,
    auth: authReducer,
    invitation: invitationReducer,
    results: resultReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
