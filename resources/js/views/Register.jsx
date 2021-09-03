import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthImage from '../components/AuthImage';
import SocialLogin from '../components/SocialLogin';
import { useSelector, useDispatch } from 'react-redux';
import { userRegister } from '../slices/userSlice';
const Register = (props) => {
    const [isShow, setisShow] = useState(false);
    let history = useHistory();
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.user.isAuth);
    const register = useSelector(state => state.user.register);

    const [registerData, setregisterData] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isAuth) window.location.href = "/";
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
                                    <h6 className="mb-0 text-sm">Name</h6>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    value={registerData.name}
                                    onChange={(e) => {
                                        setregisterData({
                                            ...registerData,
                                            name: e.target.value,
                                        });
                                    }}
                                />
                                {register.error.name && <span className="fw-bold text-danger">{register.error.name}</span>}
                            </div>

                            <div className="row px-3 mb-4">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">
                                        Email Address
                                    </h6>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter a valid email address"
                                    value={registerData.email}
                                    onChange={(e) => {
                                        setregisterData({
                                            ...registerData,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                                {register.error.email && <span className="fw-bold text-danger">{register.error.email}</span>}
                            </div>
                            <div className="row px-3">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Password</h6>
                                </label>
                                <input
                                    type={isShow ? "text" : "password"}
                                    name="password"
                                    value={registerData.password}
                                    onChange={(e) => {
                                        setregisterData({
                                            ...registerData,
                                            password: e.target.value,
                                        });
                                    }}
                                    placeholder="Enter password"
                                />
                                {register.error.password && <span className="fw-bold text-danger">{register.error.password}</span>}
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
                                <a
                                    href="#"
                                    className="ml-auto mb-0 text-sm"
                                    onClick={() => { }}
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <div className="row mb-3 px-3">
                                <button
                                    type="button"
                                    className={`btn btn-blue btn-primary text-center ${register.loading && 'disabled'}`}
                                    onClick={() => dispatch(userRegister(registerData))}
                                    disabled={register.loading}
                                >
                                    {register.loading ? <i className="fas fa-spinner fa-spin"></i> : "Ragister"}
                                </button>
                            </div>
                            <div className="row mb-4 px-3">
                                <small className="font-weight-bold">
                                    have an account?
                                    <Link
                                        className="text-danger "
                                        to={"/login"}
                                    >
                                        Login
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

export default Register;
