import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidenav from "./Sidenav";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../config/firebase";

const Layout = () => {

    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                navigate('/login');
            }
        }
    }, [user, loading, navigate])

    return (
        <>
            <Sidenav user={null} />
            <div className="content">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
