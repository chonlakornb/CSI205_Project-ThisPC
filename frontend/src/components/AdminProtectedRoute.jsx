import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
    const userDataString = localStorage.getItem('user');
    let user = null;
    if (userDataString) {
        user = JSON.parse(userDataString);
    }

    // ถ้าผู้ใช้ล็อกอินอยู่และมี role เป็น 'admin' ให้แสดงหน้าที่ต้องการ
    if (user && user.role === 'admin') {
        return <Outlet />;
    }

    // ถ้าไม่ใช่ ให้ redirect ไปหน้าแรก
    // อาจจะแสดงหน้า "Access Denied" แทนก็ได้
    return <Navigate to="/" replace />;
};

export default AdminProtectedRoute;