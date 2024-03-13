import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';


function ShowNavbar() {

    const location = useLocation();
    const { query, id } = useParams();
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        if (location.pathname === "/login") {
            setShowNavbar(false);
        } else if (location.pathname === "/account") {
            setShowNavbar(false);
        } else if (location.pathname === "*") {
            setShowNavbar(false);
        } else if (location.pathname === `/search/:query`) {
            setShowNavbar(false);
        } else if (location.pathname === `/person/:id`) {
            setShowNavbar(false);
        } else if (location.pathname === "/forgot-password") {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
    }, [location])

    return (
        <div>
            {showNavbar && <Navbar />}
        </div>
    )
}

export default ShowNavbar;