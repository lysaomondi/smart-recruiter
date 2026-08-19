import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import IntervieweeDashboard from './pages/interviewee/IntervieweeDashboard';
import AssessmentInstructions from './pages/interviewee/AssessmentInstructions';
import TakeAssessment from './pages/interviewee/TakeAssessment';
import TrialAssessment from './pages/interviewee/TrialAssessment';
import './index.css';
import './styles/interviewee.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Interviewee Routes */}
            <Route
                path="/interviewee/dashboard"
                element={
                    <ProtectedRoute role="interviewee">
                        <IntervieweeDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/interviewee/assessment/:assessmentId/instructions"
                element={
                    <ProtectedRoute role="interviewee">
                        <AssessmentInstructions />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/interviewee/assessment/:assessmentId/take"
                element={
                    <ProtectedRoute role="interviewee">
                        <TakeAssessment />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/interviewee/trial"
                element={
                    <ProtectedRoute role="interviewee">
                        <TrialAssessment />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;