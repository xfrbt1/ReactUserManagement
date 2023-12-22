import React from 'react';
import {NavLink} from "react-router-dom";


function MyNavBar ()
{
    return (
        <nav className="navbar-container">

            <div className="my_logo">UserManagement</div>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/user">User</NavLink>
            <NavLink to="/users">Users</NavLink>
            <NavLink to="/login">Log In</NavLink>

        </nav>
)
}

export {MyNavBar}