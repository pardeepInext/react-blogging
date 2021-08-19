import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";

const Login = () => {
    const [isShow, setisShow] = useState(false);
    const [loginData, setloginData] = useState({ email: "", password: "" });
    const responseGoogle = (e) => {
        console.log(e);
    };
    const login = () => {
        console.log(loginData);
    };
    return (
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                                <img
                                    src="https://i.imgur.com/uNGdWHi.png"
                                    className="image"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            <div className="row mb-4 px-3">
                                <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                                <div className="facebook text-center me-3">
                                    <GoogleLogin
                                        clientId="524551911775-7mui0ta4pbe4tnnfelrofid55suc1im5.apps.googleusercontent.com"
                                        buttonText="Login"
                                        render={(renderProps) => (
                                            <div
                                                className="loginBtn loginBtn--google"
                                                onClick={renderProps.onClick}
                                                className="fab fa-google"
                                                disabled={renderProps.disabled}
                                            ></div>
                                        )}
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={"single_host_origin"}
                                    />
                                </div>
                                {/* <div className="twitter text-center me-3">
                                    <div className="fab fa-twitter" />
                                </div>
                                <div className="linkedin text-center me-3">
                                    <div className="fab fa-linkedin" />
                                </div> */}
                            </div>
                            <div className="row px-3 mb-4">
                                <div className="line" />
                                <small className="or text-center">Or</small>
                                <div className="line" />
                            </div>
                            <div className="row px-3">
                                <label className="mb-1">
                                    <h6 className="mb-0 text-sm">
                                        Email Address
                                    </h6>
                                </label>
                                <input
                                    className="mb-4"
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
                                    className="btn btn-blue text-center"
                                    onClick={login}
                                >
                                    Login
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
