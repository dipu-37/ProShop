import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRoute = () => {

    const {userInfo} = useSelector((state)=>state.auth);

    return userInfo && userInfo.isAdmin ? (
        <Outlet></Outlet>
    ): (
        <Navigate to='/login' replace></Navigate>
    );
}

export default AdminPrivateRoute
