import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../slices/userSlice';
import { Notify } from 'notiflix';

import AuthImage from '../components/AuthImage';
import SocialLogin from '../components/SocialLogin';

const Login = (props) => {
    const [isShow, setisShow] = useState(false);
    const [loginData, setloginData] = useState({ email: "", password: "" });

    const dispatch = useDispatch();
    let history = useHistory();

    const login = useSelector(state => state.user.login);
    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        if (isAuth) history.push('/');
    });

    return (
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <AuthImage />
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            <SocialLogin />
                            <div className="row px-3 mb-4">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">
                                        Email Address
                                    </h6>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter a valid email address"
                                    value={loginData.email}
                                    onChange={(e) =>
                                        setloginData({
                                            ...loginData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                {login.error.email && <span className="fw-bold text-danger">{login.error.email}</span>}
                            </div>
                            <div className="row px-3">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Password</h6>
                                </label>
                                <input
                                    type={isShow ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter password"
                                    value={loginData.password}
                                    onChange={(e) =>
                                        setloginData({
                                            ...loginData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                {login.error.password && <span className="fw-bold text-danger">{login.error.password}</span>}
                            </div>
                            <div className="row px-3 mb-4">
                                <a
                                    className="ml-auto mb-0 text-sm float-end"
                                    onClick={() =>
                                        setisShow((prevState) => !prevState)
                                    }
                                >
                                    {isShow ? "Hide" : "Show"}
                                </a>
                                <a href="#" className="ml-auto mb-0 text-sm">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="row mb-3 px-3">
                                <button
                                    type="button"
                                    className="btn btn-blue btn-primary text-center"
                                    disabled={login.loading}
                                    onClick={() => dispatch(userLogin(loginData))}
                                >
                                    {login.loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
                                </button>
                            </div>
                            <div className="row mb-4 px-3">
                                <small className="font-weight-bold">
                                    Don't have an account?
                                    <Link
                                        className="text-danger "
                                        to="register"
                                    >
                                        Register
                                    </Link>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
