import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
const Header = () => {
    const [menus] = useState([
        {
            menuClass: "fas fa-home",
            link: "/",
        },
        {
            menuClass: "fas fa-bell",
            link: "/about",
        },
        {
            menuClass: "fab fa-blogger-b",
            link: "/categories",
        },
        {
            menuClass: "fab fa-facebook-messenger",
            link: "/contact",
        },
    ]);
    return (
        <>
            <header className="navigation headroom headroom--pinned headroom--top">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <a className="navbar-brand" href="index.html">
                        <img className="img-fluid" src={logo} alt="parsa" />
                    </a>
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
                                    {/* <a className="nav-link text-uppercase text-dark" href={menu.link}>{menu.name}</a> */}
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
                                            {/* <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info link-notification">
                                                4
                                            </span> */}
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
                            {/* <button class="search-icon" type="submit"><i class="ti-search text-dark"></i></button> */}
                            <a href="search.html" className="search-icon">
                                <i
                                    className="fas fa-search text-dark"
                                    style={{ color: "#ababab" }}
                                ></i>
                            </a>
                        </form>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
