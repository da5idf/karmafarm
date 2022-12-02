import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './Navigation.css';
import * as sessionActions from '../../store/session';

function Navigation() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [viewMenu, setViewMenu] = useState(true);

    const user = useSelector(state => state.session.user);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/")
    };

    const toggleMenu = () => {
        setViewMenu(!viewMenu)
    }

    if (!user) return;

    if (!viewMenu) return (
        <i id="hamburger" className="fa-solid fa-bars" onClick={toggleMenu}></i>
    )

    return (
        <div id="nav-hero">
            <div id="nav-toggle" onClick={toggleMenu}>{"<"}</div>
            <div id="nav-main">
                <div id="nav-top">
                    <div id="nav-logo">Karma Farm</div>
                    <div id="nav-menu">
                        <NavLink exact to="/">
                            <i className="fa-solid fa-house"></i>
                            Dashboard
                        </NavLink>
                        {user.farmer && (
                            <>
                                <NavLink exact to="/products">
                                    <i className="fa-solid fa-basket-shopping"></i>
                                    Products
                                </NavLink>
                                <NavLink exact to="/updates">
                                    <i className="fa-solid fa-clipboard"></i>
                                    Weekly Updates
                                </NavLink>
                            </>
                        )}
                        <NavLink exact to="/reports">
                            <i className="fa-solid fa-chart-line"></i>
                            Reports
                        </NavLink>
                    </div>
                    <div id="nav-logout" onClick={logout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        Logout
                    </div>
                </div>
                <div id="nav-bottom">
                    <div
                        id="nav-about"
                        onClick={() => history.push("/about")}
                    >
                        <i className="fa-regular fa-circle-question fa-lg"></i>
                        about
                    </div>
                    <div id="nav-copyright">
                        <i className="fa-regular fa-copyright"></i>
                        Copyright 2022
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Navigation;