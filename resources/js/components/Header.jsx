import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useSelector } from 'react-redux';

const Header = () => {

    const [currentUser] = useState(localStorage.getItem('user'))
    const isAuth = useSelector(state => state.user.isAuth);
    const count = useSelector(state => state.notification.count);

    const [menus] = useState([
        {
            menuClass: "fas fa-home",
            link: "/",
        },
        {
            menuClass: "fas fa-bell ",
            link: "/notification",
        },
        {
            menuClass: "fas fa-plus",
            link: "/add",
        },
        {
            menuClass: "fas fa-user",
            link: '/profile'
        }
    ]);

    return (
        <>
            <header className="navigation headroom headroom--pinned headroom--top">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to={'/'}>
                        <img className="img-fluid" src={logo} alt="parsa" />
                    </Link>
                    {(currentUser || isAuth) && (
                        <>
                            <button
                                className="navbar-toggler border-0"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navogation"
                                aria-controls="navogation"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className="collapse navbar-collapse text-center"
                                id="navogation"
                            >
                                <ul className="navbar-nav ml-auto">
                                    {menus.map((menu, key) => (
                                        <li className="nav-item" key={key}>
                                            <NavLink
                                                className="nav-link text-uppercase text-dark"
                                                exact
                                                activeClassName="active"
                                                to={menu.link}
                                                style={{ fontSize: "2rem" }}
                                            >
                                                <i
                                                    className={`${menu.menuClass} position-relative`}
                                                >
                                                    {menu.link == "/notification" && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info link-notification">
                                                        {count > 0 && count}
                                                    </span>}
                                                </i>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                                <form className="form-inline position-relative ml-lg-4">
                                    <input
                                        className="form-control px-0 w-100"
                                        type="search"
                                        placeholder="Search"
                                    />
                                    <a href="search.html" className="search-icon">
                                        <i
                                            className="fas fa-search text-dark"
                                            style={{ color: "#ababab" }}
                                        ></i>
                                    </a>
                                </form>
                            </div>
                        </>
                    )}
                </nav>
            </header>
        </>
    );
};

export default Header;
