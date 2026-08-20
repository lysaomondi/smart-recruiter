import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // Check if user is authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check if role matches (if role is specified)
    if (role && user?.role !== role) {
        // If user is not authorized, redirect to their dashboard
        if (user?.role === 'recruiter') {
            return <Navigate to="/recruiter/dashboard" replace />;
        } else if (user?.role === 'interviewee') {
            return <Navigate to="/interviewee/dashboard" replace />;
        }
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;