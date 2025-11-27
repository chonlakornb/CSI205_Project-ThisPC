import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const StaffProtectedRoute = () => {
    const userDataString = localStorage.getItem('user');
    let user = null;
    if (userDataString) {
        user = JSON.parse(userDataString);
    }

    // Allow access if user is logged in and has 'admin' or 'staff' role
    if (user && (user.role === 'admin' || user.role === 'staff')) {
        return <Outlet />;
    }

    // Redirect to home page if not authorized
    return <Navigate to="/" replace />;
};

export default StaffProtectedRoute;