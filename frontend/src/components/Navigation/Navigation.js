import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Navigation.css';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/")
    };

    // let sessionLinks;
    // if (user) {
    //     sessionLinks = (
    //         <ProfileButton user={user} />
    //     );
    // } else {
    //     sessionLinks = (
    //         <>
    //             <LoginForm />
    //             <NavLink to="/signup">Sign Up</NavLink>
    //         </>
    //     );
    // }

    return (
        <div id="nav-hero">

            <div id="nav-top">
                <div id="nav-logo">Karma Farm</div>
                <div id="nav-menu">
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink exact to={`users/${user.id}`}>My Profile</NavLink>
                    <NavLink exact to={`users/${user.id}`}>My Orders</NavLink>
                    <NavLink exact to={`users/${user.id}`}>My Team</NavLink>
                    {/* {isLoaded && sessionLinks} */}
                </div>
                <div id="nav-logout" onClick={logout}>Logout</div>
            </div>
            <div id="nav-bottom">
                <div>about</div>
                <div>Copyright 2022</div>
            </div>
        </div>
    );
}

export default Navigation;