
import { isAuthenticated, logout } from '../api';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Logout(props) {
    useEffect(() => {
        if (isAuthenticated()) {
            logout();
        }
    }, [])
    return <Navigate to="/login" replace={true} />
}